import Expense from "../models/expense.model.js";

// Create expense
export const createExpense = async (req, res) => {
  try {
    const { travelId, description, amount, category } = req.body;

    const expense = new Expense({
      travelId,
      description,
      amount,
      category,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Expense creation failed." });
  }
};

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("travelId");
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses." });
  }
};

// Get expenses by Id
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found." });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expense." });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found." });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Expense update failed." });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found." });
    }
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Expense deletion failed." });
  }
};
