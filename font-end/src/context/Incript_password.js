export const Incript_password = (password) =>{
    let incript_password = "";
    console.log("old password : " + password);
    for(let i=0;i<password.length;i++){
       incript_password += String.fromCharCode(password.charCodeAt(i) + 3);
    }

    return incript_password;
}