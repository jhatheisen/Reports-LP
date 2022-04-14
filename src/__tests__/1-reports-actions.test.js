/*
This file tests the contents of `../store/reports`. 

It uses a mock store created with the `redux-mock-store` package
(https://www.npmjs.com/package/redux-mock-store).
*/
import configureMockStore from 'redux-mock-store';
// import { RECEIVE_REPORT, RECEIVE_REPORTS, REMOVE_REPORT } from '../store/reports';
import * as reportsModule from '../store/reports';
import reports from './mockData/mockReports.json';

const mockStore = configureMockStore();
const reportId = 2; // Set to 1-5
let store;

describe('report actions', () => {
  describe('report constants', () => {
    it('should export a `RECEIVE_REPORTS` constant', () => {
      expect(reportsModule.RECEIVE_REPORTS).toEqual('reports/RECEIVE_REPORTS');
    });

    it('should export a `RECEIVE_REPORT` constant', () => {
      expect(reportsModule.RECEIVE_REPORT).toEqual('reports/RECEIVE_REPORT');
    });

    it('should export a `REMOVE_REPORT` constant', () => {
      expect(reportsModule.REMOVE_REPORT).toEqual('reports/REMOVE_REPORT');
    });
  });

  describe('report actions', () => {
    beforeEach(() => {
      store = mockStore({ reports: {} });
    });

    describe('receiveReports', () => {
      it('should export a `receiveReports` function', () => {
        expect(typeof reportsModule.receiveReports).toEqual('function');
      });

      it('should return an appropriate action', () => {
        const expectedActions = [{ type: reportsModule.RECEIVE_REPORTS, reports }];
        store.dispatch(reportsModule.receiveReports(reports));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('receiveReport', () => {
      it('should export a `receiveReport` function', () => {
        expect(typeof reportsModule.receiveReport).toEqual('function');
      });

      it('should return an appropriate action', () => {
        const expectedActions = [{ type: reportsModule.RECEIVE_REPORT, report: reports[reportId] }];
        store.dispatch(reportsModule.receiveReport(reports[reportId]))
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('removeReport', () => {
      it('should export a `removeReport` function', () => {
        expect(typeof reportsModule.removeReport).toEqual('function');
      });

      it('should return an appropriate action', () => {
        const expectedActions = [{ type: reportsModule.REMOVE_REPORT, reportId }];
        store.dispatch(reportsModule.removeReport(reportId))
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('report selectors', () => {
    beforeEach(() => {
      store = mockStore({ reports });
    });

    describe('getAllReports', () => {
      const newReport = {
        improvement: 'Though much I know, much to be learned there is.',
        understanding: 'good'
      };

      it('should export a `getAllReports` function', () => {
        expect(typeof reportsModule.getAllReports).toEqual('function');
      });

      it('should return an array of all the reports in the store', () => {
        expect(reportsModule.getAllReports(store.getState())).toEqual(Object.values(reports));
      });

      it('should appropriately handle an empty store', () => {
        store = mockStore({});
        expect(() => reportsModule.getAllReports(store.getState())).not.toThrow();
        expect(reportsModule.getAllReports(store.getState())).toEqual([]);
      });
    });

    describe('getReport', () => {
      it('should export a `getReport` function', () => {
        expect(typeof reportsModule.getReport).toEqual('function');
      });

      it('should return the report corresponding to the reportId passed as a parameter', () => {
        expect(reportsModule.getReport(reportId)(store.getState())).toEqual(reports[reportId]);
      });

      it('should appropriately handle an empty store', () => {
        store = mockStore({});
        expect(() => reportsModule.getReport(store.getState())).not.toThrow();
        expect(reportsModule.getReport(reportId)(store.getState())).toEqual(null);
      });
    });
  });
  
});