let temp = false;
let email = "";
window.localStorage.getItem("auth")==null? temp=false:temp=true;
window.localStorage.getItem("email")==""? email = "":email = window.localStorage.getItem("email");
const initState = {
    auth:temp,
    email:email
}

function authReducer(state = initState,action){

    switch(action.type){
        case "LOGIN":
            return {auth:true , email:action.payload}
        
        case "LOGOUT":
            return {auth:false , email:""}
        
        default:
            return state    
    }
}

export default authReducer;