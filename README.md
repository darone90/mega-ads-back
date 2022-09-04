
# Mega Ads service back-end

This app is a back - end,  inseparable  part for Mega Ads service. Enables communication between frontend and database, validate incoming data and sending email with activation link to administrator. It was made within the one of final project of MegaKurs.

## About app

This simple server have 6 endpoints which are used for adding new announcements, verifying url, searching, showing and deleting ads.

## Technologies

This program is a simple server using express.js written in typeScript.

Database is mySql MariaDb. Its contains unit test in Jest. For emails sending is responsible nodemailer.

Another used technologies:

- uuid

- rate limiter

- express async errors

- mysql2

## How to start ?

After repository cloning use node package manager to add required modules. Use console:

- npm install

After that you can start develop server by using command:

- npm run start

To make a build version use:

- npm run build

Then you will be ready to start created index.js file using node.

## Contact

To reach author use email: pileckidariusz90@gmail.com

## Copyrights

All code in this repository is free to use