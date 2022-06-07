import React, {useEffect} from 'react';
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';


export default function SuccessPage() {
    const queryString = window.location.search;
 // take all the parameters from the query string
    const urlParams = new URLSearchParams(queryString);
    const PayerId = urlParams.get('PayerID')
    const PaymentId = urlParams.get('paymentId')
    useEffect(() => {
        fetch(`https://localhost:7191/Cart/check-valid-payment-id?paymentId=${PaymentId}&payerId=${PayerId}`)

        .then(res => {
            if(res.status === 200){
                fetch(`https://localhost:7191/Cart/paypal-purchase-cart?cartId=${localStorage.getItem('cartId')}&payment=${PaymentId}`, {
                    method: 'POST',
                })
                .then(res => {
                    if(res.status === 200){
                        localStorage.removeItem('cartId')
                        sessionStorage.removeItem('cartId')
                    }
                    else{
                        alert("error")
                    }
                })
            }
            else{
                alert("Thông tin giao dịch PayPal không hợp lệ")
            }
        })
    }, [])


    return (
        <div>
            <Navbar/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-success">
                            <h4>Thanh toán thành công</h4>
                            <p>Mã giao dịch PayPal của bạn là: {PaymentId}</p>
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