const express = require('express');
const router = express.Router();

//@route GET
//@desc Tesr route
//@access public

router.use('/test', (req, res) => res.json({ok:1}));

module.exports = router;