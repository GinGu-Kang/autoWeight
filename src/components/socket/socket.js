import React, { Component, useCallback, useEffect,memo, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {useLocation} from "react-router-dom";
import Grid from '@mui/material/Grid';
import { legacy_createStore as createStore } from 'redux'
import {useDispatch,useSelector,Provider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import io from 'socket.io-client';
import { CookieTwoTone } from '@mui/icons-material';
import axios from 'axios';

const sockURL='http://localhost:3001'

export const socket = io(sockURL,{
    reconnectionDelayMax: 1000
});



//새로고침할때 리스너 삭제 하고 시작하기
//리스너 중복안되게
//socket 생성은 새로고침안되게

const Sock = (props)=>{
    console.log("Sock")
    
    const dispatch = useDispatch();
    
    console.log("사이즈 변경")
    
    
    socket.emit("plan");


    socket.on('connect', function () {
        console.log("socket.on connect"); // false''
        
    });

    socket.on("isConnect",res=>{
        if(res){
            console.log("안오냐")
            dispatch({ type:"SET",payload:{dataName:'connectState',value:'정상'}})
        }
    })
    socket.on("close",socket=>{
        console.log("종료할게")
    })

    socket.on("rs/Weight", socket =>{
        console.log("rs/Weight: "+socket)
        dispatch({ type:"WEIGHT" ,payload:{value:socket}})
        
    })

    socket.on("disconnect", () => {
        console.log("socket.on disconnect"); // false
        dispatch({ type:"SET",payload:{dataName:'connectState',value:'연결 확인'}})

      });
	

    
    const handleRequestSocketRetry = () => {
        socket.connect();
	}
	function handleChange(e) {
		socket.emit("ch/weight", e.target.value);
        
	}
    return (<Box sx={{display:'flex'}}>
            <button onClick={ handleRequestSocketRetry }>다시 연결</button>
            <input type="text" onChange={(e)=> {handleChange(e)} } />
        </Box>)
}

export default Sock