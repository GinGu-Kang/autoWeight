import React, { Component ,forwardRef,useRef,useEffect} from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,GridRowParams,useGridApiRef} from '@mui/x-data-grid';
import work from '../work'
import { configureStore } from '@reduxjs/toolkit'
import {useDispatch,useSelector} from 'react-redux'

import { TextField } from '@mui/material';
import {socket} from '../../socket/socket'
import {styled} from '@mui/material/styles';

//목표1: 저울로 무게값 받기 연동
//목표2: 작업 완료시 100% 아니면 반려 100%면 승인
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  
  '& .complete': {
    backgroundColor:"green"
    },
  '& .incomplete': {
    backgroundColor:"white"
    },
  '& .select': {
    backgroundColor:"red"
    },
    
    
}))


let demoData = {"resultCnt":"2","dataList":[
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"11","eItemCateName":"딸기","eItemCatePath":"원료>원재료","eItemCode":"R12001","eItemKey":"4","eItemName":"딸기","eItemRatio":"10.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"10.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"17","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"12","eItemCateName":"우유","eItemCatePath":"원료>원재료","eItemCode":"R12002","eItemKey":"4","eItemName":"우유","eItemRatio":"80.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"80.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"18","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"13","eItemCateName":"바나나","eItemCatePath":"원료>원재료","eItemCode":"R12003","eItemKey":"4","eItemName":"바나나","eItemRatio":"5.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"5.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"19","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"14","eItemCateName":"설탕","eItemCatePath":"원료>원재료","eItemCode":"R12005","eItemKey":"4","eItemName":"설탕","eItemRatio":"4.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"4.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"20","eWarehouseName":"원료창고"},
  {"eCapacityUnit":"kg","eEndDate":"","eItemCapacity":"1","eItemCateKey":"15","eItemCateName":"색소1","eItemCatePath":"원료>원재료","eItemCode":"R12004","eItemKey":"4","eItemName":"색소","eItemRatio":"1.000","eItemUnitTxt":"kg","eProcessDate":"","eProductKey":"","eProductName":"","eProreqConfirm":"","eProreqItemCount":"1.000","eProreqItemMemo":"","eProreqKey":"208","eProreqNum":"","eProreqState":"","eStartDate":"","eTotalProduction":"","eWarehouseKey":"21","eWarehouseName":"원료창고"}
]}
// function Navbutton(){


const row = demoData.dataList.map((data)=>({
  ...data,isCompleate:'미완료'
}))






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
  // {
  //   sortable: true,
  //   field: 'lineNo',
  //   headerName: 'No',
  //   flex: 0,
  //   editable: false,
  //   hideable: false ,
  //   renderCell: (params) =>
  //     params.api.getRowIndexRelativeToVisibleRows(params.row.eItemCateKey) + 1,
  //     headerAlign:'center',
  //     align:'center'
  // },
    {
      field: 'eItemName',
      headerName: '원료명',
      flex:1.5,
      headerAlign:'center',
      align:'center'
    },
    {
      field: 'eItemCode',
      headerName: '코드 ',
      width: 150,
      editable: false,
    },
    {
      field: 'eBarCode',
      headerName: '바코드 ',
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
      editable:false

    },
    {
      field: 'eCapacityUnit',
      headerName: '단위',
      flex:1,
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex:1,
      headerAlign:'center',
      align:'center',
      cellClassName: (params) => {
        if (params.value == "kg") {
          return 'best';
        }
      }  
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
  



//클릭시 상태 변경!!!!!!!1여기부터
//getSelectedRows 선태된 값 가져오기
//체크박스에 모두 디스에이블 하고 하거나
// 모든 로우가져와서 필드 검사
//ref를 store에 넣으면 큰일남
//여기도 useSelect를 쓰면안댐.
//eItemcatekey 값 참조 해서 변경시 row 변경
//work 쪽에서 만나서 버튼감지, 후 apiref 실행 ?
//useEffect 컴포넌트 화면에서 안사라짐
//목표: 작업 버튼 클릭시 완료 되어있으면 되묻기
function WorkButton(props){
  const dispatch = useDispatch();
  let api = props.params.api
  let row = props.row
  function startWork(e) {
      //현재 선택 row.isCompleate가 완료가 아닐때 실행
      workSelect(api,row,dispatch)
      
    }
  return <Button onClick={(e)=>{startWork(e)}} variant="contained"> 작업 시작 </Button>
}

//apiRef, 선택된 로우, dispatch 넣기
function workSelect(api,row,dispatch){
  try {
    dispatch({ type:"SETselectItem" ,payload:{row:{...row}}})
  } catch (error) {
    console.log("실행안함")
  }


  if(api.getRow(row.eItemCode).isCompleate!='완료'){
    // console.log(`row.Eitem : ${row.eIt}`)
  }else{
    if(window.confirm("이미 작업 완료된 원료 입니다 초기화 하시겠습니까?")){
      api.updateRows([{ eItemCode:row.eItemCode, isCompleate: '미완료'}]);
      dispatch({ type:"SETselectItem" ,payload:{row:{...row}}})
    }
  }
  
  
  

}
  


const WeightDataGrid=({getRef},props)=>{
  const isDataSend = useSelector((state)=>state.isDataSend);
  const isPrjComplete = useSelector((state)=>state.isPrjComplete);
  const selectItem = useSelector((state)=>state.selectItem);
  const apiRef = useGridApiRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let dataIndex =0;
  let isPrjData ={}

  let isBarcode = true;
  let barcodeKey = 'KeyQ'
  let barcodeBuffer = ''
  let barcode = ''
  let code
  let barcodeRow
  // let barcodeLen=10
  // let selectRow = ''
  let barcodeStart
  let barcodeEnd

  //row data 주입
  socket.on('work',socket=>{
    let resRow = JSON.parse(socket).dataList 
    dispatch({ type:"SET" ,payload:{dataName:'resultCnt',value:JSON.parse(socket).resultCnt}})   
    try {
      apiRef.current.getAllRowIds().map(data =>apiRef.current.updateRows([{eItemCode:data,_action: 'delete'}]))
      resRow.map(data => {
        data.isCompleate="미완료"
        data.eBarCode=""
        apiRef.current.updateRows([data])
          }
        )
    } catch (error) {
      console.log(error)
      // socket.removeAllListeners('work')
    }
  })

  
  //datalist 만들어 보내기
  //무게값이 꽉차지 않아도 보낼 수 있어야함
  if(isPrjComplete){
    isPrjData = apiRef.current.getAllRowIds().map(data =>{
      console.log(data)
      let row = apiRef.current.getRow(data)
      
      try {
            if(row.isCompleate=="완료"){
              console.log(row.eBarCode)
              dataIndex+=1
            }
          } catch (error) {
            console.log("로우 없음")
          }
          console.log(dataIndex+=1)
        }
      )
      let params = {
        "eProreqNum": "W-236",   //생산지시번 호
        "eTotalProduction": "1.000", //총 투입 량
        "dataList[0].eBarCode": "R12150-230321-17", //투입 원자재의 바코드 번호
        "dataList[0].eInputUnit": "1.000",        // 투입 량
      }
    dataIndex=0
    socket.emit("isPrjComplete",params)
    dispatch({ type:"SET" ,payload:{dataName:'isPrjComplete',value:false}})
    
  }

  socket.on("isPrjComplete",isPrjComplete=>{
    if(isPrjComplete){
        alert("작업이 완료되었습니다.")
        navigate("/plan");
    }else{
        alert("작업이 실패 하였습니다.")
    }
})



    window.addEventListener('keydown',function(e){
        if(e.code=='Enter'){
          console.log(barcodeBuffer)
          barcodeStart=barcodeBuffer.indexOf("R")
          barcodeEnd  = barcodeBuffer.indexOf("-")
          code = barcodeBuffer.slice(barcodeStart,barcodeEnd)
          barcode =barcodeBuffer.slice(barcodeBuffer.indexOf("R"))
          
          barcodeRow = apiRef.current.getRow(code)

          console.log(barcodeRow)
          if(barcodeRow!=null){
            apiRef.current.updateRows([{ eItemCode: code, eBarCode: barcode}]);
            workSelect(apiRef.current,barcodeRow,dispatch)  
          }else{
            alert(`없는 원료코드 입니다. 코드를 확인해주세요 \n 입력코드: ${code}`)
          }

          
          
          

          barcodeBuffer=''

        }else{
          barcodeBuffer +=e.key
        }
        
    })

    //barcode에 선택된 row를 작업선택 함수에 넣어주기
    //목표:바코드 해당된 row 찾아서 workselect에 집어넣기
    // window.addEventListener('keyup',function(e){
    //     if(e.code==barcodeKey){
    //         isBarcode = true
    //         barcode =''
    //     }
    // })


  useEffect(()=>{
    let completeCnt=0
    try {
      if(isDataSend){
        apiRef.current.updateRows([{ eItemCode: selectItem.eItemCode, isCompleate: '완료'}]);
        dispatch({ type:"SET" ,payload:{dataName:'isDataSend',value:false}})   
        dispatch({ type:"SET" ,payload:{dataName:'selectItem',value:{}}})  


        apiRef.current.getAllRowIds().map(data =>{
          try {
                if(apiRef.current.getRow(data).isCompleate=="완료"){
                  completeCnt+=1
                }
              } catch (error) {
                console.log("로우 없음")
              }
            }
          )
          dispatch({ type:"SET" ,payload:{dataName:'completeCnt',value:completeCnt}})  
        completeCnt=0

      }
    } catch (error) {
      //element 가져오기 오류 
    }
  })
  
  // dispatch({ type:"SET" ,payload:{dataName:'apiRef',value:apiRef}})  
  // console.log("나초기화?")
  

  // @@@@@@@@@@@@
  //목표: 데이터 그리드 클래스 변경
  return(
    <>
    <StyledDataGrid 
        apiRef={apiRef}
        getRowId={(row)=>{
          return row.eItemCode
        }}
        getCellClassName={(params) => 
          {
            if(params.row.isCompleate=="완료"){
              return "complete"
            }else if(params.row.eItemCode==selectItem.eItemCode){
              return "select"
            }else{
              return "incomplete"
            }
          }
        }
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
        checkboxSelection={false}
        // isRowSelectable={(params: GridRowParams) => params.row.isCompleate == "미완료"}
    />
    </>
  )
}

  






//row의 색상을 직접 바꾸는게 아니라 
//class name을 통한 style 통제를 해야함
const ItemList=({getRef},props,ref)=>{
    const dispatch = useDispatch();
    console.log("아이템 리스트")
    
      return (
        <Box sx={{display:'flex', alignItems:'center',justifyContent:'center',height:'100%',width:'100%',flexFlow:"column"}}>
            <Box  sx={{ height: "100%", width: '100%'}}>
              <WeightDataGrid getRef={getRef}>
              </WeightDataGrid>
            </Box>
        </Box>
      )
    }




export default ItemList;