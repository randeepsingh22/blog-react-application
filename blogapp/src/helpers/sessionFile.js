



export const setUserName =(username)=>{
    localStorage.setItem("username",`${username}`)
}
export const getUserName =()=>{
    return localStorage.getItem("username")
}
export const setUserId =(userId)=>{
    return localStorage.setItem("userId",`${userId}`)
}
export const getUserId =()=>{
    return localStorage.getItem("userId")
}
