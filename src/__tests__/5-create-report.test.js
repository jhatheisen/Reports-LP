import { screen, waitForElementToBeRemoved, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('05 - Create a Report', () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
    jest.mock('react-router-dom', () => {
      // Require the original module to not be mocked...
      const originalModule = jest.requireActual('react-router-dom');
      return {
        __esModule: true,
        ...originalModule,
        BrowserRouter: originalModule.MemoryRouter,
      };
    });
  });

  afterEach(() => {
    jest.resetModules();
    container.remove();
    container = null;
  });

  describe('inserts a new report into the Redux store from the CreateReportForm', () => {
    it('should insert the new report into the Redux store when CreateReportForm is submitted', async () => {
      act(() => {
        require("../index.js")
      });
      const link = screen.getByRole('link', { name: "New Report"});
      userEvent.click(link);
      await waitForElementToBeRemoved(link);
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><form><h2>Create Report</h2><label>Understanding<input type=\"text\" value=\"\"></label><label>Improvement<textarea></textarea></label><input type=\"submit\" value=\"Create Report\"></form>");

      const understandingInput = screen.getByLabelText('Understanding');
      const improvementInput = screen.getByLabelText('Improvement');
      expect(understandingInput.value).toBe('');
      expect(improvementInput.value).toBe('');

      const understandingValue = '3';
      const improvementValue = '4';
      fireEvent.change(understandingInput, { target: { value: understandingValue } });
      expect(understandingInput.value).toBe(understandingValue);
      fireEvent.change(improvementInput, { target: { value: improvementValue } });
      expect(improvementInput.value).toBe(improvementValue);

      const submitBtn = screen.getByRole('button', { name: "Create Report"});
      userEvent.click(submitBtn);
      await waitForElementToBeRemoved(submitBtn);

      expect(container.innerHTML).toMatch(new RegExp(`<h1>Progress Tracker Lite</h1><section>ID: .{5}<br>Understanding: ${understandingValue}<br>Improvement: ${improvementValue}<br><a href=\"/\">Back to Report Index</a></section>`));
    });
  });
});