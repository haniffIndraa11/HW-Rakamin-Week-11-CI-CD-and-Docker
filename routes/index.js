const express = require("express");
const route = require('express').Router()
const todoRoute = require('./todo')
const path = require('path')

route.use('/api/todo', todoRoute)

module.exports = route

// Error saat melakukan docker compose up, jadinya image yg dibuat tidak mau run

// Jadi saya hanya melakukan unit testing menggunakan Jest dan proses CI/CD