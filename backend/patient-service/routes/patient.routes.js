const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// GET: Get all patients
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Patients');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST: Add a new patient
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


// PUT: Update an existing patient by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, gender } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('PatientID', id)
      .input('Name', name)
      .input('Age', age)
      .input('Gender', gender)
      .query('UPDATE dbo.Patients SET Name = @Name, Age = @Age, Gender = @Gender WHERE PatientID = @PatientID');

    res.send({ message: 'Patient updated' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// DELETE: Remove a patient by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('PatientID', id)
      .query('DELETE FROM dbo.Patients WHERE PatientID = @PatientID');

    res.send({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;
