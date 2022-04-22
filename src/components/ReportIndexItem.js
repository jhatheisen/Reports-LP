import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeReport } from '../store/reports';
/*
Export a `ReportIndexItem` component that takes in a `report` as props. The
component should render an `li` containing the following:

1. A link to the report's show page with text of the report's `createdAt` date. 
2. A link to the report's edit page with text 'Edit'.
3. A button to delete the report.
*/