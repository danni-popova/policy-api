const {db} = require("../util/admin");

const policyCollection = "policies";

exports.getPolicies = (request, response) => {
  const limit = request.query.limit;
  const offset = request.query.offset;
  console.log(limit, offset);

  // Get actual policies by querying Firestore
  db
      .collection(policyCollection)
      .get()
      .then((data) => {
        const policies = [];
        data.forEach((doc) => {
          policies.push(doc.data());
        });
        return response.json(policies);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

exports.getPolicyByID = (request, response) => {
  db
      .doc(`/${policyCollection}/${request.params.policyId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return response.status(404).json(
              {error: "Policy not found"});
        }
        const policy = doc.data();
        policy.id = doc.id;
        return response.json(policy);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

exports.createPolicy = (request, response) => {
  const newPolicy = request.body;
  db
      .collection(policyCollection)
      .add(newPolicy)
      .then((doc)=>{
        const responsePolicy = newPolicy;
        responsePolicy.id = doc.id;
        return response.json(responsePolicy);
      })
      .catch((err)=>{
        response.status(500).json({error: "Something went wrong"});
        console.error(err);
      });
};

exports.deletePolicy = (request, response) => {
  const policy = db.doc(`/${policyCollection}/${request.params.policyId}`);
  policy
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return response.status(404).json({error: "Policy not found"});
        }
        return policy.delete();
      })
      .then(() => {
        response.json({message: "Delete successful"});
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

exports.updatePolicy = (request, response) => {
  const policy = db.doc(`/${policyCollection}/${request.params.policyId}`);

  policy.update(request.body)
      .then(()=>{
        response.json({message: "Updated successfully"});
      })
      .catch((err)=>{
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};
