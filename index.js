const express = require("express");
const port = 4000;
const uuid = require("uuid");
const cors = require("cors")

const app = express();

app.use(cors())

const students = [];

app.use(express.json());

const checkStudentId = (request, response, next) => {
  const { id } = request.params;

  const index = students.findIndex((student) => student.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "user not found" });
  }

  request.studentIndex = index;
  request.studentId = id;

  next();
};

// To List Students
app.get("/students", (request, response) => {
  return response.status(200).json(students);
});

//To Add Students
app.post("/students", (request, response) => {
  try {
    const { nameOfStudent, age, responsibleTeacher, room } = request.body;

    const addStudent = {
      id: uuid.v4(),
      nameOfStudent,
      age,
      responsibleTeacher,
      room,
    };

    students.push(addStudent);

    return response.status(201).json(addStudent);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// To Update Student
app.put("/students/:id", checkStudentId, (request, response) => {
  const { nameOfStudent, age, responsibleTeacher, room } = request.body;
  const index = request.studentIndex;
  const id = request.studentId;

  const updateStudent = { id, nameOfStudent, age, responsibleTeacher, room };

  students[index] = updateStudent;

  return response.status(200).json(updateStudent);
});

//To Delete Student
app.delete("/students/:id", checkStudentId, (request, response) => {
  const index = request.studentIndex;

  students.splice(index, 1);

  return response.status(200).json(students);
});

//To Update A Part Of Itens
app.patch("/students/:id", checkStudentId, (request, response) => {
  const id = request.studentId;
  const index = request.studentIndex;
  const { nameOfStudent, age, responsibleTeacher, room } = request.body;

  const patchStudentUpdate = {
    id,
    nameOfStudent,
    age,
    responsibleTeacher,
    room,
    Checked: "Conferido, Ok",
  };

  students[index] = patchStudentUpdate;

  return response.status(200).json(patchStudentUpdate);
});

//To List One Student
app.get("/students/:id", checkStudentId, (request, response) => {
  const id = request.studentId;
  const index = request.studentIndex;

  return response.status(200).json(students[index]);
});

app.listen(port, () => {
  console.log("🚀 Server started on port 4000");
});
