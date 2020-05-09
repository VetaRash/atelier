import React from 'react'

export const TableOrders = ({ orders, handler }) => {
    return (
        <table className="orders">
            <thead>
                <tr>
                    <th className="id-order">id заказа</th>
                    <th>Заказчик</th>
                    <th>Телефон заказчика</th>
                    <th>Тип работы </th>
                    <th>Подтип работы</th>
                    <th>Дата заказа</th>
                    <th>Статус заказа</th>
                    <th>Описание заказа</th>
                </tr>
            </thead>
            <tbody className="tbody" >
                {orders.map((customer, index) => {
                    return (
                        <tr key={customer.id} data-id={customer.id}>
                            <td className="id-order">{customer.id}</td>
                            <td>{customer.cs_name}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.wrk_name}</td>
                            <td>{customer.pr_name}</td>
                            <td>{customer.date_order}</td>
                            {customer.isConfirmed ?
                                <td className="teal-text text-lighten-2">Подтвержден</td>
                                : <td className="red-text text-lighten-2">Не подтвержден</td>}

                            <td className="description-order">{customer.desctiptions}</td>
                            <td className='activated-order' >
                                {customer.isConfirmed ?
                                    <button className="btn-order-confirmed unActive">Подтвердить</button>
                                    : <button className="btn-order-confirmed">Подтвердить</button>}
                            </td>
                            <td >
                                <button className='btn-order-delete'>Удалить</button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        </table >
    )


}
