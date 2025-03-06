const express = require("express");
const router = express.Router();
const Task = require("../../../models/clients/checklist/task");
const { calculateNextDueDate } = require("../../../middlewares/TaskScheduler");

// ✅ Add a New Task
router.post("/add", async (req, res) => {
  try {
    console.log("📩 Received Task Data:", req.body);

    const { taskName, doerName, department, frequency, plannedDate } = req.body;
    let nextDueDate = calculateNextDueDate(plannedDate, frequency);

    console.log("📝 Calculated Next Due Date:", nextDueDate);

    const newTask = new Task({
      taskName,
      doerName,
      department,
      frequency,
      plannedDate,  // ✅ Planned date remains original
      nextDueDate,  // ✅ Only nextDueDate is calculated
      status: "Pending",
    });

    console.log("📤 Saving Task to Database...");
    await newTask.save();
    
    console.log("✅ Task Successfully Added:", newTask);
    res.json({ message: "✅ Task added successfully!", task: newTask });

  } catch (error) {
    console.error("❌ Error Adding Task:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Tasks with Correct nextDueDate
// ✅ Get All Tasks with nextDueDate Filtering
router.get("/list", async (req, res) => {
  try {
      let { startDate, endDate, sort, generateFutureTasks } = req.query;
      let filter = {};

      if (startDate && endDate) {
          filter.nextDueDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }

      let tasks = await Task.find(filter).sort({ nextDueDate: sort === "desc" ? -1 : 1 });

      if (generateFutureTasks === "true") {
          let extendedTasks = [];

          tasks.forEach(task => {
              let nextDueDate = new Date(task.nextDueDate);
              while (nextDueDate <= new Date(endDate)) {
                  extendedTasks.push({
                      ...task.toObject(),
                      _id: task._id + "_" + nextDueDate.toISOString(), // Unique ID for frontend
                      nextDueDate: new Date(nextDueDate),
                  });
                  nextDueDate = calculateNextDueDate(nextDueDate, task.frequency);
              }
          });

          tasks = [...tasks, ...extendedTasks];
      }

      res.json(tasks);
  } catch (error) {
      console.error("❌ Error Fetching Tasks:", error.message);
      res.status(500).json({ error: error.message });
  }
});



// ✅ Update Task
router.put("/update/:id", async (req, res) => {
  try {
    const { taskName, doerName, department, frequency, plannedDate } = req.body;

    // Calculate new nextDueDate if frequency or plannedDate is changed
    let nextDueDate = calculateNextDueDate(plannedDate, frequency);

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { taskName, doerName, department, frequency, plannedDate, nextDueDate }, 
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "✅ Task updated successfully!", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Error updating task", details: error.message });
  }
});


// ✅ Delete Task
router.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task", details: error.message });
  }
});

// ✅ Mark Task as Completed
// ✅ Mark Task as Completed
router.put("/markCompleted/:id", async (req, res) => {
  try {
    const { selectedDate } = req.body;
    console.log("📥 Received data for marking task as completed:", selectedDate);

    // Find the task by ID
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.error("❌ Task not found:", req.params.id);
      return res.status(404).json({ error: "Task not found" });
    }

    let updated = false;

    // Normalize the selectedDate to UTC
    const selectedDateObj = new Date(selectedDate);
    selectedDateObj.setUTCHours(0, 0, 0, 0); // Normalize to UTC
    console.log("Normalized selectedDate:", selectedDateObj.toISOString());

    // Add the completion data to the status history
    task.statusHistory.push({
      date: new Date(),  // Store the current date when the task is marked completed
      status: "Completed",
      completedDate: selectedDateObj, // Use the selected date as the completion date
    });

    // Calculate the nextDueDate based on frequency
    const newNextDueDate = calculateNextDueDate(task.nextDueDate, task.frequency);
    console.log("New calculated nextDueDate:", newNextDueDate);

    // Update the task's nextDueDate
    task.nextDueDate = newNextDueDate;

    // Save the updated task
    await task.save();
    console.log("✅ Task marked as completed and nextDueDate updated for selected date:", selectedDate);
    res.json({ message: "✅ Task marked as completed for selected date!", task });
  } catch (error) {
    console.error("❌ Error in markCompleted route:", error);
    res.status(500).json({ error: "Error updating task", details: error.message });
  }
});



router.get("/serverdate", (req, res) => {
  const currentDate = new Date("2025-03-20").toISOString(); // Use ISO string to ensure UTC format
  res.json({ currentDate });
});


module.exports = router;
