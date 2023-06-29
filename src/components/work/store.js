


//목표 스택 다시짜기 
export default function counterReducer(state, action) {
    if (state === undefined){
        return {
            //common
            weight:0,//
            selectItem:{},//선택 아이템
            allowance:1,
            apiRef:{},
            isDataSend:false,
            isDataSendWeight:0,
            isPrjComplete:false,//프로젝트 완료
            socket:0,
            calcNum:1,
            stackCalcNum:1,
            row:{"resultCnt":"4","dataList":[
                {"eProcessDate":"2023-04-13","eProductKey":"87","eProductName":"제노핏 플러스(신)","eProreqKey":"221","eProreqNum":"W-221","eTotalProduction":"1.000"},
                {"eProcessDate":"2023-04-13","eProductKey":"14","eProductName":"닥터셀","eProreqKey":"222","eProreqNum":"W-222","eTotalProduction":"10.000"},
                {"eProcessDate":"2023-04-10","eProductKey":"43","eProductName":"명장(90포)","eProreqKey":"219","eProreqNum":"W-219","eTotalProduction":"3.000"},
                {"eProcessDate":"2023-04-10","eProductKey":"60","eProductName":"썬샤인","eProreqKey":"220","eProreqNum":"W-220","eTotalProduction":"10.000"},
              ]},
            
            

            //left
            totalWeight:0,
            Progress:0,//진행상황
            connectState:"연결 확인",
            
            //footer
            haveWeight:9999,//잔여 중량
            stackWeight:0,//누적 중량
            targetWeight:0,
            targetItemName:0,
            allowanceWeight:0,//허용 오차 무게값
            scaleSize:'3',
            planRow:0,
            resultCnt:0,
            completeCnt:0,

            
                }
    }
    const newState= {...state}
    switch(action.type){
        case 'SETPlan':
            
            newState.planRow=action.payload.value
            // newState.number=action.payload.value
            return newState
        case 'SET':
            eval('newState.'+action.payload.dataName+'=action.payload.value')
            console.log(action.payload.dataName+`변경->${action.payload.value}`)
            // newState.number=action.payload.value
            return newState
        case 'PLUSNUM':
            newState.number+=action.payload.value
            console.log(newState.number)
            return newState
        case 'WEIGHT':
            /* 
            1. 무게값을 받아옴
            2. 누적 중량과 더해져 현재 중량
            3. 누적, 잔여 중량 업데이트
            4. 잔여중량 = 목표중량 - 현재 중량
            5. 허용오차 = 목표 중량 * 허용오차 퍼센트
            */
            if(newState.scaleSize=='1'){
                newState.calcNum=0.000001//mg
                newState.stackCalcNum=1000000
            }else if(newState.scaleSize=='2'){
                newState.calcNum=0.001//g
                newState.stackCalcNum=1000
            }else if(newState.scaleSize=='3'){
                newState.calcNum=1
                newState.stackCalcNum=1
            }

            newState.weight=(Number(action.payload.value)+Number(newState.stackWeight*newState.stackCalcNum)).toFixed(3)

            newState.haveWeight=(newState.targetWeight-newState.weight*newState.calcNum).toFixed(3)
            
            newState.allowanceWeight =  (newState.targetWeight * newState.allowance/100).toFixed(3)
            // console.log(`무게값 변경 -> ${action.payload.value}`)
            // console.log(`허용 무게 -> ${newState.allowanceWeight}`)
            return newState
        case 'STACK':
            /*
            1. 현재 무게 값을 누적 중량에 대입
            */
            if(newState.scaleSize=='1'){
                newState.calcNum=0.000001//mg
            }else if(newState.scaleSize=='2'){
                newState.calcNum=0.001//g
            }else if(newState.scaleSize=='3'){
                newState.calcNum=1
            }
           newState.stackWeight = newState.weight*newState.calcNum
            return newState
        case 'RESETstack':
            /*
            1. 현재 무게 값을 누적 중량에 대입
            2. 현재 중량 - 누적중량
            */
            newState.weight -= newState.stackWeight
            newState.stackWeight = 0
            
            return newState
        case 'SETselectItem':
            //아이템 선택 후 누적 중량 초기화
            newState.selectItem = action.payload.row
            newState.stackWeight = 0
            newState.targetWeight = action.payload.row.eProreqItemCount
            newState.targetItemName = action.payload.row.eItemName


            console.log(`newState.selectItem->${action.payload.row.eItemName}`)
            return newState
        default:
            return newState
    }

}
