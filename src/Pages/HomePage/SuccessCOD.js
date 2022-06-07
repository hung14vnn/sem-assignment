import React, {} from 'react';
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';


export default function SuccessCODPage() {
   
    return (
        <div>
            <Navbar/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-success">
                            <h4>Đặt hàng thành công</h4>
                            <p>Vui lòng thanh toán khi nhận hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        <div class="jumbotron text-center">
        <h1 class="display-3">Cảm Ơn Bạn!</h1>
        <p class="lead"><strong>Kiểm tra lịch sử đơn hàng</strong> để biết tình trạng hiện tại của đơn hàng</p>
        <br/>
        <hr/>
        <br/>
        <p>
          Gặp vấn đề? <a href="https://www.facebook.com/ffyurc14/">Liên hệ chúng tôi</a>
        </p>
        <br/>
        <p class="lead">
          <a class="btn btn-success btn-sm" href="/" role="button">trở về trang chủ</a>
        </p>
        </div>
        <Footer/>
        </div>
    )
}