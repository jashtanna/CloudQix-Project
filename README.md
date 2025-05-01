#  Dynamic Mapping Microservice (Go + Gin)

This is a lightweight microservice built in **Golang** using the **Gin web framework**, designed to map fields from a dynamic JSON payload based on a user-provided mapping structure.

---

##  Purpose

 Transform any incoming JSON using a flexible key-to-path mapping
 Support nested JSON traversal (e.g., `"user.profile.email"`)
Provide a clean REST API for frontend/backend integration
Enable CORS for local development

---

##  API Endpoint

## `POST /handle-dynamic-mapping`

## Request Body

## key componenet ::
Controller: HandleDynamicMapping Handles incoming requests Validates JSON body Calls the service layer to apply the mapping Returns mapped 

## Service: ProcessMapping / MapFields
Traverses nested keys using dot notation
Extracts values safely
Builds a new JSON object based on the mapping

 ## CORS Middleware
Allows requests from http://localhost:3000 (for frontend dev)
Supports credentials, standard headers & methods
Ensures smooth frontend-backend communication

##Running the Project
go run main.go


```json
{
  "request_json": {
    "user": {
      "profile": {
        "email": "abc@example.com"
      }
    }
  },
  "request_mapping": {
    "email": "user.profile.email"
  }
}

## response 
{
  "email": "abc@example.com"
}
```

# CloudQix JSON Mapping Tool – Frontend (React)

This is a clean and minimal React-based frontend that interacts with a backend microservice to perform dynamic JSON key-path mapping. The app allows users to upload or paste raw JSON data and a corresponding mapping, then processes and displays the mapped result in real time.

---

## Key Features

- Upload and parse `.json` files directly
- CodeMirror editor for structured editing and better readability
- Real-time validation of JSON input
- POST request to backend for dynamic key-path mapping
- Output viewer with formatted JSON display
- Friendly error handling and clear messages

---
## Core Components

### 1. `mapJSONData` (in `api/index.js`)
Handles the API request:
- Accepts two objects: `requestJSON` and `requestMapping`
- Sends a `POST` request to `http://localhost:8080/api/v1/map-json`
- Returns the mapped result or throws an error

### 2. `JSONMapping` Component
Main logic and UI:
- Takes input JSON and mapping JSON as string
- Validates JSON structure before API call
- Uses state to track inputs, results, and errors
- Displays mapped response using `MappedOutput`

### 3. `MappedOutput` Component
- Accepts and renders final mapped JSON in a formatted `pre` block
- Uses `JSON.stringify(data, null, 2)` for neat presentation

### 4. (Optional) `JSONEditor` Component
- Uses `react-codemirror2` for enhanced input experience
- Supports drag-and-drop file parsing for `.json` files
- Currently not wired in `App.js`, but useful for improved UX

---

## How It Works

1. User pastes or uploads the `request JSON`
2. User provides a `request mapping` structure (e.g. `"email": "user.profile.email"`)
3. On clicking "Map JSON":
   - Input is validated
   - If valid, the backend service is called with both payloads
   - Mapped result is shown below the button

---

## Running the App

1. Make sure the backend service is running on port `8080`
2. Start the React app:

## powershell::

npm install
npm start


