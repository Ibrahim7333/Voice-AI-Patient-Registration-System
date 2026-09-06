# Voice AI Patient Registration System (Vocalis Health)

A production-ready Voice AI Intake System built with **Node.js, Express, MongoDB (Mongoose), and Vapi**. The system handles patient onboarding, phone-based duplicate detection, partial record updates, and graceful session lifecycle management via voice commands.

---

## Live System URLs

* **Base Web API:** `https://voice-ai-patient-registration-system.onrender.com/api`
* **Health Check Endpoint:** `https://voice-ai-patient-registration-system.onrender.com/health`

---

## Core Features

* **Phone-Based Duplicate Detection:** Automatically looks up existing records by 10-digit U.S. phone numbers before creating new profiles.
* **Sanitizing Partial Updates:** Supports selective field updates (`updatePatient`) while stripping empty payloads and preserving immutable identifiers (`patient_id`, `_id`).
* **Server Cold-Start Management:** Integrated `serverHealthCheck` background ping to handle free-tier cloud hosting wake-ups without blocking voice conversations.
* **Voice Flow Guardrails:** Enforces explicit caller confirmation before committing database updates and handles emergency escalation protocol (911).

---

## Tech Stack & Architecture

* **Voice Engine:** Vapi AI (System Prompt, Dynamic Tool Calling)
* **Backend Framework:** Node.js / Express.js
* **Database:** MongoDB Atlas (Mongoose ORM)
* **Backend Hosting:** Render Cloud Platform
* **API Testing:** Postman

---

## API Reference

### Health Check
* `GET /api/health`
  * **Description:** Verifies server and database connection status. Handles standard web requests and Vapi tool ping responses.

### Patient Management
* `GET /api/patients/phone/:phone`
  * **Description:** Search active patient records by 10-digit phone number.
* `POST /api/patients`
  * **Description:** Registers a new patient record.
* `PUT /api/patients/:id`
  * **Description:** Performs a partial update on an existing patient record by `patient_id`.
* `GET /api/patients/:id`
  * **Description:** Fetch single patient details by `patient_id`.
* `GET /api/patients`
  * **Description:** Fetch all patients.`.
* `GET /api/patients/phone/:phone`
  * **Description:** Fetch single patient details by `phone_number`.
* `DELETE /api/patients/:id`
  * **Description:** Soft-delete a single patient record using `patient_id`.
---

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/voice-ai-patient-registration.git](https://github.com/your-username/voice-ai-patient-registration.git)
   cd voice-ai-patient-registration

2. **Install Dependencies:**
   ```bash
   npm install

3. **Run:**
   ```bash
   npm run dev
