const express = require('express');
const {getHomepages, getAboutPages, getIndexPages, getSignUpPage, getEditPage, editUser} = require('../controllers/homeControllers');
const {createUser, deleteUser} = require('../services/CRUDServices');
const router = express.Router();   

// router.Method('/route', handler)

router.get('/home', getHomepages);
router.get('/about', getAboutPages);
router.get('/', getIndexPages);
router.get('/sign-up', getSignUpPage);
router.get('/edit/:id', getEditPage);
router.post('/create-user', createUser)
router.post('/edit-user/:id', editUser);
router.post('/delete/:id', deleteUser);
module.exports = router;