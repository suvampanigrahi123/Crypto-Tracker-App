import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import {HistoricalChart} from '../config/api'
import { createTheme ,ThemeProvider ,makeStyles} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
const CoinInfo = ({coin}) => {
  Chart.register(CategoryScale)
  const [HistoricalData, setHistoricalData] = useState()
  const [days,setDays]=useState(1);
  const {Currency}=CryptoState();
  const fetchHistrocialData=async()=>{
    const {data}=await axios(HistoricalChart(coin.id,days,Currency))
    setHistoricalData(data.prices)
  }
  console.log(HistoricalData);
  useEffect(()=>{
    fetchHistrocialData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[Currency,days])
  const darkTheme=createTheme({
    palette:{
      primary:{
        main:'#fff',
      },
      type:'dark'
    }
  })
  const useStyles=makeStyles((theme)=>({
    Container:{
      width:'75%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      marginTop:25,
      padding:40,
      [theme.breakpoints.down("md")]:{
        width:'100%',
        marginTop:0,
        padding:20,
        paddingTop:0,
      },
    },BuutonDiv:{
      display:'flex',
      marginTop:20,
      justifyContent:'space-around',
      width:'100%'
    },
  }))
  const classes=useStyles()
  return (
    <ThemeProvider theme={darkTheme} >
    <div className={classes.Container}>
    {
      !HistoricalData ?(
        <div>
        <CircularProgress style={{color:'gold'}} />
        <CircularProgress style={{color:'gold'}} />
        <CircularProgress style={{color:'gold'}} />
        </div>
      ):(
        <>
          <Line
          data={{
            labels:HistoricalData?.map((coin)=>{
              let date=new Date(coin[0]);
              let time=date.getHours() >12 ? `${date.getHours()-12}:${date.getMinutes()} PM`:`${date.getHours()}:${date.getMinutes()} AM`;
              return days===1 ?time:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
            }),
            datasets:[{
              data:HistoricalData.map((coin)=>coin[1]),
              label:`price (past ${days} Days) in ${Currency}`,
              borderColor:'#EEBC1D'
            }
            ],
          }}
          options={
            {
              elements:{
                points:{
                  radius:1
                },
              },
            }}
           />
           <div className={classes.BuutonDiv}>
             {
               chartDays.map((day)=>(
                 <SelectButton onClick={()=>setDays(day.value)} key={day.value} selected={day.value===days} >{day.label}</SelectButton>
               ))
             }
           </div>
        </>
      )
    } 
    </div>
    </ThemeProvider>
  )
}

export default CoinInfo