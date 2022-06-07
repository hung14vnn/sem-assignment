import React, { Component } from 'react';
import {useEffect, useState, useContext} from 'react';
import{Modal,Button,Row,Col,Form} from 'react-bootstrap';
import {FormControl, InputLabel, NativeSelect, TextField} from '@mui/material';
import axios from 'axios';
export default function ViewUserModal(props) {
    const [data, setData] = useState(props.product);
    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value});

    };
    const id = props.product.productId
    const handleSubmit = (event) => {
        event.preventDefault();
        if(data.name == null) {
            data.name = props.product.name;
        }
        if(data.price == null) {
            data.price = props.product.price;
        }
        if(data.description == null) {
            data.description = props.product.description;
        }
        if(data.authorId == null) {
            data.authorId = props.product.authorId;
        }
        if(data.categoryId == null) {
            data.categoryId = props.product.categoryId;
        }
        if(data.publisherId == null) {
            data.publisherId = props.product.publisherId;
        }
        if(data.discount == null) {
            data.discount = props.product.discount;
        }
        if(data.quantity == null) {
            data.quantity = props.product.quantity;
        }
        if(data.language == null) {
            data.language = props.product.language;
        }
         axios({
                method: 'PUT',
                url: `https://localhost:7191/Product/update-product?id=${id}`,
                data: {
                    "Name": data.name,
                    "Price": data.price,
                    "Description": data.description,
                    "CategoryId": data.categoryId,
                    "PublisherId": data.publisherId,
                    "AuthorId": data.authorId,
                    "Language": data.language,
                    "Discount": data.discount,
                    "Quantity": data.quantity
                },
        })
        .then(response => {
            if(response.data != null){
                alert("Product Updated");
                window.location.reload();
            }
            else{
                alert("Request not found");
            }
        })
    };

    const handleDisable = (event) => {
        event.preventDefault();
        fetch(`https://localhost:7191/Product/delete-product?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res !== null) {
                    window.location.reload();
                    alert("Đã xoá");
                }
            })
            .catch(error => alert("Lỗi"+error));


    }
    const [dataAuthor, setDataAuthor] = useState();
    useEffect(() => {
      fetch('https://localhost:7191/Author/get-raw-authors')
        .then((response) => response.json())
        .then((json) => setDataAuthor(json));
    }, []);
    
    const [dataCategory, setDataCategory] = useState();
    useEffect(() => {
      fetch('https://localhost:7191/Category/get-raw-category')
        .then((response) => response.json())
        .then((json) => setDataCategory(json));
    }, []);
    
    const [dataPublisher, setDataPublisher] = useState();
    useEffect(() => {
      fetch('https://localhost:7191/Publisher/get-raw-publishers')
        .then((response) => response.json())
        .then((json) => setDataPublisher(json));
    }, []);


    
    
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
            THÔNG TIN SẢN PHẨM
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <Form.Label>PID</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="pid" placeholder="PID" defaultValue={props.product.productId} readOnly />
                </Col>
                <Col>
                    <Form.Label>Tên</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="name" placeholder="Name" defaultValue={props.product.name} />
                </Col>
                <Col>
                    <Form.Label>Ngôn Ngữ</Form.Label>
                    <Form.Control  onChange={handleChange} type="text" name="language" placeholder="Language" defaultValue={props.product.language}/>
                </Col>
                </Row>
                <Row>
                <Col>
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="quantity" placeholder="Quantity" defaultValue={props.product.quantity}/>
                </Col>
                <Col>
                    <Form.Label>Giá</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="price" placeholder="Price" defaultValue={props.product.price} />
                </Col>
                <Col>
                    <Form.Label>Giảm Giá</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="discount" placeholder="Discount" defaultValue={props.product.discount} />
                </Col>   
                </Row>
                <Col>
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control style={{marginBottom:"10px"}} onChange={handleChange} as="textarea" rows="3" name="description" placeholder="Description" defaultValue={props.product.description} />
                </Col>
                <Row>
                <Col>
                    <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Thể Loại</InputLabel>
                    <NativeSelect
                    onChange={handleChange}
                    defaultValue={props.product.categoryId}
                    inputProps={{
                    name: 'categoryId',
                    id: 'uncontrolled-native',
             }}
              >
                  
            {dataCategory && dataCategory.map(c => (
                <option value={c.categoryId}>
                       <div>
                            {c.name}
                       </div>
                    </option>
            ))}
  </NativeSelect>
</FormControl>
                </Col>
                <Col>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Tác Giả</InputLabel>
                    <NativeSelect
                    onChange={handleChange}
                    defaultValue={props.product.authorId}
                    inputProps={{
                    name: 'authorId',
                    id: 'uncontrolled-native',
             }}
              >
                  
            {dataAuthor && dataAuthor.map(c => (
                <option value={c.authorId}>
                       <div>
                            {c.name}
                       </div>
                    </option>
            ))}
  </NativeSelect>
</FormControl>
                </Col>
                <Col>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">NXB</InputLabel>
                    <NativeSelect
                    onChange={handleChange}
                    defaultValue={props.product.publisherId}
                    inputProps={{
                    name: 'publisherId',
                    id: 'uncontrolled-native',
             }}
              >
                  
            {dataPublisher && dataPublisher.map(c => (
                <option value={c.publisherId}>
                       <div>
                            {c.name}
                       </div>
                    </option>
            ))}
  </NativeSelect>
</FormControl>
                </Col>

                </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSubmit}>Cập Nhật</Button>
             <Button className='btn btn-danger' onClick={handleDisable}>Xoá</Button>
        </Modal.Footer>
        </Modal>
    );
}