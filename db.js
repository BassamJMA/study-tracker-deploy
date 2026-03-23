import mongoose from "mongoose";

const StudySessionSchema = new mongoose.Schema({
	date: {
		type: Date
	},
	durationMinutes: {
		type: Number
	},
	notes: {
		type: String
	}
});

const AssignmentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	dueDate: {
		type: Date
	},
	completed: {
		type: Boolean,
		default: false
	}
});

const CourseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	semester: {
		type: String,
		required: true
	},
	assignments: [AssignmentSchema],
	studySessions: [StudySessionSchema],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export const Course = mongoose.model("Course", CourseSchema);