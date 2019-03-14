# GFW Map Builder Local Deployment & Development
> This is a Walkthrough of the steps to take to debug, build, & deploy a build for a specific issue

### Identifying the Issue
> Steal the construction parameters of the app that has the bug:
```
|- View the Page Source of the application in a new tab
|- Copy the config object in the 'New Mapbuilder' construction object (note: this may be elsewhere on the page)
|- Ensure that this object is properly-formatted JSON (I use jsbeautifier.org)
|- For local development:
  |  |- Copy this JSON object and replace the entire resources.js (while keeping the starting 'export default' call)
  |  |- Run 'npm start' and replicate the bug on 'http://localhost:3000'
  |  |- If the bug cannot be replicated, move on to library development
|- For library development:
  |  |- Copy this JSON object and replace the entire 'config' property in external.pug (without 'export default')
  |  |- Remove any semicolons and ensure the JSON is properly formatted
  |  |- Optional: To ensure the object is properly formatted, run 'npm start' and make sure the pug conversion to html runs smoothly
  |  |- Find the script in 'external.pug' with the id of 'library-load', and change its src to the URL of the corresponding 'libary-load' script in the Page Source of the application with the bug
  |  |- Run 'npm build-lib' to generate a new local libBuild folder
  |  |- Open the external.html in your new libBuild folder (via Python: python -m SimpleHTTPServer 8000 or possibly via folder-path)
  |  |- Reproduce the bug!
  |  |- If the bug cannot be reproduced here (unlikely), it may be due to the library's host-site! Talk to Christina or Richard!

```

### Fixing the Issue
> Figure it out!

### Deploying the Build
> Now that the bug has been fixed (nice job!), we need to get up a build for the PM and client to test
```
|- Regardless of how this issue was debugged and fixed, we want to deploy the fixed app via a 'library build'
|- If the bug was fixed via local development and resources.js:
  |  |- Copy the entirety of our 'resources.js' into the external.pug (without 'export default')
  |  |- Create a new folder in s3 (in the 'gfw-mapbuilder' folder) with some reference to the GitHub Issue number and the task at hand (ex: '344-loss-slider')
  |  |- Find the script in 'external.pug' with the id of 'library-load', and change its src to the URL of the newly-created s3 folder + '/' + theVersionInOurPackage.json + '.js' (version number can be found at the top of the 'external.pug' file and should match the version number in package.json)
  |  |- Run 'npm build-lib' to generate a new local libBuild folder
  |  |- Copy all files in your local libBuild folder over to the new folder you created in s3
  |  |- Confirm your fix at the external.html file in your newly created S3 folder.
|- If the bug was fixed only via changes to the 'external.pug' file:
  |  |- Create a new folder in s3 (in the 'gfw-mapbuilder' folder) with some reference to the GitHub Issue number and the task at hand (ex: '344-loss-slider')
  |  |- Find the script in 'external.pug' with the id of 'library-load', and change its src to the URL of the newly-created s3 folder + '/' + theVersionInOurPackage.json + '.js' (version number can be found at the top of the 'external.pug' file and should match the version number in package.json)
  |  |- Run 'npm build-lib' to generate a new local libBuild folder
  |  |- Copy all files in your local libBuild folder over to the new folder you created in s3
  |  |- Confirm your fix at the external.html file in your newly created S3 folder.

```
