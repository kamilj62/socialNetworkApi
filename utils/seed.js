// Imports
const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");

const connection = require("../config/connection");

// Seed data
const users = [
  {
    username: "cassius",
    email: "cassius@gmail.com",
    thoughts: "Cassius is a dufus",
  },
];

const thought = [
  {
    thoughtText: "cassius is a dufus",
    createdAt: Date.now,
    userName: "cassius",
  },
];

console.log(connection);

// Connects to server
connection.once("open", async () => {
  console.log("connected");

  // Drop existing students
  await User.deleteMany({});

  // Adds seed data to database
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
