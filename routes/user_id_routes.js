const express = require('express');
const {check} = require('express-validator');
const VerifyUser = require('../models/TokenVerify');
const routes = express.Router();
const {SignUpUser,getAllPost,LoginUser,AddFollower,ChangePassword} = require('../controllers/user_id');
routes.patch('/resetpassword/:userid',ChangePassword);
routes.post('/SignUp',[check('name').not().isEmpty(),check('email').not().isEmpty(),check('password').not().isEmpty()],SignUpUser);
routes.post('/Login',LoginUser);
routes.get('/AllUsers',getAllPost);

routes.use(VerifyUser);

routes.post('/Addfollower',AddFollower)


module.exports = routes;
