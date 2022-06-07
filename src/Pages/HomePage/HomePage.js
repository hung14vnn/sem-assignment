import React, {useEffect, useState, useContext} from 'react';
import {Form, FormControl, Pagination, Stack, Spinner} from 'react-bootstrap';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';


export default function UserPage() {
    const [adminSort, setAdminSort] = useState("2");
    const [isFirsttime, setIsFirstTime] = useState(true);
    const Username = sessionStorage.getItem('username');
    // const ctx = useContext(AuthContext);
    const handleAdminSortChange = (event) => {
        setAdminSort(event.target.value);
    }
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({
        data: [],
        errors: null,
        succeeded: null,
        message: null,
        firstPage: null,
        lastPage: null,
        nextPage: null,
        previousPage: null,
        pageNumber: 1,
        pageSize: 8,
        totalPages: 1,
        totalRecords: null,
        searchBy: "",
        searchValue: "",
        sortBy: "",
        sortType: ""
    });

    const [sortBy, setSortBy] = useState({
        sortStaffcode: false,
        sortLastName: false,
        sortUserName: false,
        sortJoinedDate: false,
        sortType: false,
    });
    const [sortASC, setSortASC] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const searchParams = new URLSearchParams();
    

    const changeFormatDatetime = (value) => {
        let tempDatetime = new Date(value);
        return tempDatetime.toLocaleDateString('en-GB');
    }

    useEffect(() => {
        if (sortBy.sortStaffcode) {
            searchParams.append("SortBy", "StaffCode");
        }
        if (sortBy.sortLastName) {
            searchParams.append("SortBy", "LastName");
        }
        if (sortBy.sortUserName) {
            searchParams.append("SortBy", "UserName");
        }
        if (sortBy.sortJoinedDate) {
            searchParams.append("SortBy", "JoinedDate");
        }
        if (sortBy.sortType) {
            searchParams.append("SortBy", "Type");
        }


        if (sortASC !== null) {
            searchParams.append("SortType", sortASC ? "asc" : "desc");
        }

        if (searchValue.trim().length > 0) {
            searchParams.append("SearchBy", "LastName");
            searchParams.append("SearchValue", searchValue);
        }
        searchParams.append("PageNumber", pageNumber);
        searchParams.append("PageSize", pageSize);
        searchParams.toString();
        

        axios({
            method: "GET",
            url: `https://localhost:7191/Product/GetAllProducts?${searchParams}`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                setIsFirstTime(false);
                setProducts(res.data);
                setData({
                    ...data,
                    data: res.data.data,
                    errors: res.data.errors,
                    succeeded: res.data.succeeded,
                    message: res.data.message,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    nextPage: res.data.nextPage,
                    previousPage: res.data.previousPage,
                    pageNumber: res.data.pageNumber,
                    pageSize: res.data.pageSize,
                    totalPages: res.data.totalPages,
                    totalRecords: res.data.totalRecords,
                    searchBy: res.data.searchBy,
                    searchValue: res.data.searchValue,
                    sortBy: res.data.sortBy,
                    sortType: res.data.sortType
                });
            });
    }, [sortBy,  sortASC, searchValue, pageNumber, pageSize, adminSort]);

    const handleChangePageSize = (e) => {
        if(data.totalRecords > pageSize)
        setPageSize(pageSize+8);
        setPageNumber(1);   
    }
    const reducePageSize = (e) => {
        if(pageSize > 8)
        setPageSize(pageSize-8);
        setPageNumber(1);   
    }
    const CalculateDiscoutPrice = (price, discount) => {
        return (price * (100-discount)) / 100;
    }

    const handleChangePageNumber = (number) => {
        setPageNumber(number);
    }

    const handleChangeSearchText = (e) => {
        setSearchValue(e.target.value);
    }
    const handleClickSortBy = (event) => {
        if (event.target.id === 'sortStaffcode') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: true,
                    sortLastName: false,
                    sortUserName: false,
                    sortJoinedDate: false,
                    sortType: false,
                };
            });
        } else if (event.target.id === 'sortUserName') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: false,
                    sortUserName: true,
                    sortJoinedDate: false,
                    sortType: false,
                };
            });
        } else if (event.target.id === 'sortJoinedDate') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: false,
                    sortUserName: false,
                    sortJoinedDate: true,
                    sortType: false,
                };
            });
        } else if (event.target.id === 'sortLastName') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: true,
                    sortUserName: false,
                    sortJoinedDate: false,
                    sortType: false,
                };
            });
        } else {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: false,
                    sortUserName: false,
                    sortJoinedDate: false,
                    sortType: true,
                };
            });
        }
    };
 
    const [cartId, setCartId] = useState("");
    useEffect(() => {
        (async () => {
            await axios({
                method: 'GET',
                url: `https://localhost:7191/Cart/get-cartId-by-userId?id=${sessionStorage.getItem('userid')}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                setCartId(res.data);
                sessionStorage.setItem('cartId', res.data);
            }
            );
        }
        )();

    }, []);
    const handleAddToCart = (event) => {
        event.preventDefault();
        fetch(`        
        https://localhost:7191/Cart/add-to-cart?quantity=1`, {  
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
                productId : event.target.id,
                quantity: 1,
                cartId: cartId
              })
        })
        .then(res => 
            {  
            if(sessionStorage.getItem('login') === 'true'){
                // eslint-disable-next-line no-lone-blocks
                {
            if (res.status === 200) {
                alert("Đã thêm sản phẩm vào giỏ hàng của bạn");
            }
            else if (res.status === 400) {
                alert("Sản phẩm đã hết hàng");
            }
            else if (res.status === 500) {
                alert("Something went wrong");
                }
            }
            }
            else{
                window.location.href = "/login";
                alert("Bạn cần đăng nhập trước");
            }

        })
        .catch(err => {
            console.log(err);
        });

    }

  
    return isFirsttime ? (
        <div className="d-flex justify-content-center">
    <Spinner style={{marginTop:"15em"}} animation="border" variant="success" />
        </div>
    ):(
    <div>
        <Navbar />
<section className="col-sm-12">
<Carousel>
  <Carousel.Item interval={2500}>
    <img
      className="d-block w-100"
      src="/assets/images/1.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>A Magic Steeped In Poison</h3>
      <p>Tác phẩm mới nhất của nữ nhà văn Judy I. Lin.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={2500}>
    <img
      className="d-block w-100"
      src="/assets/images/banner1.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>The Lioness</h3>
      <p>Bộ ấn phẩm độc quyền của tiểu thuyết gia Chris Bohjalian.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={2500}>
    <img
      className="d-block w-100"
      src="/assets/images/banner2.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>The Hacienda</h3>
      <p>Khám phá tập thơ mới nhất của Isabel Cañas với ưu đãi 20%.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    
    <p style={{textAlign: 'center', marginTop: '10px'}}>CHÀO MỪNG BẠN ĐẾN VỚI CỬA HÀNG SÁCH TH BOOKS</p>
    <p style={{textAlign: 'center', marginTop: '10px'}}>
Sẵn sàng thưởng thức hàng ngàn cuốn sách, miễn phí giao hàng cho bất kì hoá đơn nào giá trị lớn hơn 100.000 VNĐ!</p>
<hr />

        </section>
       
        <section className="section-name padding-y-sm">
        <div className="container">
  
        <header className="section-heading">
        <Form className="d-flex mb-3 w-100">
            <h3 className="section-title">Vừa Ra Mắt!</h3>
            <FormControl
                    type="search"
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    placeholder="Tìm kiếm"
                    className="w-50"
                    style={{marginLeft: 'auto'}}
                    aria-label="Search"
                    id="searching"
                    onChange={handleChangeSearchText}
        />
        </Form>
        </header>
        
        {data.totalPages === 0 ? (
            <div className="alert alert-danger" role="alert">
            Không có sản phẩm nào được tìm thấy
            </div>
        ) : (
        <div className="row">
            {data.data.map((product)=>(
            <div key={product.productId} className="col-sm-3">
                <div className="card card-product-grid">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{marginRight: '1px'}}><a href={'https://localhost:7191/Photos/'+product.frontCover} className="img-wrap">
                         <span className="badge badge-danger">Mới</span>
                         {product.discount > 0 ? <span className="badge badge-success ml-5">-{product.discount}%</span> : null}
                     <img src={'https://localhost:7191/Photos/'+product.frontCover} className="img-fluid" alt="Bìa trước" /></a></div>
                    <div style={{marginLeft: '1px'}}><a href={'https://localhost:7191/Photos/'+product.backCover} className="img-wrap"> 
                    <img src={'https://localhost:7191/Photos/'+product.backCover} className="img-fluid" alt="Bìa sau" /></a></div>
                    </div>
                    <figcaption className="info-wrap">
                        <a href={`/details/${product.productId}`} className="title"><strong>{product.name}</strong></a>
                        <div className="price mt-1">
                           { product.discount> 0? <small className="text-muted"><del>{product.price}Đ</del></small> : null}
                            <span>
                            &nbsp;{CalculateDiscoutPrice(product.price, product.discount)}Đ
                            </span>
                        </div>
                        <div className="mt-1">
                            <button onClick={handleAddToCart} className="btn btn-success btn-sm float-right" id={product.productId}>Thêm vào giỏ</button>
                        </div>
                    </figcaption>
                </div>
            </div>
            ))}
            {data.pageSize > 8 ? (
                <div className="col-sm-12">
              <button onClick={reducePageSize} className="btn btn-danger" style={{width: '48%'}}>Giảm Bớt</button>
              <button onClick={handleChangePageSize} className="btn btn-success" style={{width: '48%', marginLeft:"4%"}}>Xem Thêm</button> 
                </div>  
            ) : 
            <button onClick={handleChangePageSize} className="btn btn-success btn-block mx-auto">Xem Thêm</button>
            }   
            
        </div>
        )}
        </div>

        
        </section>
      
        <section className="section-name padding-y bg">
        <div className="container">

        <div className="row">
        <div className="col-md-6">
            <h3>Ứng dụng TH Books đã có sẵn trên di động</h3>
            <p>Lựa chọn đường dẫn theo hệ điều hành của bạn</p>
        </div>
        <div className="col-md-6 text-md-right">
            <a href="https://play.google.com/store"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" height="40" /></a>
            <a href="https://www.apple.com/app-store/"><img src="assets/images/misc/appstore.png" height="40" /></a>
        </div>
        </div> 
        </div>
    </section>
    <Footer />
    </div>
    )
}