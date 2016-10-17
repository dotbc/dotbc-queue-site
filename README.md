# dotbc-queue-site

## Installing

`npm install`

## Running

dotbq-queue-site requires AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_BUCKET env variables which 
point to access credentials for an AWS IAM user and the bucket name of an AWS S3 bucket. 

By default the site's Makefile will look for environment variables called DOTBC_AWS_ACCESS_KEY_ID, DOTBC_AWS_BUCKET, and DOTBC_AWS_ACCESS_KEY_ID 
to provide these values. You can export them within your .bash_profile, .bashrc, or .zshrc files. 

Run the site with the following script:

`make start`

Alternatively, you can specify environment variables directly and run with: 

`make AWS_ACCESS_KEY_ID=[your key] AWS_SECRET_ACCESS_KEY=[your access key] AWS_BUCKET=[your bucket] start`

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
- User can delete files previously uploaded
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