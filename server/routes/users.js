const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ mesage: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send({ message: "Email del usuario existe" });
    const salt = await bcrypt.genSalt(Number(proccess.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Usuario creado con exito" });
  } catch (error) {
    res.status(500).send({ message: "Error interno del servidor" });
  }
});
module.exports = router;
