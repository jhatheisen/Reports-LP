import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getReport } from '../store/reports';
/*
Write a `ReportShow` functional component that receives no props. The component
should grab the requested report from the store and render its information:
`understanding`, `improvement`, `createdAt`, and `updatedAt`. 

**Only display `updatedAt` if it is a different date/time than `createdAt`.** 

Finally, include a `Link` back to the `ReportIndex`.

Do NOT worry about any other styling or formatting of the component; you just
need to render the required information to the screen.
*/