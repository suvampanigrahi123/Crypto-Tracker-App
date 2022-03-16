import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {SingleCoin} from '../config/api'
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from '../components/Banner/Carousel';
// import ReactHtmlParser from 'react-html-parser'
import parse from 'html-react-parser'
// import ReactHtmlParser from 'react-html-parser'
const useStyles=makeStyles((theme)=>({
  container:{
    display:'flex',
    [theme.breakpoints.down("md")]:{
      flexDirection:'column',
      alignItems:'center'
    },
  },
  sidebar:{
    width:'30%',
    [theme.breakpoints.down("md")]:{
      width:'100%',
    },
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:25,
    borderRight:'2px solid grey'
  },heading:{
    fontWeight:'bold',
    fontFamily:'Montserrat',
    marginBottom:20,
  },description:{
    width:'100%',
    fontFamily:'Montserrat',
    padding:25,
    paddingBottom:15,
    paddingTop:0,
    textAlign:'justify'

  },marketData:{
    alignSelf:"start",
    padding:25,
    paddingTop:10,
    width:'100%',
    //Responsive
    [theme.breakpoints.down('md')]:{
      display:'flex',
      justifyContent:'space-around'
    },
    [theme.breakpoints.down('sm')]:{
      flexDirection:'column',
      alignItems:'center'
    },
    [theme.breakpoints.down('xs')]:{
      alignItems:'start'
    },

  }
}));
const Coinpage = () => {
  const {id}=useParams();
  const [Coin, setCoin] = useState()
  const {Currency,Symbol}=CryptoState()
  const classes=useStyles();
  const fetchDetails=async ()=>{
    const {data}= await axios.get(SingleCoin(id))
    setCoin(data);
  }
  console.log(Coin);
  useEffect(()=>{
    fetchDetails();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[Currency])
  if(!Coin) return <LinearProgress style={{backgroundColor:'gold'}}/>
  return (
    <div className={classes.container}>
        <div className={classes.sidebar}>
            <img src={Coin?.image.large} alt={Coin.name} height='200' style={{marginBottom:20}} />
            <Typography variant='h4' className={classes.heading} >
              {Coin?.name}
            </Typography>
            <Typography variant='subtitle1'>
                {parse(Coin?.description.en.split('. ')[0])}
            </Typography>
            <div className={classes.marketData}>
            <span style={{display:'flex'}}>

                    <Typography variant='h6' className={classes.heading}>
                    Rank:{" "}
                    </Typography>
                    &nbsp;&nbsp;
                    <Typography variant='h6' style={{fontFamily:'Montserrat'}}>
                    {Coin?.market_cap_rank}
                    </Typography>
            </span>
            <span style={{display:'flex'}}>
                    <Typography variant='h6' className={classes.heading}>
                    CurrentPrice:{" "}
                    </Typography>
                    &nbsp;&nbsp;
                    <Typography variant='h6' style={{fontFamily:'Montserrat'}}>
                    {Symbol} {numberWithCommas(Coin?.market_data.current_price[Currency.toLowerCase()])}
                    </Typography>
            </span>
            <span style={{display:'flex'}}>

                    <Typography variant='h6' className={classes.heading}>
                    Market Cap:{" "}
                    </Typography>
                    &nbsp;&nbsp;
                    <Typography variant='h6' style={{fontFamily:'Montserrat'}}>
                    {Symbol}{" "}
                    {numberWithCommas(Coin?.market_data.market_cap[Currency.toLowerCase()]).toString().slice(0,-6)}
                    </Typography>
            </span>
            </div>
        </div>
        {/* chart */}
        <CoinInfo coin={Coin} />
    </div>
  )
}

export default Coinpage