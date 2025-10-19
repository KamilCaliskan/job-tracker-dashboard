import React from "react";

const Dashboard = ({ jobs }) => {
    const stats = jobs.reduce((acc, job) => {
        acc.total = (acc.total || 0) + 1;
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
    }, { total: 0 });

    return (
        <div className="flex space-x-4 p-4 bg-gray-100 rounded">
        <div>Total: {stats.total}</div>
        <div>Applied: {stats.applied || 0}</div>
        <div>Interview: {stats.interview || 0}</div>
        <div>Rejected: {stats.rejected || 0}</div>
        </div>
    );
};

export default Dashboard;
