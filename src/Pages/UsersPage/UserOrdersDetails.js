import React from 'react';
import axios from "axios";
import {useParams,Link} from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import Table from '@mui/material/Table';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState,useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';

export default function UserOrdersDetails() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [dataUser, setDataUser] = useState();
      useEffect(()=>{
        fetch('https://localhost:7191/User/GetUsers')
        .then(response => response.json())
        .then(json => setDataUser(json));
      } ,[]
      );
      
      const [productData, setProductData] = useState();
      useEffect(() => {
      fetch('https://localhost:7191/Product/get-raw-products')
        .then((response) => response.json())
        .then((json) => setProductData(json));
      }, []);
      const temp = useParams().id;
      const [cartItemsData,setCartItemsData] = useState();
          useEffect(() => {
              (async () => {
                  await axios({
                      method: 'GET',
                      url: `https://localhost:7191/Cart/get-cart-items?id=${temp}`,
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  }).then(response => {
                      setCartItemsData(response.data);
                  }).catch(error => {
                      console.log(temp);
                  }
                  );
              })();
          }, [temp]); 
         
        const [cartData,setCartData] = useState({});
          useEffect(() => {
              (async () => {
                  await axios({
                      method: 'GET',
                      url: `https://localhost:7191/Cart/get-cart-by-cartId?id=${temp}`,
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  }).then(response => {
                    setCartData(response.data);
                  }).catch(error => {
                      console.log("hello");
                  }
                  );
              })();
          }, [temp]); 
        const handleUpdate = (event) => {
          event.preventDefault();
          fetch(`https://localhost:7191/Cart/update-transaction-status?id=${temp}`, {  
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(function (response) {
        if(response.status === 200)
        {
        alert("Đã Cập Nhật Đơn Hàng");
        window.location.reload();
      }
      else if (response.status === 500)
      {
        alert("Đơn Hàng Đã Hoàn Thành Hoặc Bị Huỷ");
      }
      else
      {
        alert("Đã Có Lỗi Xảy Ra");
      }
      })
  
    }
      const handleCancel = (event) => {
        event.preventDefault();
        fetch(`https://localhost:7191/Cart/cancel-transaction-status?id=${temp}`, {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
     .then(function (response) {
        if(response.status === 200)
        {
        alert("Đã Huỷ Đơn Hàng");
        window.location.reload();
      }
      else if (response.status === 500)
      {
        alert("Đơn Hàng Đã Hoàn Thành Hoặc Bị Huỷ");
      }
      else
      {
        alert("Đã Có Lỗi Xảy Ra");
      }
      })
    }
     
        
        return (
        <div>
                <Navbar />
                <br />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
      <Table striped bordered hover minRows={0}>
                <thead>
                    <tr>

                        <th>Tên Sản Phẩm</th>
                        <th>Số Lượng</th>
                        <th>Đơn Giá</th>
                        <th>Tổng Giá</th>
                    </tr>
                </thead>
                <tbody>
                {cartItemsData && cartItemsData.map((item) => {
                                        return (
                                            <tr key={item.productId}>
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
                                                {item.quantity}
                                                </td>
                                                <td>
                                                { productData && productData.map((item2) => {
                                                        if ( item.productId === item2.productId) {
                                                            return (
                                                                <div key={item2.productId}>
                                                                    {(item2.price * (100 - item2.discount)) / 100}
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                  
                                                </td>
                                                <td>{ productData && productData.map((item2) => {
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

                      <tfoot>
                        <tr>
                            <td colSpan="3" className="text-right">
                                <strong>Tổng Tiền:</strong>
                            </td>
                            <td>
                            {cartData.totalPrice}
                            </td>
                        </tr>
                      </tfoot>   
            </Table>
    </React.Fragment>
    <React.Fragment className="text-left">
    <Timeline>
      <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.createdAt).toLocaleString('en-GB')}
          </TimelineOppositeContent>
        <TimelineSeparator>
        {cartData.status > 1 ?  <TimelineDot color="success" /> :  <TimelineDot />}
          {cartData.status > 1 ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>Chờ Xác Nhận</TimelineContent>
      </TimelineItem>

      <TimelineItem>
         {cartData.status === 3 ?  <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent> : null}
        <TimelineSeparator>
          {cartData.status > 2 ?  <TimelineDot color="success" /> :  <TimelineDot />}
          {cartData.status > 2 ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>Gửi Hàng Cho ĐVVC</TimelineContent>
      </TimelineItem>

      <TimelineItem>
         {cartData.status === 4 ?  <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent> : null}
        <TimelineSeparator>
          {cartData.status > 3 ?  <TimelineDot color="success" /> :  <TimelineDot />}
          {cartData.status > 3 ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>Đang Giao Hàng</TimelineContent>
      </TimelineItem>

      <TimelineItem>
          {cartData.status === 5 ?  <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent> : null}
        <TimelineSeparator>
          {cartData.status > 4 ?  <TimelineDot color="success" /> :  <TimelineDot />}
        </TimelineSeparator>
        <TimelineContent>Đã Giao Hàng</TimelineContent>
      </TimelineItem>
      {cartData.status === 0 ? 
      <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent>
        <TimelineSeparator>
        <TimelineDot color="secondary" />
        </TimelineSeparator>
        <TimelineContent>Đã Huỷ</TimelineContent>
      </TimelineItem>
      : null}

    </Timeline>
    <div>
        {cartData.status === 1 ? <button onClick={handleCancel} className="btn btn-sm btn-danger" style={{marginLeft:"45%"}}>Huỷ đơn hàng</button> : <button onClick={handleCancel} className="btn btn-sm btn-danger" style={{marginLeft:"45%"}} disabled >Huỷ đơn hàng</button>}
    
    </div>  
    </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>

            <br />
            <Footer />
            </div>
    );
}

    

                    

               
  



                                