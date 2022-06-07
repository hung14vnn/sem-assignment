import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
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
import { mainListItems, secondaryListItems } from './listItems';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import ViewUserModal from './Modals/ViewUserModal';
import axios from "axios";
// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}


export default function Orders() {
const [cart, setCart] = useState({});
const [viewShow, setViewShow] = useState(false);
const handleViewClose = () => setViewShow(false);
const handleViewShow = (cart) => {
    setCart(cart);
    setViewShow(true);
}
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
const [pageSize, setPageSize] = useState(5);
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


    if (searchValue.trim().length > 0) {
        searchParams.append("SearchBy", "LastName");
        searchParams.append("SearchValue", searchValue);
    }
    searchParams.append("PageNumber", pageNumber);
    searchParams.append("PageSize", pageSize);
    searchParams.toString();
    

    axios({
        method: "GET",
        url: `https://localhost:7191/Cart/get-all-transactions?${searchParams}`,
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



const handleChangePageNumber = (number) => {
    setPageNumber(number);
}

const [dataUser, setDataUser] = useState();
useEffect(()=>{
  fetch('https://localhost:7191/User/GetUsers')
  .then(response => response.json())
  .then(json => setDataUser(json));
} ,[]
);

const [dataProduct, setDataProduct] = useState();
useEffect(() => {
fetch('https://localhost:7191/Product/get-raw-products')
  .then((response) => response.json())
  .then((json) => setDataProduct(json));
}, []);
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

  return (
    <React.Fragment>
      <Title>Đơn Hàng Gần Đây</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Giao Tới Địa Chỉ</TableCell>
            <TableCell>Trạng Thái</TableCell>
            <TableCell>Phương Thức Thanh Toán</TableCell>
            <TableCell align="right">Tổng Tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.map((cart, index) => (
            <TableRow key={cart.cartId}>
              <TableCell onClick={() => handleViewShow(cart)}>{new Date(cart.createdAt).toLocaleDateString('en-GB')}</TableCell>
              <TableCell onClick={() => handleViewShow(cart)}>{dataUser && dataUser.find(user => user.userId === cart.userId).fullName}</TableCell>
              <TableCell onClick={() => handleViewShow(cart)}>{dataUser && dataUser.find(user => user.userId === cart.userId).location}</TableCell>
              <TableCell onClick={() => handleViewShow(cart)}>{returnStatus(cart.status)}</TableCell>
              <TableCell onClick={() => handleViewShow(cart)}>
                {cart.payment === "1" ? 'Thanh toán khi nhận hàng' : `PayPal ****${cart.payment.substr(cart.payment.length - 4)}`}
              </TableCell>
              <TableCell onClick={() => handleViewShow(cart)} align="right">{`${cart.totalPrice}Đ`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/admin/orders" sx={{ mt: 3 }}>
        Xem tất cả
      </Link>
    </React.Fragment>
  );
}
