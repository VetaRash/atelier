const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const pool = require("../db");


// const multer = require('multer');

// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         cb(null, '../uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     console.log(1);
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });


//  /api/auth/login
router.post(
    '/order',


    [
        check('name', 'Некорректное имя').isLength({ min: 3 }),
        check('phone', 'Некорректный номер телефона').isLength({ min: 7 }),
        check('email', 'Некорректный email').isEmail(),
        check('service', 'Выберите услугу').isLength({ min: 1 }),
        check('subservice', 'Выберите подтип услуги').isLength({ min: 1 }),

        // upload.single('orderimg')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: errors.array()[0].msg
                })
            }

            const { name, phone, email, description, service, subservice, orderimg } = req.body;



            let customers = await pool.query(`SELECT * FROM customers WHERE email = '${email}' and phone = '${phone}'`);

            if (customers.rowCount == 0) {
                customers = await pool.query(`INSERT INTO customers(name,phone,email) VALUES ('${name}','${phone}','${email}') RETURNING *`)
            }




            const date = new Date().toLocaleDateString();
            const customersID = +customers.rows[0].id;

            pool.query(`INSERT INTO "order"(id_customers, id_work, id_products,desctiptions,date_order,"isConfirmed")
                        VALUES ('${customersID}','${service}','${+subservice}','${description}','${date}', 'false')`)
                .then(res => console.log('success'))
                .catch(e => console.log(e.stack))


            res.status(201).json({ message: 'Заявка создан, с вами свяжется наш оператор для подтверждения заказа.' });




        } catch (e) {
            console.log(req.body);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


module.exports = router