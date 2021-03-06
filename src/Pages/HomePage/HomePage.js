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
                alert("???? th??m s???n ph???m v??o gi??? h??ng c???a b???n");
            }
            else if (res.status === 400) {
                alert("S???n ph???m ???? h???t h??ng");
            }
            else if (res.status === 500) {
                alert("Something went wrong");
                }
            }
            }
            else{
                window.location.href = "/login";
                alert("B???n c???n ????ng nh???p tr?????c");
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
      <p>T??c ph???m m???i nh???t c???a n??? nh?? v??n Judy I. Lin.</p>
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
      <p>B??? ???n ph???m ?????c quy???n c???a ti???u thuy???t gia Chris Bohjalian.</p>
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
      <p>Kh??m ph?? t???p th?? m???i nh???t c???a Isabel Ca??as v???i ??u ????i 20%.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    
    <p style={{textAlign: 'center', marginTop: '10px'}}>CH??O M???NG B???N ?????N V???I C???A H??NG S??CH TH BOOKS</p>
    <p style={{textAlign: 'center', marginTop: '10px'}}>
S???n s??ng th?????ng th???c h??ng ng??n cu???n s??ch, mi???n ph?? giao h??ng cho b???t k?? ho?? ????n n??o gi?? tr??? l???n h??n 100.000 VN??!</p>
<hr />

        </section>
       
        <section className="section-name padding-y-sm">
        <div className="container">
  
        <header className="section-heading">
        <Form className="d-flex mb-3 w-100">
            <h3 className="section-title">V???a Ra M???t!</h3>
            <FormControl
                    type="search"
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    placeholder="T??m ki???m"
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
            Kh??ng c?? s???n ph???m n??o ???????c t??m th???y
            </div>
        ) : (
        <div className="row">
            {data.data.map((product)=>(
            <div key={product.productId} className="col-sm-3">
                <div className="card card-product-grid">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{marginRight: '1px'}}><a href={'https://localhost:7191/Photos/'+product.frontCover} className="img-wrap">
                         <span className="badge badge-danger">M???i</span>
                         {product.discount > 0 ? <span className="badge badge-success ml-5">-{product.discount}%</span> : null}
                     <img src={'https://localhost:7191/Photos/'+product.frontCover} className="img-fluid" alt="B??a tr?????c" /></a></div>
                    <div style={{marginLeft: '1px'}}><a href={'https://localhost:7191/Photos/'+product.backCover} className="img-wrap"> 
                    <img src={'https://localhost:7191/Photos/'+product.backCover} className="img-fluid" alt="B??a sau" /></a></div>
                    </div>
                    <figcaption className="info-wrap">
                        <a href={`/details/${product.productId}`} className="title"><strong>{product.name}</strong></a>
                        <div className="price mt-1">
                           { product.discount> 0? <small className="text-muted"><del>{product.price}??</del></small> : null}
                            <span>
                            &nbsp;{CalculateDiscoutPrice(product.price, product.discount)}??
                            </span>
                        </div>
                        <div className="mt-1">
                            <button onClick={handleAddToCart} className="btn btn-success btn-sm float-right" id={product.productId}>Th??m v??o gi???</button>
                        </div>
                    </figcaption>
                </div>
            </div>
            ))}
            {data.pageSize > 8 ? (
                <div className="col-sm-12">
              <button onClick={reducePageSize} className="btn btn-danger" style={{width: '48%'}}>Gi???m B???t</button>
              <button onClick={handleChangePageSize} className="btn btn-success" style={{width: '48%', marginLeft:"4%"}}>Xem Th??m</button> 
                </div>  
            ) : 
            <button onClick={handleChangePageSize} className="btn btn-success btn-block mx-auto">Xem Th??m</button>
            }   
            
        </div>
        )}
        </div>

        
        </section>
      
        <section className="section-name padding-y bg">
        <div className="container">

        <div className="row">
        <div className="col-md-6">
            <h3>???ng d???ng TH Books ???? c?? s???n tr??n di ?????ng</h3>
            <p>L???a ch???n ???????ng d???n theo h??? ??i???u h??nh c???a b???n</p>
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