const express = require('express');
const router = express.Router();
const {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patient.controller');

// GET all patients
router.get('/', getPatients);

// POST a new patient
router.post('/', addPatient);

// PUT update a patient by ID
router.put('/:id', updatePatient);

// DELETE a patient by ID
router.delete('/:id', deletePatient);

module.exports = router;
