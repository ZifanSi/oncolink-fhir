const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// GET all patients
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Patients');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST new patient
router.post('/', async (req, res) => {
  const { name, age, gender } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Name', name)
      .input('Age', age)
      .input('Gender', gender)
      .query('INSERT INTO dbo.Patients (Name, Age, Gender) VALUES (@Name, @Age, @Gender)');
    
    res.status(201).send({ message: 'Patient added' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
