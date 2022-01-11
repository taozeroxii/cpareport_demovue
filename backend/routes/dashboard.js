const router = require('express').Router();


router.get('/',  (req, res) => {
    res.json({ message: 'dashboard' })
})



module.exports = router;