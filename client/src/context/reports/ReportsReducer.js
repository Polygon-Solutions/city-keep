import { LOAD_REPORTS } from '../types';

const ReportsReducer = (state, action) => {
  switch (action.type) {
    case LOAD_REPORTS:
      return {
        ...state,
        reports: action.payload.reports,
      };
    default:
      return state;
  }
};

export default ReportsReducer;
