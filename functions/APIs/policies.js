const {db} = require("../util/admin");

const policyCollection = "policies";

exports.getPolicy = (request, response) => {
  db
      .collection(policyCollection)
      .orderBy("created_at", "desc")
      .get()
      .then((data) => {
        const policies = [];
        data.forEach((doc) => {
          policies.push({
            body: doc.data(),
          });
        });
        return response.json(policies);
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

}