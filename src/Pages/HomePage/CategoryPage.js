import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from '../../ComponentPages/Navbar';
import Footer from '../../ComponentPages/Footer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TryRounded } from '@mui/icons-material';


export default function CategoryPage() {
    const categoryId = useParams().id;
    // const ctx = useContext(AuthContext);
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

    const [sortBy, setSortBy] = useState("");
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
        if (sortBy === "1") {
            searchParams.append("SortBy", "Name");
        }
        if (sortBy === "2") {
            searchParams.append("SortBy", "NameDesc");
        }
        if (sortBy === "3") {
            searchParams.append("SortBy", "Price");
        }
        if (sortBy === "4") {
            searchParams.append("SortBy", "PriceDesc");
        }
        if (sortBy === "5") {
            searchParams.append("SortBy", "CreatedDate");
        }
        if (sortBy === "6") {
            searchParams.append("SortBy", "CreatedDateDesc");
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
            url: `https://localhost:7191/Product/GetAllProductsByCategory?${searchParams}&id=${categoryId}`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
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
    }, [sortBy,  sortASC, searchValue, pageNumber, pageSize]);

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
    const handleClickSortBy= (e) => {
        setSortBy(e.target.value);
        setPageNumber(1);
    }
    const [categoryName, setCategoryName] = useState("");
    useEffect(() => {
      fetch(`https://localhost:7191/Category/GetCategoryById?id=${categoryId}`)
        .then(res => res.json())
        .then((json) => {
            setCategoryName(json.name);
        });
    }, []);
    
    const [dataPublisher, setDataPublisher] = useState();
    useEffect(() => {
      fetch('https://localhost:7191/Publisher/get-raw-publishers')
        .then((response) => response.json())
        .then((json) => setDataPublisher(json));
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
                cartId: sessionStorage.getItem("cartId")
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
   
    return(
    <div>
        <Navbar />
        <section className="section-name padding-y-sm">
            <div className="container">
                <div className="row"> 
                    <div className="col-md-12">
                        <h4 className="title-section">
                            <span>
                                <TryRounded />
                            </span>
                            <span>
                                Danh Sách Sản Phẩm Theo Thể Loại {categoryName}
                            </span>
                        </h4>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>Sắp xếp</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={handleClickSortBy}>
                                        <option value="">Chọn</option>
                                        <option value="1">Tên ↑ </option>
                                        <option value="2">Tên ↓ </option>
                                        <option value="3">Giá ↑</option>
                                        <option value="4">Giá ↓</option>
                                        <option value="5">Ngày bán ↑</option>
                                        <option value="6">Ngày bán ↓</option>
                                    </select>
                                   
                                </div>
                          </div>
                        </div> 
                    </div> 
                </div>  
            </div>

        <div className="container">
        <div className="row">
            {data.data.map((product)=>(
            <div key={product.productId} className="col-sm-3">
                <div className="card card-product-grid">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{marginRight: '1px'}}><a href={'https://localhost:7191/Photos/'+product.frontCover} className="img-wrap">
                         {product.discount > 0 ? <span className="badge badge-success">-{product.discount}%</span> : null}
                     <img src={'https://localhost:7191/Photos/'+product.frontCover} className="img-fluid" alt="Front cover" /></a></div>
                    <div style={{marginLeft: '1px'}}><a href={'https://localhost:7191/Photos/'+product.backCover} className="img-wrap"> <img src={'https://localhost:7191/Photos/'+product.backCover} className="img-fluid" alt="Back cover" /></a></div>
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
              <button onClick={reducePageSize} className="btn btn-danger" style={{width: '50%'}}>Giảm Bớt</button>
              <button onClick={handleChangePageSize} className="btn btn-success" style={{width: '50%'}}>Xem Thêm</button> 
                </div>  
            ) :  <button onClick={handleChangePageSize} className="btn btn-success btn-block">Xem Thêm</button>}
            
        </div>
        
        </div>
    
        </section>
      
    <Footer />
    </div>
    )
}