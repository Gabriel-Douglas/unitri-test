import React, { Component, useState, createContext, useContext } from 'react'
import {
    BsFillPencilFill
} from "react-icons/bs";

import MyContext from '../../../context/MyContext';
import TableContext from '../../../context/TableContext';


const TableCustomers = (datatable) => {

    const FormCustomer = useContext(MyContext)

    const [customerclicked, setCustomerclick] = useState()

    const RowClick = (data) => {
        setCustomerclick(data)

        FormCustomer.id.current.value = data.id;
        FormCustomer.document.current.value = data.document
        FormCustomer.name.current.value = data.name
        FormCustomer.email.current.value = data.email
        FormCustomer.phonenumber.current.value = data.phonenumber

        const address = JSON.parse(data.address)

        FormCustomer.address[0].current.value = Object.values(address)[0]
        FormCustomer.address[1].current.value = Object.values(address)[1]
        FormCustomer.address[2].current.value = Object.values(address)[2]
        FormCustomer.address[3].current.value = Object.values(address)[3]
    }

    return (<TableContext.Provider value={customerclicked}>
        <div className="table-responsive">
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th></th>
                        <th scope="col">Id</th>
                        <th scope="col">Document</th>
                        <th scope="col">Name</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(datatable)[0].data.map((customer, index) => {
                        return (
                            <tr key={index} onClick={e => RowClick(customer)}>
                                <td><BsFillPencilFill /></td>
                                <td>{customer.id}</td>
                                <td>{customer.document.length < 14 ? `CPF: ${customer.document.substring(0, 3)}.${customer.document.substring(3, 6)}.${customer.document.substring(6, 9)}-${customer.document.substring(9, 11)}` :
                                    `CNPJ: ${customer.document.substring(0, 2)}.${customer.document.substring(2, 5)}.${customer.document.substring(5, 8)}/${customer.document.substring(8, 12)}-${customer.document.substring(12, 14)}`}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phonenumber}</td>
                                {
                                    JSON.parse("[" + customer.address + "]").map((e, i) => {
                                        return (
                                            <td key={i}>Address: {e.address0}, State: {e.address1}, City: {e.address2}, Zip code: {e.address3}</td>
                                        )
                                    })
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </TableContext.Provider>
    )

}

export default TableCustomers