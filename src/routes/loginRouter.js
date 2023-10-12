const { Router } = require('express');
const { tokenGenerator } = require('../untils/tokenGenerator');
const { loginValidation } = require('../middlewares/loginValidation');

const router = Router();

router.post('/login', loginValidation, async (_req, res) => {  
  const token = tokenGenerator();
  res.status(200).json({ token });
});

module.exports = router;   