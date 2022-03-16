import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CryptoState } from '../../CryptoContext';
import { Link } from 'react-router-dom';
const useStyles=makeStyles(()=>({
    Carousel:{
        height:"50%",
        display:'flex',
        alignItems:'center'
    },
    CarouselItem:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      cursor:'pointer',
      textTransform:'uppercase',
      color:'white'
    }
}))
export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
const Carousel = () => {
  const [Trendings, setTrendings] = useState([])
    const Classes=useStyles();
    const {Currency,Symbol}=CryptoState()
    const fetchTrendingCoins=async ()=>{
      fetch(  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`).then((res)=>{
        res.json().then((result)=>{
                setTrendings(result)
        })
      })
    }
    const items=Trendings.map((coin)=>{
      let profit=coin.price_change_percentage_24h>=0;
      return(
        <Link className={Classes.CarouselItem} to={`/coins/${coin.id}`}>
        <img src={coin.image} alt={coin.name} height='80' style={{marginBottom:10}} />
        <span>
          {coin.symbol}
          &nbsp;
          <span style={profit?{color:'rgb(14,203,129)'}:{color:'red'}}>{profit && '+'} {coin.price_change_percentage_24h?.toFixed(2)}%</span>
        </span>
        <span style={{fontSize:22 ,fontWeight:500}} >
        {Symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
        </Link>
      )
    })
    useEffect(() => {
      fetchTrendingCoins()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Currency])
    const responsive={
      0:{
        items:2,
      },
      512:{
        items:4,
      },
    }
  return (
    <div className={Classes.Carousel}>
    <AliceCarousel  mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items}  />
    </div>
  )
}

export default Carousel