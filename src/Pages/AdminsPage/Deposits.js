import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState,useEffect } from 'react';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const [dataDeposit, setDataDeposit] = useState(0);
  useEffect(()=>{
    fetch(`https://localhost:7191/Cart/money-amount-in-a-month?month=${month}&year=${year}`)
    .then(response => response.json())
    .then(json => setDataDeposit(json));
} ,[month,year]);

  return (
    <React.Fragment>
      <Title>Tổng Thu Tháng Này</Title>
      <Typography component="p" variant="h4">
        {dataDeposit} Đ
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        tính đến {new Date(Date.now()).toLocaleDateString('en-GB')}
      </Typography>
      <div>
        <Link color="primary" href="https://developer.paypal.com/developer/dashboard/sandbox" onClick={preventDefault}>
          Xem tài khoản 
        </Link>
      </div>
    </React.Fragment>
  );
}
