const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// api/auth/register
router.post(
  '/register',
  [check('email', 'Некорректный email').isEmail(), check('password', 'Короткий пароль').isLength({ min: 6 })],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Не верные данные регистрации',
        })
      }
      const { email, password } = req.body
      // Ищем существование в БД польователя с данным email
      const candidate = await User.findOne({ email })
      if (candidate) {
        // Если находим - то выводим ответ сервера, что данный пользователь существует
        return res.status(400).json({ message: 'This User is in DB' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()
      res.status(201).json({ message: 'User created' })
    } catch (e) {
      res.status(500).json({ message: 'Bad server work' })
    }
  },
)

// api/auth/login
router.post(
  '/login',
  [check('email', 'Введите корректный email').normalizeEmail().isEmail(), check('password', 'Введите пароль').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Не верные данные при входе',
        })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Пароль не верен' })
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' })
      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Bad server work' })
    }
  },
)

module.exports = router
