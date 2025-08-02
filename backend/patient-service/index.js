const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const patientRoutes = require('./routes/patient.routes');
app.use('/api/patients', patientRoutes);

const PORT = process.env.PATIENT_PORT || 5002;
app.listen(PORT, () => {
  console.log(`Patient service running on http://localhost:${PORT}`);
});
