const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const Submit = require("./modles/scorecard");
const port = process.env.PORT || 3000;
// console.log(path.join(__dirname, "../public"));
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const images_path = path.join(__dirname, "../images")

app.use(express.static(__dirname + '../images'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
require("./db/conn");


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/marks", (req, res) => {
    res.render("marks");
});
app.get("/search", (req, res) => {
    res.render("search");
});
app.get("/grade", (req, res) => {
    res.render("grade");
});

app.post("/submit", async (req, res) => {
    try {
        const roll = req.body.roll;
        const roll1 = req.body.roll;

        if (roll === roll1) {
            const registerEmployee = new Submit({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                class: req.body.class,
                roll: req.body.roll,
                address: req.body.address,
                english: req.body.english,
                hindi: req.body.hindi,
                maths: req.body.maths,
                science: req.body.science,
                sst: req.body.sst,

            })
            const registered = await registerEmployee.save();
            res.status(201).render("uploaded");
            //res.status(201).render("register");
        } else {
            res.send("passwords are not matching")
        }
    } catch (error) {
        res.status(400).render("already");
    }
});


app.post("/search", async (req, res) => {
    try {

        const roll = req.body.roll;
        //const password = req.body.password;
        const studentroll = await Submit.findOne({ roll: roll })
        // const studentroll = await Submit.findOne({firstname:firstname})
        console.log(`${studentroll.roll}`)
        const avg = ((parseInt(studentroll.hindi) + parseInt(studentroll.english) + parseInt(studentroll.maths) + parseInt(studentroll.science) + parseInt(studentroll.sst)) / 5)
        console.log(avg)
        var grade = '';
        if (avg > 90) {
            grade = 'A'
        } else if (avg > 80) {
            grade = 'B'
        } else if (avg > 70) {
            grade = 'C'
        } else if (avg > 60) {
            grade = 'D'
        } else if (avg > 50) {
            grade = 'E'
        } else {
            grade = 'FAIL'
        }
        console.log(grade)
        if (studentroll.roll == roll) {
            res.status(201).render("grade", {
                firstname: studentroll.firstname,
                lastname: studentroll.lastname,
                class: studentroll.class,
                roll: studentroll.roll,
                address: studentroll.address,
                english: studentroll.english,
                hindi: studentroll.hindi,
                maths: studentroll.maths,
                science: studentroll.science,
                sst: studentroll.sst,
                avg: avg,
                grade: grade,

            }
            )
            //res.status(201).send(`${studentroll.firstname}`);

        } else {
            res.send("invalid credentials")
        }
    } catch (error) {
        res.status(400).render("norecord");
    }
});



app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
