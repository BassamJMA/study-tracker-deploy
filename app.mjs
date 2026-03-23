import express from "express";
import mongoose from "mongoose";
import { Course } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studytracker";

app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("MongoDB connection error:", err);
	});

app.get("/", (req, res) => {
	res.send(`
		<h1>Study Tracker</h1>
		<p><a href="/courses/create">Create a New Course</a></p>
		<p><a href="/courses">View All Courses</a></p>
	`);
});

app.get("/courses/create", (req, res) => {
	res.send(`
		<h1>Create Course</h1>
		<form method="POST" action="/courses/create">
			<div>
				<label for="title">Course Name:</label>
				<input id="title" name="title" type="text" required>
			</div>
			<br>
			<div>
				<label for="semester">Semester:</label>
				<input id="semester" name="semester" type="text" required>
			</div>
			<br>
			<button type="submit">Create Course</button>
		</form>
		<br>
		<p><a href="/courses">View All Courses</a></p>
		<p><a href="/">Home</a></p>
	`);
});

app.post("/courses/create", async (req, res) => {
	try {
		const { title, semester } = req.body;

		if (!title || !semester) {
			return res.status(400).send(`
				<h1>Error</h1>
				<p>Both Course Name and Semester are required.</p>
				<p><a href="/courses/create">Go Back</a></p>
			`);
		}

		await Course.create({
			title,
			semester,
			assignments: [],
			studySessions: [],
			createdAt: new Date()
		});

		res.redirect("/courses");
	} catch (err) {
		res.status(500).send(`
			<h1>Server Error</h1>
			<p>Could not create course.</p>
			<p><a href="/courses/create">Try Again</a></p>
		`);
	}
});

app.get("/courses", async (req, res) => {
	try {
		const courses = await Course.find().sort({ createdAt: -1 });

		const courseItems = courses.map((course) => {
			return `
				<li>
					<strong>${course.title}</strong> - ${course.semester}
				</li>
			`;
		}).join("");

		res.send(`
			<h1>All Courses</h1>
			${courses.length === 0 ? "<p>No courses yet.</p>" : `<ul>${courseItems}</ul>`}
			<p><a href="/courses/create">Create a New Course</a></p>
			<p><a href="/">Home</a></p>
		`);
	} catch (err) {
		res.status(500).send(`
			<h1>Server Error</h1>
			<p>Could not load courses.</p>
			<p><a href="/">Home</a></p>
		`);
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});