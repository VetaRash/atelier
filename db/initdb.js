// const { Client } = require('pg');
// const client = new Client({
//     user: 'postgres',
//     password: '319846319846',
//     host: 'localhost',
//     port: 5432,
//     database: 'course-project'
// });

// client.connect()
//     .then(() => console.log("Connected successfuly"))
//     .catch(e => console.log(e));

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = '123456789';




// client
//     .query(`INSERT INTO customers(name,phone,email,description,img) 
//             VALUES ('1','1','1','1','./bg-reverse.jpg')`)
//     .then(res => console.log('wp'))
//     .catch(e => console.error(e.stack))

// client
//     .query(`INSERT INTO test(img,img1) 
//             VALUES ('bg-reverse.jpg','./bg-reverse.jpg')`)
//     .then(res => console.log('wp'))
//     .catch(e => console.error(e.stack))
// client
//     .query('SELECT * FROM test')
//     .then(res => console.log(res.rows[0]))
//     .catch(e => console.error(e.stack))
// bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {

//     client.query(`INSERT INTO users(login,password) VALUES ('admin@a.ru','${hash}')`);
// });

// const { Client } = require('pg');
// const client = new Client({
//     user: 'postgres',
//     password: '319846319846',
//     host: 'localhost',
//     port: 5432
// });
// client.query('CREATE database atelier')
//     .then(res => console.log('success'))
//     .catch(e => console.error(e.stack))

// var pgtools = require('pgtools');
// pgtools.createdb({
//     user: 'postgres',
//     password: '319846319846',
//     host: 'localhost',
//     port: 5432
// }, 'atelier', function (err, res) {
//     if (err) {
//         console.error(err);
//         process.exit(-1);
//     }
//     console.log('success create db')
// });




function creatDatabase() {
    var pgtools = require('pgtools');
    pgtools.createdb({
        user: 'postgres',
        password: '319846319846',
        host: 'localhost',
        port: 5432
    }, 'atelier', function (err, res) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
        console.log('success create db')
        createTable();
    });
}

function createTable() {
    const { Client } = require('pg');
    const client = new Client({
        user: 'postgres',
        password: '319846319846',
        host: 'localhost',
        port: 5432,
        database: 'atelier'
    });

    client.connect()
        .then(res => console.log('success conncet db'))
        .catch(e => console.error(e.stack))

    client.query(`
                CREATE TABLE public.customers
                (
                    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                    name text COLLATE pg_catalog."default" NOT NULL,
                    phone text COLLATE pg_catalog."default" NOT NULL,
                    email text COLLATE pg_catalog."default" NOT NULL,
                    CONSTRAINT customers_pkey PRIMARY KEY (id)
                )`
    )
        .then(res => console.log('customers table created successfully'))
        .catch(e => console.error(e.stack))

    client.query(`CREATE TABLE public.products
                (
                    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                    name text COLLATE pg_catalog."default" NOT NULL,
                    CONSTRAINT products_pkey PRIMARY KEY (id)
                )`
    )
        .then(res => console.log('products table created successfully'))
        .catch(e => console.error(e.stack))


    client.query(`CREATE TABLE public.work
                (
                    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                    name text COLLATE pg_catalog."default" NOT NULL,
                    CONSTRAINT work_pkey PRIMARY KEY (id)
                )`
    )
        .then(res => console.log('work table created successfully'))
        .catch(e => console.error(e.stack))

    client.query(`CREATE TABLE public.users
                (
                    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                    login text COLLATE pg_catalog."default" NOT NULL,
                    password text COLLATE pg_catalog."default" NOT NULL,
                    CONSTRAINT users_pkey PRIMARY KEY (id)
                )`
    )
        .then(res => console.log('users table created successfully'))
        .catch(e => console.error(e.stack))


    client.query(`CREATE TABLE public."workProduct"
                (
                    id_work integer NOT NULL,
                    id_product integer NOT NULL,
                    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                    CONSTRAINT "workProduct_pkey" PRIMARY KEY (id),
                    CONSTRAINT fk_product FOREIGN KEY (id_product)
                        REFERENCES public.products (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID,
                    CONSTRAINT fk_work FOREIGN KEY (id_work)
                        REFERENCES public.work (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID
                )`
    )
        .then(res => console.log('workProduct table created successfully'))
        .catch(e => console.error(e.stack))



    client.query(`CREATE TABLE public."order"
                (
                    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                    id_customers integer NOT NULL,
                    id_work integer NOT NULL,
                    id_products integer,
                    desctiptions text COLLATE pg_catalog."default",
                    date_order text COLLATE pg_catalog."default" NOT NULL,
                    "isConfirmed" boolean NOT NULL,
                    CONSTRAINT order_pkey PRIMARY KEY (id),
                    CONSTRAINT fk_customers FOREIGN KEY (id_customers)
                        REFERENCES public.customers (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID,
                    CONSTRAINT fk_products FOREIGN KEY (id_products)
                        REFERENCES public.products (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID,
                    CONSTRAINT fk_work FOREIGN KEY (id_work)
                        REFERENCES public.work (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID
                )`
    )
        .then(res => console.log('order table created successfully'))
        .catch(e => console.error(e.stack))
    // .finally(client.end())

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = '123456789';
    bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {

        client.query(`INSERT INTO users(login,password) VALUES ('admin@mail.ru','${hash}')`)
            .then(res => console.log('user fields added successfully'))
            .catch(e => console.error(e.stack))
    });


    client.query(`
            INSERT INTO work(name) VALUES ('Пошив одежды');
            INSERT INTO work(name) VALUES ('Пошив постельного белья');
            INSERT INTO work(name) VALUES ('Пошив штор');
            INSERT INTO work(name) VALUES ('Ремонт одежды');
    `)
        .then(res => console.log('work fields added successfully'))
        .catch(e => console.error(e.stack))

    client.query(`
    INSERT INTO public.products(name) VALUES ('Пошив шапок');
    INSERT INTO public.products(name) VALUES ('Пошив шуб');
    INSERT INTO public.products(name) VALUES ('Пошив штанов');
    INSERT INTO public.products(name) VALUES ('Пошив кофт');
    INSERT INTO public.products(name) VALUES ('Пошив маек');
    INSERT INTO public.products(name) VALUES ('Пошив постельного белья из барахата');
    INSERT INTO public.products(name) VALUES ('Пошив постельного белья из льна');
    INSERT INTO public.products(name) VALUES ('Пошив постельного белья из бязы');
    INSERT INTO public.products(name) VALUES ('Пошив штор из льна');
    INSERT INTO public.products(name) VALUES ('Пошив штор из бархата');
    INSERT INTO public.products(name) VALUES ('Пошив штор из ткача');
    INSERT INTO public.products(name) VALUES ('Замена молнии');
    INSERT INTO public.products(name) VALUES ('Штопка джинс');
    INSERT INTO public.products(name) VALUES ('Переделка одежды');
    INSERT INTO public.products(name) VALUES ('Другое');
    `)
        .then(res => console.log('user fields added successfully'))
        .catch(e => console.error(e.stack))

    client.query(`
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (1, 1);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (1, 2);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (1, 3);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (1, 4);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (1, 5);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (2, 6);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (2, 7);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (2, 8);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (3, 9);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (3, 10);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (3, 11);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (1, 15);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (2, 15);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (3, 15);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (4, 15);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (4, 12);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (4, 13);
    INSERT INTO public."workProduct"(id_work, id_product) VALUES (4, 14);
    `)
        .then(res => console.log('user fields added successfully'))
        .catch(e => console.error(e.stack))
        .finally(client.end())
}

creatDatabase();