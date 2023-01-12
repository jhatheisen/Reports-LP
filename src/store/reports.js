import initialReports from '../data/initial-reports.json';

const REMOVE_REPORT = 'reports/REMOVE_REPORT';

const ADD_REPORT = 'reports/ADD_REPORT';

const UPDATE_REPORT = 'reports/UPDATE_REPORT';

const RESET_REPORTS = 'reports/RESET_REPORT';

export const removeReport = (reportId) => {
  return {
    type: REMOVE_REPORT,
    reportId
  }
}

export const addReport = (report) => {
  return {
    type: ADD_REPORT,
    report
  }
}

export const updateReport = (report) => {
  return {
    type: UPDATE_REPORT,
    report
  }
}

export const resetReports = () => {
  return {
    type: RESET_REPORTS,
  }
}



const initialState = {};

initialReports.forEach(report => initialState[report.id] = report);

export default function reportsReducer (state = initialState, action) {
  Object.freeze(state)
  switch (action.type) {
    case REMOVE_REPORT: {
      const newState = {...state};
      delete newState[action.reportId];
      return newState;
    }
    case ADD_REPORT: {
      const newState = {...state}
      const reportId = action.report.id;
      newState[reportId] = action.report;
      return newState;
    }
    case UPDATE_REPORT: {
      const newState = {...state};
      const reportId = action.report.id;
      delete newState[reportId];
      newState[reportId] = action.report;
      return newState;
    }
    case RESET_REPORTS: {
      const newState = {...initialState};
      return newState;
    }
    default:
      return state;
  }
}
