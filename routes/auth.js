const experss = require("express");
const route = experss.Router();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SEC_KEY } = require("../config/key");
const User = mongoose.model("User");


route.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ err: "Please fill all fields" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
      
        return res.json({ err: "User Already exist" });
      }
      bycrypt.hash(password, 12)
      .then((hashpassword) => {
          const urs1 = new User({
           name,
           email,
           password: hashpassword,
           
         });      
          urs1
            .save()
            .then(() => {
              res.json({ message: "User saved" });
            })
            .catch((err) => {
              console.log(err);
            });
       
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

route.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      err: "Please add email or password",
    });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        bycrypt
          .compare(password, savedUser.password)
          .then((doMatch) => {
            if (doMatch) {
              const token = jwt.sign({ _id: savedUser._id }, JWT_SEC_KEY);
              const { _id, name, email } = savedUser;
              res.json({
                token,
                user: {
                  _id,
                  name,
                  email,
               
                },
              });
            } else {
              return res.json({
                err: "Wrong email or passWord",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.json({
          err: "Wrong email or passWord",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = route;
