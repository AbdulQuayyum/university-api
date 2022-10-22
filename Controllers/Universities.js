const path = require('path')
const ErrorResponse = require("../Utilities/ErrorResponse")
const AsyncHandler = require("../Middlewares/Async")
const University = require("../Models/University")

// @description        Get all universitys
// @route              Get /api/v1/Universities
// @access             Public
exports.getAllUniversities = AsyncHandler(async (req, res, next) => {
    const university = await University.find();
    res.status(200).json({ success: true, count: university.length, data: university })
})

// @description        Get single university
// @route              Get /api/v1/Universities/:id
// @access             Public
exports.getUniversity = AsyncHandler(async (req, res, next) => {
    const university = await University.findById(req.params.id)

    if (!university) {
        return next(new ErrorResponse(`University with id ${req.params.id} not found`, 404))
    }
    res.status(200).json({ success: true, data: university })
})

// @description        create a new university
// @route              POST /api/v1/Universities
// @access             Private
exports.createUniversity = AsyncHandler(async (req, res, next) => {
    const university = await University.create(req.body)
    res.status(201).json({
        success: true,
        data: university
    })
})

// @description        Update a university
// @route              PUT /api/v1/Universities/:id
// @access             Private
exports.updateUniversity = AsyncHandler(async (req, res, next) => {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!university) {
        return next(new ErrorResponse(`University with id ${req.params.id} not found`, 404))
    }
    res.status(200).json({ success: true, data: university })
})

// @description        Delete a university
// @route              DELETE /api/v1/Universities/:id
// @access             Private
exports.deleteUniversity = AsyncHandler( async (req, res, next) => {
    const university = await University.findByIdAndDelete(req.params.id)
    if (!university) {
        return next(new ErrorResponse(`University with id ${req.params.id} not found`, 404))
    }
    res.status(200).json({ success: true, data: {} })
})