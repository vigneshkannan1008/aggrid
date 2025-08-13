// const express = require('express');
// const router = express.Router();
// const aggridControllers = require('../controllers/aggridController');

// router.get('/get', aggridControllers.getUsers);
// router.post('/create', aggridControllers.createUser);
// router.put('/update/:regNo', aggridControllers.updateUser);
// router.delete('/delete/:regNo', aggridControllers.deleteUser);

// module.exports = router;


const express = require('express');
const router = express.Router();
const aggridControllers = require('../controllers/aggridController');

router.get('/get', aggridControllers.getUsers);
router.post('/get', aggridControllers.getUsers);
router.post('/create', aggridControllers.createUser);
router.put('/update/:regNo', aggridControllers.updateUser);
router.delete('/delete/:regNo', aggridControllers.deleteUser);

module.exports = router;