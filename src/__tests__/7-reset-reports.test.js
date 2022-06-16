import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('07 - Reset Report Data', () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.resetModules();
    container.remove();
    container = null;
  });

  describe('the "Reset Data" button should reset all the reports in the Redux store to the initial state', () => {
    it('should reset the reports to the original state', async () => {
      act(() => { require("../index.js") });
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/1\">Report #1</a><a href=\"/reports/1/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/2\">Report #2</a><a href=\"/reports/2/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/3\">Report #3</a><a href=\"/reports/3/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/4\">Report #4</a><a href=\"/reports/4/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/5\">Report #5</a><a href=\"/reports/5/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");

      // Try deleting the fourth record
      const deleteRecordBtn = screen.getAllByRole('button', { name: "Delete" })[3];
      userEvent.click(deleteRecordBtn);
      await waitForElementToBeRemoved(deleteRecordBtn);
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/1\">Report #1</a><a href=\"/reports/1/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/2\">Report #2</a><a href=\"/reports/2/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/3\">Report #3</a><a href=\"/reports/3/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/5\">Report #5</a><a href=\"/reports/5/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");

      // Reset all records to initial record data
      const resetRecordsBtn = screen.getByRole('button', { name: "Reset Data" });
      userEvent.click(resetRecordsBtn);
      await waitFor(() => {
        expect(screen.getByText("Report #4")).toBeTruthy();
      });
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/1\">Report #1</a><a href=\"/reports/1/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/2\">Report #2</a><a href=\"/reports/2/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/3\">Report #3</a><a href=\"/reports/3/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/4\">Report #4</a><a href=\"/reports/4/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/5\">Report #5</a><a href=\"/reports/5/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");
    });

    it('should reset the reports to reflect the data in the `src/data/initial-reports.json` file', async () => {
      jest.mock('../data/initial-reports.json', () => {
        return [
          {
            "id": 43210,
            "improvement": "Mock Test 2 Improvement",
            "understanding": "Mock Test 2 Understanding"
          },
          {
            "id": 98765,
            "improvement": "Mock Test 1 Improvement",
            "understanding": "Mock Test 1 Understanding"
          },
        ]
      });
      act(() => { require("../index.js") });
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/43210\">Report #43210</a><a href=\"/reports/43210/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/98765\">Report #98765</a><a href=\"/reports/98765/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");

      // Try deleting the second record
      const deleteRecordBtn = screen.getAllByRole('button', { name: "Delete" })[1];
      userEvent.click(deleteRecordBtn);
      await waitForElementToBeRemoved(deleteRecordBtn);
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/43210\">Report #43210</a><a href=\"/reports/43210/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");

      // Reset all records to initial record data
      const resetRecordsBtn = screen.getByRole('button', { name: "Reset Data" });
      userEvent.click(resetRecordsBtn);
      await waitFor(() => {
        expect(screen.getByText("Report #98765")).toBeTruthy();
      });
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/43210\">Report #43210</a><a href=\"/reports/43210/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/98765\">Report #98765</a><a href=\"/reports/98765/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");
    });
  });
});