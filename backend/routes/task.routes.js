// backend/routes/task.routes.js
const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');
const { getNextOncologyTask } = require('../utils/workflow');

router.post('/complete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('TaskID', id)
      .query(`
        UPDATE dbo.PatientTasks SET Status = 'Completed' WHERE TaskID = @TaskID;
        SELECT * FROM dbo.PatientTasks WHERE TaskID = @TaskID
      `);

    const currentTask = result.recordset[0];
    const nextTask = getNextOncologyTask(currentTask.TaskName);

    if (nextTask) {
      await pool.request()
        .input('PatientID', currentTask.PatientID)
        .input('TaskName', nextTask)
        .input('Status', 'Pending')
        .query(`
          INSERT INTO dbo.PatientTasks (PatientID, TaskName, Status)
          VALUES (@PatientID, @TaskName, @Status)
        `);
    }

    res.json({ message: 'Task completed', nextTask });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;