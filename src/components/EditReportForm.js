import { useParams } from 'react-router-dom';
import ReportForm from './ReportForm';
import { useSelector } from 'react-redux';

const EditReportForm = () => {
  const { reportId } = useParams();
  const report = useSelector(state => state.reports[reportId]);

  return (
    <ReportForm report={report} formType="Update Report" />
  );
}

export default EditReportForm;
