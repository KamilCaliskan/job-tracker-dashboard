const validateJob = (req, res, next) => {
    const { title, company, status } = req.body;
    if (!title || title.trim().length < 2) {
        return res.status(400).json({ error: "Job title is required (min 2 chars)" });
    }
    if (!company || company.trim().length < 2) {
        return res.status(400).json({ error: "Company name is required (min 2 chars)" });
    }
    const validStatuses = ['Pending', 'Interview', 'Rejected', 'Offer'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    next();
};

module.exports = { validateJob };
