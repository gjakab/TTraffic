# TTraffic

Telugu traffic is written on Meteor framework (1.3.3). Uses React.js and Semantic UI in front-end.

1. Project structure

  Code is mainly included in "imports" folder, which has foloowing folders
  
  -ui : folder includes React.js components, layouts and stylesheets. LESS is used as CSS preprocessor.
      the folder is seperated to admin and main parts.
  -api : folder includes the most of logical part of the app, including declaration 
      of mongoDB collections, their publications and methids. It also includes "request" folder,
      which includes the files responsible for youtube API requests with intervals.
  -startup : folder includes files that should run when te app is started. It is separated into "client" 
      and "server" parts. "client" folder includes the router (react-router is used) and index file 
      which imports the client side files from "api" folder. "server" folder includes the fixtures 
      (admin user instantiation) and importing of server side files from "api" folder.
      
2. Running locally 

  Clone the project from github repository by running the following command in desired folder
    
    git clone https://github.com/vamsikracha/TTraffic.git
    
  then in te project root folder run the following command
  
    meteor
    
  this will start the app on 3000 port. You can see it in browser at localhost:3000
  
3. Deploying

  The app is using "mup" for deploying to production server. To deploy it change the "pem" property 
  of "servers" in "mup.json" in project root folder to the private key of ssh key pair (make sure you have a root access to
  production server). Run the following command in project root folder
  
    mup deploy
    
  if you don't have mup installed, run the following command
  
    sudo npm install -g mup
    
    
4. Server
  
  The app is loacted in "/opt/telugutraffic" on server. Run the following command to navigate to root folder

    cd /opt/telugutraffic
    
  for accessing the database run the following command
  
    mongo meteor
    
  this will start mongo shell. Database can be reset from here by running the following command
  
    db.dropDatabase()
    
  !Important
    Make sure to backup the data before running this command, or the data will be lost permanently
