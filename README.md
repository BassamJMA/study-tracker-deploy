
# Study Tracker

## Overview

Study Tracker is a web application designed to help students organize their academic workload and monitor their study habits. Users can create courses for the classes they are taking, add assignments associated with those courses, and log study sessions to track how much time they spend studying.

The goal of the application is to provide students with a simple tool for managing coursework and staying organized throughout the semester. By tracking assignments and study sessions, students can better understand their study patterns and prepare more effectively for exams and deadlines.

---

# Data Model

The application will store **Users, Courses, Assignments, and StudySessions**.

Relationships between these entities:

* Users can have multiple courses (via references)
* Each course can have multiple assignments
* Each course can have multiple study sessions

Users own their courses, and all assignments and study sessions are associated with a course.

---

# Sample Documents

### Example User

```javascript
{
  username: "student123",
  hash: // password hash
  courses: [ObjectId("course1"), ObjectId("course2")]
}
```

This represents a registered user of the application.

---

### Example Course

```javascript
{
  user: ObjectId("userId"),
  title: "Operating Systems",
  semester: "Spring 2026",
  createdAt: Date
}
```

This represents a course created by a user.

---

### Example Assignment

```javascript
{
  course: ObjectId("courseId"),
  title: "Homework 3",
  dueDate: Date,
  completed: false
}
```

Assignments belong to a specific course and track deadlines and completion status.

---

### Example Study Session

```javascript
{
  course: ObjectId("courseId"),
  date: Date,
  durationMinutes: 90,
  notes: "Reviewed lecture slides"
}
```

Study sessions represent blocks of time spent studying for a course.

---

## [Link to Commented First Draft Schema](db.js)

The first draft schema will define the MongoDB models for:

* Users
* Courses
* Assignments
* StudySessions

These schemas will be implemented in **db.js** using Mongoose.

Example draft schema:

```javascript
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
```

---

# Wireframes

The application will include the following pages.

---

### `/courses/create`

Page for creating a new course.

Users can input:

* Course name
* Semester

![Create Course](documentation/list-create.png)

---

### `/courses`

Page for showing all courses created by the user.

Example layout:

```
Courses

Operating Systems
Mathematics of Finance
Numerical Analysis

Create a New Course
```

![Courses Page](documentation/list.png)

---

### `/courses/:id`

Page for showing a specific course.

Example layout:

```
Operating Systems

Assignments
Homework 3
Lab 4

Study Sessions
March 10 — 90 minutes
March 11 — 60 minutes

Add Assignment
Log Study Session
```

![Course Detail](documentation/list-slug.png)

---

# Site Map

```
Home
 ├── Courses
 │    └── Course Detail
 ├── Create Course
 ├── Add Assignment
 └── Log Study Session
```

---

# User Stories or Use Cases

1. As a student, I want to create courses so that I can organize my classes.

2. As a student, I want to add assignments to courses so that I can track upcoming deadlines.

3. As a student, I want to log study sessions so that I can track how much time I spend studying.

4. As a student, I want to mark assignments as completed so that I know which work is finished.

5. As a student, I want to view all of my courses and assignments so that I stay organized throughout the semester.

---

# Research Topics

Total: **10 points**

### (3 points) Jest Unit Testing

Jest is a JavaScript testing framework used to write automated tests for application logic and route handlers. It will be used in this project to test important functionality such as course creation and assignment management.

Possible solutions:

* Jest
* Mocha
* Jasmine

---

### (3 points) Chart.js

Chart.js is a JavaScript library used for creating charts and graphs. It will be used to visualize study session data, allowing users to see how much time they spend studying per course.

Possible solutions:

* Chart.js
* D3.js
* Google Charts

---

### (2 points) Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows rapid development of responsive interfaces. It will be used to design the user interface of the Study Tracker application.

Possible solutions:

* Tailwind CSS
* Bootstrap
* Semantic UI

---

### (2 points) Day.js

Day.js is a lightweight JavaScript library for working with dates and times. It will be used to manage assignment deadlines and study session timestamps.

Possible solutions:

* Day.js
* Moment.js

---

# [Link to Initial Main Project File](app.mjs)

The initial Express skeleton application will be located in:

```
app.mjs
```

Example skeleton:

```javascript
import express from "express";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.send("Study Tracker");
});

app.listen(3000);
```

---

# Annotations / References Used

1. Express.js Documentation
   [https://expressjs.com/](https://expressjs.com/)

2. MongoDB / Mongoose Documentation
   [https://mongoosejs.com/](https://mongoosejs.com/)

3. Chart.js Documentation
   [https://www.chartjs.org/](https://www.chartjs.org/)

4. Tailwind CSS Documentation
   [https://tailwindcss.com/](https://tailwindcss.com/)


