const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const patientRoutes = require('./routes/patient.routes');
app.use('/api/patients', patientRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
