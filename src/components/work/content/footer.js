import React, { Component ,forwardRef, useEffect} from 'react';
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
import classnames from 'classnames';
import { useRef } from 'react';
import {socket} from '../../socket/socket'
// const dispatch = useDispatch();

function LabTabs() {
    const value = useSelector((state)=>state.scaleSize);
    const dispatch = useDispatch();
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        dispatch({ type:"SET" ,payload:{dataName:'scaleSize',value:newValue}})
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' ,}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs" centered>
              <Tab label="저 중량" value="1" />
              <Tab label="중 중량" value="2" />
              <Tab label="고 중량" value="3" />
            </TabList>
          </Box>
            <TabPanel sx={{textAlign:'center' , color:'green',fontSize:'30px'}} value="1">소 (mg)</TabPanel>
            <TabPanel sx={{textAlign:'center',fontSize:'30px',color:'blue'}} value="2">중 (g)</TabPanel>
            <TabPanel sx={{textAlign:'center',fontSize:'30px',color:'red'}} value="3"> 대 (kg) </TabPanel>
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
                            inputProps={{min: 0, style: { marginTop:3,color:'blue',textAlign: 'center' ,fontSize:'30px'}}} 
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
                            <TextField className={props.className}
                                InputProps={{
                                    endAdornment: (
                                        <Box>{props.unit}</Box>
                                    ),
                                }}
                            
                            sx={{textAlign:'right',width:1}} 
                            size="medium" 
                            value={props.value}
                            variant='standard' 
                            inputProps={{min: 0, style: { marginTop:3,color:'blue',textAlign: 'center' ,fontSize:'20px'}}} 
                            ></TextField>
                        </Box>
                    </Box>
    )
}





//     value에  1,2,3 전달 해서 무게값 전달하기
//     ch/scaleSize -> 1,2,3
const Footer =()=> {
    //셀렉터
    let weight = useSelector((state)=>state.weight);
    const haveWeight = useSelector((state)=>state.haveWeight);
    const targetWeight = useSelector((state)=>state.targetWeight);
    const stackWeight = useSelector((state)=>state.stackWeight);
    const selectItem = useSelector((state)=>state.selectItem);
    const scaleSize = useSelector((state)=>state.scaleSize);
    const allowanceWeight = useSelector((state)=>state.allowanceWeight);
    const planRow = JSON.parse(useSelector((state)=>state.planRow));
    const dispatch = useDispatch();

    let selectItemName = ""
    let selectItemKey = ""

    

    let size
    switch (scaleSize){
        case '1':
             size ="mg"
             break
        case '2':
             size ="g"
             break
        case '3':
             size = "kg"
             break
    }

    
    if(selectItem!={}){
        selectItemName = selectItem.eItemName
        selectItemKey = selectItem.eItemCateKey
    }

    const CHscaleSize = ()=>{
        // console.log("scaleSize"+scaleSize)
        
        if(scaleSize=='1'){
            dispatch({ type:"SET" ,payload:{dataName:'scaleSize',value:'2'}})
            socket.emit("ch/scale","2");    
        }else if(scaleSize=='2'){
            dispatch({ type:"SET" ,payload:{dataName:'scaleSize',value:'3'}})
            socket.emit("ch/scale","3");    
        }else{
            dispatch({ type:"SET" ,payload:{dataName:'scaleSize',value:'1'}})
            socket.emit("ch/scale","1");    
        }
        
        
        
    }



    return(
        <Box sx={{display:'flex',width:'100%',height:'100%'}}>
            <Stack sx={{flex:1}}>
                <Box sx={{flex:2,display:'flex'}}>
                    <WeightDispMid value={targetWeight} unit='kg' title='목표 중량' icon={<ScaleIcon sx={{color:'blue'}}/>}></WeightDispMid>
                </Box>
                <Box sx={{flex:1}}>
                    <WeightDispSm unit='kg' value={haveWeight} title='잔여 중량'></WeightDispSm>
                    <WeightDispSm unit='kg' value={stackWeight} title='누적 중량'></WeightDispSm>
                </Box>
            </Stack>

            <Stack sx={{flex:1}} >
                <Box sx={{flex:2,display:'flex'}}>
                    <WeightDispMid value={weight} unit={size} title='현재 중량' icon={<ScaleIcon sx={{color:'blue'}}/>}></WeightDispMid>
                </Box>
                {/* bind 사용법 */}
                <Box sx={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}} >
                    <Button onClick={function(e){
                        dispatch({ type:"STACK"})
                    }.bind(this)} sx={{flex:1,m:3}} variant='contained'>누적</Button>
                    <Button 
                    onClick={function(e){
                        dispatch({ type:"RESETstack"})
                    }.bind(this)}
                     sx={{flex:1,m:3}} variant='contained'>누적 초기화</Button>
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
                        onClick={CHscaleSize}
                        sx={{height:'60%',width:'80%',fontSize:30,fontWeight:'Bold',width:0.7}} 
                        variant='contained'>
                        저울 변경
                    </Button>
                    
                </Stack>
            </Stack>
            <Stack sx={{flex:1,justifyContent:'center',alignItems:'center'}} >
                {/* 허용 오차 판단 데이터 저장 활성 */}
                <Stack sx={{background:'white',flex:1,width:'100%',justifyContent:'end',alignItems:'center'}}>
                <TextField
                            sx={{textAlign:'right',width:0.7}} 
                            size="medium" 
                            value={selectItemName||"재료 선택"}
                            variant='standard' 
                            inputProps={{min: 0, style: { marginTop:3,color:'blue',textAlign: 'center' ,fontSize:'40px'}}} 
                            ></TextField>
                    {/* <WeightDispSm 
                        className="ItemName" unit='' value={selectItemName||"재료 선택"}>
                        </WeightDispSm> */}
                </Stack>

                <Stack sx={{background:'whie',flex:3,width:'100%',justifyContent:'center',alignItems:'center'}}>
                {/* 데이터 저장 버튼 */}
                    <Button 
                        onClick={function(){
                            if(selectItem.eItemName!=undefined){
                                // dispatch({ type:"SET" ,payload:{dataName:'isDataSend',value:true}})
                                // dispatch({ type:"SET" ,payload:{dataName:'isDataSendWeight',value:weight}})
                                dispatch({ type:"SETIsDataSend" ,payload:{isDataSend:true,isDataSendWeight:weight}})
                            }else{
                                alert("재료를 선택 해주세요")
                            }
                        }.bind(this)}
                        className='hihi'
                        sx={{width:'70%',height:'25%',fontSize:'40px'}} variant='contained' 
                        // disabled={Math.abs(Number(haveWeight))>Number(allowanceWeight)}>데이터 저장 //오차판단
                        >데이터 저장
                    </Button>
                    <Button 
                        onClick={function(){
                            if(selectItem.eItemName!=undefined){
                                let sendWeight = window.prompt("무게값을 입력해주세요\n단위(KG)")
                                // dispatch({ type:"SETIsDataSend" ,payload:{isDataSend:true,isDataSendWeight:sendWeight}})
                                dispatch({ type:"SET" ,payload:{dataName:'isDataSend',value:true}})
                                dispatch({ type:"SET" ,payload:{dataName:'isDataSendWeight',value:sendWeight}})
                            }else{
                                alert("재료를 선택 해주세요")
                            }
                        }.bind(this)}
                        className='hihi'
                        sx={{width:'70%',height:'25%',fontSize:'40px',mt:'10%'}} variant='contained' 
                        >수동 저장
                    </Button>
                </Stack>


            </Stack>
        </Box>
    )
}



export default Footer;
