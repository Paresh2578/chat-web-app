const Msg_user_reducers = (state = {} , action)=>{
    if(action.type == 'MSG_USER'){
    return   state = action.paylod
    }else{
       return state
    }
}

export default Msg_user_reducers;