## Release Notes (Version 1.0)
This implementation of the HuMANAty React website includes the following software features:<br />
  * Account Creation/Log In <br />
  * Unique Profile Page for all Users <br />
  * Toggling Between Host/Guest Modes <br />
  * Creating Events (Host Mode) <br />
  * Selecting a Participating Farm from Which Food Is Sourced (Host Mode)
  * Searching for Events (Using Google API) <br />
  * Registering for Events <br />
  * Reviewing a Host <br />
  * Reviewing a Guest <br />
  * Payment as a Part of Event Registration (Using Stripe API) <br />
  
Recent bug fixes include:
  * "Create" Button on the NavBar only appears in Host Mode
  * Proper width of the Search Bar

We were not able to implement the following features with this release:<br />
  * Saving a Card to an Account (Using Stripe API)
  * Receiving Payments for Events (Using Stripe API - Host-Specific)
  * Third-Party Validation of Host
  * Displaying Participating Farms on a Map During Event Creation
  * Photo Gallery
  * More Advanced Profile Customization

Known bugs in the current release: <br />
  * Rating stars appear improperly sized on certain non-Chrome browsers like Firefox.
  * Viewing events with no farm data will crash the web app (this is unlikely to happen unless the user intentionally <br />
  created such an event)
  * In Chrome, sometimes the search bar autofill function does not work properly unless the user waits 2-3 seconds before searching.

## Install Guide  
Pre-requisites: <br />
* Install npm (https://nodejs.org/en/download/) 
* On this page there is a link to download Node.js which also contains npm. Under “Recommended for Most Users,” click the installer link for your operating system, and save then launch this file. Install Node.js to the recommended default  path (for example, on Windows this path is C:\Program Files\nodejs). 
* In the “Custom Setup” page of the installation window, do not modify anything and click Next.
* Do not check the box in the “Tools for Native Modules” window. Click Next.
* On the final page, click “Install” and let the installation run until finished. <br />

Dependent Libraries: <br />
* Node.js (npm)
* This is the only library that will need to be manually installed. All other libraries used (Stripe, Maps) will be automatically equipped when running npm. <br />

Download Instructions: <br />
* (If using git) Clone this repository and the humanaty-api repository to your desired location.
* (If downloading manually) Download and unzip the huMANAty frontend and api files from the drive links provided. These can be downloaded to any location on your computer, but make sure you remember the directories for later. <br />

Installation of Application: <br />
* Open the command prompt and on the command line, navigate to the folder of the download location for the frontend application files.
* In this folder, type “npm install” in the command prompt window and press enter.  Several lines of text quickly flash on the screen as    npm installs all required libraries to run the app. This may take a few minutes.
* When it is finished, you should see the folder path again, and you should be able to type again.
* After completing the previous steps, in the command prompt, navigate to the folder of the download location for the back end/api files.
* Again, in the command prompt, type “npm install” and press enter.
* Similar text should flash in the command window again as it installs the required api libraries. Again, this may take a couple minutes.

Run Instructions (assuming installation is complete): <br/>
* Run from terminal/ command prompt→
* Navigate into the folder for the application for huMANAty API (back end) 
* Type “npm start” in the terminal and run the command
* Open up another terminal→ 
* Navigate into the folder for the application for huMANAty (front end) 
* Type “npm start” in the terminal and run the command
* The web application should open up to localhost:3000 (or whatever the closet open port is) on the user’s default browser. Type “localhost:3000” into the address bar of your preferred browser to access the web page.

Troubleshooting: <br /> 
* When running the program, if the terminal displays an error that says any module is “not found,”  delete the node_modules folder in the frontend and/or api directory, and from the command prompt, inside the same directory, run “npm install” like during the installation to re-install any missing files.


