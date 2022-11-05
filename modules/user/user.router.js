const { auth } = require('../../middleware/auth');
const validation = require('../../middleware/validation');
const { myMulter, fileValidation } = require('../../services/multer');
const homePage = require('./controller/homePage');
const { profile, profilePic } = require('./controller/profile');
const endPoint = require('./user.endPoint');
const userValidation = require('./user.validation');
const router = require('express').Router();


router.get('/', homePage);

router.get("/api/v1/user/profile", validation(userValidation), auth(endPoint.access), profile)

/*
router.patch("/profile/pic",
    myMulter('user/profile/pic',
        fileValidation.image).single('image'),
    auth(endPoint.access), 
    profilePic)
*/

module.exports = router