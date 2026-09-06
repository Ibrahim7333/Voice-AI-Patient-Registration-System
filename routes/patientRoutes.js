const express = require('express');
const router = express.Router();
const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientByPhone
} = require('../controllers/patientController');

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.get('/phone/:phone', getPatientByPhone);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;