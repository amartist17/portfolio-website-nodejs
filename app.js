const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");

const upload = require("express-fileupload");
app.use(upload());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bcrypt = require("bcrypt");
const saltRounds = 10;

const PersonalDetails = require("./models/personalDetails");
const Works = require("./models/works");
const Skills = require("./models/skills");
const Teams = require("./models/teams");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

// Routes-----------------------------------------------------
app.get("/", async (req, res) => {
  const personalDetails = await PersonalDetails.findOne({
    name: "amardeep",
  });
  // const works = await Works.find({});
  let works = await Works.find({ type: "websites" });
  works = works.concat(await Works.find({ type: "certificates" }));
  works = works.concat(await Works.find({ type: "hobby" }));
  works = works.concat(await Works.find({ type: "others" }));
  // console.log(works);
  const skills = await Skills.find({});
  const team = await Teams.find({});

  res.render("index", {
    obj: personalDetails,
    works: works,
    skills: skills,
    team: team,
  });
});

app.post("/contact", async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "mail.amardeepsingh.tech",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAILID, // generated ethereal user
        pass: process.env.EMAILPASSWORD, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAILID, // sender address
      to: "gujraal2006@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      text: "By: " + req.body.senderMail + "\n" + req.body.msgBody + "", // plain text body
    });
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

app.get("/downloadCV", async (req, res) => {
  res.download(path.join(__dirname, "static/CV/Amardeep CV.pdf"));
});
// login and dashboard
app.get("/login", async (req, res) => {
  // bcrypt.hash("t74g75a01a06a74", saltRounds, function (err, hash) {
  //   console.log(hash);
  // });
  res.render("login");
});
app.post("/login", async (req, res) => {
  bcrypt.compare(
    req.body.password,
    process.env.PASSWORD,
    function (err, result) {
      if (result) {
        res.cookie("user", process.env.EMAIL);
        res.redirect("/dashboard");
      } else {
        res.send("incorrect password");
      }
    }
  );
  // if(req.body.password == )
});
app.get("/dashboard", async (req, res) => {
  try {
    if (req.cookies.user == process.env.EMAIL) {
      let personalDetails = await PersonalDetails.findOne({
        name: "amardeep",
      }).select("-_id -__v -name");
      personalDetails = personalDetails.toObject();
      let types = ["websites", "certificates", "hobby", "others"];
      res.render("dashboard-home", { obj: personalDetails, types: types });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// app.post("/upload", async (req, res) => {
//   const newDetails = await PersonalDetails.create(req.body);
//   // const newWork = await Works.create(req.body);
//   console.log(req.body);
//   res.send("ok");
// });

app.post("/updatePersonalInfo", async (req, res) => {
  try {
    if (req.cookies.user == process.env.EMAIL) {
      // const newDetails = await PersonalDetails.findOneAndUpdate(req.body);
      for (var key in req.body) {
        if (req.body[key] == "") {
          delete req.body[key];
        }
      }
      console.log(req.body);
      PersonalDetails.findOneAndUpdate(
        { name: process.env.NAME },
        req.body,
        null,
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("verified");
          }
        }
      );
      res.send("ok");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

app.post("/updateWorks", async (req, res) => {
  try {
    if (req.cookies.user == process.env.EMAIL) {
      console.log(req.body);
      if (req.files) {
        let file = req.files.file;
        const extensionName = path.extname(file.name); // fetch the file extension
        const allowedExtension = [".png", ".jpg", ".jpeg"];

        if (!allowedExtension.includes(extensionName)) {
          return res.status(422).send("Invalid Extension");
        }

        const location =
          "works/" + req.body.type + "/" + req.body.name + extensionName;

        let noErrors = true;
        file.mv(path.join(__dirname, "/static", location), function (err) {
          if (err) {
            noErrors = false;
            console.log(err);
            return res.status(500).send(err);
          }
        });

        if (noErrors) {
          delete req.body.file;
          req.body.filename = req.body.name + extensionName;
          const newWork = await Works.create(req.body);
        }

        res.redirect("/dashboard");
      } else {
        res.redirect("/dashboard");
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

app.post("/updateSkills", async (req, res) => {
  try {
    if (req.cookies.user == process.env.EMAIL) {
      console.log(req.body);
      const newSkill = await Skills.create(req.body);
      res.send("ok");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

app.post("/uploadCV", async (req, res) => {
  try {
    if (req.cookies.user == process.env.EMAIL) {
      if (req.files) {
        let file = req.files.file;
        const extensionName = path.extname(file.name); // fetch the file extension
        const allowedExtension = [".pdf"];

        if (!allowedExtension.includes(extensionName)) {
          return res.status(422).send("Invalid Extension");
        }

        let noErrors = true;
        file.mv(
          path.join(__dirname, "/static/CV/Amardeep CV.pdf"),
          function (err) {
            if (err) {
              noErrors = false;
              console.log(err);
              return res.status(500).send(err);
            }
          }
        );

        // if (noErrors) {
        //   req.body.filename = req.body.name + extensionName;

        // }

        res.send("ok");
      } else {
        res.redirect("/dashboard");
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

app.post("/updateTeams", async (req, res) => {
  try {
    if (req.cookies.user == process.env.EMAIL) {
      if (req.files) {
        console.log(req.body);
        let image = req.files.image;
        let bg = req.files.background;
        const imageExtensionName = path.extname(image.name); // fetch the file extension
        const bgExtensionName = path.extname(bg.name); // fetch the file extension

        const allowedExtension = [".png", ".jpg", ".jpeg"];

        if (
          !allowedExtension.includes(imageExtensionName) &&
          !allowedExtension.includes(bgExtensionName)
        ) {
          return res.status(422).send("Invalid Extension");
        }

        const imageLocation =
          "team/image/" + "/" + req.body.name + imageExtensionName;
        const backgroundLocation =
          "team/background/" + "/" + req.body.name + bgExtensionName;
        let noErrors = true;
        image.mv(
          path.join(__dirname, "/static", imageLocation),
          function (err) {
            if (err) {
              noErrors = false;
              console.log(err);
              return res.status(500).send(err);
            }
          }
        );
        bg.mv(
          path.join(__dirname, "/static", backgroundLocation),
          function (err) {
            if (err) {
              noErrors = false;
              console.log(err);
              return res.status(500).send(err);
            }
          }
        );

        if (noErrors) {
          delete req.body.file;
          req.body.image = req.body.name + imageExtensionName;
          req.body.background = req.body.name + bgExtensionName;

          const newTeam = await Teams.create(req.body);
        }

        res.redirect("/dashboard");
      } else {
        res.redirect("/dashboard");
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

app.post("/uploadProfilePhoto", async (req, res) => {
  try {
    if (req.cookies.user == process.env.EMAIL) {
      if (req.files) {
        let file = req.files.file;
        const extensionName = path.extname(file.name); // fetch the file extension
        const allowedExtension = [".png"];

        if (!allowedExtension.includes(extensionName)) {
          return res.status(422).send("Invalid Extension");
        }

        file.mv(
          path.join(__dirname, "/static/images/profile.png"),
          function (err) {
            if (err) {
              return res.status(500).send(err);
            }
          }
        );

        res.send("ok");
      } else {
        res.redirect("/dashboard");
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});
module.exports = app;

// {
//   "nameShown": "Amardeep S.",
//   "homePara": "I'm a web designer & front‑end developer focused on crafting clean & user‑friendly experiences, I am passionate about building excellent software that improves the lives of those around me.",
//   "address": "India, UP.",
//   "languages": "English, Hindi.",
//   "phone": "+91 9540688854",
//   "email": "gujraal2006@gmail.com",
//   "yearsOfExp": "2",
//   "projects": "5",
//   "customers": "5",
//   "certificates": "12",
//   "skills": [
//     {
//       "html":90
//     },
//     {
//       "html":90
//     },
//     {
//       "html":90
//     },
//     {
//       "html":90
//     },
//     {
//       "html":90
//     },
//     {
//       "html":90
//     },
//     {
//       "html":90
//     },
//     {
//       "html":90
//     }

//   ]
// }
