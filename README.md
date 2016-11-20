# dotbc-queue-site

This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

### `./bin/admin add|list|rm`

The admin utility exists to allow adding, listing, and removing admin users. Admin users may log into the site via the /admin-login route. 
Once logged in they may access /admin-home to edit and review the participant queue. 

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## items for handoff

  - github repo transfer
    - move to dotbc and ensure team added
  - heroku app transfer
    - ensure dotbc has an account to transfer to. person with admin access will have to set up additional environments. 
    - alternatively, ensure dotbc has an account, provide me access and I can set up all environments. each will need a new branch on above github repo. 
  - AWS IAM user setup
    - easiest to set up account and provide me access?
  - AWS S3 setup
    - easiest to set up account and provide me access?

## use cases by route / page

### participant use cases

#### / (index): 

- User can view information about dotbc queue, including 'Agencies and Organizations on the Waitlist' 
  and 'Full List of Current accepted'
- 'Agencies and Organizations on the Waitlist' are shown by default and match data of participants currently assigned queueNumbers
- Clicking 'Agencies and Organizations on the Waitlist' or 'Full List of Current accepted' will toggle list of participants shown  
- User can click to join via the top right link or the call to action join button 
- User can click to login via the top right link
  - Clicking the login link causes login modal to appear

#### /login:

- login modal should appear by default
- user may log in with username and password

#### /join:

- User enters all necessary information and clicks to join, is then directed to /home page
- Lack of any input field should result in a validation error message displayed  

#### /home: 

- User can view their current place in queue
- User can view their provided queue number / position
- User can view their provided join information
- User can inline-edit their provided information. Entries are saved automatically on blur
- User can upload files to share with dotbc by dropping them on the dropzone, or clicking and selecting the files
- User can view their previously uploaded files and documents
- User can click to inline-edit descriptions of uploaded files
- User can sign out via top left link

### admin use cases

#### /admin-login 

(admins access the site via the url /admin-login, which is non-advertised. login functionality is otherwise the same)

- Admin can login via 'sign in' link at top right 

#### /admin-home

- Admin can view In-Queue and Accepted participants
  - In-Queue participants are sorted in order of their queueNumber / queue position
  - Accepted participants are sorted in order of their accepted datetime
- Clicking non-link and non editable elements on a participant row should toggle between open and closed view states
  - Closed view state shows queueNumber queue position, an uploded logo, summary participant info the number of files 
    uploaded and buttons to change queueNumber
  - Open view state expands to show the list of participant's uploaded files
- Clicking on queueNumber activates inline-edit, which allows queue position to be manually changed
  - Entering a new queue number should move the current line item to that place in the queue, and adjust all 
    other queue items accordingly
- Clicking 'Add Logo' should open a file picker, allowing an image file to be uploaded
- Clicking a file download icon should begin downloading that file in a new tab
- Clickin 'Accept' should assign a participant an accepted date and move the record into the qccepted queue
  - This action will cause the participant to now be listed in the accepted list on the / (index) page as well. 
 - Clickin 'Unaccept' should return a participant to end queue position of the Waitlist
  - This action will cause the participant to now be listed in the wait list on the / (index) page as well.
- Clicking on the up-arrow should move the participant to the top of the wait list