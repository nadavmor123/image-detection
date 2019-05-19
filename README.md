-------------image detection app--------------
the app allows you to upload an image to an aws s3 bucket.
if the image is detected as a face it uploads to bucket A otherwise to bucket B
uploading requires a password that is validated in the backend middleware .


the super secret password is : 'supersecret' :)

------------IMPORTANT--------------
navigate to controllers/aws.controller
and change the aws creds to match yours otherwise you'll get an error...

run:
npm install
npm start
