const { Router } = require('express');
const router = Router();
// const { check, validationResult } = require('express-validator');
const pool = require("../db");


router.post(
    '/work_subtype',
    async (req, res) => {
        try {
            const { id } = req.body;
            const table = await pool.query(`
            select public."workProduct".id_product as id ,  public.products.name as name
            from public.products 
            INNER JOIN public."workProduct" ON public.products.id = public."workProduct".id_product
            INNER JOIN public.work ON public."workProduct".id_work = public.work.id
            WHERE public."workProduct".id_work = ${id}
            `);
            console.log(2);
            res.json(table.rows);
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.post(
    '/orders_info',
    async (req, res) => {
        try {
            const table = await pool.query(`
            select 
            "order".id,customers.name as cs_name,customers.phone, work.name as wrk_name , products.name as pr_name,
            "order".desctiptions,"order".date_order, "order"."isConfirmed"
            from 
            "order" INNER JOIN customers ON "order".id_customers = customers.id
            INNER JOIN products ON "order".id_products = products.id 
            INNER JOIN work ON "order".id_work = work.id
            `);
            // console.log(1);
            res.json(table.rows);
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })
router.post(
    '/update_confirmed',
    async (req, res) => {
        try {
            const { id } = req.body;
            await pool.query(`
                UPDATE "order"
                SET "isConfirmed"= true  
                WHERE id = ${id}
            `);
            // console.log(1);
            res.json({ message: 'подтвержден' });
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.post(
    '/delete_order',
    async (req, res) => {
        try {
            const { id } = req.body;
            await pool.query(`
                    DELETE FROM "order"
                    WHERE id = ${id};
                `);
            // console.log(1);
            res.json({ message: 'удален' });
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


module.exports = router