const INITIAL_STATE = {
    users:[],
  };
  
const UsersReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
      case "SET_USERS":
        return {
          users: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UsersReducer;
  