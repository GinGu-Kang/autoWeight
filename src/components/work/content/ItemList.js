import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,GridRowParams} from '@mui/x-data-grid';
import work from '../work'
import { configureStore } from '@reduxjs/toolkit'
import {useDispatch,useSelector} from 'react-redux'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const demoData = {"resultCnt":"2","dataList":[
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"11","eItemCateName":"딸기","eItemCatePath":"원료>원재료","eItemCode":"R12001","eItemKey":"4","eItemName":"딸기","eItemRatio":"10.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"10.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"17","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"12","eItemCateName":"우유","eItemCatePath":"원료>원재료","eItemCode":"R12002","eItemKey":"4","eItemName":"우유","eItemRatio":"80.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"80.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"18","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"13","eItemCateName":"바나나","eItemCatePath":"원료>원재료","eItemCode":"R12003","eItemKey":"4","eItemName":"바나나","eItemRatio":"5.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"5.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"19","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"14","eItemCateName":"설탕","eItemCatePath":"원료>원재료","eItemCode":"R12005","eItemKey":"4","eItemName":"설탕","eItemRatio":"4.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"4.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"20","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"15","eItemCateName":"색소1","eItemCatePath":"원료>원재료","eItemCode":"R12004","eItemKey":"4","eItemName":"색소","eItemRatio":"1.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"1.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"21","eWarehouseName":"원료창고"}
]}
// function Navbutton(){





  function handleClick() {
    console.log("정상")
    
      // let navigate = useNavigate();
      // navigate("/work",{state:{data:'dataasf'}});
  }

  
//   return <Button onClick={handleClick} variant="contained"> 작업 시작 </Button>
  
// }


//클릭시 상태 변경!!!!!!!1여기부터
//getSelectedRows 선태된 값 가져오기
//체크박스에 모두 디스에이블 하고 하거나
// 모든 로우가져와서 필드 검사
//로우 가져와서 색변환:props.params.api.getRowElement('11').style.backgroundColor='red' 
function WorkButton(props){
  
  let navigate = useNavigate();
  function startWork(e) {
    if(props.row.isCompleate=="미완료"){
      props.row.isCompleate="완료"
      // console.log(props.params.api.getSelectedRows())
      // console.log(props.params.api.getAllRowIds())
      console.log(props.params.api.getRowElement('11').style.backgroundColor='red')
      
    }
  }
  return <Button onClick={(e)=>{startWork(e)}} variant="contained"> 작업 시작 </Button>
  
}


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

const columns: GridColDef[] = [
  {
    sortable: true,
    field: 'lineNo',
    headerName: 'No',
    flex: 0,
    editable: false,
    hideable: false ,
    renderCell: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.row.eItemCateKey) + 1,
      headerAlign:'center',
      align:'center'
  },
    {
      field: 'eItemName',
      headerName: '원료명',
      flex:1,
      headerAlign:'center',
      align:'center'
    },
    {
      field: 'eItemCode',
      headerName: '코드 ',
      width: 150,
      editable: true,
    },
    {
      field: 'eWarehouseName',
      headerName: '위치',
      flex:1,
      headerAlign:'center',
      align:'center',
    },
    {
      field: 'eItemRatio',
      headerName: '배합 비율',
      type: 'number',
      flex:1,
      headerAlign:'center',
      align:'center'
    },
    {
      field: 'eProreqItemCount',
      headerName: '필요 중량',
      flex:1,
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex:1,
      headerAlign:'center',
      align:'center',
      editable:true

    },
    {
      field: 'eCapacityUnit',
      headerName: '단위',
      flex:1,
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex:1,
      headerAlign:'center',
      align:'center'
    },
    { 
      field: 'isCompleate', 
      headerName: '작업 상태',
      sortable: false,
      type:'number',
      // renderCell: (props)=>(
      //   <Button onClick={handleClick} variant="contained"> 작업 시작 </Button>),
      flex:1,
      headerAlign:'center',
      align:'center' ,
    },
    { 
        field: '시작', 
        sortable: false,
        renderCell: (params)=>(<WorkButton row={params.row} params={params} ></WorkButton>),
        flex:1,
        headerAlign:'center',
        align:'center' },
      
  ];
  

const ItemList=()=>{

    const row = demoData.dataList.map((data)=>({
      ...data,isCompleate:'미완료'
    }))
    const number = useSelector((state)=>state.number);
      const planRow = JSON.parse(useSelector((state)=>state.planRow));
      // console.log(planRow)
      const dispatch = useDispatch();



      return (
        <Box sx={{display:'flex', alignItems:'center',justifyContent:'center',height:'100%',width:'100%',flexFlow:"column"}}>
            <Box  sx={{ height: "100%", width: '100%'}}>
                <DataGrid 
                // columnVisibilityModel={{
                //   // 컬럼 숨기기
                //   workState: false,
                  
                // }}
                    getRowId={(row)=>row.eItemCateKey}
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
                    pagination: {
                        paginationModel: {
                        pitemRatioSize: 50,
                        },
                    },
                    }}
                    pitemRatioSizeOptions={[10,25,50,100]}
                    checkboxSelection={true}
                    isRowSelectable={(params: GridRowParams) => params.row.eProreqItemCount > 10}
                />
            </Box>
        </Box>
      )
    }




export default ItemList;