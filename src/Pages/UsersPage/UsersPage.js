/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import {useParams,Link} from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';


export default function UserPage() {

    const [data, setData] = useState();
    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value});

    };
    const id = sessionStorage.getItem("userid");
    const [dataCart,setDataCart] = useState();
    useEffect(() => {
        (async () => {
            await axios({
                method: 'GET',
                url: `https://localhost:7191/Cart/get-carts-by-userId?id=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                setDataCart(response.data);
            }).catch(error => { 
                console.log(error);
            });
        })();
    }, []);

    useEffect(() => {
      (async () => {
          await axios({
              method: 'GET',
              url: `https://localhost:7191/User/getUserById?id=${id}`,
              headers: {
                  'Content-Type': 'application/json',
              },
          }).then(response => {
              setData(response.data);
          }).catch(error => {
             alert("Bạn cần đăng nhập trước");
          });
      })();
    }, []);


    const handleSubmit = (event) => {
      event.preventDefault();
       fetch(`https://localhost:7191/User/UpdateUser?id=${id}`, {  
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              fullName: data.fullName,
              email: data.email,
              phoneNumber: data.phoneNumber,
              location: data.location
          }),

      })
      .then(response => 
        {
            if(response.status === 200){
                alert("Đã cập nhật thành công");
                window.location.reload();
            }
            else if
            (response.status === 400)
            {
                alert("Bạn cần nhập đầy đủ thông tin trong lần đâu tiên cập nhật");
            }
            else 
            {
                alert("Có lỗi xảy ra");
            }
        }
    )
    }
  const returnStatus = (status) => {
    if(status === 0){
        return "Đã Huỷ";
    }
    else if(status === 1){
        return "Đang Chờ Xác Nhận";
    }
    else if(status === 2){
      return "Đã Xác Nhận";
  }
    else if(status === 3){
        return "Đang Gửi Hàng Cho ĐVVC";
    }
    else if(status === 4){
        return "Đang Giao Hàng";
    }
    else if(status === 5){
        return "Đã Giao Hàng";
    }
  }


    
  return(
    <div>
      <Navbar/>
<div className="site-section">
<div className="container">
  <div className="row">
    <div className="col-md-12">
      <h2 className="h3 mb-5 text-black">Thông Tin Của Bạn</h2>
    </div>
    <div className="col-md-12">

      <form action="#" method="post">

        <div className="p-3 p-lg-5 border">
          <Form.Group className="edit" >
                    <Form.Label>Họ Tên</Form.Label>
                    <Form.Control id="edit-input-name" name="fullName" type="text" onChange={handleChange} defaultValue={data?.fullName} />
                </Form.Group>
          <Form.Group className="edit" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="edit-input-email" name="email" type="email" onChange={handleChange} defaultValue={data?.email} />
                </Form.Group>
          <Form.Group className="edit" >
                    <Form.Label>Số Điện Thoại</Form.Label>
                    <Form.Control id="edit-input-phone" name="phoneNumber" type="text" onChange={handleChange} defaultValue={data?.phoneNumber} />
                </Form.Group>
          <Form.Group className="edit" >
                    <Form.Label>Địa Chỉ</Form.Label>
                    <Form.Control id="edit-input-location" name="location" type="text" onChange={handleChange} defaultValue={data?.location} />
                </Form.Group>
          <a href="/password/recover" className="text-success col-md-2">Đổi mật khẩu</a>
            <div className="col-lg-12">
              <input type="submit" onClick={handleSubmit} className="btn btn-success btn-md btn-block" value="Lưu" />
          </div>
        </div>
      </form>
    </div>   
  </div>
</div>
</div>
<div className="site-section">
<div className="container">
  <div className="row">
    <div className="col-md-12">
      <h2 className="h3 mb-5 text-black">Lịch Sử Đặt Hàng</h2>
    </div>
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12"> 
          <div className="p-3 p-lg-5 border">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"><a>Mã Đơn Hàng</a></th>
                  <th scope="col"><a>Ngày Đặt Hàng</a></th>
                  <th scope="col"><a>Tổng Tiền</a></th>
                  <th scope="col"><a>Trạng Thái</a></th>
                  <th scope="col"><a>Chi Tiết</a></th>
                </tr>
              </thead>
              <tbody>
              {dataCart && dataCart.map((item, index) => {
                return(
                  <tr>
                    {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <th scope="row"><a>{item.cartId}</a></th>
                    <td><a>{new Date(item.createdAt).toLocaleDateString('en-GB')}</a></td>
                    <td><a>{item.totalPrice} Đ</a></td>
                    <td><a>{returnStatus(item.status)}</a></td>
                    <td><a href={`/user/orders/${item.cartId}`}>Chi Tiết</a></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
<Footer/>
</div>
  )
}