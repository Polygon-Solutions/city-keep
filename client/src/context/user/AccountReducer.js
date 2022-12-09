import {
  LOAD_USER,
  LOAD_COGNITO_USER,
  UNLOAD_USER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        cognitoUser: action.payload.cognitoUser,
      };
    case LOAD_COGNITO_USER:
      return {
        ...state,
        cognitoUser: action.payload.cognitoUser,
      };
    case UNLOAD_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        cognitoUser: null,
      };
    default:
      return state;
  }
};
