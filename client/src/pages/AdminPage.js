import React, { useCallback, useEffect, useState, Fragment, Component } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { TableOrders } from '../components/TableOrders';
// import { useMessage } from '../hooks/message.hook';

export const AdminPage = () => {

    const { loading, request } = useHttp();
    const [data, setData] = useState([])
    const orders = useCallback(async () => {
        try {
            const data = await request('/api/infoTable/orders_info', 'POST', null);
            setData(data);
        } catch (e) { }
    }, [request])

    const confimedHandler = (event) => {
        // console.log(event.target.tagName)
        const target = event.target;
        if (target.classList.contains('btn-order-confirmed')
            && !target.classList.contains('unActive')) {
            target.classList.add('unActive');
            const id = target.closest('tr').dataset.id;
            updateConfirmed(id);
            // console.log(id);
        }

        if (target.classList.contains('btn-order-delete')) {
            const id = target.closest('tr').dataset.id;
            deleteOrder(id);
        }
    }

    const updateConfirmed = async (id) => {
        try {
            const data = await request('/api/infoTable/update_confirmed', 'POST', { id });
            // setData(data);
            orders();
        } catch (e) { }
    };
    const deleteOrder = async (id) => {
        try {
            const data = await request('/api/infoTable/delete_order', 'POST', { id });
    
            orders();
        } catch (e) { }
    };

    useEffect(() => {
        orders()
    }, [orders])

    if (loading) {
        return (
            <Loader />
        )
    }
    if (!loading && data) {
        return (
            <Fragment>
                <h1 className="list-order" >Список заказов</h1>
                <div className="container-table" onClick={confimedHandler}>
                    <TableOrders orders={data} />
                </div>
            </Fragment>
        )
    }

}