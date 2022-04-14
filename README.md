# React-Redux Assessment

**You will have 1.5 hours for this assessment.**

Read this entire README before running specs for the first time; it
contains important information about running tests with jest.

You will be creating a self-reflection report app called Progress Tracker Lite. This
application will allow for the creation, display, updating, and deletion of reports.

## Design Documents

Each report has five fields: `id`, `understanding`, `improvement`, `createdAt`,
and `updatedAt`.

You will code four components: a `ReportIndex`, a `ReportIndexItem`, a
`ReportShow`, and a `ReportForm`. See the wireframes below for a general idea as
to what each component should look like. Note, though, that you do not need to
match their styling.

* [View Wireframes][views]

[views]: ./docs/views.md

## Setup

If any step of the setup fails, ask an instructor for help.

1. Open a new Terminal
2. `cd` into the __reports__ directory
3. `npm install`

To test your code live in the browser, run:

1. `npm start` runs your app in watch mode so it will update with
   changes.
2. Navigate to `localhost:3000`.  

## Your task

Your task for this assessment is to supply the code for the 6 files in
__src/store__ and __src/components__. Each file includes the instructions for
the code you need to write. Each file also already includes the `import`
statements for the external modules and functions that you will need.

Except where noted, do not worry about styling or trying to give your app a
pretty display. Functionality is all you need to worry about in this assessment.

## Running specs

You will be testing your code using Jest. Navigate to the __reports__ folder of
the skeleton and run `npm test`. This will enter watch mode, which will start
watching your files for changes and run all the test specs whenever your files
change. To run your tests initially rather than waiting for a file change you
may use the 'a' command, as outlined in the menu of options for running tests
manually. To exit watch mode, type 'q' (or '^c').

See the 'Debugging Tips' section below for information on how to run a single
spec file.

### Where do the specs live?

For this assessment, Jest specs live in a single __\_\_tests\_\___ folder within
the __src__ folder.

Each test file corresponds to one of the files you will be coding. (Two test
files refer to the __store/reports.js__ file, one for the actions and selectors
and one for the reducer.) The tests are numbered according to the recommended
order of implementation:

Redux tests (i.e., files in the __src/store__ directory):

1. `src/__tests__/1-reports-actions.test.js`
2. `src/__tests__/2-reports-reducer.test.js`
3. `src/__tests__/3-store.test.js`

Component tests (i.e., files in the __src/components__ directory):

4. `src/__tests__/4-ReportIndex.test.js`
5. `src/__tests__/5-ReportIndexItem.test.js`
6. `src/__tests__/6-ReportShow.test.js`
7. `src/__tests__/7-ReportForm.test.js`

## Debugging tips

Jest is Facebook's de facto testing framework for React components. Here are
some tips for making debugging a little less intimidating.

1. When in watch mode, Jest will often start running its tests before you finish
   making your changes but show the by-then completed changes when reporting any
   errors. As a result, code that is correct can look like it failed. The
   takeaway: **Always re-run a failed test before you start despairing and
   trying to debug.**

2. You can run the tests for a single test file by specifying the name of the
   file after `npm test`. What's more, the filename argument will be treated as
   a regular expression, so you don't have to specify the full name. E.g., to
   run only the tests in __3-store.test.js__, from the __reports__ directory,
   simply run

   ```sh
   npm test 3
   ```

  (You will have to specify a little bit more for any number that also appears
  in the full path for the test files.)

3. Examine the test files to see the expected behavior. (Jest reads similarly to
   RSpec.)

4. If you want to see the output from `console.log`s during the tests, remove
   the `--silent` option from the `test` script in the __reports__ folder's
   __package.json__. Once you've made the change, exit out of any
   testing watch mode and run `npm test` again to start the new script.

## Submission

1. Delete the **node_modules** directory from your project
2. Zip your project
3. Submit the zip folder