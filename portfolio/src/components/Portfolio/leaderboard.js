import React, { useState, useEffect } from "react";

const Leaderboard = ({ type }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const endpoint =
                type === "time"
                    ? "https://ennjaywithagreyhat.github.io/portfolio/api/leaderboard/time"
                    : "https://ennjaywithagreyhat.github.io/portfolio/api/leaderboard/joined";
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                setLeaderboard(data);
            } catch (error) {
                console.error(`Error fetching ${type} leaderboard:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, [type]);

    if (loading) return <p>Loading...</p>;

    // Calculate pagination details
    const totalPages = Math.ceil(leaderboard.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = leaderboard.slice(startIndex, startIndex + itemsPerPage);

    // Pagination controls
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <h1>{type === "time" ? "Time Spent Leaderboard" : "Joined Order Leaderboard"}</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user, index) => (
                        <tr key={user._id}>
                            <td>{startIndex + index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{(user.timeSpent / 3600).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => goToPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;