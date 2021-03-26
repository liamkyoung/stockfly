# stockfly
Stock Market Application

Before anything, you must go and download Oracle Instant Client from https://www.oracle.com/database/technologies/instant-client/downloads.html
### MAKE SURE THAT IT IS THE CORRECT VERSION WITH YOUR OS AND BIT, PROBABLY 64 BIT
### IF NOT YOU CAN WASTE A LOT OF TIME ON THIS, LOL
After this, extract the download somewhere on your computer, and copy the path inside of the folder 
You should then travel to your PATH variables on your PC. For windows, you go to
This PC -> Properties -> Advanced System Settings -> Environment Variables -> System Variables -> Path -> Edit -> New -> Then Paste the path. Press OK on everything.

To get started, cd into the /client folder and the /server folder seperately and type in "npm install" to install the current packages.
Next, create a file called ".env" in the /server folder and place your credentials in there. Copy the format below and replace the 
CONNECTION_USER =  "your_username"
CONNECTION_PASSWORD = "your_password"
CONNECTION_URL = "oracle.cise.ufl.edu:1521/orcl"
CONNECTION_PATH = "path of where you placed your oracle 19 client on your computer"

To run front-end react, go to /client and type "npm start"
To connect to Oracle, go to /server and type "npm start"
