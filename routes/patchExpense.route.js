const express = require("express");

const createPatchExpenseRouter = (expenses) => {
  const router = express.Router();

  router.patch("/expenses/:id", (req, res) => {
    const expenseId = Number(req.params.id);

    if (!Number.isInteger(expenseId) || expenseId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID. ID must be a positive integer.",
      });
    }

    const expense = expenses.find((item) => item.id === expenseId);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: `Expense with ID ${expenseId} not found.`,
      });
    }

    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a JSON object.",
      });
    }

    const allowedFields = ["amount", "category", "note", "currency", "date"];
    const updates = {};

    for (const key of allowedFields) {
      if (
        Object.prototype.hasOwnProperty.call(body, key) &&
        body[key] !== undefined
      ) {
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Provide at least one valid field to update (amount, category, note, currency, date).",
      });
    }

    if (Object.prototype.hasOwnProperty.call(updates, "amount")) {
      if (
        typeof updates.amount !== "number" ||
        !Number.isFinite(updates.amount) ||
        updates.amount <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a positive number greater than 0.",
        });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "category")) {
      if (
        typeof updates.category !== "string" ||
        updates.category.trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: "Category must be a non-empty string.",
        });
      }
      updates.category = updates.category.trim();
    }

    if (Object.prototype.hasOwnProperty.call(updates, "note")) {
      if (typeof updates.note !== "string") {
        return res.status(400).json({
          success: false,
          message: "Note must be a string.",
        });
      }
      updates.note = updates.note.trim();
    }

    if (Object.prototype.hasOwnProperty.call(updates, "currency")) {
      if (
        typeof updates.currency !== "string" ||
        updates.currency.trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: "Currency must be a non-empty string.",
        });
      }
      updates.currency = updates.currency.trim().toUpperCase();
    }

    if (Object.prototype.hasOwnProperty.call(updates, "date")) {
      const parsedDate = new Date(updates.date);
      if (
        typeof updates.date !== "string" ||
        Number.isNaN(parsedDate.getTime())
      ) {
        return res.status(400).json({
          success: false,
          message: "Date must be a valid date string.",
        });
      }
      updates.date = updates.date.trim();
    }

    // Apply partial updates while keeping id and createdAt intact
    Object.assign(expense, updates, {
      updatedAt: new Date().toLocaleString("en-GB", { hour12: false }),
    });

    return res.status(200).json({
      success: true,
      data: expense,
    });
  });

  return router;
};

module.exports = createPatchExpenseRouter;
