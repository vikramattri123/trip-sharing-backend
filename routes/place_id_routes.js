const express = require('express');
const {check} = require('express-validator');
// const app = express();
const route = express.Router();
const CheckToken = require('../models/TokenVerify');
const ValidateInputs = require('../controllers/post_validator');
const {getAllpost,getAllUserPost,New_Post,Update_Post,LikedPost} = require('../controllers/place_id');

route.get('/AllPost',getAllUserPost);
route.get('/:uid',getAllpost);

route.use(CheckToken);

route.patch('/LikePost/:postid',LikedPost);
// route.use(ValidateInputs);
route.post('/',[check('title').not().isEmpty(),check('image').not().isEmpty(),check('userid').not().isEmpty()],New_Post);
route.patch('/:uid',Update_Post);
route.delete('/:id',)

module.exports = route;
