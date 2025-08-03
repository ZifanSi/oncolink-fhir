const { poolPromise } = require('../db');

// GET /patients
async function getPatients(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Patients');
    res.json(result.recordset);
  } catch (err) {
    console.error('Fetch patients error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// POST /patients
async function addPatient(req, res) {
  const { FirstName, LastName, DOB, Gender, Phone, Email, SIN } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('FirstName', FirstName)
      .input('LastName', LastName)
      .input('DOB', DOB)
      .input('Gender', Gender)
      .input('Phone', Phone)
      .input('Email', Email)
      .input('SIN', SIN)
      .query(`
        INSERT INTO dbo.Patients (FirstName, LastName, DOB, Gender, Phone, Email, SIN, DateRegistered)
        VALUES (@FirstName, @LastName, @DOB, @Gender, @Phone, @Email, @SIN, GETDATE())
      `);

    res.status(201).json({ message: 'Patient added' });
  } catch (err) {
    console.error('Add patient error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// PUT /patients/:id
async function updatePatient(req, res) {
  const { id } = req.params;
  const { FirstName, LastName, DOB, Gender, Phone, Email, SIN } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('PatientID', id)
      .input('FirstName', FirstName)
      .input('LastName', LastName)
      .input('DOB', DOB)
      .input('Gender', Gender)
      .input('Phone', Phone)
      .input('Email', Email)
      .input('SIN', SIN)
      .query(`
        UPDATE dbo.Patients
        SET FirstName = @FirstName,
            LastName = @LastName,
            DOB = @DOB,
            Gender = @Gender,
            Phone = @Phone,
            Email = @Email,
            SIN = @SIN
        WHERE PatientID = @PatientID
      `);

    res.json({ message: 'Patient updated' });
  } catch (err) {
    console.error('Update patient error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// DELETE /patients/:id
async function deletePatient(req, res) {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('PatientID', id)
      .query('DELETE FROM dbo.Patients WHERE PatientID = @PatientID');

    res.json({ message: 'Patient deleted' });
  } catch (err) {
    console.error('Delete patient error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient
};
