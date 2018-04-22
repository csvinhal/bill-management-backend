const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


/* Authenticate. */
router.post('/authenticate', (req, res, next) => {
  const token = jwt.sign({ admin: 'admin' }, 'secret', {
    expiresIn: 36000, // expires in 24 hours
  });

  res.json({
    success: true,
    message: 'Enjoy your token!',
    token,
  });
});

router.post('/verify', (req, res, next) => {
  jwt.verify(req.headers.token, 'secret', (err, decoded) => {
    console.log('err: ', err);
    console.log('decoded: ', decoded);
  });

  next();
});


module.exports = router;
