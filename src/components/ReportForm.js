import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { receiveReport, getReport } from '../store/reports';
/*
Export a `ReportForm` component that renders a form to either create or edit a
report. The form should determine whether it is a create or edit form based on
the URL. For a create form, it should pre-fill the form's `understanding` and
`improvement` fields from a blank report. For edit, it should grab the specified
report from the store and pre-fill the form's fields with the data from that
report.  

For new reports, use `nanoid()` to set the id. You should set `createdAt` and/or
`updatedAt`--as appropriate--upon submission. Format `createdAt` and `updatedAt`
as strings using the following `format` function:

  const dateString = format(new Date(), 'MMMM do yyyy - h:mm:ss a');

Use controlled inputs and trigger the appropriate action upon submission. Label
the `understanding` field `Understanding` and use a text input; label the
`improvement` field `Improvement` and use a `textarea`.

Once the form is submitted, you should automatically return to the Report Index
page.
*/