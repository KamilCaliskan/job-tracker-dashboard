import React from "react";

const Alert = ({ type = "error", message, onClose }) => {
    if (!message) return null;

    const base = "flex justify-between items-center p-3 rounded-md border";
    const classes =
    type === "error"
    ? `${base} bg-red-50 text-red-700 border-red-200`
    : `${base} bg-green-50 text-green-700 border-green-200`;

    return (
        <div className={`transition-opacity duration-300 ${classes}`}>
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="ml-4 font-semibold">✕</button>
        </div>
    );
};

export default Alert;
