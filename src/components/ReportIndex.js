import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllReports } from '../store/reports';
import ReportIndexItem from './ReportIndexItem';
/*
Export a `ReportIndex` component that renders a list (`ul`) of
`ReportIndexItems`. This component should use the `getAllReports` selector to
grab the `reports` from the store. Below the `ul`, add a `Link` to the new
report page with the text 'New Report'.
*/