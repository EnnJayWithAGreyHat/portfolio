import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GraphVisualization = ({ filePath }) => {
  const svgRef = useRef(null);
  const [graphData, setGraphData] = useState(null);

  // Number of points in the grid
  const gridWidth = 10;
  const gridHeight = 10;
  const pointSpacing = 25; // Increased spacing between grid points

  useEffect(() => {
    const loadFileData = async () => {
      const response = await fetch(filePath);
      const fileContent = await response.text();
      const lines = fileContent.trim().split("\n");

      const [totalNodes, totalEdges] = lines[0].split(" ").map(Number);
      const links = lines.slice(1).map((line) => {
        const [source, target, weight] = line.split(" ").map(Number);
        return { source, target, weight: weight || 1 };
      });

      // Generate a static grid of points
      const nodes = Array.from({ length: totalNodes }, (_, i) => ({
        id: i,
        x: (i % gridWidth) * pointSpacing,
        y: Math.floor(i / gridWidth) * pointSpacing,
      }));

      setGraphData({ nodes, links });
    };

    if (filePath) {
      loadFileData();
    }
  }, [filePath]);

  useEffect(() => {
    if (!graphData || !svgRef.current) return;

    const { nodes, links } = graphData;

    // Set up SVG dimensions
    const width = gridWidth * pointSpacing;
    const height = gridHeight * pointSpacing;

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Render links
    svg
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("x1", (d) => nodes[d.source].x)
      .attr("y1", (d) => nodes[d.source].y)
      .attr("x2", (d) => nodes[d.target].x)
      .attr("y2", (d) => nodes[d.target].y)
      .attr("stroke", "white") // Updated stroke color to white
      .attr("stroke-width", 1); // Set thin lines

    // Render nodes
    svg
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 2)
      .attr("fill", "black");
  }, [graphData]);

  return <svg ref={svgRef} style={{ border: "1px solid black" }} />;
};

export default GraphVisualization;