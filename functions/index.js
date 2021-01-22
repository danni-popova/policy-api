const functions = require("firebase-functions");
const app = require("express")();

const {
  getPolicies,
  getPolicyByID,
  createPolicy,
  deletePolicy,
  updatePolicy,
} = require("./APIs/policies");

// Get a policy by ID
app.get("/policy/:policyId", getPolicyByID);

// Get a list of policies
app.get("/policy", getPolicies);

// List policies with filters
app.post("/policy", createPolicy);

// Delete a policy by ID
app.delete("/policy/:policyId", deletePolicy);

// Update a policy by ID
app.put("/policy/:policyId", updatePolicy);

exports.api = functions.https.onRequest(app);
