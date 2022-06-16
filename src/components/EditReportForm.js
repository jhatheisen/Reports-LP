import { useParams } from 'react-router-dom';
import ReportForm from './ReportForm';

const EditReportForm = () => {
  const { reportId } = useParams();
  const report = {};

  return (
    <ReportForm report={report} formType="Update Report" />
  );
}

export default EditReportForm;