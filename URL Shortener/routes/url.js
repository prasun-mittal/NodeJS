const express = require('express');
const router = express.Router();
const {handleGenerateShortURL,handleGetAnalytics} = require('../controller/url')

router.post('/',handleGenerateShortURL)

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports=router;