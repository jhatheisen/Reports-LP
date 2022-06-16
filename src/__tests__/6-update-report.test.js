import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('06 - Update a Report', () => {
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

  describe('update an existing report into the Redux store from the UpdateReportForm', () => {
    it('should show the edit form report page with pre-populated data for "Report #1" when the link to "/reports/1/edit" is clicked', async () => {
      act(() => {
        require("../index.js")
      });
      const link = screen.getAllByRole('link', { name: "Edit"})[0];
      userEvent.click(link);
      await waitForElementToBeRemoved(link);
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><form><h2>Update Report</h2><label>Understanding<input type=\"text\" value=\"Confident I understand everything.\"></label><label>Improvement<textarea>Dang, I wish I knew Redux as well as Brad. Also, I need to get better at JavaScript.</textarea></label><input type=\"submit\" value=\"Update Report\"></form>");

      const understandingInput = screen.getByLabelText('Understanding');
      const improvementInput = screen.getByLabelText('Improvement');
      expect(understandingInput.value).toBe("Confident I understand everything.");
      expect(improvementInput.value).toBe("Dang, I wish I knew Redux as well as Brad. Also, I need to get better at JavaScript.");
    });

    it('should update "Report #1" in the Redux store when UpdateReportForm is submitted on "/reports/1/edit"', async () => {
      act(() => {
        require("../index.js")
      });
      const link = screen.getAllByRole('link', { name: "Edit"})[0];
      userEvent.click(link);
      await waitForElementToBeRemoved(link);
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><form><h2>Update Report</h2><label>Understanding<input type=\"text\" value=\"Confident I understand everything.\"></label><label>Improvement<textarea>Dang, I wish I knew Redux as well as Brad. Also, I need to get better at JavaScript.</textarea></label><input type=\"submit\" value=\"Update Report\"></form>");

      const understandingInput = screen.getByLabelText('Understanding');
      const improvementInput = screen.getByLabelText('Improvement');
      expect(understandingInput.value).toBe("Confident I understand everything.");
      expect(improvementInput.value).toBe("Dang, I wish I knew Redux as well as Brad. Also, I need to get better at JavaScript.");

      const understandingValue = '5';
      const improvementValue = '6';
      fireEvent.change(understandingInput, { target: { value: understandingValue } });
      expect(understandingInput.value).toBe(understandingValue);
      fireEvent.change(improvementInput, { target: { value: improvementValue } });
      expect(improvementInput.value).toBe(improvementValue);

      const submitBtn = screen.getByRole('button', { name: "Update Report"});
      userEvent.click(submitBtn);
      await waitForElementToBeRemoved(submitBtn);

      expect(container.innerHTML).toMatch(new RegExp(`<h1>Progress Tracker Lite</h1><section>ID: 1<br>Understanding: ${understandingValue}<br>Improvement: ${improvementValue}<br><a href=\"/\">Back to Report Index</a></section>`));
    });
  });
});