import { ADD_ALERT, REMOVE_ALERT } from '../types';

const AlertsReducer = (state, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(
        (alert) => alert.id !== action.payload
      );
    default:
      return state;
  }
};

export default AlertsReducer;
