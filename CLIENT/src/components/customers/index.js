import React, { useState, useEffect, useRef,createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import AuthUser from '../login/AuthUser'
import TableCustomers from "./TableCustomers";
import MyContext from "../../context/MyContext";
import TableContext from "../../context/TableContext";


const Customers = () => {

  const { http } = AuthUser();
  const [customersData, setCustomersData] = useState('')

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    http.get('/customers').then((res) => {
      setCustomersData(res.data)
    })
  }

  const [id, setId] = useState('')
  const [document, setDocument] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')

  const [address0, setAddress0] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [address3, setAddress3] = useState('')

  const idRef = useRef('')
  const nameRef = useRef('')
  const documentRef = useRef('')
  const emailRef = useRef('')
  const phonenumberRef = useRef('')
  const address0Ref = useRef('')
  const address1Ref = useRef('')
  const address2Ref = useRef('')
  const address3Ref = useRef('')

  const data = {
    document: document,
    name: name,
    email: email,
    phonenumber: phonenumber,
    address: JSON.stringify({ address0, address1, address2, address3 })
  }

  const insertCustomer = () => {

    var strErrors = ''
    http.post('/customer', data).then((res) => {
      alert(res.data.message);
      window.location.reload(false);
    })
      .catch(error => {
        Object.values(error.response.data.errors).forEach(erro => {
          strErrors = `${strErrors}\n${erro[0]}`
        });
        alert(strErrors)
      })
  }

  const updateCustomer = () => {

    if(idRef.current.value == ''){
      return alert("Select one custumer")
    }
    const dataUpdate = {
      document: documentRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      phonenumber: phonenumberRef.current.value,
      address: `{"address0":"${address0Ref.current.value}","address1":"${address1Ref.current.value}","address2":"${address2Ref.current.value}","address3":"${address3Ref.current.value}"}`
    }

    var strErrors = ''
    http.post(`/customer/${idRef.current.value}`,dataUpdate)
    .then((res) =>{
      alert(res.data.message);
      window.location.reload(false);
    })
    .catch(error => {
      Object.values(error.response.data.errors).forEach(erro => {
        strErrors = `${strErrors}\n${erro[0]}`
      });
      alert(strErrors)
    })

  }

  const DeleteCustomer = () => {
    if(idRef.current.value == ''){
      return alert("Select one custumer")
    }

    var strErrors = ''
    http.delete(`/customer/${idRef.current.value}`)
    .then((res) =>{
      alert(res.data.message);
      window.location.reload(false);
    })
    .catch(error => {
      Object.values(error.response.data.errors).forEach(erro => {
        strErrors = `${strErrors}\n${erro[0]}`
      });
      alert(strErrors)
    })

  }


  function renderElement() {
    if (customersData.data) {
      return <MyContext.Provider value={{id: idRef,
                                         document: documentRef,
                                         name: nameRef,
                                         email: emailRef,
                                         phonenumber: phonenumberRef,
                                         address: [address0Ref,address1Ref,address2Ref,address3Ref]}
                                        }>
        <div className="m-3">
          <h1 className="display-5">Customer Control</h1>
          <hr />
          <div className='card p-2 mb-1'>
            <form>
              <div className="row g-3">
                <div className="col-sm-12 col-md-12 col-lg-1">
                  <label className="form-label">ID</label>
                  <input type="number" className="form-control" id="id" name="id" disabled onChange={e => setId(e.target.value)} ref={idRef} />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3">
                  <label className="form-label">Document</label>
                  <input type="text" className="form-control" id="document" name="document" onChange={e => setDocument(e.target.value)} ref={documentRef} />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" onChange={e => setName(e.target.value)} ref={nameRef} />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3">
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control" id="email" name="email" onChange={e => setEmail(e.target.value)} ref={emailRef} />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-2">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phonenumber" name="phonenumber" onChange={e => setPhonenumber(e.target.value)} ref={phonenumberRef} />
                </div>
              </div>

              <label className="mt-3"><strong>Address</strong></label>
              <div className='card p-2'>
                <div className="row g-3">
                  <div className="col-sm-12 col-md-12 col-lg-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" id="address0" name="address" onChange={e => setAddress0(e.target.value)} ref={address0Ref} />
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" id="address1" name="address" onChange={e => setAddress1(e.target.value)} ref={address1Ref} />
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" id="address2" name="address" onChange={e => setAddress2(e.target.value)} ref={address2Ref} />
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-3">
                    <label className="form-label">Zip code</label>
                    <input type="text" className="form-control" id="address3" name="address" onChange={e => setAddress3(e.target.value)} ref={address3Ref} />
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-success mt-3 me-1" onClick={insertCustomer}>New Customer</button>
              <button type="button" className="btn btn-warning mt-3 me-1" onClick={updateCustomer}>Update Customer</button>
              <button type="button" className="btn btn-danger mt-3 me-1" onClick={DeleteCustomer}>Delte Customer</button>

            </form>
          </div>

          <h1 className="display-5">Customers</h1>
          <div className='card p-2 box'>
            <TableCustomers datatable={customersData} />
          </div>
        </div>
      </MyContext.Provider>

    } else {
      return <div className="row alert alert-danger m-4" role="alert">
        <div className="col align-self-center">
          <strong>Loading...</strong>
        </div>
      </div>
    }
  }

  return (
    <div>
      {renderElement()}
    </div>
  )



}

export default Customers;
