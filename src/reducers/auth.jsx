const initialState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        accessToken: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default authReducer;
