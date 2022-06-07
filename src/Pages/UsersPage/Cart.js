import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import {useParams,Link} from 'react-router-dom';
import { Button, Form, Table } from "react-bootstrap";
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';

export default function Cart() {
    
        const [data, setData] = useState();
        const [quantity,setQuantity]=useState(0);
        const handleIncrease = (e, id ) => {
            e.preventDefault();
            axios.post(`https://localhost:7191/Cart/increase-cart-items-quantity?cartId=${sessionStorage.getItem("cartId")}&productId=${id}`)
            .then(res => {
                if(res.status === 200){

                }
                else{
                alert("Có lỗi xảy ra, vui lòng thử lại sau");
                }
            })
        }
        const handleDecrease = (e, id ) => {
            e.preventDefault();
            axios.post(`https://localhost:7191/Cart/decrease-cart-items-quantity?cartId=${sessionStorage.getItem("cartId")}&productId=${id}`)
            .then(res => {
                if(res.status === 200){

                }
                else{
                alert("Có lỗi xảy ra, vui lòng thử lại sau");
                }
            })
        }


        //delete items from cart
        const handleDelete = (e) => {
            e.preventDefault();
            axios.delete(`https://localhost:7191/Cart/delete-cart?id=${sessionStorage.getItem("cartId")}`)
            .then(res => {
                if(res.status === 200){
                    alert("Xóa thành công");
                    sessionStorage.removeItem("cartId");
                    window.location.reload();
                }
                else{
                    alert("Có lỗi xảy ra, vui lòng thử lại sau");
                }
            })
        }

     
      
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/Cart/get-cart?id=${sessionStorage.getItem("userid")}`,
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
        }, [quantity]);


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
        }, [quantity]);

     
        


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
        }, [quantity]);

     

 
        const handleSubmit = (event) => {
            event.preventDefault();
            fetch(`https://localhost:7191/Cart/check-purchase-cart?cartId=${sessionStorage.getItem("cartId")}&userId=${sessionStorage.getItem("userid")}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                if(res.status === 200){
                     window.location.href = "/checkout/"+sessionStorage.getItem("cartId");
                }
                else if(res.status === 400)
                {
                    alert("Vui lòng điền đầy đủ thông tin trước khi đặt hàng");
                }
            })
               
        }
     
        
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="site-section">
                                <h5>Giỏ Hàng</h5>
                                <hr/>

                                {data === undefined ? (
                                    <div>
                                    <div className="alert alert-danger" role="alert">
                                        Bạn cần phải đăng nhập để mua hàng
                                    </div>
                                    <div>
                                   <button className="btn btn-danger mx-auto d-block" onClick={() => window.location.href = "/login"}>Đăng Nhập</button>
                                   </div>
                                    </div>
                                ):(
                                    <div>   
                                {total === 0 ? (
                                    <div>
                                    <div className="alert alert-danger" role="alert">
                                        Giỏ hàng của bạn hiện đang trống
                                    </div>
                                   <button className="btn btn-success mx-auto d-block" onClick={() => window.location.href = "/"}>Tiếp tục mua hàng</button>
                                    </div>
                                ) : (
                            <div>
                                <div className="container">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Sản Phẩm</th>
                                                        <th>Giá</th>
                                                        <th style={{maxWidth: "20%"}}>Số Lượng</th>
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
                                                                            )
                                                                        }
                                                                    })}
                                                                </td>
                                                                <td>
                                                                    {productData && productData.map((item2) => {
                                                                        if (item.productId === item2.productId) {
                                                                            return (
                                                                                <div key={item2.productId}>
                                                                                    {(item2.price * (100-item2.discount)) / 100}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </td>

                                                                <td>
                                                                    <div className="input-group mb-3">
                                                                        <div className="input-group-prepend">
                                                                            <button className="btn btn-outline-secondary" type="button" onClick={(e) => {handleDecrease(e, item.productId);setQuantity(quantity-1)}}>-</button>
                                                                        </div>
                                                                        <input style={{maxWidth: "50px"}} type="text" className="form-control text-center" value={item?.quantity} readOnly />
                                                                        <div className="input-group-append">
                                                                            <button className="btn btn-outline-secondary" type="button" onClick={(e) => {handleIncrease(e,item.productId);setQuantity(quantity+1)}}>+</button>
                                                                        </div>
                                                                    </div>

                                                                </td>
                                                                <td>{productData && productData.map((item2) => {
                                                                        if (item.productId === item2.productId) {
                                                                            return (
                                                                                <div key={item2.productId}>
                                                                                    {(item2.price * (100-item2.discount)) / 100 * item.quantity}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}</td>                                                             
                                                    </tr>
                                                        )})}    
                                                </tbody>
                                            </Table>
                                </div>
                                <hr/>
                                <div className="container">
                                    <div>
                                        <div>
                                            <div>
                                            <p>Tông tiền sản phẩm: {total}Đ</p>
                                            <p>VAT(5%): {total*0.05}Đ</p>
                                            <p>Phí giao hàng: {
                                                (total > 100000 ? 0 : 30000)
                                                }Đ</p>
                                            <p>Tổng tiền: {total*1.05 +
                                                (total > 100000 ? 0 : 30000)
                                                }Đ</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-10">
                                                <Button variant="danger" onClick={handleDelete}>Xoá</Button>
                                                <Link to="/">
                                                    <Button style={{marginLeft:"1%"}} variant="primary">Tiếp tục mua hàng</Button>
                                                </Link>
                                            </div>
                                            <div className="col-md-2">                     
                                                    <Button onClick={handleSubmit} variant="success">Thanh Toán</Button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                         )}
                        </div>
                    )}
                        </div>
                    
                    </div>
                        </div>
                    </div>
                <Footer/>
            </div>
            )
        }



                                