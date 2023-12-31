import React, { Component, useEffect, useState ,useRef} from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {useLocation} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Main from './content/main'
import Left from './content/left'
import Footer from './content/footer'
import Sock from '../socket/socket'
import ItemList from './content/ItemList'
import { legacy_createStore as createStore } from 'redux'
import {useDispatch,useSelector,Provider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import io from 'socket.io-client';
import { CookieTwoTone } from '@mui/icons-material';
import counterReducer from './store'
// import socket from '../socket/socket'


//값 변경 테스트 
// test.eProcessDate="1212"
//dispatch({type:'PLUS',payload:{value:JSON.stringify(test)}})
{/* <Button onClick={()=>{
                    planRow.eProcessDate="1212"
                    dispatch({type:'PLUS',payload:{value:JSON.stringify(planRow)}})
                }}>asfs</Button> */}

//목표: 바코드 입력 받기

const demoData = {"resultCnt":"2","dataList":[
    {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"11","eItemCateName":"원재료","eItemCatePath":"원료>원재료","eItemCode":"R12004","eItemKey":"4","eItemName":"17종혼합유산균알파-2000t","eItemRatio":"6.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"21.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"17","eWarehouseName":"원료창고"},
    {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"11","eItemCateName":"원재료","eItemCatePath":"원료>원재료","eItemCode":"R12004","eItemKey":"4","eItemName":"17종혼합유산균알파-2000t","eItemRatio":"6.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"21.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"18","eWarehouseName":"원료창고"},
    {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"11","eItemCateName":"원재료","eItemCatePath":"원료>원재료","eItemCode":"R12004","eItemKey":"4","eItemName":"17종혼합유산균알파-2000t","eItemRatio":"6.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"21.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"19","eWarehouseName":"원료창고"},
    {"eCapacityUnit":"g","eEndDate":"","eItemCapacity":"1","eItemCateKey":"11","eItemCateName":"원재료","eItemCatePath":"원료>원재료","eItemCode":"R12004","eItemKey":"4","eItemName":"17종혼합유산균알파-2000t","eItemRatio":"6.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"21.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"20","eWarehouseName":"원료창고"},
    {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"11","eItemCateName":"원재료","eItemCatePath":"원료>원재료","eItemCode":"R12004","eItemKey":"4","eItemName":"17종혼합유산균알파-2000t","eItemRatio":"6.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"21.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"21","eWarehouseName":"원료창고"}
]}




const store = configureStore({ reducer: counterReducer })


// location 주입
const InjectData=(props)=>{
    
    const dispatch = useDispatch();
    dispatch({ type:"SETPlan" ,payload:{value:props.data}})
    // dispatch({ type:"SET" ,payload:{dataName:'allowance',value:1}})
    return (<Box></Box>)
}



//목표: 바코드 특정 키 누르면 바코드 listen 함수 실행
//     바코드 입력되면 itemlist의 작업선택 함수 호출 됨 
//     바코드 손가락 때면 함수 끝 재료 변경.
//     
const Work=() =>{
    
    const location = useLocation();
    
    

    return(
            <Box  sx={{height:'100vh'}}>
                <Provider store={store}>
                    <Box sx={{height:'70%',display:'flex',width:'100%'}}>
                        <Sock></Sock>
                        <Box sx={{width:'20%',border:'1px solid rgba(224, 224, 224, 1)'}}>
                            {/* 값변경 defaultValue 였기 때문에 변경안됨 */}
                            <InjectData data={location.state?.data}></InjectData>
                            <Left ></Left>
                        </Box>
                        <Box sx={{width:'80%'}}>
                            <Main ></Main>  
                        </Box>
                    </Box>
                    <Box sx={{width:"100%",height:"30%"}} >
                        <Footer ></Footer>
                    </Box>
                </Provider>
            </Box>
)
}


export default Work;