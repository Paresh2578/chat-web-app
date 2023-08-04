const Messeges_reduces = (state = [], action)=>{
     if(action.type == "MESSEGES"){
        return state = action.paylod
     }else{
        return state;
     }
}

export default Messeges_reduces;