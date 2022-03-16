import React from 'react'
import {createTheme,AppBar,Container,Toolbar,makeStyles,Typography,MenuItem,Select,ThemeProvider} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
const useStyles=makeStyles(()=>({
  Title:{
    color:'gold',
    flex:1,
    fontFamily:'Montserrat',
    fontWeight:"bold",
    cursor:'pointer'
  }
}))
const Header = () => {
  const history=useHistory();
  const classes=useStyles();
  const darkTheme=createTheme({
    palette:{
      primary:{
        main:'#fff',
      },
      type:'dark'
    }
  })
  const {Currency,setCurrency}=CryptoState()
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
    <Container>
      <Toolbar>
        <Typography className={classes.Title} variant='h6'><span onClick={()=>history.push('/')} > Crypto Hunter </span> </Typography>
        <Select variant='outlined'
          style={{
            width:100,
            height:40,
            marginRight:15,
          }}
          onChange={(e)=>setCurrency(e.target.value)}
          value={Currency}
         >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem  value={"INR"}>INR</MenuItem>
        </Select>
      </Toolbar>
    </Container>
    </AppBar>
    </ThemeProvider>
    )
}

export default Header