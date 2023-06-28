import React, { Component } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import WifiIcon from '@mui/icons-material/Wifi';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScaleIcon from '@mui/icons-material/Scale';
import ExposureIcon from '@mui/icons-material/Exposure';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import {useDispatch,useSelector} from 'react-redux'
import WifiOffIcon from '@mui/icons-material/WifiOff';
import {useNavigate} from "react-router-dom";
import {socket} from '../../socket/socket'


function Item(props){
    return(
        <Box component="form" sx={{display:'flex',width:'100%',height:'100%'}}>
            <Box sx={{fontSize:20,fontWeight: 'medium',width:"30%",display:'flex',justifyContent:'center',alignItems:'center'}}>{props.title}</Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <TextField 
                // onChange={}
                InputProps={{
                    endAdornment:(<div>{props.unit}</div>),
                    startAdornment: (
                    <InputAdornment position="start">
                        {props.icon}
                    </InputAdornment>
                    ),
                }}
                size="medium" value={props.value} id='1' variant='outlined' 
                inputProps={{min: 0, style: {width:200}}} ></TextField>
            </Box>
            

        </Box>
    )
}



//목표: 재연결 버튼 만들기
const Left = ()=> {
        const allowance = useSelector((state)=>state.allowance);
        const connectState = useSelector((state)=>state.connectState);
        const planRow = JSON.parse(useSelector((state)=>state.planRow));
        const resultCnt = Number(JSON.parse(useSelector((state)=>state.resultCnt)));
        const completeCnt = Number(JSON.parse(useSelector((state)=>state.completeCnt)));
        let navigate = useNavigate();
      
        let connectColor = ''
        let connectIcon = ''
        let progress = Math.round((completeCnt/resultCnt)*100)
        console.log(progress)
        

        if(isNaN(progress)){
            progress=0
        }
        
        const dispatch = useDispatch();
        // dispatch({ type:"SET" ,payload:{dataName:'allowance',value:0.1}})
        if(connectState=='연결 확인'){
            connectColor = 'red'
            connectIcon = <WifiOffIcon sx={{color:connectColor}}/>
        }else{
            connectColor = 'blue'
            connectIcon = <WifiIcon sx={{color:connectColor}}/>
        }


        
        
        return(
            <Box sx={{display: 'flex',flexDirection: 'column', height:'100%'}}>
                <Box component="form" sx={{display:'flex',width:'100%',height:'15%'}}>
                    <Box sx={{color:'blue',fontSize:23,fontWeight: 'Bold',width:"30%",display:'flex',justifyContent:'center',alignItems:'center'}}>연결 상태</Box>
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <TextField 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    {connectIcon}
                                </InputAdornment>
                                ),
                            }}
                            
                         sx={{textAlign:'right',width:1}} 
                         size="medium" 
                         value={connectState}
                         id='1' 
                         variant='standard' 
                         inputProps={{min: 0, style: { marginTop:3,color:connectColor,textAlign: 'center' ,fontSize:'20px'}}} 
                         ></TextField>
                    </Box>
                    
                </Box>
                <Stack sx={{flexGrow:1,pb:'5%'}} spacing={0}>
                    <Item unit={<Box sx={{color:'white'}}>kg</Box>} icon={<DateRangeIcon />} title="의뢰 일자" value={planRow.eProcessDate}></Item>
                    <Item unit='kg' icon={<ScaleIcon/>} title="전체 중량" value={planRow.eTotalProduction}></Item>
                    <Item unit='%' icon={<ScaleIcon/>} title="진행 상황" value={progress+'.0'}></Item>
                    <Item unit='%' icon={<ExposureIcon/>} title="허용 오차" value={allowance}></Item>
                    <Item unit={<Box sx={{color:'white'}}>kg</Box>} icon={<DateRangeIcon />} title="상품 번호" value={planRow.eProreqNum}></Item>
                </Stack>
                <Box sx={{height:'15%',display:'flex',justifyContent:'center',alignItems:'center'}}> 
                    <Button 
                    //100% 확인
                        onClick={function(){
                            if(progress ==100){
                                if(window.confirm("모든 원재료를 투입하셨습니다. \n작업을 완료 하시겠습니까?")){
                                    dispatch({ type:"SET" ,payload:{dataName:'isPrjComplete',value:true}})
                                }
                            }else{
                                alert(`완료되지 않은 원료를 확인해주세요. \n 진행률: ${progress}`)
                            }
                        }.bind(this)}
                        sx={{height:'80%',width:'80%',fontSize:30,fontWeight:'Bold'}} 
                        // disabled
                        variant='contained'>
                        작업 완료 {<SendIcon sx={{pl:2,fontSize:30}}/>}
                    </Button>
                </Box>
            </Box>
        )
    }
export default Left