import React from 'react';
import {useState} from 'react';
import{Modal,Button,Row,Col,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {FormControl, InputLabel, NativeSelect} from '@mui/material';
export default function ViewUserModal(props) {
    const changeFormatDatetime = (value) => {
        let tempDatetime = new Date(value);
        return tempDatetime.toLocaleDateString('en-GB');
    }
    const [data, setData] = useState([]);
    
    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value});
    };
    const id = props.user.userId;
    const [isAdmin, setIsAdmin] = useState(props.user.isAdmin);
    const handleChangeAdmin = (event) => {
      setIsAdmin(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(data.fullName == null) {
            data.fullName = props.user.fullName;
        }
        if(data.email == null) {
            data.email = props.user.email;
        }
        if(data.phoneNumber == null) {
            data.phoneNumber = props.user.phoneNumber;
        }
        if(data.location == null) {
            data.location = props.user.location;
        }
        if(data.isAdmin == null) {
            data.isAdmin = props.user.isAdmin;
        }
        
         fetch(`https://localhost:7191/User/update-user-by-admin?id=${id}`, {  
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                location: data.location,
                isAdmin: data.isAdmin
            }),
  
        })
        .then(response => 
            {
                if(response.status === 200){
                    alert("Đã cập nhật thành công");
                    window.location.reload();
                }
                else if
                (response.status === 400)
                {
                    alert("Bạn cần nhập đầy đủ thông tin trong lần đâu tiên cập nhật");
                }
                else 
                {
                    alert("Có lỗi xảy ra");
                }
            }
        )
        }

    const handleDisable = (event) => {
        event.preventDefault();
        fetch(`https://localhost:7191/User/disable-active-user?id=${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res !== null) {
                    window.location.reload();
                    alert("Đã cập nhật trạng thái người dùng");
                }
            })
            .catch(error => console.error('Error:', error));

    }
    
    
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            USER INFORMATION
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <Form.Label>UID</Form.Label>
                    <Form.Control type="text" placeholder="UID" defaultValue={props.user.userId} readOnly />
                </Col>
                <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={handleChange} name="fullName" type="text" placeholder="Name" defaultValue={props.user.fullName}  />
                </Col>
                <Col>
                    <Form.Label>Member From</Form.Label>
                    <Form.Control type="text" placeholder="Member From"  defaultValue={changeFormatDatetime(props.user.createdAt)} readOnly/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="username" placeholder="Username" defaultValue={props.user.username} readOnly/>
                </Col>
                <Col>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="phoneNumber" placeholder="Phone Number" defaultValue={props.user.phoneNumber} />
                </Col>
                <Col>
                    <Form.Label>Last Update</Form.Label>
                    <Form.Control type="text" placeholder="Last Update" defaultValue={changeFormatDatetime(props.user.updatedAt)} readOnly/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="email" placeholder="Email" defaultValue={props.user.email} />
                </Col>
                <Col>
                <FormControl fullWidth style={{margin:"10px"}}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Role</InputLabel>
                    <NativeSelect
                    name="isAdmin"
                    onChange={handleChangeAdmin}
                    defaultValue={props.user.isAdmin}
                        inputProps={{
                          name: 'isAdmin',
                          id: 'uncontrolled-native',
             }}
              >
                  
                  <option value={true}>Admin</option>
                  <option value={false}>User</option>
                </NativeSelect>
                    </FormControl>
                </Col>
                <Col>
                    <Form.Label>Location</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="location" placeholder="Location" defaultValue={props.user.location} />
                </Col>
                
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <p style={{marginRight:'20px'}}>Tài khoản này đang {props.user.isActive ? 'hoạt động' : 'bị khoá'} </p>
            <Button onClick={handleSubmit}>Cập Nhật</Button>
            {(props.user.isActive ? <Button variant='danger' onClick={handleDisable}>Khoá</Button>
            : <Button variant="success" onClick={handleDisable}>Mở Khoá</Button>)}
        </Modal.Footer>
        </Modal>
    );
}