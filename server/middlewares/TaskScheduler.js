const cron = require("node-cron");
const Task = require("../models/clients/checklist/task");

// ✅ Function to Calculate Next Due Date
// Function to calculate the next due date based on frequency
const calculateNextDueDate = (plannedDate, frequency) => {
  let nextDueDate = new Date(plannedDate);
  nextDueDate.setUTCHours(0, 0, 0, 0); // Normalize to UTC

  switch (frequency) {
    case "Daily":
      nextDueDate.setUTCDate(nextDueDate.getUTCDate() + 1);
      break;
    case "Alternate Days":
      nextDueDate.setUTCDate(nextDueDate.getUTCDate() + 2);
      break;
    case "Weekly":
      nextDueDate.setUTCDate(nextDueDate.getUTCDate() + 7);
      break;
    case "Fortnightly":
      nextDueDate.setUTCDate(nextDueDate.getUTCDate() + 14);
      break;
    case "Monthly":
      nextDueDate.setUTCMonth(nextDueDate.getUTCMonth() + 1);
      break;
    case "Quarterly":
      nextDueDate.setUTCMonth(nextDueDate.getUTCMonth() + 3);
      break;
    case "Half-yearly":
      nextDueDate.setUTCMonth(nextDueDate.getUTCMonth() + 6);
      break;
    case "Yearly":
      nextDueDate.setUTCFullYear(nextDueDate.getUTCFullYear() + 1);
      break;
    default:
      return null;
  }

  return nextDueDate;
};

// ✅ Scheduled Task to Update Recurring Tasks
const updateTaskFrequency = async () => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Normalize to UTC

    console.log("🔄 Running Task Frequency Update at (UTC):", today.toUTCString());

    const tasks = await Task.find({ nextDueDate: { $lte: today } });

    console.log(`🔍 Found ${tasks.length} tasks that need updating.`);

    if (tasks.length === 0) {
      console.log("✅ No tasks to update.");
      return;
    }

    for (let task of tasks) {
      let newDueDate = calculateNextDueDate(task.nextDueDate, task.frequency);
      if (!newDueDate) {
        console.warn(`⚠️ Skipping Task: ${task.taskName} - Unable to calculate next due date.`);
        continue;
      }

      try {
        await Task.findByIdAndUpdate(task._id, { nextDueDate: newDueDate, status: "Pending" });
        console.log(`✅ Successfully Updated Task: ${task.taskName} | New Due Date (UTC): ${newDueDate.toUTCString()}`);
      } catch (updateError) {
        console.error(`❌ Error updating task ${task.taskName}:`, updateError);
      }
    }
  } catch (error) {
    console.error("❌ Error updating tasks:", error);
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("🕛 Running Scheduled Task Update...");
  updateTaskFrequency();
});

module.exports = { calculateNextDueDate, updateTaskFrequency };

