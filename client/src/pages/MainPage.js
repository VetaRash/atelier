import React, { Fragment, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
// import { Welcome } from '../components/Welcome';
// import { } from 'react-dom';

export const MainPage = () => {
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        description: '',
        service: '',
        subservice: '',
        orderimg: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const data = await request('/api/order/order', 'POST', { ...form })
            message(data.message);
            setForm({
                name: '',
                phone: '',
                email: '',
                description: '',
                service: '',
                subservice: '',
                orderimg: ''
            })
        } catch (e) { }
    }

    const changeHandler = event => {

        if (event.target.name === 'service') {
            subService(event.target.value);
        }
        setForm({ ...form, [event.target.name]: event.target.value });

    }

    const subService = async (id) => {
        try {
            const data = await request('/api/infoTable/work_subtype', 'POST', { id });
            renderSubService(data);
        } catch (e) { }
    }

    const renderSubService = (arr) => {

        const select = document.querySelector('.clothes');
        select.innerHTML = '';
        arr.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id;
            option.textContent = element.name;
            select.appendChild(option);
        });
    
    }


    return (
        <Fragment>

            <header className="header">
                <div className="wrapper wrapper__header">
                    <h1 className="logo">Couture</h1>
                    <div className="header__info">
                        <span className="info-phone">Контактный телефон: <a href="tel:+375336521175">+375(33)652-11-75</a></span>
                        <span className="info-map"> г.Минск, просп. Победителей, 9 <a href="#atelier-info">Карта</a></span>
                    </div>
                </div>
            </header>
            <section className="main">
                <div className="main__info">
                    <img src="./assets/images/bg_clothes.jpg" alt="clothes" />
                    <div className="info-description">
                        <h2>Ремонт и пошив одежды, постельного белья, штор</h2>
                        <p>
                            Если Вас заинтересует какая-либо информация, напишите нам по адресу
                        <span><a href="mailto:info@cuture.by" > info@cuture.by </a></span>или позвоните по номеру телефона
                        <span><a href="tel:+375336521175">+375(33)652-11-75</a></span>, а так же можете сделать онлайн заказ заполнив
                        <span><a href="#form" > форму</a></span>
                        </p>
                    </div>
                </div>
                <div className="wrapper wrapper__main">

                    <div className="services">

                        <div className="service">
                            <h3 className="srvice__title">
                                Женская одежда
                    </h3>
                            <div className="service__description">
                                <p className="service__text">
                                    Пошив вечерних платьев в салоне — это идеальная посадка, чуткое отношение и воплощение
                                    любого образа, пошив свадебных платьев — это превращение невесты в богиню и эталон
                                    стиля,
                                    пошив повседневной одежды — это одежда для женщин, знающих цену своего времени и
                                    желающих
                                    выглядеть стильно и модно
                        </p>
                                <div className="service__img">
                                    <img src="./assets/images/service_woman.jpg" alt="woman" />
                                </div>
                            </div>
                        </div>

                        <div className="service">
                            <h3 className="srvice__title">
                                Мужская одежда
                    </h3>
                            <div className="service__description">
                                <p className="service__text">
                                    Пошив повседневневных одежды — это гарантия высокого качества, они комфортны, элегантны и
                                    практичны. Словом,
                                    это одежда на все
                                    случаи жизни. Все это служит показателем качества Вашей жизни, позволяет обрести чувство
                                    уверенности, благополучия и успеха, а значит, всегда быть на высоте. Впрочем, лучше один раз
                            увидеть, чем сто раз услышать.<br />
                            Пошив деловой одежды — один костюм от другого отличается, прежде всего, деталями.
                            Качество костюма в первую очередь зависит от качества кроя, поскольку сшитый даже из очень
                            дорогой ткани, но неправильно сидящий по фигуре костюм, будет выглядеть плохо.
                        </p>
                                <div className="service__img">
                                    <img src="./assets/images/service_man.jpg" alt="man" />
                                </div>
                            </div>
                        </div>

                        <div className="service">
                            <h3 className="srvice__title">
                                Головные уборы
                    </h3>
                            <div className="service__description">
                                <p className="service__text">
                                    Пошив головных уборов производится на современном импортном оборудовании, что гарантирует
                                    высокое качество продукции.
                        </p>
                                <div className="service__img">
                                    <img src="./assets/images/service_hats.jpg" alt="hats" />
                                </div>
                            </div>
                        </div>

                        <div className="service">
                            <h3 className="srvice__title">
                                Пошив штор
                    </h3>
                            <div className="service__description">
                                <p className="service__text">
                                    Сделайте свой дом, квартиру еще более уютнее!<br />Гарантировано высокое качество!
                        </p>
                                <div className="service__img">
                                    <img src="./assets/images/service_curtains.jpg" alt="curtains" />
                                </div>

                            </div>

                        </div>

                        <div className="service">
                            <h3 className="srvice__title">
                                Пошив постельного белья
                    </h3>
                            <div className="service__description">
                                <p className="service__text">
                                    Изготовление постельного белья из различных материалов
                        </p>
                                <div className="service__img">
                                    <img src="./assets/images/service_linens.jpg" alt="lienes" />
                                </div>

                            </div>
                        </div>

                        <div className="service">
                            <h3 className="srvice__title">
                                Ремонт одежды
                    </h3>
                            <div className="service__description">
                                <p className="service__text">
                                    В нашем ателье вы можете отремонтировать свою одежду!
                                    Мы предадим вашим вещам первоначальный вид и Вы будете их с радостью носить еще год или два.
                                    Мы сделаем их еще лучше, скроем дефекты, поставим оригинальные заплатки и многое другое.
                        </p>
                                <div className="service__img">
                                    <img src="./assets/images/service_repairs.jpg" alt="repairs" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-service" id="form">
                        <h2 className="order-service__title" >Заказать услугу</h2>

                        <form onSubmit={onSubmitForm}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={changeHandler}
                                value={form.name}
                                placeholder="Имя" />
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                onChange={changeHandler}
                                value={form.phone}
                                placeholder="Телефон" />
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={changeHandler}
                                value={form.email}
                                placeholder="Электронный адрес" />
                            <select
                                className="selectService"
                                onChange={changeHandler}
                                name="service"
                                value={form.service}
                            >
                                <option value="1" data="clothes">Пошив одежды</option>
                                <option value="2" data="linens">Пошив постельного белья</option>
                                <option value="3" data="curtains">Пошив штор</option>
                                <option value="4">Ремонт одежды</option>
                            </select>

                            <select
                                className="clothes"
                                onChange={changeHandler}
                                name="subservice"
                                value={form.subservice}
                            >
                            </select>
                            {/* <input type="file" /> */}
                            <textarea
                                name="description"
                                id="description"
                                cols="30"
                                onChange={changeHandler}
                                value={form.description}
                                placeholder="Пожалуйста, опишите ваш заказ, а также можете загрузить фото заказа..."
                            ></textarea>
                            {/* <div className="load-image"> */}
                            {/* <input
                                type="file"
                                name="orderimg"
                                id="orderimg"
                                onChange={changeHandler}
                                value={form.orderimg}
                                accept=".png, .jpg, .jpeg" /> */}
                            {/* </div> */}
                            <button
                                disabled={loading}
                            >
                                Заказать
                            </button>


                            {/* <input type="file" /> */}
                        </form>
                    </div>
                    <div id="atelier-info">
                        <div className="atelie__description">
                            <h2 className="logo">Couture</h2>
                            <p>Мы работает с 8:00 - 21:00</p>
                        </div>
                        <div className="map">
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3A4fd2da8d217d0b7cf410d721f228fe2603c52c938f1db56085ff15a7b5969001&amp;source=constructor"
                                width="600" height="450" title="map" frameBorder="0"></iframe>
                        </div>
                    </div>
                </div>
            </section>

        </Fragment >

    );
}