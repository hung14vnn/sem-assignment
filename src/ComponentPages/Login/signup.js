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
import {Alert} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React,{useEffect,useState} from 'react'
import Footer from '../Footer';

const theme = createTheme();

export default function Signup() {
  const [value, setValues] = React.useState({
    username: '',
    password: '',
  });


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

  const handleSubmit = (event) => {
    event.preventDefault();
   fetch('https://localhost:7191/User/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
    .then(response => response.json())  
    .then(function (response) {
      if(response === true){
        alert('Successfully Registered');
        window.location.href = '/login';
      }
      else{
        alert("Account Already Exists");
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
    if (!username) return 'Username is required';
    if (username.length < 3)
      return 'Username must be at least 3 characters long';
    const validUsername = String(username)
      .toLowerCase()
      .match(/^[a-z0-9]+$/);
    if (!validUsername) return 'Username can only contain letters and numbers';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (password.length > 32) return 'Password must be less than 32 characters';
    return '';
  };
  const errorMessage = {
    username: validateUsername(value.username),
    password: validatePassword(value.password),
  };
  const validForm = errorMessage.password || errorMessage.username;

  return (
    <div>
       <div className="col-xl-2 col-lg-3 col-md-4 col-6 ml-5">
                    <div className="logo">
                        <a href="/">
                            <img src="assets/images/logos/black.png" alt="logo" width="150px" />
                        </a>
                    </div>
                </div>
    <ThemeProvider theme={theme}>
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
            Sign Up
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={validForm}
              onClick={handleSubmit}
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
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
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
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