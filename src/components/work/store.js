

export default function counterReducer(state, action) {
    if (state === undefined){
        return {
            weight:0,
            totalWeight:0,
            Progress:0,//진행상황
            haveWeight:0,//잔여 중량
            selectItem:0,//선택 아이템
            stackWeight:0,//누적 중량
            targetWeight:0,
            scaleSize:'',
            planRow:5,
                }
    }
    const newState= {...state}
    switch(action.type){
        case 'PLUS':
            
            newState.planRow=action.payload.value
            eval('console.log(newState.planRow)')
            eval('console.log(newState.weight)')
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
            newState.number+=action.payload.value
            console.log(newState.number)
            return newState
        default:
            return newState
    }

}
