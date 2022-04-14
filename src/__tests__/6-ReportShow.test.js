import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams, MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReportShow from '../components/ReportShow';
import reports from './mockData/mockReports.json';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual react-redux for non-hooks
  useParams: jest.fn()
}));

describe('ReportShow', () => {
  let testStore;
  // Set reportId to 1, 2, 3, or 5; 4 will fail the updatedAt test
  const reportId = 2;

  beforeEach(() => {
    testStore = { reports };
    useSelector.mockImplementation(callback => callback(testStore));
    useParams.mockReturnValue({ reportId });
  });

  it('should display the `understanding` text from the specified report', () => {
    render(<ReportShow />, { wrapper: MemoryRouter });
    let regex = new RegExp(reports[reportId].understanding);
    expect(screen.getByText(regex)).toBeTruthy();
  });

  it('should display the `improvement` text from the specified report', () => {
    render(<ReportShow />, { wrapper: MemoryRouter });
    let regex = new RegExp(reports[reportId].improvement);
    expect(screen.getByText(regex)).toBeTruthy();
  });

  it('should contain a `Link` to the report index page (`/`)', () => {
    render(<ReportShow />, { wrapper: MemoryRouter });
    const newLink = screen.getByRole('link');
    expect(newLink).toHaveAttribute('href', '/');
  });

  it('should display the report\'s `createdAt` in the `MMMM Do YYYY - h:mm:ss a` format', () => {
    render(<ReportShow />, { wrapper: MemoryRouter });
    const regex = new RegExp(reports[reportId].createdAt);
    expect(screen.getByText(regex)).toBeTruthy();
  });

  it('should display a report\'s distinct `updatedAt` value in the `MMMM do yyyy - h:mm:ss a` format', () => {
    render(<ReportShow />, { wrapper: MemoryRouter });
    const regex = new RegExp(reports[reportId].updatedAt);
    expect(screen.getByText(regex)).toBeTruthy();
  });

  it('should NOT display the report\'s `updatedAt` value if it equals the `createdAt` value', () => {
    // Test with a report (id: 4) where `createdAt` and `updatedAt` are the same
    useParams.mockReturnValue({ reportId: 4 });
    render(<ReportShow />, { wrapper: MemoryRouter });
    const date = reports[4].updatedAt;
    
    // The date/time should appear only once (i.e., for `created at`)
    let regex = new RegExp(date);
    expect(screen.queryByText(regex)).toBeTruthy();
    regex = new RegExp(date + '.*' + date);
    expect(screen.queryByText(regex)).toBeNull();
  });
});