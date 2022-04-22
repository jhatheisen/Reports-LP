import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReportIndex from '../components/ReportIndex';
import { getAllReports } from '../store/reports';
import ReportIndexItem from '../components/ReportIndexItem';
import reports from './mockData/mockReports.json';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

// Mock ReportIndexItem
jest.mock('../components/ReportIndexItem', () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

jest.mock('../store/reports', () => ({
  getAllReports: jest.fn()
}));

describe('ReportIndex', () => {
  let testReports;
  
  beforeEach(() => {
    testReports = [reports[1], reports[2], reports[3], reports[4], reports[5]];
    getAllReports.mockImplementation(() => testReports);
    useSelector.mockImplementation(callback => callback());
    ReportIndexItem.mockImplementation(() => <li>ReportIndexItem</li>);
  });

  it('should render a ReportIndexItem for each report, passing each report as a `report` prop', () => {
    const { rerender } = render(<ReportIndex />, { wrapper: MemoryRouter });
    const reportIndexItems = screen.getAllByRole('listitem');
    expect(reportIndexItems.length).toBe(5);
    expect(ReportIndexItem.mock.calls[0][0]).toEqual({ report: reports[1] });
    expect(ReportIndexItem.mock.calls[4][0]).toEqual({ report: reports[5] });
    
    // Render again with a different number of reports
    ReportIndexItem.mockClear();
    getAllReports.mockImplementation(() => [...testReports, { id: 6 }]);
    rerender(<ReportIndex />);
    const newReportIndexItems = screen.getAllByRole('listitem');
    expect(newReportIndexItems.length).toBe(6);
    expect(ReportIndexItem.mock.calls[5][0].report).toEqual({ id: 6 });
  });

  it('should display a link to the "New Report" page', () => {
    render(<ReportIndex />, { wrapper: MemoryRouter });
    const newLink = screen.getByRole('link');
    expect(newLink).toHaveAttribute('href', '/reports/new');
    expect(newLink).toHaveTextContent('New Report');
  });
});