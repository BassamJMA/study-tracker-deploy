import mongoose from "mongoose";

const StudySessionSchema = new mongoose.Schema({
	date: Date,
	durationMinutes: Number,
	notes: String
});

const AssignmentSchema = new mongoose.Schema({
	title: String,
	dueDate: Date,
	completed: Boolean
});

const CourseSchema = new mongoose.Schema({
	title: String,
	semester: String,
	assignments: [AssignmentSchema],
	studySessions: [StudySessionSchema],
	createdAt: Date
});

export const Course = mongoose.model("Course", CourseSchema);
