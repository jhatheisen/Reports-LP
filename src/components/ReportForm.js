import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addReport, updateReport } from '../store/reports';

const ReportForm = ({ report, formType }) => {
  const history = useHistory();
  const [understanding, setUnderstanding] = useState(report.understanding);
  const [improvement, setImprovement] = useState(report.improvement);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    report = { ...report, understanding, improvement };

    if (formType === "Create Report") {
      dispatch(addReport(report));
    } else if (formType === "Update Report") {
      dispatch(updateReport(report));
    }

    history.push(`/reports/${report.id}`);
  };

  return (
    <form onSubmit={handleSubmit} >
      <h2>{formType}</h2>
      <label>
        Understanding
        <input
          type="text"
          value={understanding}
          onChange={e => setUnderstanding(e.target.value)}
        />
      </label>
      <label>
        Improvement
        <textarea
          value={improvement}
          onChange={e => setImprovement(e.target.value)}
        />
      </label>
      <input type="submit" value={formType} />
    </form>
  );
}

export default ReportForm;
