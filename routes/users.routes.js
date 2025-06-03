const express = require("express")
const usersController = require("../controllers/users.controller")
const router = express.Router();


router.post('/users/login', usersController.loginUser)
router.delete("/users/:id", usersController.deleteUser)
router.get("/users", usersController.getAllUsers)
router.get('/users/:id', usersController.getUserById)
router.put('/users/:id', usersController.updateUser)
router.post('/users', usersController.createUser)


module.exports = router;