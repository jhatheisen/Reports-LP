import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReportIndexItem from '../components/ReportIndexItem'
import { removeReport } from '../store/reports';
import reports from './mockData/mockReports.json';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useDispatch: jest.fn(),
}));

jest.mock('../store/reports', () => ({
  removeReport: jest.fn()
}));

const dispatch = jest.fn();

describe('ReportIndexItem', () => {
  let report; 
  const reportId = 3; // Set `reportId` to a number 1-5

  beforeEach(() => {
    report = reports[reportId];
    useDispatch.mockImplementation(() => dispatch);
    render(<ReportIndexItem report={report}/>, { wrapper: MemoryRouter });
  });

  it('should be a function', () => {
    expect(typeof ReportIndexItem).toEqual('function');
  });

  it('should show the report\'s `createdAt` date in `MMMM do yyyy` format as a link to the report\'s show page', () => {
    let expectedText = report.createdAt;
    let showLink = screen.getByText(expectedText);
    let regex = new RegExp(`^\/?reports\/${reportId}\/?$`);
    expect(showLink).toHaveAttribute('href', expect.stringMatching(regex));
  });

  it('should have a link to the report\'s edit page', () => {
    let editLink = screen.getByText('Edit');
    let regex = new RegExp(`^\/?reports\/${reportId}\/edit\/?$`);
    expect(editLink).toHaveAttribute('href', expect.stringMatching(regex));
  });

  it('should have a button to delete the report', async () => {
    removeReport.mockImplementation((id) => id);
    let deleteButton = screen.getByRole('button');

    // click on Delete button with mock report object
    const user = userEvent.setup();
    expect(removeReport).not.toHaveBeenCalled();
    await user.click(deleteButton);
    expect(removeReport).toBeCalledWith(reportId);
    expect(dispatch).toBeCalledWith(
      removeReport.mock.results[0].value
    );
  });
});