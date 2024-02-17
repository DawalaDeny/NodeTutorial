const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middleware/authentication')
const {getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword } = require ('../controllers/userController')

//router.route('/').get(authenticateUser, getAllUsers) <-- alternatief
router.get('/', authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers)
router.patch('/updateUser', authenticateUser, updateUser)
router.post('/updateUserPassword',authenticateUser, updateUserPassword)
router.get('/showMe',authenticateUser, showCurrentUser)
router.get('/:id',authenticateUser, getSingleUser)

module.exports = router;