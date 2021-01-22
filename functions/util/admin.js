const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// To use emulator and test locally
// db.useEmulator("localhost", 8080);

module.exports = {admin, db};
