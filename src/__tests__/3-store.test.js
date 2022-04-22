/*
This initial comment contains implementation details for test maintainers; it
can be skipped by those who are taking the test.

To test `rootReducer`--a non-exported function--this test file uses
`babel-plugin-rewire`
(https://github.com/speedskater/babel-plugin-rewire/blob/master/README.md). This
plugin supplies access to `rootReducer` through the named `__RewireAPI__` object
that it attaches to a file's default export. 

The babel plugin is specified in __package.json__. To enable create-react-app to
recognize this change to babel's configuration without ejecting, this project
uses `react-app-rewired` (https://www.npmjs.com/package/react-app-rewired). The
relevant scripts in the __package.json__ have been edited to use this package
instead of `react-scripts`.

Note: `react-app-rewired` requires a __config-overrides.js__ file in the root
directory (present but empty in this project). 
*/
import reportsReducer, { RECEIVE_REPORT } from '../store/reports';
import configureStore, { __RewireAPI__ as storeModule } from '../store';
import { createStore } from 'redux';

describe('rootReducer', () => {
  let rootReducer, store;
  beforeAll(() => {
    rootReducer = storeModule.__get__('rootReducer');
    store = createStore(rootReducer);
  });

  it('should be a function', () => {
    expect(typeof rootReducer).toEqual('function');
  });

  it('should include the `reportsReducer` under the key `reports`', () => {
    const action = { type: RECEIVE_REPORT, report: { id: 1 }};
    store.dispatch(action);
    expect(store.getState().reports).toEqual(
      reportsReducer({}, action)
    );
  });
});

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    // Mock rootReducer with a function that returns a mock state.  
    storeModule.__set__('rootReducer', () => ({ storeKey: 'storeValue' }));
  });

  beforeEach(() => {
    // The first test assures that `configureStore` is a function. Since this
    // code runs before the first test, it contains a conditional to ensure that
    // `configureStore` will not be invoked if it is not a function.
    if (typeof configureStore === 'function') store = configureStore();
  });

  afterAll(() => {
    storeModule.__ResetDependency__('rootReducer');
  });

  it('should be a function that is the default export', () => {
    expect(typeof configureStore).toEqual('function');
  });

  it('should create a store when invoked', () => {
    store.dispatch({type: 'ACTION'});
    expect(store.getState()).toEqual({ storeKey: 'storeValue' });
  });

  it('should set the initial state of the store to `{}`', () => {
    storeModule.__set__('rootReducer', state => {
      return state;
    });
    store = configureStore();
    expect(store.getState()).toEqual({});
  });
});