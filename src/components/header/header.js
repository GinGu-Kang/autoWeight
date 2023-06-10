import React, { Component } from 'react';
import logo from "../../img/logo.png"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const deStr = {display:'flex',alignContent:'center',justifyContent:'center'};
const deSol = {border:'0 solid'};

// const title = {}



class Header extends Component {
  render() {
    return (
    <Grid container sx={{border:'1px solid',height:'12vh'}}>
        <Grid item sxs={1}>
        </Grid>
        <Grid height='100%' item  xs={2}>
            <Box height='100%' sx={Object.assign(deSol,deStr)} className='frame'>
                <img height='100%'  src={logo} alt="logo "></img>
            </Box>
        </Grid>
        <Grid item sx={Object.assign(deStr)} xs={3}>
        </Grid>
        <Grid item xs={8}>
        </Grid>
      </Grid>
    );
  }
}


export default Header;