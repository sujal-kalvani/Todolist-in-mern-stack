const todoModel = require("../models/Todo");

async function updateStatusController(req, res) {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({ message: "Invalid 'isCompleted' value" });
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo status updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = updateStatusController;