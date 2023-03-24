const {Router} = require('express');
const { userGET, userActiveGET, userPOST } = require('../controllers/users');


const router = Router();

router.get("/", userGET);

router.get("/activas", userActiveGET);

router.post("/", userPOST);


module.exports = router;