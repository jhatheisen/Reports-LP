import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { receiveReport, getReport } from '../store/reports';
import ReportForm from '../components/ReportForm';
import reports from './mockData/mockReports.json';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual react-router-dom for non-hooks
  useParams: jest.fn(),
  useHistory: jest.fn()
}));

jest.mock('../store/reports', () => ({
  receiveReport: jest.fn(),
  getReport: jest.fn()
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn()
}));

jest.mock('date-fns', () => ({
  format: jest.fn()
}));

const dispatch = jest.fn();

describe('ReportForm', () => {
  let testStore, understandingInput, improvementTextarea, submitButton;
  let history;
  const user = userEvent.setup();
  
  beforeEach(() => {
    testStore = { reports };
    history = [];
    useSelector.mockImplementation(report => report);
    getReport.mockImplementation(id => testStore.reports[id]);
    receiveReport.mockImplementation(report => report);
    useDispatch.mockImplementation(() => dispatch);
    useHistory.mockImplementation(() => history);
  });

  describe('creating a new report', () => {
    const date = "April 13th 2022 - 12:36:48 AM";
    const id = 12;

    beforeEach(() => {
      useParams.mockReturnValue({});
      nanoid.mockImplementation(() => id);
      format.mockImplementation(() => date);
      render(<ReportForm />);
      understandingInput = screen.getByLabelText(/understanding/i);
      improvementTextarea = screen.getByLabelText(/improvement/i);
      submitButton = screen.getByRole('button');
    });

    it('should contain a header with the text `Create Report`', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Create Report');
    });

    it('should pre-fill `understanding` and `improvement` with empty strings', () => {
      expect(understandingInput).toHaveValue('');
      expect(improvementTextarea).toHaveValue('');
    });

    it('should say `Create Report` on the submit button', () => {
      //Allow for different button implementations
      submitButton.value ?
        expect(submitButton).toHaveValue('Create Report') :
        expect(submitButton).toHaveTextContent('Create Report');
    });

    it('should update the `understanding` field when it changes', async () => {
      await user.type(understandingInput, 'great!');
      expect(understandingInput).toHaveValue('great!');
    });

    it('should update the `improvement` field when it changes', async () => {
      await user.type(improvementTextarea, 'good!');
      expect(improvementTextarea).toHaveValue('good!');
    });

    it('should set id correctly', async () => {
      await user.click(submitButton);
      const newReport = receiveReport.mock.calls[0][0];
      expect(newReport.id).toEqual(id);
    });

    it('should set createdAt and updatedAt correctly', async () => {
      await user.click(submitButton);
      const newReport = receiveReport.mock.calls[0][0];
      expect(newReport.createdAt).toEqual(date);
      expect(newReport.updatedAt).toEqual(date);
      expect(format.mock.calls[0][0] instanceof Date).toBe(true);
      expect(format.mock.calls[0][1]).toEqual('MMMM do yyyy - h:mm:ss a');
    });
    
    it('should dispatch the correct action when submitted', async() => {
      await user.type(understandingInput, 'terrible!');
      await user.type(improvementTextarea, 'excellent!');
      await user.click(submitButton);

      expect(receiveReport).toBeCalled();
      const newReport = receiveReport.mock.results[0].value;
      expect(newReport.understanding).toEqual('terrible!');
      expect(newReport.improvement).toEqual('excellent!');

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(newReport);
    });

    it('should return to the Report Index page on submit', async() => {
      await user.type(understandingInput, 'terrible!');
      await user.type(improvementTextarea, 'excellent!');
      await user.click(submitButton);

      expect(history).toEqual(['/']);
    });
  });

  describe('updating an existing report', () => {
    let reportId = 2;
    const date = "May 25th 2022 - 1:47:19 PM";

    beforeEach(() => {
      useParams.mockReturnValue({ reportId });
      nanoid.mockImplementation(() => id);
      format.mockImplementation(() => date);
      render(<ReportForm />);
      understandingInput = screen.getByLabelText(/understanding/i);
      improvementTextarea = screen.getByLabelText(/improvement/i);
      submitButton = screen.getByRole('button');
    });

    afterEach(() => jest.clearAllMocks());

    it('should contain a header with the text `Update Report`', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Update Report');
    });

    it('should grab the appropriate report from the store', () => {
      useSelector.mockClear();
      const {rerender} = render(<ReportForm />);
      expect(useSelector.mock.results[0].value).toEqual(testStore.reports[reportId]);
      useParams.mockReturnValue({ reportId: 3 });
      rerender(<ReportForm />);
      expect(useSelector.mock.results[1].value).toEqual(testStore.reports[3]);
    });

    it('should pre-fill `understanding` and `improvement` fields with report data from the store', () => {
      expect(understandingInput).toHaveValue(testStore.reports[reportId].understanding);
      expect(improvementTextarea).toHaveValue(testStore.reports[reportId].improvement);
    });

    it('should say `Update Report` on the submit button', () => {
      //Allow for different button implementations
      submitButton.value ?
        expect(submitButton).toHaveValue('Update Report') :
        expect(submitButton).toHaveTextContent('Update Report');
    });

    it('should dispatch the correct action when submitted', async() => { 
      const updatedReport = { 
        ...testStore.reports[reportId], 
        understanding: 'terrible',
        improvement: 'excellent',
        updatedAt: date
      };

      await user.clear(understandingInput);
      await user.clear(improvementTextarea);
      await user.type(understandingInput, 'terrible');
      await user.type(improvementTextarea, 'excellent');
      await user.click(submitButton);

      expect(receiveReport).toBeCalledWith(updatedReport);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(
        receiveReport.mock.results[0].value
      );
    });
  });
});