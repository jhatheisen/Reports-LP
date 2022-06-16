import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('03 - Remove a Report', () => {
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

  describe('remove a report when the "Delete" button is clicked on the ReportIndexItem', () => {
    it('should remove the first report when the first report\'s "Delete" button is clicked', async () => {
      act(() => { require("../index.js") });
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/1\">Report #1</a><a href=\"/reports/1/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/2\">Report #2</a><a href=\"/reports/2/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/3\">Report #3</a><a href=\"/reports/3/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/4\">Report #4</a><a href=\"/reports/4/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/5\">Report #5</a><a href=\"/reports/5/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");
      const deleteRecordBtn = screen.getAllByRole('button', { name: "Delete" })[0];
      userEvent.click(deleteRecordBtn);
      await waitForElementToBeRemoved(deleteRecordBtn);
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/2\">Report #2</a><a href=\"/reports/2/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/3\">Report #3</a><a href=\"/reports/3/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/4\">Report #4</a><a href=\"/reports/4/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/5\">Report #5</a><a href=\"/reports/5/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");
      // await expect(screen.findByText('Report #1')).rejects.toThrow();
    });

    it('should remove the fourth report when the fourth report\'s "Delete" button is clicked', async () => {
      act(() => { require("../index.js") });
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/1\">Report #1</a><a href=\"/reports/1/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/2\">Report #2</a><a href=\"/reports/2/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/3\">Report #3</a><a href=\"/reports/3/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/4\">Report #4</a><a href=\"/reports/4/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/5\">Report #5</a><a href=\"/reports/5/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");
      const deleteRecordBtn = screen.getAllByRole('button', { name: "Delete" })[3];
      userEvent.click(deleteRecordBtn);
      await waitForElementToBeRemoved(deleteRecordBtn);
      expect(container.innerHTML).toBe("<h1>Progress Tracker Lite</h1><section><ul><li><a href=\"/reports/1\">Report #1</a><a href=\"/reports/1/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/2\">Report #2</a><a href=\"/reports/2/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/3\">Report #3</a><a href=\"/reports/3/edit\">Edit</a><button>Delete</button></li><li><a href=\"/reports/5\">Report #5</a><a href=\"/reports/5/edit\">Edit</a><button>Delete</button></li></ul><a href=\"/reports/new\">New Report</a><button>Reset Data</button></section>");
    });
  });
});