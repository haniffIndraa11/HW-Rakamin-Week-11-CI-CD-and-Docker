const express = require("express");
const route = require('express').Router()
const todoRoute = require('./todo')
const path = require('path')

route.use('/api/todo', todoRoute)

module.exports = route