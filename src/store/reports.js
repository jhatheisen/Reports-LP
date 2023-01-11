import initialReports from '../data/initial-reports.json';

const POPULATE = 'reports/POPULATE';

const REMOVE_REPORT = 'reports/REMOVE_REPORT';

export const populateReports = () => {
  return {
    type: POPULATE,
    reports: initialReports
  }
}

export const removeReport = (reportId) => {
  return {
    type: REMOVE_REPORT,
    reportId
  }
}

const initialState = {};

initialReports.forEach(report => initialState[report.id] = report);

export default function reportsReducer (state = initialState, action) {
  switch (action.type) {
    case REMOVE_REPORT: {
      const newState = {...state};
      console.log(newState);
      delete newState[action.reportId];
      return newState;
    }
    default:
      return state;
  }
}
