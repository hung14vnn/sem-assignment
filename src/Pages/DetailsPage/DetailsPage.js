
import React, {useEffect, useState, useContext} from 'react';
import {useParams,Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import Footer from '../../ComponentPages/Footer';
import Navbar from '../../ComponentPages/Navbar';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import{Modal,Row,Col,Form} from 'react-bootstrap';


export default function DetailsPage() {

    const [data, setData] = useState();
    const productID = useParams().id;
    const [rating, setRating] = useState(0);
    const handleRatingChange = (event, newValue) => {
      setRating(newValue);
  };
    const[quantity,setQuantity]=useState(1);
    // const labels = {
    //   1: 'Rất Không Tốt',
    //   1.5: 'Không Tốt',
    //   2: 'Dưới Trung Bình',
    //   2.5: 'Trung Bình',
    //   3: 'Trên Trung Bình',
    //   3.5: 'Tương Đối Tốt',
    //   4: 'Khá Tốt',
    //   4.5: 'Tốt',
    //   5: 'Rất Tốt',
    // };

    const handleIncreasement=()=>{
      if(quantity<data?.quantity)
        setQuantity(quantity+1);
      else alert(`Chúng tôi chỉ còn lại ${data?.quantity} ${data?.name} trong cửa hàng :(`);
    }
   
    const handleDecreasement=()=>{
        if(quantity>1){
            setQuantity(quantity-1);
        }
    }

    const cartId = sessionStorage.getItem("cartId");
    const handleAddToCart = (event) => {
      event.preventDefault();
      fetch(`        
      https://localhost:7191/Cart/add-to-cart?quantity=${quantity}`, {  
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
              productId : productID,
              quantity: quantity,
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

    useEffect(()=>{
        fetch('https://localhost:7191/Product/GetProductsById?id='+productID)
        .then(response => response.json())
        .then(data => {
            setData(data);
        }
        )
    },[])
    const [relatedProducts,setRelatedProducts]=useState();
    useEffect(()=>{
        fetch(`https://localhost:7191/Product/get-raw-products`)
        .then(response => response.json())
        .then(json => setRelatedProducts(json));
    } ,[]
    );
   
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
;    
    const [dataPublisher, setDataPublisher] = useState();
    useEffect(() => {
      fetch('https://localhost:7191/Publisher/get-raw-publishers')
        .then((response) => response.json())
        .then((json) => setDataPublisher(json));
    }, []);
 
    const [dataUser, setDataUser] = useState();
    useEffect(() => {
      fetch('https://localhost:7191/User/GetUsers')
        .then((response) => response.json())
        .then((json) => setDataUser(json));
    }, []);
    const[value, setValue] = useState(0);
    const [commnent, setCommnent] = useState("");
    useEffect(() => {
      fetch(`https://localhost:7191/Product/get-comments-by-product?id=${productID}`)
        .then(response => response.json())
        .then(json => {
          let sum = 0;
          json.forEach(element => {
            sum += element.ratingValue;
          });
          setValue(sum / json.length);
          setCommnent(json);
        }
        )

    }, []);
    const [dataComment, setDataComment] = useState();
    const handleChange = (event) => {
      setDataComment(event.target.value);
    };
    const handlePostComment = (event) => {
      event.preventDefault();
      fetch(`https://localhost:7191/Product/add-comment`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: productID,
          userId: sessionStorage.getItem("userid"),
          ratingValue: rating,
          comment: dataComment
        })
      })
        .then(res => {
          if (res.status === 200) {
            alert("Đã bình luận");
            window.location.reload();
          }
          else if (res.status === 400) {
            alert("Bạn chưa đăng nhập");
          }
          else if (res.status === 500) {
            alert("Something went wrong");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }


  const CalculateDiscoutPrice = (price, discount) => {
      return (price * (100-discount)) / 100;
  }
  const getProductStatus=(quantity) => {
    if(quantity > 0)
    {
      return "Còn hàng";
    }
    else
    {
      return "Hết hàng";
    }
 
  }
  const getFreeShipping=(price, discount) => {
    if((price * (100-discount)) / 100 > 100000)
    {
      return "Có";
    }
    else
    {
      var remainPrice = (100000 - (price * (100-discount)) / 100)
      return `Mua thêm ${remainPrice}Đ để được miễn phí giao hàng`;
    }
  }
  const changeFormatDatetime = (value) => {
    let tempDatetime = new Date(value);
    return tempDatetime.toLocaleDateString('en-GB');
}
    return (
      <div>
        <Navbar/>
    <div className="bg-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-0"><a href="/" style={{textDecoration: 'none'}}>Trang chủ</a> <span className="mx-2 mb-0">/</span> 
          <a  style={{textDecoration: 'none'}} href={`/categories/${data?.categoryId}`}>{
                dataCategory?.map(item => {
                  if(item.categoryId === data?.categoryId)
                  {
                    return item.name;
                  }
                })
              }</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">{data?.name}</strong></div>
        </div>
      </div>
    </div>

    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mr-auto">
            <div className="border text-center">
                    <Carousel>
                    <Carousel.Item >
                      <a href={'https://localhost:7191/Photos/'+data?.preview} className="img-wrap" tooltip="Đọc thử quyển này">
                      <img src={'https://localhost:7191/Photos/'+data?.frontCover} alt="Front cover" className="img-fluid"/>
                      </a>
                    </Carousel.Item>
                    <Carousel.Item>
                    <a href={'https://localhost:7191/Photos/'+data?.preview} className="img-wrap" tooltip="Đọc thử quyển này">
                      <img src={'https://localhost:7191/Photos/'+data?.backCover} alt="Back cover" className="img-fluid"/>
                      </a>
                    </Carousel.Item>
                    </Carousel>
            </div>
            
          </div>
          <div className="col-md-6">
            <h2 className="text-black">{data?.name}</h2>
            <p>{data?.description}</p>
            <p><i>Nhấn vào bìa sách bên cạnh để xem thử cuốn sách này.</i></p>
            <p>{ data?.discount > 0 ? <del>{data?.price}Đ</del>: null } <strong className="text-success h4">{CalculateDiscoutPrice(data?.price, data?.discount)}Đ</strong></p>
            <p className="text-success">{getProductStatus(data?.quantity)}</p>

            <div className="mb-5">
              <div className="input-group mb-3" style={{maxWidth: '120px'}}>
                <div className="input-group-prepend">
                  <button onClick={handleDecreasement} className="btn btn-danger js-btn-minus" type="button">&minus;</button>
                </div>
                <input type="text" className="form-control text-center" readOnly value={quantity} aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                <div className="input-group-append">
                  <button onClick={handleIncreasement} className="btn btn-success js-btn-plus" type="button">&#43;</button>
                </div>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn btn-lg btn-success">Thêm Sản Phẩm</button>
            
            <div className="mt-5">
              <ul className="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                    aria-controls="pills-home" aria-selected="true">Chi Tiết Sản Phẩm</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                    aria-controls="pills-profile" aria-selected="false">Thông Tin Đặt Hàng</a>
                </li>
            
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <table className="table custom-table">
                    <thead>
                      <th>Tác Giả</th>
                      <th>NXB</th>
                      <th>Thể Loại</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{dataAuthor?.map(item => {
                          if(item.authorId === data?.authorId)
                          {
                            return item.name;
                          }
                        })}</td>
                        <td>{dataPublisher?.map(item => {
                          if(item.publisherId === data?.publisherId)
                          {
                            return item.name;
                          }
                        })}</td>
                        <td>{dataCategory?.map(item => {
                          if(item.categoryId === data?.categoryId)
                          {
                            return item.name;
                          }
                        })}</td>


                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            
                  <table className="table custom-table">
            
                    <tbody>
                      <tr>
                        <td>Có Sẵn</td>
                        <td className="bg-light">{getProductStatus(data?.quantity)} (Còn lại {data?.quantity} )</td>
                      </tr>
                      <tr>
                        <td>Miễn Phí Giao Hàng</td>
                        <td className="bg-light">{getFreeShipping(data?.price, data?.discount)}</td>
                      </tr>
                      <tr>
                        <td>Ngày Thêm</td>
                        <td className="bg-light">{changeFormatDatetime(data?.createdAt)}</td>
                      </tr>
                      <tr>
                        <td>Sửa Lần Gần Nhất</td>
                        <td className="bg-light">{changeFormatDatetime(data?.updatedAt)}</td>
                      </tr>
                    </tbody>
                  </table>
            
                </div>
            
              </div>
            </div>

    
          </div>
        </div>
      </div>
    </div>
        {/* comment section */}
        <div className="site-section bg-light">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <h2>Bình Luận</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mb-5">
                <form action="#" className="p-5 bg-white">
                  <h2 className="h4 text-black mb-5">Viết Bình Luận</h2>
                  <div className="form-group row">
                    <div className="col-md-6 mb-lg-0">
                      <h5 className="text-black">Đánh Giá</h5>
                    </div>
                  </div>
                  <div className="form-group row">
                  <div>
                    <Rating
                          name="simple-controlled"
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                      />
                    </div>
                    <div className="col-md-12">
                    <Form.Control onChange={handleChange} as="textarea" rows={3} name="name" placeholder="Nội dung" value={dataComment} /> 
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6 mr-auto">
                      <input onClick={handlePostComment} className="btn btn-success text-white py-3 px-5" value="Gửi Bình Luận" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="p-4 mb-3 bg-white">
                  <h3 className="h5 text-black mb-3">Đánh giá sản phẩm</h3>
                  <div className="p-4 mb-3 bg-white">
                  <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {/* <Box sx={{ ml: 2 }}>{labels[value]}</Box> */}
    </Box>
                </div>
                <div className="p-4 mb-3 bg-white">
                  <h3 className="h5 text-black mb-3">Bình Luận Khác</h3>
                  <div className="p-4 mb-5 bg-white">
                    {
                    commnent && commnent.map((comment, index) => (
                      <div className="review mb-5" key={index}>
                        <p className="meta">
                         {dataUser.find(user => user.userId === comment.userId).fullName ? <span className="mr-3"><i className="icon-person" /> {dataUser && dataUser.find(user => user.userId === comment.userId).fullName}</span> : 
                         <span className="mr-3"><i className="icon-person" /> {dataUser && dataUser.find(user => user.userId === comment.userId).username}</span>}         
                          <span className="mr-3"><i className="icon-calendar" /> {changeFormatDatetime(comment.createdAt)}</span>
                        </p>
                        <Rating defaultValue={comment.ratingValue} readOnly />
                        <p>
                          {comment.comment}
                        </p>
                      </div>
                    ))  
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* related product */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Sản Phẩm Liên Quan</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 block-3 products-wrap">
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              items={4}
              autoplay
              autoplayTimeout={1000}
              autoplayHoverPause
              responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 4 },
              }}
            >
              {relatedProducts && relatedProducts.map((product, index) => (
                <div className="card" key={index}>
                  <div className="block-4 text-center">
                    <figure className="block-4-image">
                      <a href={`/details/${product.productId}`}>
                        <img src={'https://localhost:7191/Photos/'+product.frontCover} alt="placeholder" className="img-fluid" style={{maxHeight:"350px"}} />
                      </a>
                    </figure>
                    <div className="block-4-text p-4">
                      <h5>{product.name}</h5>
                      <p className="text-primary font-weight-bold">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}

            </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}



