import { useState } from "react";

function JobForm({ onAdd }) {
    const [form, setForm] = useState({ title: "", company: "", status: "applied" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.company) return;
        onAdd(form);
        setForm({ title: "", company: "", status: "applied" });
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 flex-1"
        />
        <input
        type="text"
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="border p-2 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
        </button>
        </form>
    );
}

export default JobForm;
