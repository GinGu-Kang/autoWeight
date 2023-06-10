import React, { Component,useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ItemList from './ItemList'
import {useSelector,useDispatch}from 'react-redux'






function Header (props){
    return(
        <Grid container sx={{height:"100%",width:"100%"}} 
            justifyContent="space-between">
            <Grid sx={{display:'flex', justifyContent:'left'}} item xs={7}>
                <Box sx={{fontWeight:'bold', ml:"5%" ,width:'100%',display:'flex', alignItems:'center',justifyContent:'left',fontSize:"2.5vh",color:"#1976d2"}}>
                    투입 원료 목록 - {props.name}
                </Box>
            </Grid>

            <Grid sx={{background:'white',width:'100%',display:'flex', alignItems:'center',justifyContent:'space-around'}} item xs={2}>
                <Button variant='outlined'>임시 저장</Button>
                <Button variant='outlined'>전체 초기화</Button>
                <IconButton>
                    <HomeIcon></HomeIcon>
                </IconButton>
            </Grid>
        </Grid>
    )
}





const Main=()=>{
        console.log()
        const planRow = JSON.parse(useSelector((state)=>state.planRow));
        // console.log(planRow)
        const dispatch = useDispatch();
        return(
            <Grid 
            sx={{height:"100%",width:"100%"}} 
            container
            direction="column">
                <Grid item sx={{height:"10%"}}>
                    <Header name={planRow.eProductName}></Header>
                </Grid>

                <Grid item  sx={{height:"90%"}}>
                    <ItemList></ItemList>
                </Grid>
            </Grid>
        )
    }
export default Main;