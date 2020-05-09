import React, { Fragment, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            localStorage.setItem('user', JSON.stringify(data));
            window.location.reload();
        } catch (e) { }
    }

    return (
        <Fragment>
            <section className="auth">
                <h1 className="auth__title" >Авторизация</h1>
                <div className="auth__form" >
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <button
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Войти
                    </button>
                </div>
            </section>
        </Fragment>
    )
}