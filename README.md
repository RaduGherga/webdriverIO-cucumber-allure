
### WebdriverIO-cucumber-allure

This repository contains end to end tests for [Modus Budget](https://budget.modus.app/) application. Tests were written with webdriverIO (Selenium - Node.js/JavaScript) projects by using Cucumber framework. Test reports are being generated using Spec and Allure.

### Test Plan

***Application to be tested***
- https://budget.modus.app/  

***Browser***
- Chrome latest  

***Testing type*** 
- Automated end to end testing  

***Testing tools***
 - Syntax: Javascript
 - Editor: Visual Studio Code
 - BDD Framework: Cucumber
 - Javascript test framework: WebdriverIO
 - Reporting tool: Allure  

***Scenarios*** 
 - Check that a budget user is able to add income budget which is reflected in 'Total Flow' and in 'Working Balance'
 - Check that a budget user is able to add expense budget which is reflected in 'Total Outflow' and in 'Working Balance'
 - Check that a budget user is able to see budget report with 'Inflow' and 'Outflow'
 - Check that a budget user is able to see budget report based on specific category
 - Check that a budget user is able to see spending budget report based on category

### Installation

This project is tested on ***Node v6.10.0 to v8.9.0***.  While earlier versions of node may be compatible, they have not been tested or verified.

`JDK 1.8:` Install JDK 1.8+ and make sure class path is set properly. JAVA is require to start `Selenium Server` nothing else.

`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally. If you have nvm installed globally, then run `nvm install` to get the latest version of node specified in the`.nvmrc` file [here](/.nvmrc).  If you don't use nvm, be sure that you are using a compatible version. Further details on nvm can be found on the official [github page](https://github.com/creationix/nvm). MAC OSX users are best suited to install nvm with homebrew `brew install nvm`.

Once installation is done - open terminal (MAC OSX) or command prompt (for windows OS) and type below command to verify NodeJS has been installed properly.

        node --version
        npm --version

Above command should print out the version that you have installed.

Now navigate to the framework's package.json folder and run `npm install` to grab all dependencies.

## Service Workers
Service workers are enabled only when serving static files, not through webpack-dev-server. Here's how you can test service worker functionality:
1. Run `yarn run build` (or `npm run build`) to build the app
2. Run `yarn run serve` (or `npm run serve`) to serve the app on [localhost:3000](http://localhost:3000)
3. Run a new instance of Chrome with disabled security (because localhost is not on https): 

### Selenium

  To run your test You must have selenium / Appium server up and running to execute any WebdriverIO tests, or it will fail fast with an error. There are two ways you can run selenium.

  Once all the node dependency modules are installed (through `npm install`) then for development, you can run  `npm run selenium-postinstall` followed by `npm run selenium-start` if you wish to start it manually else you can use `services: ['selenium-standalone'],` in .conf.js to start it automatically which has been added as part of this project. That's all there is to it.!. Please note that this step is only one time activity at the initial framework set up. Alternatively you can also use below options to start the selenium server.

  1. Install Selenium (selenium-standalone) through NPM (this is the recommended way to install) as you can use it as a services in your framework without worrying to start the selenium server manually. Please note that you follow this below step if `selenium-standalone` package in not been installed through package manager. If you are behind a specific proxy, then in that case you need to set environment variables:

      On OSX:

              NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone install

              NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone start

        On Windows:

              setx NODE_TLS_REJECT_UNAUTHORIZED 0

  sudo npm install selenium-standalone@latest -g

  sudo selenium-standalone install

  selenium-standalone start

  OR

  2. Download the latest selenium standalone server version: and then for example
    $ java -jar selenium-server-standalone-3.4.0.jar. This option is require if you have not done the step No-1. Else ignore it. this is the other way of doing.

  Note: While installing through sudo command - you need to provide System admin password. On windows don't use `sudo`

### Run Tests

To execute the entire test suite in local development, you can use any one of the options mentioned below

Option 1: `npm run test`

<!-- Option 2: `grunt webdriver:test`.  This executes all features in the [`./e2e/features/*.feature`]  directory with a Spec reporter by default and references the `suite.yourSpecific.conf.js` file. Refer to the ./test/config of cucumber-bdd -->

### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files can be found in the `/e2e/config/` directory and all end with `*.conf.js`.  These can be called via the the cli

### Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.  

##### Spec

Test reporter, that prints detailed results to console.

##### Allure

The Allure Reporter creates [Allure](http://allure.qatools.ru/) test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. Add allure to the reporters array in config file and define the output directory of the allure reports.

To generate and view an allure report locally, run `npm run allure-report`.

Allure has several other reporting tools optimized for the CI server of your choice.  You can [view the documentation here](http://wiki.qatools.ru/display/AL/Reporting).

### Develop automation scripts

You can write test either by using Cucumber BDD framework or Jasmine BDD framework. You can choose javascript based design pattern or ES6 based. This project is ES6 friendly (via babel-register)

Refer complete [WebdriverIO API](http://webdriver.io/api.html) methods to write your automation tests.

##### Using Cucumber JavaScript framework

Tests are written in the Cucumber framework using the Gherkin Syntax. More about Gherkin & Cucumber can be found at https://cucumber.io/docs/reference

Tests are place in `*.feature` files in the `/e2e/features/` directory. A typical test will look similar to this:
```
Feature: Test if the user is able to add expense or income

    As a budgeting app user I want to add an a new income into my budget

    Background:
        Given I am on budget page

    Scenario Outline: New added budget should be displayed correctly with total amount being updated
        Given I have selected category <category>
        And I added description <description>
        And I added value <value>
        When I click on add button
        Then I should see that new budget with "Description" = <description> has been added
        And I should see that new budget with amount of <value> is reflected into my working balance


        Examples:
            | category | description | value |
            | "Income" | "Salary"    | 2000  |
            | "Car"    | "Repair"    | -1000 |

```

### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath' etc.) up to date with the latest version of your code.  The next challenge is to keep the code you write nice and DRY (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in our step definitions(in cucumber) or in Spec file (in Jasmine or Mocha), we instead place them in a `<pagename>.js` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.js`.  These will require the basic `page.js` prototype construct / abstract class and create new objects for each individual page. For more information on the implementation, refer to the `/e2e/pages` directory.
### Contributors
[WebdriverIO-with-CucumberBDD] https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD
[ModusCreateOrg/Budgeting] https://github.com/ModusCreateOrg/budgeting
### Licensing

MIT
