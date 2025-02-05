const { Course } = require('../models/course');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}
async function addCourse(req, res) {
    try {
        const name = req.body.name;
        const code = req.body.code;

        // Validate course code format: exactly 3 digits
        const codeRegex = /^\d{3}$/;
        if (!codeRegex.test(code)) {
            return res.status(500).json({ message: 'Validation error: Course code must be exactly 3 digits' });
        }

        // Add new course
        const newCourses = new Course(name, code);
        const updatedCourses = await writeJSON(newCourses, 'utils/courses.json');
        return res.status(201).json(updatedCourses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, addCourse
};