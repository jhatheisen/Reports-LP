import { Link } from 'react-router-dom';
import ReportIndexItem from './ReportIndexItem';
import { useSelector, useDispatch } from 'react-redux';
import { resetReports } from '../store/reports';

const ReportIndex = () => {

  const dispatch = useDispatch();

  const reportsObj = useSelector(state => state.reports);

  const reports = Object.values(reportsObj);

  const resetData = (e) => {
    e.preventDefault();
    dispatch(resetReports());
  };

  return (
    <section>
      <ul>
        {
          reports.map(report => (
            <ReportIndexItem
              report={report}
              key={report.id}
            />
          ))
        }
      </ul>
      <Link to="/reports/new">New Report</Link>
      <button onClick={resetData}>Reset Data</button>
    </section>
  );
}

export default ReportIndex;
