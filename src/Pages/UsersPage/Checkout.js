import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import {useParams,Link} from 'react-router-dom';
import { Button, Form, Table } from "react-bootstrap";
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';

export default function Checkout() {
    
        const [data, setData] = useState();     
        //delete items from cart
        const handleDelete = (e) => {
            e.preventDefault();
            axios.delete(`http://localhost:5000/api/users/cart/${data._id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }

     
      
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/Cart/get-cart?id=${sessionStorage.getItem("cartId")}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    setData(response.data);
                }).catch(error => {
                    console.log(error);
                }
                );
            })();
        }, []);
        const [cartItemsData,setCartItemsData] = useState();
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/Cart/get-cart-items?id=${sessionStorage.getItem("cartId")}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    setCartItemsData(response.data);
                }).catch(error => {
                    console.log(error);
                }
                );
            })();
        }, []);


        const [total, setTotal] = useState(0);
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/Cart/get-total-price?id=${sessionStorage.getItem("cartId")}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    setTotal(response.data);
                }).catch(error => {
                    console.log(error);
                }
                );
            })();
        }, []);

        const [productData, setProductData] = useState([]);
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/Product/get-raw-products`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    setProductData(response.data);
                }).catch(error => {
                    console.log(error);
                }
                );
            })();
        }, []);
        const[userData, setUserData] = useState([]);
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/User/GetUserById?id=${sessionStorage.getItem("userid")}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    setUserData(response.data);
                }).catch(error => {
                    console.log(error);
                }
                );
            })();
        }, []);
 
  
        const handlePaymentMethod = (event) => {
            sessionStorage.setItem("paymentMethod", event.target.value);
        }

   
        const handleSubmit = (event) => {
        if(sessionStorage.getItem("paymentMethod") === "1"){
            event.preventDefault();
            fetch(`https://localhost:7191/Cart/online-purchase-cart?cartId=${sessionStorage.getItem("cartId")}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                window.location.href = `/success/${sessionStorage.getItem("cartId")}`
                sessionStorage.removeItem("cartId");
                sessionStorage.removeItem("paymentMethod");
            })
            .catch(err => {
                console.log(err);
            })
        }

        else if(sessionStorage.getItem("paymentMethod") === "2"){
        event.preventDefault();
        (async () => {
            await axios({
                method: 'GET',
                url: `https://localhost:7191/Cart/purchase-cart-paypal?totalPrice=${((total*1.05 +(total > 100000 ? 0 : 30000))/23170).toFixed(2)}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                localStorage.setItem("cartId", sessionStorage.getItem("cartId"));
                sessionStorage.removeItem("paymentMethod");
                window.location.href = response.data;
            }).catch(error => {
                console.log(error);
            }
            );
        })();
        }
        else {
            alert("Vui lòng chọn phương thức thanh toán");
        }
    }
       

     
        
        return (
            <><div>
                <Navbar />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Đơn hàng của bạn</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sản Phẩm</th>
                                        <th>Giá</th>
                                        <th style={{ maxWidth: "20%" }}>Số Lượng</th>
                                        <th>Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItemsData && cartItemsData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {productData && productData.map((item2) => {
                                                        if (item.productId === item2.productId) {
                                                            return (
                                                                <div key={item2.productId}>
                                                                    <a href={`/details/${item2.productId}`}>{item2.name}</a>
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </td>
                                                <td>
                                                    {productData && productData.map((item2) => {
                                                        if (item.productId === item2.productId) {
                                                            return (
                                                                <div key={item2.productId}>
                                                                    {(item2.price * (100 - item2.discount)) / 100}
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </td>

                                                <td>
                                                  {item.quantity}
                                                </td>
                                                <td>{productData && productData.map((item2) => {
                                                    if (item.productId === item2.productId) {
                                                        return (
                                                            <div key={item2.productId}>
                                                                {(item2.price * (100 - item2.discount)) / 100 * item.quantity}
                                                            </div>
                                                        );
                                                    }
                                                })}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Thông tin giao hàng</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Họ và tên</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập họ và tên" value={userData?.fullName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập số điện thoại" value={userData?.phoneNumber} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Địa chỉ</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập địa chỉ" value={userData?.location} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập email" value={userData?.email} readOnly />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Tổng tiền</th>
                                        <th>{total*1.05 +
                                                (total > 100000 ? 0 : 30000)
                                                }Đ</th>
                                    </tr>
                                </thead>
                            </Table>
                        </div>
                        <div className="col-md-6">
                             <div className="form-group">
                                <select className="form-control" onChange={handlePaymentMethod}>
                                    <option value="0">Chọn phương thức thanh toán</option>
                                    <option value="1">Thanh toán khi nhận hàng</option>
                                    <option value="2">Thanh toán qua PayPal</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Button variant="success" type="submit"  onClick={handleSubmit}>
                            Đặt hàng
                        </Button>
                    </div>
                </div>
            </div>
            <br />
            <Footer /></>
    );  
}
    

                    

               
  



                                