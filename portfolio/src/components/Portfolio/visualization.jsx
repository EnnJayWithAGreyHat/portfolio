import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_START = 0

const buildGridPositions = (totalNodes, spacing, padding) => {
  const gridSize = Math.ceil(Math.sqrt(totalNodes))
  const positions = Array.from({ length: totalNodes }, (_, i) => ({
    id: i,
    x: (i % gridSize) * spacing + padding,
    y: Math.floor(i / gridSize) * spacing + padding
  }))

  return {
    positions,
    width: (gridSize - 1) * spacing + padding * 2,
    height: (gridSize - 1) * spacing + padding * 2
  }
}

class MinHeap {
  constructor() {
    this.values = []
  }

  push(item) {
    this.values.push(item)
    let idx = this.values.length - 1

    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2)
      if (this.values[parent].dist <= this.values[idx].dist) break
      ;[this.values[parent], this.values[idx]] = [
        this.values[idx],
        this.values[parent]
      ]
      idx = parent
    }
  }

  pop() {
    if (this.values.length === 0) return null
    const top = this.values[0]
    const tail = this.values.pop()

    if (this.values.length > 0) {
      this.values[0] = tail
      let idx = 0

      while (true) {
        let smallest = idx
        const left = idx * 2 + 1
        const right = idx * 2 + 2

        if (
          left < this.values.length &&
          this.values[left].dist < this.values[smallest].dist
        ) {
          smallest = left
        }

        if (
          right < this.values.length &&
          this.values[right].dist < this.values[smallest].dist
        ) {
          smallest = right
        }

        if (smallest === idx) break
        ;[this.values[idx], this.values[smallest]] = [
          this.values[smallest],
          this.values[idx]
        ]
        idx = smallest
      }
    }

    return top
  }

  get size() {
    return this.values.length
  }
}

const dijkstra = (totalNodes, edges, start, end) => {
  const adjacency = Array.from({ length: totalNodes }, () => [])
  edges.forEach((edge) => {
    adjacency[edge.source].push(edge)
  })

  const distances = Array(totalNodes).fill(Infinity)
  const previous = Array(totalNodes).fill(null)
  const visited = Array(totalNodes).fill(false)
  const order = []

  distances[start] = 0
  const queue = new MinHeap()
  queue.push({ node: start, dist: 0 })

  while (queue.size > 0) {
    const current = queue.pop()
    if (!current) break

    const node = current.node
    if (visited[node]) continue

    visited[node] = true
    order.push(node)

    if (node === end) break

    adjacency[node].forEach((edge) => {
      const next = edge.target
      const nextDistance = distances[node] + edge.weight

      if (nextDistance < distances[next]) {
        distances[next] = nextDistance
        previous[next] = node
        queue.push({ node: next, dist: nextDistance })
      }
    })
  }

  const path = []
  let cursor = end

  while (cursor !== null) {
    path.unshift(cursor)
    cursor = previous[cursor]
  }

  return {
    order,
    path: path[0] === start ? path : []
  }
}

const GraphVisualization = ({ filePath }) => {
  const [graphData, setGraphData] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [visitedIndex, setVisitedIndex] = useState(0)
  const [pathIndex, setPathIndex] = useState(0)

  const runRef = useRef({ order: [], path: [] })
  const visitIntervalRef = useRef(null)
  const pathIntervalRef = useRef(null)

  useEffect(() => {
    const loadFileData = async () => {
      const response = await fetch(filePath)
      const fileContent = await response.text()
      const lines = fileContent.trim().split('\n')

      const [totalNodes] = lines[0].split(' ').map(Number)
      const isUndirected = String(filePath).includes('undirected')

      const edges = []
      lines.slice(1).forEach((line) => {
        const [source, target, weightValue] = line.split(' ').map(Number)
        const weight = Number.isFinite(weightValue) ? weightValue : 1
        edges.push({ source, target, weight })
        if (isUndirected) {
          edges.push({ source: target, target: source, weight })
        }
      })

      const { positions, width, height } = buildGridPositions(totalNodes, 28, 18)

      setGraphData({
        nodes: positions,
        edges,
        width,
        height,
        totalNodes,
        isUndirected
      })
    }

    if (filePath) {
      loadFileData()
    }
  }, [filePath])

  const clearRunTimers = useCallback(() => {
    if (visitIntervalRef.current) {
      clearInterval(visitIntervalRef.current)
      visitIntervalRef.current = null
    }

    if (pathIntervalRef.current) {
      clearInterval(pathIntervalRef.current)
      pathIntervalRef.current = null
    }
  }, [])

  const resetDemo = useCallback(() => {
    clearRunTimers()
    runRef.current = { order: [], path: [] }
    setVisitedIndex(0)
    setPathIndex(0)
    setIsRunning(false)
  }, [clearRunTimers])

  useEffect(() => {
    resetDemo()
    return () => clearRunTimers()
  }, [filePath, clearRunTimers, resetDemo])

  const runDemo = () => {
    if (!graphData || isRunning) return

    resetDemo()
    setIsRunning(true)

    const startNode = DEFAULT_START
    const endNode = graphData.totalNodes - 1
    const runResult = dijkstra(graphData.totalNodes, graphData.edges, startNode, endNode)
    runRef.current = runResult

    let visitCounter = 0
    visitIntervalRef.current = setInterval(() => {
      visitCounter += 1
      setVisitedIndex(visitCounter)

      if (visitCounter >= runResult.order.length) {
        clearInterval(visitIntervalRef.current)
        visitIntervalRef.current = null

        let pathCounter = 0
        pathIntervalRef.current = setInterval(() => {
          pathCounter += 1
          setPathIndex(pathCounter)

          if (pathCounter >= runResult.path.length) {
            clearInterval(pathIntervalRef.current)
            pathIntervalRef.current = null
            setIsRunning(false)
          }
        }, 85)
      }
    }, 28)
  }

  const visitedSet = useMemo(() => {
    const active = runRef.current.order.slice(0, visitedIndex)
    return new Set(active)
  }, [visitedIndex])

  const pathNodes = useMemo(
    () => runRef.current.path.slice(0, pathIndex),
    [pathIndex]
  )

  const pathSet = useMemo(() => new Set(pathNodes), [pathNodes])

  const pathEdgeSet = useMemo(() => {
    const pairs = new Set()
    for (let i = 1; i < pathNodes.length; i += 1) {
      pairs.add(`${pathNodes[i - 1]}-${pathNodes[i]}`)
    }
    return pairs
  }, [pathNodes])

  if (!graphData) {
    return null
  }

  const { nodes, edges, width, height, isUndirected } = graphData

  return (
    <div className="graph-demo">
      <div className="graph-toolbar">
        <div className="graph-meta">
          <span>Start: Node 0</span>
          <span>Goal: Node {graphData.totalNodes - 1}</span>
        </div>
        <div className="graph-actions">
          <button type="button" onClick={runDemo} disabled={isRunning}>
            {isRunning ? 'Running...' : 'Run Dijkstra Demo'}
          </button>
          <button type="button" onClick={resetDemo}>
            Reset
          </button>
        </div>
      </div>

      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="5"
            markerHeight="5"
            refX="4"
            refY="2.5"
            orient="auto"
          >
            <polygon points="0 0, 5 2.5, 0 5" fill="#424d58" />
          </marker>
        </defs>

        {edges.map((edge, index) => {
          const isPath = pathEdgeSet.has(`${edge.source}-${edge.target}`)
          const isVisited =
            visitedSet.has(edge.source) && visitedSet.has(edge.target)

          return (
            <line
              key={`${edge.source}-${edge.target}-${index}`}
              x1={nodes[edge.source].x}
              y1={nodes[edge.source].y}
              x2={nodes[edge.target].x}
              y2={nodes[edge.target].y}
              stroke={isPath ? '#ffd166' : isVisited ? '#4c9ffe' : '#37414a'}
              strokeWidth={isPath ? 2.2 : 1}
              markerEnd={isUndirected ? undefined : 'url(#arrowhead)'}
              opacity={isPath || isVisited ? 0.95 : 0.5}
            />
          )
        })}

        {nodes.map((node) => {
          const isStart = node.id === DEFAULT_START
          const isGoal = node.id === graphData.totalNodes - 1
          const isPath = pathSet.has(node.id)
          const isVisited = visitedSet.has(node.id)

          let fill = '#1b2128'
          if (isPath) fill = '#ffd166'
          else if (isStart) fill = '#8ddf7c'
          else if (isGoal) fill = '#f07167'
          else if (isVisited) fill = '#4c9ffe'

          return (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={isPath ? 4.5 : 3.4}
              fill={fill}
              stroke="#0f1318"
              strokeWidth="0.5"
            />
          )
        })}
      </svg>

      <div className="graph-legend">
        <span className="legend-item">
          <span className="dot start" /> Start
        </span>
        <span className="legend-item">
          <span className="dot goal" /> Goal
        </span>
        <span className="legend-item">
          <span className="dot visited" /> Visited
        </span>
        <span className="legend-item">
          <span className="dot path" /> Shortest Path
        </span>
      </div>
    </div>
  )
}

export default GraphVisualization
