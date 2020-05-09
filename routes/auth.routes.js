const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator');
const pool = require("../db");


//  /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            // console.log('not error')
            const { email, password } = req.body;

            const user = await pool.query("SELECT * FROM users WHERE login = $1", [email]);


            if (user.rows.length === 0) {
                return res.status(400).json({ message: 'Такого пользователя не существует' });
            }

            const isMatch = await bcrypt.compare(password, user.rows[0].password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            res.json({ role: user.rows[0].login, userId: user.rows[0].id })

        } catch (e) {
            console.log(req.body);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
            // console.log(e.message);
        }
    })


module.exports = router