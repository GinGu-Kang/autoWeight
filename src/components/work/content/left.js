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


function Item(props){
    return(
        <Box component="form" sx={{display:'flex',width:'100%',height:'100%'}}>
            <Box sx={{fontSize:20,fontWeight: 'medium',width:"30%",display:'flex',justifyContent:'center',alignItems:'center'}}>{props.title}</Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <TextField 
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




const Left = ()=> {
        const number = useSelector((state)=>state.number);
        const planRow = JSON.parse(useSelector((state)=>state.planRow));
        // console.log(planRow)
        const dispatch = useDispatch();
        return(
            <Box sx={{display: 'flex',flexDirection: 'column', height:'100%'}}>
                <Box component="form" sx={{display:'flex',width:'100%',height:'15%'}}>
                    <Box sx={{color:'blue',fontSize:23,fontWeight: 'Bold',width:"30%",display:'flex',justifyContent:'center',alignItems:'center'}}>연결 상태</Box>
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <TextField 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <WifiIcon sx={{color:'blue'}}/>
                                </InputAdornment>
                                ),
                            }}
                            
                         sx={{textAlign:'right',width:1}} 
                         size="medium" 
                         defaultValue='정상' 
                         id='1' 
                         variant='standard' 
                         inputProps={{min: 0, style: { marginTop:3,color:'blue',textAlign: 'center' ,fontSize:'20px'}}} 
                         ></TextField>
                    </Box>
                    
                </Box>
                <Stack sx={{flexGrow:1,pb:'5%'}} spacing={0}>
                    <Item unit={<Box sx={{color:'white'}}>kg</Box>} icon={<DateRangeIcon />} title="의뢰 일자" value={planRow.eProcessDate}></Item>
                    <Item unit='kg' icon={<ScaleIcon/>} title="전체 중량" value={planRow.eTotalProduction}></Item>
                    <Item unit='%' icon={<ScaleIcon/>} title="진행 상황" value="현재 중량 / 전체 중량"></Item>
                    <Item unit='%' icon={<ExposureIcon/>} title="허용 오차" value="0.1 +-"></Item>
                    <Item unit={<Box sx={{color:'white'}}>kg</Box>} icon={<DateRangeIcon />} title="상품 번호" value={planRow.eProreqNum}></Item>
                </Stack>
                <Box sx={{height:'15%',display:'flex',justifyContent:'center',alignItems:'center'}}> 
                    <Button 
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