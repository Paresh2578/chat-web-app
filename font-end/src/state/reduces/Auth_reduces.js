

const Auth_reduces = (state = {}  , action)=>{
    if(action.type  =='AUTH'){
        return state = action.paylod;
    }else{
        return state;       
    }
}

export default Auth_reduces;