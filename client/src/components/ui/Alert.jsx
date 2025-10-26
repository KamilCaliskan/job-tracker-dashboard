import React from "react";

const Alert = ({ type = "error", message, onClose }) => {
    if (!message) return null;

    const styles =
    type === "error"
    ? "bg-red-100 text-red-700 border-red-400"
    : "bg-green-100 text-green-700 border-green-400";

    return (
        <div className={`border p-3 rounded-md my-3 ${styles} flex justify-between items-center`}>
        <span>{message}</span>
        <button className="font-bold" onClick={onClose}>
        ✖
        </button>
        </div>
    );
};

export default Alert;
