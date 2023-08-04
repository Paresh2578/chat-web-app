const Last_msg_convarsation = (state = {} , action)=>{
    if(action.type == 'LAST_MSG'){
    return   state = action.paylod
    }else{
       return state
    }           
}

export default Last_msg_convarsation;