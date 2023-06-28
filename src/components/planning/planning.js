import React, { Component, useEffect ,useState} from 'react';
import Header from "../header/header"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid,useGridApiRef, GridColDef, GridValueGetterParams,GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport} from '@mui/x-data-grid';
import { configureStore } from '@reduxjs/toolkit'
import {socket} from '../socket/socket'




// const reqURL = "http://119.203.229.31:8080/CCB/MES/eProductionPlanList.do"



const columnWidth = 150


  const demoData = {"resultCnt":"4","dataList":[
    {"eProcessDate":"2023-04-13","eProductKey":"87","eProductName":"제노핏 플러스(신)","eProreqKey":"2211","eProreqNum":"W-221","eTotalProduction":"1.000"},
  ]}



function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }




function WorkButton(props){

  let navigate = useNavigate();
  
  function startWork(e) {
      console.log(props.row)
      navigate("/work",{state:{data:JSON.stringify(props.row)}});
     
  }
  return <Button onClick={(e)=>{startWork(e)}} variant="contained"> 작업 시작 </Button>
  
}

// 열 정의 
const columns: GridColDef[] = [
    {
      field: 'eProcessDate',
      headerName: '의뢰 일자',
      type:'text',
      width: columnWidth,
      editable: true,
      flex:1,
      headerAlign:'center',
      align:'center'
    },{
      field: 'eProductName',
      headerName: '제품 이름',
      type:'text',
      width: columnWidth,
      editable: true,
      flex:1,
      headerAlign:'center',
      align:'center'
    },
    {
      field:'eProreqKey',
      headerName: '요청 번호',
      width: columnWidth,
      flex:1,
      headerAlign:'center',
      align:'center'
    },
    {
      field:'eTotalProduction',
      headerName: '총 계획량 (kg)',
      width: columnWidth,
      flex:1,
      headerAlign:'center',
      align:'center'
    },
    
    {
      field: 'eProreqNum',
      headerName: '생산 지시 번호',
      width: columnWidth,
      flex:1,
      hideable:true,
      headerAlign:'center',
      align:'center'
    },
    { 
        field: 'buttonCol', 
        headerName:'',
        sortable: false,
        type:'field',
        flex:1,
        // renderCell: (params)=> (<Button variant="contained" onClick={(e)=>{clickHandler(params, e)}}> 작업 시작 </Button>),
        renderCell: (params)=>(<WorkButton  row={params.row}></WorkButton>),
        headerAlign:'center',
        align:'center'}
  ];

  function PlanList(){
    let row =demoData.dataList
    const apiRef = useGridApiRef()

    socket.emit('plan')

    socket.on('plan',res =>{
      let resRow = JSON.parse(res.body).dataList

      if(resRow[0].eProductName != row[0].eProductName){
      // setRow({...resRow})
        try {
          apiRef.current.getAllRowIds().map(data =>apiRef.current.updateRows([{eProreqKey:data,_action: 'delete'}]))
          resRow.map(data => apiRef.current.updateRows([data]))
        } catch (error) {
          socket.removeAllListeners('plan')
        } 
      }
    })

    // try {
    //   row.map(function(el,index){
    //     return el.id=index+1
    //   })  
    // } catch (error) {
    //   console.log("row 없음")
    // }


    // const handleUpdateRow =()=>{
      
    // }
    

    return (
      <Box sx={{display:'flex', alignItems:'center',justifyContent:'center',height:'88vh',width:'100vw',flexFlow:"column"}}>
          <Box sx={{ height: "10%", width: '90%' ,display:'flex', alignItems:'center',justifyContent:'left',fontSize:"30px" ,color:"#1976d2"}}> 제품 제조 의뢰 현황
          </Box>
          <Box sx={{ height: "80%", width: '90%'}}>
          {/* <Button size="small" onClick={handleUpdateRow}>
          Update a row
        </Button> */}
              <DataGrid 
                  apiRef={apiRef}
                  getRowId={row => row.eProreqKey}
                  localeText={{
                    toolbarColumns: "열 표시",
                    toolbarFilters: "필터 검색",
                    toolbarDensity: "보기 방식",
                    toolbarExport: "데이터 내보내기"
                  }}
                  slots={{
                      toolbar: CustomToolbar,
                  }}
                  rows={row}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'eProreqKey', sort: 'asc' }],
                    },
                  pagination: {
                      paginationModel: {
                      pageSize: 50,
                      },
                      
                  },
                  }}
                  pageSizeOptions={[10,25,50,100]}
                  checkboxSelection={false}
              />
          </Box>
      </Box>
    )
  }




//demo row 넣기 
//on으로 듣기
//값 받으면 새로운 row 세팅

const Start =()=> {

  // useEffect(()=>{
  // const row = useSelector((state)=>state.row);
  
    

  

  

    // const {row, decreaseNum} = this.state;
    
    

    
    return (
      <Container sx={{height:"100vh",width:"100vw",p:0}} maxWidth={false} disableGutters={true} >
        <Header sx={{height:"12vh",width:"100vw",p:0}} ></Header>
        <PlanList sx={{height:"88vh",width:"100vw",p:0}}></PlanList>
      </Container>
    );
  }




export default Start;