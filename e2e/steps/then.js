import { defineSupportCode } from 'cucumber';
import budgetPage from '../pages/budgetPage.page';
import inflowOutflowReport from '../pages/budgetReports/inflowOutflowPage.page';

defineSupportCode(function ({ Then }) {

    Then(/^I should see that new budget with "([^"]*)" = "([^"]*)" has been added$/, function (filterName, filterValue) {
        budgetPage.checkBudgetRecoredIsAdded(filterName, filterValue);
    });

    Then(/^I should see that new budget with amount of ([^.*]*) is reflected into my working balance$/, function (budgetValue) {
        budgetPage.checkWorkingBalanceIsUpdated(budgetValue);
    });

    Then(/^I should see a report with category "([^"]*)" and amount of ([^.*]*)$/, function (categoryType, amount) {
        inflowOutflowReport.checkCategoryAmountIsCorrect(categoryType, amount);
    });
});