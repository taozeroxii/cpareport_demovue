const router = require('express').Router();
// const { authenticated,isInRoles } = require('../configs/security');

//account router
router.use('/dashboard',require('./dashboard'));
router.use('/tableshowdata',require('./tableshowdata'));
router.use('/selectinput',require('./selectinput'));
router.use('/menu',require('./menu'));
module.exports = router;