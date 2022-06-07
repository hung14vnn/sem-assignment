import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


export default function Navbar() {
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

const isLoggedIn = sessionStorage.getItem("login");
const username = sessionStorage.getItem("username");
function Logout() {
    window.sessionStorage.clear();
    window.location.href = '/login';
  }
  
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
const [pageSize, setPageSize] = useState(10);
const searchParams = new URLSearchParams();

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
        url: `https://localhost:7191/Category/GetAllCategories`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
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
    setPageSize(e.target.value);
    setPageNumber(1);   
}

const handleChangePageNumber = (number) => {
    setPageNumber(number);
}
const quantityChange = sessionStorage.getItem("quantityChange");
const [quantity,setQuantity] = useState(0);
useEffect(() => {
    (async () => {
        await axios({
            method: 'GET',
            url: `https://localhost:7191/Cart/get-cart-items?id=${sessionStorage.getItem("cartId")}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            setQuantity(response.data.length);
        }).catch(error => {
            console.log(error);
        }
        );
    })();
}, [quantityChange]);
const isAdmin = sessionStorage.getItem("isAdmin");

  
    return(
        <div className="App">
        <header className="section-header">
   
           <section className="header-main border-bottom">
               <div className="container">
           <div className="row align-items-center">
                <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                    <div className="logo">
                        <a href="/">
                            <img src="assets/images/logos/black.png" alt="logo" width="150px" />
                        </a>
                    </div>
                </div>
               <div className="col-lg-6 col-sm-12">
                  
               </div> 
               <div className="col-lg-4 col-sm-6 col-12">
                   <div className="widgets-wrap float-md-right">
                       <div className="widget-header  mr-3">
                           <a href="/cart" className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart"></i></a>
                           <span className="badge badge-pill badge-danger notify">{quantity === 0 ? null : quantity}</span>
                
                       </div>
                       <div className="widget-header icontext">
                           <a href="/user" className="icon icon-sm rounded-circle border"><i className="fa fa-user"></i></a>
                           <div className="text">
                               <span className="text-muted">Xin chào {username}!</span>
                               <div> 
                                   {(isLoggedIn ?
                                     <Button href="/login" style={{ textDecoration:'none'}} onClick={Logout}>Đăng xuất</Button> : <Button href="/login" style={{textDecoration:'none'}} >Đăng nhập</Button>)}
                               </div>
                           </div>
                       </div>
   
                   </div> 
               </div> 
           </div> 
               </div> 
           </section>
   
   
   
           <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
             <div className="container">
   
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
               </button>
   
               <div className="collapse navbar-collapse" id="main_nav">
                 <ul className="navbar-nav">
                 <li className="nav-item dropdown">
                 {isAdmin === "true" ? <a className="nav-link" href="/admin">Quản Lý</a> : null}
                    </li>
                    <li className="nav-item dropdown">
                     <a className="nav-link" href="/">Trang Chủ</a>
                   </li>
                  {data.data.map((category)=>(
            <div key={category.categoryId}>
              <li className="nav-item dropdown">
            <a className="nav-link" href={`/categories/${category.categoryId}`}>{category.name}</a>
            </li>
            </div>
            ))}
                 </ul>
               </div>
             </div>
           </nav>
   
           </header>
           </div>
    )

}
