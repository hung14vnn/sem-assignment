import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';


export default function Footer() {
  
    
    return(
   <div>
    <footer className="section-footer border-top bg">
        <div className="container">
          <section className="footer-top  padding-y">
            <div className="row">
              <aside className="col-md col-6">
                <h6 className="title">Nhà Xuất Bản</h6>
                <ul className="list-unstyled">
                  <li> <a href="#" style={{textDecoration:"none"}}>Kim Đồng</a></li>
                  <li> <a href="#"  style={{textDecoration:"none"}}>Thanh Niên</a></li>
                  <li> <a href="#"  style={{textDecoration:"none"}}>TP HCM</a></li>
                  <li> <a href="#"  style={{textDecoration:"none"}}>Hà Nội</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Công ty</h6>
                <ul className="list-unstyled">
                  <li> <a href="#" style={{textDecoration:"none"}}>Về Chúng Tôi</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Kinh Doanh</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Tìm Đường</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Điều Khoản Sử Dụng</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Sơ Đồ Trang Web</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Giúp Đỡ</h6>
                <ul className="list-unstyled">
                  <li> <a href="#" style={{textDecoration:"none"}}>Liên Hệ</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Yêu Cầu Hoàn Tiền</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Trạng Thái Đơn Hàng</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Thông Tin Giao Hàng</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}>Yêu Cầu Hỗ Trợ Tại Nhà</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Tài Khoản</h6>
                <ul className="list-unstyled">
                  <li> <a href="#" style={{textDecoration:"none"}}> Đăng Nhập</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}> Đăng Kí</a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}> Cài Đặt Tài Khoản </a></li>
                  <li> <a href="#" style={{textDecoration:"none"}}> Đơn Hàng Của Tôi </a></li>
                </ul>
              </aside>
              <aside className="col-md">
                <h6 className="title">Mạng Xã Hội</h6>
                <ul className="list-unstyled">
                  <li><a href="https://www.facebook.com/ffyurc14/" style={{textDecoration:"none"}}> <i className="fab fa-facebook"></i> Facebook </a></li>
                  <li><a href="#" style={{textDecoration:"none"}}> <i className="fab fa-twitter"></i> Twitter </a></li>
                  <li><a href="#" style={{textDecoration:"none"}}> <i className="fab fa-instagram"></i> Instagram </a></li>
                  <li><a href="#" style={{textDecoration:"none"}}> <i className="fab fa-youtube"></i> Youtube </a></li>
                </ul>
              </aside>
            </div> 
          </section>	

          <section className="footer-bottom row">
            <div className="col-md-2">
              <p className="text-muted">2022 TH Books</p>
            </div>
            <div className="col-md-8 text-md-center">
              <a style={{textDecoration:"none"}} href="
              mailto: hungtp2510@gmail.com">
               <i className="fas fa-envelope">&nbsp;</i> 
               hungtp2510@gmail.com
              </a>

              &nbsp;

              <a style={{textDecoration:"none"}} href="tel:+84368133069">
              <i className="fas fa-phone">&nbsp;</i>
              0368.133.069</a>
              
              &nbsp;&nbsp;

              <a style={{textDecoration:"none"}} href="https://www.google.com/maps/dir//3+%C4%90%C6%B0%E1%BB%9Dng+C%E1%BA%A7u+Gi%E1%BA%A5y,+L%C3%A1ng+Th%C6%B0%E1%BB%A3ng,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i/@21.0288466,105.7681197,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3135ab422e5057e3:0xdc775192ca404290!2m2!1d105.8031394!2d21.0287701?hl=vi-VN
              ">
              <i className="fas fa-map-marker-alt">&nbsp;</i>
              Số 3 Phố Cầu Giấy, Láng Thượng
              </a>


            </div>
            <div className="col-md-2 text-md-right text-muted">
              <i className="fab fa-lg fa-cc-visa"></i> &nbsp;
              <i className="fab fa-lg fa-cc-paypal"></i> &nbsp;
              <i className="fab fa-lg fa-cc-mastercard"></i>
            </div>
          </section>
        </div>
        </footer>
    </div>
    )
}