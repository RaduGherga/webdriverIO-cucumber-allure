import { defineSupportCode } from 'cucumber';
import budgetPage from '../pages/budgetPage.page';
import inflowOutflowReport from '../pages/budgetReports/inflowOutflowPage.page'

defineSupportCode(function ({ When }) {

    When(/^I click on add button$/, function () {

        budgetPage.clickOnAddButton();
    });

    When(/^I am on report page$/, function () {
        inflowOutflowReport.goToReportPage();
        inflowOutflowReport.waitForReportInflowOutflowToLoad();
    });
});