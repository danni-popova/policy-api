const functions = require("firebase-functions");
const app = require("express")();

const {
  getPolicy,
  createPolicy,
  deletePolicy,
} = require("./APIs/policies");

// Get a policy by ID
app.get("/policy", getPolicy);

// List policies with filters
app.post("/policy", createPolicy);

// Delete a policy by ID
app.delete("/policy/:policyId", deletePolicy);

// Update a policy by ID
app.update("/policy/:policyId", updatePolicy);

exports.api = functions.https.onRequest(app);
