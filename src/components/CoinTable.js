import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import {CoinList} from '../config/api'
import {Container, createTheme,LinearProgress,makeStyles,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,ThemeProvider, Typography} from '@material-ui/core'
import {numberWithCommas} from './Banner/Carousel'
import { useHistory } from 'react-router-dom'
import { Pagination } from '@material-ui/lab'
const useStyles=makeStyles(()=>(
    {
        row:{
            backgroundColor:'#16171a',
            cursor:'pointer',
            fontFamily:'Montserrat',
            "&:hover":{
                backgroundColor:'#131111'
            }
        },
        Pagination:{
            "& .MuiPaginationItem-root":{
                color:'gold'
            }
        }
    }
))
const CoinTable = () => {
    const Classes=useStyles()
    const [Coins, setCoins] = useState([])
    const [loading, setloading] = useState(false)
    const [Search, setSearch] = useState("")
    const [page, setpage] = useState(1)
    const {Currency,Symbol}=CryptoState()
    const history=useHistory();
    const fetchCoins=async()=>{
        setloading(true)
        const {data}=await axios.get(CoinList(Currency));
        setCoins(data)
        setloading(false)
    }
    useEffect(()=>{
        fetchCoins();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[Currency])
    console.log(Coins);
    const darkTheme=createTheme({
        palette:{
          primary:{
            main:'#fff',
          },
          type:'dark'
        }
      })
      const handleSerach=()=>{
          return Coins.filter((coin)=>(
              coin.name.toLowerCase().includes(Search) || coin.symbol.toLowerCase().includes(Search)
          ))
      }
  return (
    <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign:'center'}} >
                <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat"}}>
                        Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Serach For a Crypto Currency.." variant='outlined' style={{marginBottom:20,width:'100%'}} onChange={(e)=>setSearch(e.target.value.toLowerCase())} />
            </Container>
            <TableContainer>
                {
                    loading?( 
                        <LinearProgress style={{backgroundColor:'gold'}} />
                        ) : (
                            <Table>
                            <TableHead style={{backgroundColor:'#EEBC1D'}}>
                                    <TableRow>
                                        {["Coin","Price","24h Changes","Market Caps"].map((head)=>(
                                            <TableCell style={{color:'black',fontWeight:'700',fontFamily:'Montserrat',}} key={head} align={head==="Coin"?"":"right"}>
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                            {handleSerach().slice((page-1)*10,(page-1)*10+10).map((val,i)=>{
                                let profit=val.price_change_percentage_24h>=0;
                                return(
                                    <TableRow key={i} onClick={()=>history.push(`coins/${val.id}`)} className={Classes.row} >
                                    <TableCell component='th' scope='row' style={{display:'flex',gap:15}}>
                                    <img src={val?.image} alt={val.name} height='50' style={{marginBottom:10}} />
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                    <span style={{textTransform:'uppercase',fontSize:22}}>
                                            {val.symbol}
                                    </span>
                                    <span style={{color:'darkgrey'}}>{val.name}</span>
                                    </div>
                                    </TableCell>
                                    <TableCell style={{color:'gold',textAlign:'right'}}>
                                    {Symbol} {numberWithCommas(val.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell style={{textAlign:'right'}}>
                                    <span style={profit?{color:'rgb(14,202,129)'}:{color:'red'}}>

                                            {profit && '+'} {val.price_change_percentage_24h?.toFixed(2)}%
                                    </span>
                                    </TableCell>
                                    <TableCell style={{textAlign:'right'}}>
                                    {Symbol} {numberWithCommas(val.market_cap.toFixed(2))}
                                    </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                            </Table>
                        )
                }
            </TableContainer>
            {
                !loading &&
            <Pagination count={(handleSerach().length/10).toFixed(0)}
            style={{padding:20,width:'100%',display:'flex',justifyContent:'center'}}
            classes={{ul:Classes.Pagination}} onChange={(_,value)=>{
                setpage(value);
                window.scroll(0,450)
            }}
             />
            }
    </ThemeProvider>
  )
}

export default CoinTable