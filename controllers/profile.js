const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where("id", id)
    .then((user) => {
      if (user.length <= 0) {
        res.status(400).json("Not Found");
      } else {
        res.json(user[0]);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("error getting user.");
    });
};

export default handleProfileGet;
