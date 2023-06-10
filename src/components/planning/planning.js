import React, { Component } from 'react';
import Header from "../header/header"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport} from '@mui/x-data-grid';
import { configureStore } from '@reduxjs/toolkit'


    const columnWidth = 150


  const demoData = {"resultCnt":"4","dataList":[
    {"eProcessDate":"2023-04-13","eProductKey":"87","eProductName":"제노핏 플러스(신)","eProreqKey":"221","eProreqNum":"W-221","eTotalProduction":"1.000"},
    {"eProcessDate":"2023-04-13","eProductKey":"14","eProductName":"닥터셀","eProreqKey":"222","eProreqNum":"W-222","eTotalProduction":"10.000"},
    {"eProcessDate":"2023-04-10","eProductKey":"43","eProductName":"명장(90포)","eProreqKey":"219","eProreqNum":"W-219","eTotalProduction":"3.000"},
    {"eProcessDate":"2023-04-10","eProductKey":"60","eProductName":"썬샤인","eProreqKey":"220","eProreqNum":"W-220","eTotalProduction":"10.000"},
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



// const reqURL = 'http://119.203.229.31:80/CCB/MES/eProductionPlanSelect.do'
const reqURL = 'https://jsonplaceholder.typicode.com/posts'





//data 받아서 work링크로 넘김
// function clickHandler(params, e){

//   let navigate = useNavigate();
//     navigate("/work",{state:{data:'data'}});
//   // do someting...
// }


//기억해라 hook 문제 컴포넌트로 감싸서 해결해라
// function Gobutton(props){

//   console.log(props.test)
//   let navigate = useNavigate();
  
//   function startWork() {
      // e.preventDefault()
      // console.log(params.row.eProreqNum); // error
      // axios.post(reqURL,{
      //   // eProreqNum:params.row.eProreqNum
      // }).then(function (response) {
      //     alert(response.data)
      // });
      // navigate("/work",{state:{data:'data'}});
//   }

//   return <Button onClick={(e)=>{startWork(e)}} variant="contained"> 작업 시작 </Button>
  
// }


//기억해라 hook 문제 컴포넌트로 감싸서 해결해라
function Gobutton(props){
  
  let navigate = useNavigate();
  
  function startWork(e) {
      console.log(props.row)
      navigate("/work",{state:{data:JSON.stringify(props.row)}});
      // axios.post(reqURL,{
      //   // eProreqNum:params.row.eProreqNum
      // }).then(function (response) {
      //   //JSON.stringify = > object 를 문자열로 변환 
      //   //JSON.parse() => 문자열을 object로 변환
      //   console.log("왜안와?")
      // });
  }
  return <Button onClick={(e)=>{startWork(e)}} variant="contained"> 작업 시작 </Button>
  
}

// 열 정의 
const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 150 },
    {
      sortable: true,
      field: 'lineNo',
      headerName: 'No',
      flex: 0,
      editable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.eProreqKey) + 1,
        headerAlign:'center',
        align:'center'
    },
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
        renderCell: (params)=>(<Gobutton  row={params.row}></Gobutton>),
        headerAlign:'center',
        align:'center'}
  ];
  


class Start extends Component {

  constructor(props) {
      //현재 클래스형 컴포넌트가 상속받고 있는 
      //리액트의 Component 클래스가 지닌 생성자 함수를 호출해 준다.
      super(props);
      //state의 초깃값 설정하기 
      this.state = {
          row : demoData.dataList,
          decreaseNum : 100
      };
  }

  render() {

    const {row, decreaseNum} = this.state;
    row.map(function(el,index){
      return el.id=index+1
    })

    function PlanList(){
      return (
        <Box sx={{display:'flex', alignItems:'center',justifyContent:'center',height:'88vh',width:'100vw',flexFlow:"column"}}>
            <Box sx={{ height: "10%", width: '90%' ,display:'flex', alignItems:'center',justifyContent:'left',fontSize:"30px" ,color:"#1976d2"}}> 제품 제조 의뢰 현황
            </Box>
            <Box sx={{ height: "80%", width: '90%'}}>
                <DataGrid 
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
    return (
      <Container sx={{height:"100vh",width:"100vw",p:0}} maxWidth={false} disableGutters={true} >
        <Header sx={{height:"12vh",width:"100vw",p:0}} ></Header>
        <PlanList sx={{height:"88vh",width:"100vw",p:0}}></PlanList>
      </Container>
    );
  }
}



export default Start;