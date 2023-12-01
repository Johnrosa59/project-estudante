const express = require("express");
const port = 4000;
const uuid = require("uuid");

const app = express();

const students = [];

app.use(express.json());

const checkStudentId = (req, res, next) => {
  const { id } = req.params;

  const index = students.findIndex((student) => student.id === id);

  if (index < 0) {
    return res.status(404).json({ error: "User not found" });
  }

  req.studentId = id;
  req.studentIndex = index;

  next();
};

// To List Students
app.get("/students", (req, res) => {
  return res.status(200).json(students);
});

//To Add Students
app.post("/students", (req, res) => {
  const { nameOfStudent, age, responsibleTeacher, room } = req.body;

  const addStudent = {
    id: uuid.v4(),
    nameOfStudent,
    age,
    responsibleTeacher,
    room,
  };

  students.push(addStudent);

  return res.status(201).json(addStudent);
});

// To Update Student
app.put("/students/:id", checkStudentId, (req, res) => {
  const { id } = req.studentId;
  const { index } = req.studentIndex;
  const { nameOfStudent, age, responsibleTeacher, room } = req.body;

  const updateStudent = { id, nameOfStudent, age, responsibleTeacher, room };

  students[index] = updateStudent;

  return res.status(200).json(updateStudent);
});

//To Delete Student
app.delete("/students/:id", checkStudentId, (req, res) => {
  const { index } = req.studentIndex;

  students.splice(index, 1);

  return res.status(200).json(students);
});

//To Update A Part Of Itens
app.patch("/students/:id", checkStudentId, (req, res) => {
  const { id } = req.studentId;
  const { index } = req.studentIndex;
  const { nameOfStudent, age, responsibleTeacher, room } = req.body;

  const patchStudentUpdate = {
    id,
    nameOfStudent,
    age,
    responsibleTeacher,
    room,
    Checked: "Conferido, Ok",
  };

  students[index] = patchStudentUpdate;

  return res.status(200).json(patchStudentUpdate);
});

//To List One Student
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const index = students.findIndex((student) => student.id === id);

  if (index < 0) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(students[index]);
});

app.listen(port, () => {
  console.log("🚀 Server started on port 4000");
});
