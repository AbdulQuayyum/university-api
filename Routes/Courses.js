const express = require('express')
const { getAllCourses, getCourses, createCourse, updateCourse, deleteCourse } = require('../Controllers/Courses')

const Router = express.Router()

Router
    .route("/")
    .get(getAllCourses)
    .post(createCourse)

Router
    .route("/:id")
    .get(getCourses)
    .put(updateCourse)
    .delete(deleteCourse)

module.exports = Router