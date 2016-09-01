# PLM-teacher

This application is used to monitor the progression of users of [webPLM](https://github.com/buggleinc/webplm).
It retrieves the list of users from [PLM-profiles](https://github.com/buggleinc/plm-profiles) then queries [GitHub API](https://developer.github.com/v3/) to access to [PLM-data](https://github.com/buggleinc/plm-data).

This application has been developed using [Angular 2](https://angular.io/).

### Installation

To install the application, run these commands:

```Bash
git clone https://github.com/BuggleInc/PLM-teacher.git
cd PLM-teacher
npm install -g typings
npm install
```

Then replace the value of the [Access Token](https://github.com/BuggleInc/PLM-teacher/blob/master/app/services/github-api.service.ts#L10) with your own.
The Access Token is used to authenticate the queries to [GitHub API](https://developer.github.com/v3/) in order to have a higher limit (5000 request per hour, instead of 60).

### Running the application

To run the application, use this command:

```Bash
npm start
```

A new tab should open in your browser to the URL **localhost:3000**
