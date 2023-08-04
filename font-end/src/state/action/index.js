export const User = (userInfo)=>{
    return (dispatch)=> {
        dispatch({type:'MSG_USER' , paylod: userInfo})
    }
}

export const Last_msg_convarsatio = (convarsation) =>{
    return (dispatch)=>{
        dispatch({type : 'LAST_MSG' , paylod:convarsation})
    }
}

// export const Message = (result)=>{
//     return(dispatch)=>{
//         dispatch({type:'MESSAGES', paylod:mesgs})
//     }
// }

export const Messeges = (result)=>{
    return (dispatch)=>{
        dispatch({type : 'MESSEGES', paylod:result})
    }
}

export const Auth = (auth)=>{
    return (dispatch)=>{
        dispatch({type:'AUTH' , paylod : auth})
    }
}