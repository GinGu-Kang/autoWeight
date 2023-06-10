import React, { Component } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import ScaleIcon from '@mui/icons-material/Scale';
import InputAdornment from '@mui/material/InputAdornment';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useDispatch,useSelector} from 'react-redux'


// const dispatch = useDispatch();

function LabTabs() {
    const [value, setValue] = React.useState('1');
    const dispatch = useDispatch();
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
      dispatch({ type:"SET" ,payload:{dataName:'scaleSize',value:newValue}})
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="저 중량" value="1" />
              <Tab label="중 중량" value="2" />
              <Tab label="고 중량" value="3" />
            </TabList>
          </Box>
            <TabPanel sx={{textAlign:'center' , color:'green',fontSize:'30px'}} value="1">소 (小)</TabPanel>
            <TabPanel sx={{textAlign:'center',fontSize:'30px',color:'blue'}} value="2">중 (中)</TabPanel>
            <TabPanel sx={{textAlign:'center',fontSize:'30px',color:'red'}} value="3"> 대 (大) </TabPanel>
        </TabContext>
      </Box>
    );
  }

function WeightDispMid(props){
    return(
        <Box sx={{flex:2,display:'flex'}}>
                        <Box sx={{color:'blue',fontSize:23,fontWeight: 'Bold',width:"30%",display:'flex',justifyContent:'center',alignItems:'center'}}>{props.title}</Box>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <TextField 
                                InputProps={{
                                    
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        {props.icon}
                                    </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <Box>{props.unit}</Box>
                                    )
                                }}
                            
                            sx={{textAlign:'right',width:1}} 
                            size="medium" 
                            value={props.value}
                            id='1' 
                            variant='standard' 
                            inputProps={{min: 0, style: { marginTop:3,color:'blue',textAlign: 'center' ,fontSize:'20px'}}} 
                            ></TextField>
                        </Box>
                    </Box>
    )
}

function WeightDispSm(props){
    return(
        <Box sx={{flex:2,display:'flex'}}>
                        <Box sx={{color:'blue',fontSize:23,fontWeight: 'Bold',width:"30%",display:'flex',justifyContent:'center',alignItems:'center'}}>{props.title}</Box>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <TextField 
                                InputProps={{
                                    endAdornment: (
                                        <Box>kg</Box>
                                    ),
                                }}
                            
                            sx={{textAlign:'right',width:1}} 
                            size="medium" 
                            value={props.value}
                            id='1' 
                            variant='standard' 
                            inputProps={{min: 0, style: { marginTop:3,color:'blue',textAlign: 'center' ,fontSize:'20px'}}} 
                            ></TextField>
                        </Box>
                    </Box>
    )
}

const Footer =()=> {
    //셀렉터
    const weight = useSelector((state)=>state.weight);
    const haveWeight = useSelector((state)=>state.haveWeight);
    const targetWeight = useSelector((state)=>state.targetWeight);
    const stackWeight = useSelector((state)=>state.stackWeight);
    const selectItem = useSelector((state)=>state.selectItem);


    return(
        <Box sx={{display:'flex',width:'100%',height:'100%'}}>
            <Stack sx={{flex:1}}>
                <Box sx={{flex:2,display:'flex'}}>
                    <WeightDispMid unit='kg' title='잔여 중량' icon={<ScaleIcon sx={{color:'blue'}}/>}></WeightDispMid>
                </Box>
                <Box sx={{flex:1}}>
                    <WeightDispSm title='목표 중량'></WeightDispSm>
                    <WeightDispSm title='누적 중량'></WeightDispSm>
                </Box>
            </Stack>

            <Stack sx={{flex:1}} >
                <Box sx={{flex:2,display:'flex'}}>
                    <WeightDispMid value={weight} unit='kg' title='현재 중량' icon={<ScaleIcon sx={{color:'blue'}}/>}></WeightDispMid>
                </Box>
                <Box sx={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}} >
                    <Button sx={{flex:1,m:3}} variant='contained'>누적 초기화</Button>
                    <Button sx={{flex:1,m:3}} variant='contained'>누적</Button>
                </Box>
            </Stack>

            <Stack sx={{flex:1}} >
                <Box sx={{flex:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Stack sx={{width:0.7}}>
                        <LabTabs></LabTabs>
                    </Stack>
                </Box>
                <Stack sx={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Button 
                        sx={{height:'60%',width:'80%',fontSize:30,fontWeight:'Bold',width:0.7}} 
                        variant='contained'>
                        저울 변경
                    </Button>
                </Stack>
            </Stack>
            <Stack sx={{flex:1,justifyContent:'center',alignItems:'center'}} >
                <Button sx={{width:'70%',height:'40%',fontSize:'30px'}} variant='contained'>데이터 저장</Button>
            </Stack>
        </Box>
    )
}



export default Footer;
