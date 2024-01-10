// actions.js
export const login = (user,token) => {
    const data={
        ...user,
        token
    }
    console.log('data:',data);
    return {
      type: 'login',
      payload: data,
    };
  };
  
  export const logout = () => {
    return {
      type: 'logout',
      
    };
  };
export const update =(user,token)=>{
    const data={
        ...user,
        token
    }
    return{
        type:'update',
        payload:data
    }
}
export const adminLogin =(admin,token)=>{
  const data={
    ...admin,
    token
}
    return{
        type:'adminLogin',
        payload:data
    }
}
export const editUser=(user)=>{
  return{
    type:'editUser',
    payload:user
  }
}
export const adminLogout=()=>{
  return{
    type:'adminLogout'
  }
}
  