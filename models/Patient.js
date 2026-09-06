const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const patientSchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: uuidv4, unique: true },
    first_name: { type: String, required: true, maxlength: 50 },
    last_name: { type: String, required: true, maxlength: 50 },
    date_of_birth: { type: Date, required: true },
    sex: { 
      type: String, 
      required: true, 
      enum: ['Male', 'Female', 'Other', 'Decline to Answer'] 
    },
    phone_number: { type: String, required: true },
    email: { type: String },
    address_line_1: { type: String, required: true },
    address_line_2: { type: String },
    city: { type: String, required: true, maxlength: 100 },
    state: { type: String, required: true, length: 2 },
    zip_code: { type: String, required: true },
    insurance_provider: { type: String },
    insurance_member_id: { type: String },
    preferred_language: { type: String, default: 'English' },
    emergency_contact_name: { type: String },
    emergency_contact_phone: { type: String },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Patient', patientSchema);