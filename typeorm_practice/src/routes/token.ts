const express = require('express');
const jwt = require('jsonwebtoken');
import {User} from '../entity/User'

require('dotenv').config();

const { verifyToken } = require('./middleware.ts');

const router = express.Router();

router.post('/:uuid', async (req, res) => {
    const uuid = req.params.uuid
  try {
    const user = await User.findOneOrFail({uuid})
    const role = user.role
    const name = user.name
    const token = jwt.sign({
      role,
      name,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m',
      issuer: '토큰발급자',
    });

    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다.',
      token,
    });
  }

  catch (error) {
    console.error(error);
    return res.json({
      code: 500,
      message: '서버 에러',
    });
  }
});

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;