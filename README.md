# React-Redux Project Assessment

**You will have 1.5 hours for this assessment.**

Read the ENTIRE instructions before running specs for the first time; it
contains important information about running tests with Jest.

## Background

You will be adding Redux onto a self-reflection report app called Progress
Tracker Lite. This application should allow for the creation, display, updating,
and deletion of reports.

This application allows the user to perform CRUD on reports. Each report has
three fields: `id`, `understanding`, and `improvement`.

When the application is refreshed, all data will be reset and no data should
persist.

You will create a Redux store and properly connect the components in the React
application to the Redux store and store the reports data in the Redux store.

## Setup

If any step of the setup fails, ask an instructor for help.

1. Download or clone the repository
2. `cd` into the the repository folder
3. Run `npm install`

To test your code live in the browser, run:

1. `npm start` runs your app in watch mode so it will update with changes
2. Navigate to `localhost:3000`

## Your task

Your task for this assessment is to set up the Redux store and to properly
connect the React components to the Redux store to achieve the desired outcomes.

Do not worry about styling or trying to give your app a
pretty display. Functionality is all you need to worry about in this assessment.

**DO NOT** manipulate the `return` value of any of the React components
**besides** the `Root` component in the `src/index.js`. Doing so may not allow
some test specs to run properly. You can add to or manipulate the code in the
React components **except** the `return` value.

## Running specs

You will be testing your code using Jest with React Testing Library. Run
`npm test` to run all the test specs. This will enter watch
mode, which will start watching your files for changes and run all the test
specs whenever your files change. To run your tests initially rather than
waiting for a file change you may use the 'a' command, as outlined in the menu
of options for running tests manually. To exit watch mode, type 'q' (or '^c').

See the 'Debugging Tips' section below for information on how to run a single
spec file.

For this assessment, Jest specs live in a single __\_\_tests\_\___ folder within
the __src__ folder:

1. `src/__tests__/1-setup-redux.test.js`
2. `src/__tests__/2-display-report-list.test.js`
3. `src/__tests__/3-remove-report.test.js`
4. `src/__tests__/4-display-report-details.test.js`
5. `src/__tests__/5-create-report.test.js`
6. `src/__tests__/6-update-report.test.js`
7. `src/__tests__/7-reset-reports.test.js`

## Phase 1: Setup Redux

In the `src/store/index.js` file, **create, initiate, and return** a Redux store
with all the necessary parameters in the `configureStore` function.

The data in the initial Redux store state should be dependent on the data
within the `src/data/initial-reports.json` file. The data in the file needs to
be converted into the following initial Redux store state:

```js
{
   reports: {
      '1': {
         id: 1,
         improvement: 'Dang, I wish I knew Redux as well as Brad. Also, I need to get better at JavaScript.',
         understanding: 'Confident I understand everything.'
      },
      '2': {
         id: 2,
         improvement: 'Golly, I wish I knew JavaScript as well as Luke. Also, I need to get better at Git.',
         understanding: 'Confident I understand all.'
      },
      '3': {
         id: 3,
         improvement: 'Golly, I wish I knew React as well as Tyler. Also, I need to get better at Redux.',
         understanding: 'Confident I understand all.'
      },
      '4': {
         id: 4,
         improvement: 'Wow, I wish I knew SQL as well as Todd. Also, I need to get better at Jest.',
         understanding: "Extremely comfortable. It's easy. Would ace the assessment."
      },
      '5': {
         id: 5,
         improvement: 'Geez, I wish I knew Sequelize as well as Winston. Also, I need to get better at ES5.',
         understanding: "Extremely comfortable. It's easy. Would ace the assessment."
      }
   }
}
```

Here's an example of how you can use the JSON array in the
`src/data/initial-reports.json` file by importing it from a file directly
within the `src/store/` folder:

```js
import initialReports from '../data/initial-reports.json';
```

Provide the Redux store state to the entire React application. This **MUST** be
done in the `src/index.js` file (**NOT** the `src/App.js` file).

Run and pass the test specs to continue:

```sh
npm test 1-setup-redux
```

**HINT**: Make sure you set up your root reducer and add it to the Redux store.

## Phase 2: Display a List of Reports

**IMPORTANT NOTE**: This phase relies on Phase 1 test specs to
be passing.

On the root page of the application, `/`, display a list of the current reports
in the Redux store.

Run the application (`npm start`) and make sure the root page of the
application, `/` looks like this:

![index-page-screenshot]

Run and pass the test specs to continue:

```sh
npm test 2-display-report-list
```

**HINT**: Make sure to look through all the React components to see which
components are being rendered at the root page of the application, `/`.

## Phase 3: Remove a Report

**IMPORTANT NOTE**: This phase relies on Phase 1 and 2 test specs to
be passing.

On the root page of the application, `/`, if a `Delete` button is clicked for a
report, the report should be removed from the Redux store and the list of
reports should no longer have the removed report.

Run the application (`npm start`) and make sure the root page of the
application, `/` looks like this after the `Delete` button next to "Report #1"
is clicked:

![remove-report-screenshot]

Run and pass the test specs to continue:

```sh
npm test 3-remove-report
```

## Phase 4: Display a Report's Details

**IMPORTANT NOTE**: This phase relies on Phase 1 and 2 test specs to
be passing.

On the root page of the application, `/`, if the report name (eg. "Report #1")
link is clicked, the user should be directed to the `/reports/:reportId` route.
At this route, the application should display the details of the report that
have a matching `id` to the `:reportId` route parameter.

Run the application (`npm start`) and make sure the report detail page of
"Report #1" at the route `/reports/1` looks like this:

![display-report-details-screenshot]

Run and pass the test specs to continue:

```sh
npm test 4-display-report-details
```

## Phase 5: Create a Report

**IMPORTANT NOTE**: This phase relies on Phase 1, 2, and 4 test specs to
be passing.

On the root page of the application, `/`, if the "New Report" link is clicked,
the user should be directed to the `/reports/new` route. At this route, the
application should display the form to create a new report. Once that form is
submitted, the new report should be added to the Redux store and the user
should be redirected to the `/reports/:reportId` route where the `:reportId`
route parameter will be replaced by a new 5 character `id` assigned to the newly
created report.

Run the application (`npm start`) and fill out the create report form at
`/reports/new`. Once the form is submitted, make sure the report details page
shows the input values of the form, similar to the page below:

![report-details-after-create-screenshot]

Run and pass the test specs to continue:

```sh
npm test 5-create-report
```

## Phase 6: Update a Report

**IMPORTANT NOTE**: This phase relies on Phase 1, 2, and 4 test specs to
be passing.

On the root page of the application, `/`, if an `Edit` link is clicked for a
report, the user should be directed to the `/reports/:reportId/edit` route where
`:reportId` should be replaced with the `id` of the report. At this route, the
application should display the form to update that report. Once that form is
submitted, the report should be updated in the Redux store and the user
should be redirected to the `/reports/:reportId` route where the `:reportId`
route parameter will be replaced by the `id` of the report that was updated.

Run the application (`npm start`) and fill out the create report form at
`/reports/1/edit`. Once the form is submitted, make sure the report details page
shows the input values of the form, similar to the page below:

![report-details-after-update-screenshot]

Run and pass the test specs to continue:

```sh
npm test 6-update-report
```

## Phase 7: Reset Report Data

On the root page of the application, `/`, if the `Reset Data` button is clicked
the Redux store should be reverted to its initial state in Phase 1.

**IMPORTANT NOTE**: This phase relies on Phase 1, 2, and Phase 3 to be completed
correctly.

Run the application (`npm start`) and remove "Report #1". The application should
look like this:

![remove-report-screenshot]

Now, press the "Reset Data" button. The application should revert back to having
5 of the initial reports.

![index-page-screenshot]

Run and pass the test specs to continue:

```sh
npm test 7-reset-reports
```

## Debugging tips

Jest is Facebook's de facto testing framework for React components. Here are
some tips for making debugging a little less intimidating.

1. When in watch mode, Jest will often start running its tests before you finish
   making your changes but show the by-then completed changes when reporting any
   errors. As a result, code that is correct can look like it failed. The
   takeaway:
   **Always re-run a failed test before you start despairing and try to debug.**
2. Examine the test files to see the expected behavior.
3. If you want to see the output from `console.log`s during the tests, remove
   the `--silent` option from the `test` script in __reports/package.json__.
   Once you've made the change, exit out of any testing watch mode and run
   `npm test` again to start the new script.

## Submission

Make sure you are passing all the test specs by running:

```sh
npm test
```

1. Delete the **node_modules** directory from your project
2. Zip your project
3. Submit the zip folder

[index-page-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/pt-week-35/index-page-screenshot.png
[remove-report-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/pt-week-35/remove-report-screenshot.png
[display-report-details-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/pt-week-35/display-report-details-screenshot.png
[report-details-after-create-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/pt-week-35/report-details-after-create-screenshot.png
[report-details-after-update-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/pt-week-35/report-details-after-update-screenshot.png