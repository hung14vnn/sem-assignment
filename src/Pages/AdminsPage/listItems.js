import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Quản Lý" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/orders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Đơn hàng" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/customers" >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Khách Hàng" />
    </ListItemButton >
    <ListItemButton component="a" href="/admin/products">
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Sản Phẩm" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/intergrations">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Khác" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Báo Cáo
    </ListSubheader>
    <ListItemButton component="a" href="/admin/this-month">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Tháng Hiện Tại" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/prev-month">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Tháng Trước" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/this-year">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Năm Hiện Tại" />
    </ListItemButton>
  </React.Fragment>
);
