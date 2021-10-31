const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  //set up hasing for creation of the user password

  const hash = bcrypt.hashSync(password);

  //create a transaction
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((Loginemail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to register"));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
  //send response from the new user created to the frontend for confirmation.
};

export default handleRegister;
