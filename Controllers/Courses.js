const ErrorResponse = require("../Utilities/ErrorResponse")
const AsyncHandler = require("../Middleware/Async")
const Course = require("../Models/Courses")

// @description        Get all courses
// @route              Get /api/v1/Courses
// @access             Public
exports.getAllCourses = AsyncHandler(async (req, res, next) => {
    const course = await Course.find();
    res.status(200).json({ success: true, count: course.length, data: course })
})

// @description        Get single course
// @route              Get /api/v1/Courses/:id
// @access             Public
exports.getCourses = AsyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)

    if (!course) {
        return next(new ErrorResponse(`Course with id ${req.params.id} not found`, 404))
    }
    res.status(200).json({ success: true, data: course })
})

// @description        create a new course
// @route              POST /api/v1/Courses
// @access             Private
exports.createCourse = AsyncHandler(async (req, res, next) => {
    const course = await Course.create(req.body)
    res.status(201).json({
        success: true,
        data: course
    })
})

// @description        Update a course
// @route              PUT /api/v1/Courses/:id
// @access             Private
exports.updateCourse = AsyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!course) {
        return next(new ErrorResponse(`Course with id ${req.params.id} not found`, 404))
    }
    res.status(200).json({ success: true, data: course })
})

// @description        Delete a course
// @route              DELETE /api/v1/Courses/:id
// @access             Private
exports.deleteCourse = AsyncHandler( async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
        return next(new ErrorResponse(`Course with id ${req.params.id} not found`, 404))
    }
    res.status(200).json({ success: true, data: {} })
})