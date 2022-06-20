const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const { validaEmail, validaPassword } = require('../Middlewares/index');

router.post('/',
  validaEmail,
  validaPassword, (_req, res) => {
  const keyToken = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: keyToken });
  });

module.exports = router;