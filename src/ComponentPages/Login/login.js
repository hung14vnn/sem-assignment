import { FormHelperText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer';

const theme = createTheme();

export default function Login() {
  const [value, setValues] = React.useState({
    username: '',
    password: '',
  });
  const [login,setLogin] = useState(false);

  const [touched, setTouched] = React.useState({
    username: false,
    password: false,
  });


  const handleChange = (event) => {
    setValues({
      ...value,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
    if(sessionStorage.getItem("login")){
      setLogin(true)
    }
},[])
const handleCheckAdmin = (event) => {
  event.preventDefault();
  fetch('https://localhost:7191/User/getUserPermission?username='+value.username)
  .then(response => response.json()) 
  .then(function (response) {
   if(response === true){
    sessionStorage.setItem('isAdmin',true);
   }
  } 
  );
}



if(login){
  window.location.href = '/';
}


  const handleSubmit = (event) => {
    event.preventDefault();
   fetch('https://localhost:7191/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })  
      .then(function (response) {
        if(response.status === 404){
          alert("Tài khoản hoặc mật khẩu không đúng");
        }
        else if (response.status === 200){
          sessionStorage.setItem('login',true);
          sessionStorage.setItem('username',value.username);
          handleCheckAdmin(event);
          response.json().then(function(data){;
            sessionStorage.setItem('userid',data.userId);
          });
          window.location.reload();        }
        else{
          alert("Tài khoản của bạn đã bị khóa, vui lòng liên hệ với chúng tôi để được hỗ trợ");
        }
      })
  };


  const handleInputBlur = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };

 


  const validateUsername = (username) => {
    if (!username) return 'Username không được để trống';
    if (username.length < 3)
      return 'User name phải có ít nhất 3 ký tự';
    const validUsername = String(username)
      .toLowerCase()
      .match(/^[a-z0-9]+$/);
    if (!validUsername) return 'Username chứa kí tự không hợp lệ';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password không được để trống';
    if (password.length < 8) return 'Password phải có ít nhất 8 ký tự';
    if (password.length > 32) return 'Password không được nhiều hơn 32 ký tự';
    return '';
  };
  const errorMessage = {
    username: validateUsername(value.username),
    password: validatePassword(value.password),
  };
  const validForm = errorMessage.password || errorMessage.username;

  return (
    <div>
      
    <ThemeProvider theme={theme}>
    <div className="col-xl-2 col-lg-3 col-md-4 col-6 ml-5">
                    <div className="logo">
                        <a href="/">
                            <img src="assets/images/logos/black.png" alt="logo" width="150px" />
                        </a>
                    </div>
                </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Nhập
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={value.username}
              onChange={handleChange}
              onBlur={handleInputBlur}
            />
            {touched.username && (
            <FormHelperText
              style={{ display: 'flex', color: 'red' }}
            >
              {errorMessage.username}
            </FormHelperText>
          )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={value.password}
              onChange={handleChange}
              onBlur={handleInputBlur}
            />
            {touched.password && (
            <FormHelperText
              style={{ display: 'flex', color: 'red' }}
            >
              {errorMessage.password}
            </FormHelperText>
          )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={validForm}
              onClick={handleSubmit}
              sx={{ mt: 2, mb: 2 }}
            >
              Đăng Nhập
            </Button>
            <Grid container>
              <Grid item xs>
                  _________________________________________________________________________________________         
              </Grid>
              </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?            
                </Link>
              </Grid>
              <Grid item style={{marginBottom:'100px'}}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    <Footer/>
    </div>
  );
}