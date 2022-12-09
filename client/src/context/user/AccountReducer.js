import {
  LOAD_USER,
  LOAD_COGNITO_USER,
  UNLOAD_USER,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_COGNITO_USER:
      return {
        ...state,
        cognitoUser: action.payload.cognitoUser,
      };
    default:
      return state;
  }
};
