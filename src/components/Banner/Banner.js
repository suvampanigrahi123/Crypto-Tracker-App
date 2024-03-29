import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'
const useStyles=makeStyles(()=>({
  banner:{
    backgroundImage:"url(./banner2.jpg)"
  },
  bannerContent:{
    height:400,
    display:"flex",
    flexDirection:'column',
    paddingTop:25,
    justifyContent:'space-around'
  },
  tagLine:{
    display:'flex',
    height:'40%',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  }
}))
const Banner = () => {
  const classes=useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
            <div className={classes.tagLine}>
            <Typography variant='h2' style={{fontWeight:'bold',margin:'auto',width:'70%',textAlign:'center' ,fontFamily:'Montserrat'}}>
              Crypto Hunter
            </Typography>
            <Typography variant='subtitle2'
            style={{color:'darkgrey',textTransform:'capitalize',fontFamily:'Montserrat'}}
            >
              Get all the Info Regarding Your Favorite Crypto Currency
            </Typography>
            </div>
            <Carousel />
      </Container>
    </div>
  )
}

export default Banner