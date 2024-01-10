const initialState = {
    user:null,
    admin:null,
    edituser:null
  };


  
  function userReducer(state = initialState, action){
    switch (action.type) {
      case 'login':
        return {
          ...state,
          user: action.payload,
        };
      case 'logout':
        return {
          ...state,
          user: null,
        };
      case 'update':
        return{
            ...state,
            user: action.payload
        };
      case 'adminLogin':
        return{
            ...state,
            admin:action.payload
        }
      case 'editUser':
        return{
          ...state,
          edituser:action.payload

        }
      case 'adminLogout':
        return{
          ...state,
          admin:null
        }
      default:
        return state;
    }
  };
  export default userReducer