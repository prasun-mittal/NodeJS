const express = require('express');
const router = express.Router();
const { handleAllUsers,handlegetUserById,handleUpdateUserbyId,handleDeleteUserById,handleCreateNewUser } = require("../controllers/user");

router.route('/')
.get(handleAllUsers)
.post(handleCreateNewUser)

router.route('/:id')
.get(handlegetUserById)
.patch(handleUpdateUserbyId)
.delete(handleDeleteUserById);

module.exports = router;