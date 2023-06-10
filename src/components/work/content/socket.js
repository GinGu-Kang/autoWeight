import React, { Component, useCallback, useEffect, useState } from 'react';
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



const Sock = (props)=>{
    // const reqURL = 'http://119.203.229.31:80/CCB/MES/eProductionPlanSelect.do'
    const number = useSelector((state)=>state.number);
    const socket = io('http://localhost:3001');
    
    const [,updateState] = useState();
    const forceUpdate = useCallback(()=>updateState({}),[]);
    
    const dispatch = useDispatch();
    // console.log("하이 나 실행돼쪄"+number)
    // const hi = socket.socket("/")

    // console.log("d")
    // axios.post(reqURL,{
    //       eProreqNum:"W-224"
    //     }).then(function (response) {
    //         alert(response.data)
    //     });



    socket.on('connect', function () {
        const cb = socket._callbacks;
        console.log("fuck")
        console.log(socket); // false
        socket.on("close",socket=>{
            console.log("종료할게")
        })
        socket.on("rs/Weight", socket =>{
            console.log(socket)
        })
        socket.on("disconnect", () => {
            console.log("내가 종료됨!!!!!!!!!!!!!"); // false
            socket.removeAllListeners("rs/weight");
            socket.disconnect();
            console.log(cb) // false
          });
    });
	
	const handleRequestSocket = () => {
        socket.emit("weight", "bi");
        console.log("두개 보내냐?")
	}
    
    const handleRequestSocketRetry = () => {
        socket.connect();
	}
    const handleRequestSocketDisconnect = () => {
        // socket.off("")
        socket.disconnect();
	}
    const handleRequestSocketTest = () => {
        dispatch({ type:"PLUSNUM" ,payload:{value:1}})
	}
	
	function handleChange(a) {
		socket.emit("ch/weight", a.target.value);
	}
    return (<Box sx={{display:'flex'}}>
            <button onClick={ handleRequestSocketTest }>테스트</button>
            <button onClick={ handleRequestSocketDisconnect }>연결 햐재{number}</button>
            <button onClick={ handleRequestSocketRetry }>다시 연결</button>
            <button onClick={ handleRequestSocket }>Request</button>
            <input type="text" onChange={(e)=> {handleChange(e)} } />
        </Box>)
}

export default Sock