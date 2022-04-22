/*
This file tests the reportsReducer in `../store/reports`. 
*/
import reportsReducer, * as ReportActions from '../store/reports';

describe('reportsReducer', () => {
  let oldState;

  beforeEach(() => {
    oldState = { 2: 'oldState' }
  })

  it('should be a function exported as the default', () => {
    expect(typeof reportsReducer).toEqual('function');
  });

  it('should initialize with an empty object as the default state', () => {
    expect(reportsReducer(undefined, {})).toEqual({});
  });

  it('should return the previous state if an action is not matched', () => {
    const newState = reportsReducer(oldState, { type: 'notAType' });
    expect(newState).toBe(oldState);
  });

  describe('handling the RECEIVE_REPORTS action', () => {
    let testReports, action;

    beforeEach(() => {
      testReports = { 1: 'testReport1', 2: 'testReport2' };
      action = {
        type: ReportActions.RECEIVE_REPORTS,
        reports: testReports
      };
    });

    it('should replace the state with the action\'s reports', () => {
      const state = reportsReducer(undefined, action);
      expect(state).toEqual(testReports);
    });

    it('should not modify the old state', () => {
      reportsReducer(oldState, action);
      expect(oldState).toEqual({ 2: 'oldState' });
    });
  });

  describe('handling the RECEIVE_REPORT action', () => {
    let testReport, action;

    beforeEach(() => {
      testReport = {
        id: 1,
        understanding: 'good',
        improvement: 'great',
        created_at: '2022-02-17T04:19:07.404Z',
        updated_at: '2022-02-17T04:19:07.404Z'
      };
      action = {
        type: ReportActions.RECEIVE_REPORT,
        report: testReport
      };
    });

    it('should add the report to the state using the report `id` as a key', () => {
      let state = reportsReducer(undefined, action);
      expect(state[1]).toEqual(testReport);
    });

    it('should not affect the other reports in the state', () => {
      let state = reportsReducer(oldState, action);
      expect(state[2]).toEqual('oldState');
    });

    it('should not modify the old state', () => {
      reportsReducer(oldState, action);
      expect(oldState).toEqual({ 2: 'oldState' });
    });
  });

  describe('handling the REMOVE_REPORT action', () => {
    let testReport, action;

    beforeEach(() => {
      oldState = { 1: 'oldState', 2: 'testReport' }
      testReport = {
        id: 2,
        understanding: 'good',
        improvement: 'great',
        createdAt: '2022-02-17T04:19:07.404Z',
        updatedAt: '2022-02-17T04:19:07.404Z'
      };
      action = {
        type: ReportActions.REMOVE_REPORT,
        reportId: testReport.id
      };
    });

    it('should remove the correct report from the state', () => {
      let state = reportsReducer({ 2: testReport }, action);
      expect(typeof state[2]).toEqual('undefined');
    });

    it('should not affect the other reports in the state', () => {
      let state = reportsReducer(oldState, action);
      expect(state[1]).toEqual('oldState');
    });

    it('should not modify the old state', () => {
      reportsReducer(oldState, action);
      expect(oldState).toEqual({ 1: 'oldState', 2: 'testReport' });
    });
  });
});