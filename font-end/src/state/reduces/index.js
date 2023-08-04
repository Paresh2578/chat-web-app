import { combineReducers } from "redux";
import UserData_reducers from "./Msg_user_reducers";
import Convarsation_reduces from "./Convarsation_reduces";
import Messeges_reduces  from './Messeges_reduces'
import Auth_reduces from "./Auth_reduces";

const reducers = combineReducers({
    msg_userInfo : UserData_reducers,
    last_msg_user : Convarsation_reduces,
    messegeges : Messeges_reduces,
    Auth : Auth_reduces
})

export default reducers