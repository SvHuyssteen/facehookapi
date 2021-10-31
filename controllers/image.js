import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "340926e7cb97499d9aa6aab7aa80529e",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("unable to work with api");
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries);
    })
    .catch((err) => {
      res.status(400).json("unable to get entries");
    });
};

export { handleImage, handleApiCall };
