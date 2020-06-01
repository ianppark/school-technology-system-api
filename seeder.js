const faker = require('faker');
const connectDB = require('./config/db');
const Student = require('./Models/Student');
const colors = require('colors');

const genFakeStudents = count => {
  const fakeStudents = [];

  for (let i = 0; i < count; i++) {
    fakeStudents.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      emailAddress: faker.internet.email(),
      classOf: Math.floor(Math.random() * (2033 - 2020)) + 2020,
      password: faker.internet.password(),
      studentNumber: faker.random.uuid(),
    });
  }

  return fakeStudents;
};

const importStudents = async students => {
  try {
    await Student.create(students);
    console.log(`Students imported...`);
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(0);
  }
};

const deleteStudents = async () => {
  try {
    await Student.deleteMany();
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(0);
  }
};

const main = () => {
  connectDB();

  if (process.argv[2] === '-i') {
    const fakeStudents = genFakeStudents(20);
    console.log(fakeStudents);
    importStudents(fakeStudents);
  } else if (process.argv[2] === '-d') {
    deleteStudents();
  }
};

main();
