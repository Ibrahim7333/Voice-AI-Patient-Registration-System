const Patient = require('../models/Patient');

// Response Envelope Helper
const sendResponse = (res, statusCode, data = null, error = null) => {
  return res.status(statusCode).json({ data, error });
};

// GET /patients
exports.getPatients = async (req, res) => {
  try {
    const { last_name, date_of_birth, phone_number } = req.query;
    let filter = { deleted_at: null };

    if (last_name) filter.last_name = new RegExp(last_name, 'i');
    if (phone_number) filter.phone_number = phone_number;
    if (date_of_birth) filter.date_of_birth = new Date(date_of_birth);

    const patients = await Patient.find(filter);
    sendResponse(res, 200, patients);
  } catch (err) {
    sendResponse(res, 500, null, err.message);
  }
};

// GET /patients/:id[cite: 1]
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ patient_id: req.params.id, deleted_at: null });
    if (!patient) return sendResponse(res, 404, null, 'Patient not found');
    sendResponse(res, 200, patient);
  } catch (err) {
    sendResponse(res, 500, null, err.message);
  }
};

// POST /patients[cite: 1]
exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const saved = await newPatient.save();
    sendResponse(res, 201, saved);
  } catch (err) {
    sendResponse(res, 400, null, err.message);
  }
};

// PUT /patients/:id[cite: 1]
exports.updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findOneAndUpdate(
      { patient_id: req.params.id, deleted_at: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return sendResponse(res, 404, null, 'Patient not found');
    sendResponse(res, 200, updated);
  } catch (err) {
    sendResponse(res, 400, null, err.message);
  }
};

// DELETE /patients/:id (Soft-delete)[cite: 1]
exports.deletePatient = async (req, res) => {
  try {
    const softDeleted = await Patient.findOneAndUpdate(
      { patient_id: req.params.id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
    if (!softDeleted) return sendResponse(res, 404, null, 'Patient not found');
    sendResponse(res, 200, { message: 'Patient soft-deleted successfully' });
  } catch (err) {
    sendResponse(res, 500, null, err.message);
  }
};