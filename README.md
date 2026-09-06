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

## How to Test the System

You can test the Voice AI Patient Registration System using the steps below.

1. Dial the provisioned Vapi phone number: **`+1 (563) 279-1205`**
2a. **Test Scenario A — New Patient Intake:**
   * Provide a new phone number when prompted.
   * Complete the voice intake (Name, Date of Birth, Address, Sex).
   * Confirm details when prompted to trigger the `createPatient` API call and persist the record to MongoDB.
2b. **Test Scenario B — Profile Lookup & Partial Update:**
   * Call back using the same phone number or state the previously registered number.
   * The assistant executes `getPatientByPhone`, detects the active record, and confirms your profile.
   * Request an update to a single field (e.g., *"Change my last name to Smith"*).
   * The assistant invokes `updatePatient` with sanitized inputs, updating only the specified field while leaving all other profile data intact.

---

## Vapi Tool Integrations

The Voice AI assistant interacts with the backend via 5 dedicated tool functions mapped to Express API routes and native system controls:

### 1. `serverHealthCheck`
* **HTTP Method:** `GET`
* **Route:** `/health`
* **Description:** Pings the backend service during call initialization to wake up cloud compute nodes (Render) from cold starts and verify MongoDB connectivity.

### 2. `getPatientByPhone`
* **HTTP Method:** `GET`
* **Route:** `/api/patients/phone/:phone`
* **Description:** Queries MongoDB using 10-digit phone number matching to identify existing patient profiles during caller verification.

### 3. `createPatient`
* **HTTP Method:** `POST`
* **Route:** `/api/patients`
* **Description:** Registers a new patient record in the database after the caller confirms intake demographic details. Includes active duplicate phone protection.

### 4. `updatePatient`
* **HTTP Method:** `PUT`
* **Route:** `/api/patients/:id`
* **Description:** Performs sanitized partial updates on an existing patient record by `patient_id`. Filters out empty strings and null keys to prevent overwriting unchanged profile data.

### 5. `endCall`
* **Type:** Vapi Native System Tool
* **Route:** `N/A`
* **Description:** Instructs Vapi to deliver the final spoken farewell message and gracefully terminate the active phone call session.

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
   git clone https://github.com/Ibrahim7333/Voice-AI-Patient-Registration-System.git

2. **Install Dependencies:**
   ```bash
   npm install

3. **Configure environment variables:**
   Create a .env file in the root directory with the following variables:
   * PORT
   * MONGODB_URI

4. **Run:**
   ```bash
   npm run dev
