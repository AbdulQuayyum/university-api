const express = require('express')
const { getAllUniversities, getUniversity, createUniversity, updateUniversity, deleteUniversity } = require('../Controllers/Universities')

const Router = express.Router()

Router
    .route("/")
    .get(getAllUniversities)
    .post(createUniversity)

Router
    .route("/:id")
    .get(getUniversity)
    .put(updateUniversity)
    .delete(deleteUniversity)

module.exports = Router