import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ReportIndex from './components/ReportIndex';
import ReportForm from './components/ReportForm';
import ReportShow from './components/ReportShow';

// NB: this file is complete - you do not to write/edit anything!

const App = () => (
  <>
    <h1>Progress Tracker Lite</h1>
    <Switch>
      <Route exact path="/" component={ReportIndex} />
      <Route path="/reports/new" component={ReportForm} />
      <Route exact path="/reports/:reportId" component={ReportShow} />
      <Route path="/reports/:reportId/edit" component={ReportForm} />
    </Switch>
  </>
);

export default App;