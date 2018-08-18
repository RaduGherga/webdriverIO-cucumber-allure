import { defineSupportCode } from 'cucumber';
import budgetPage from '../pages/budgetPage.page';

defineSupportCode(function ({ Given }) {

    Given(/^I am on budget page$/, function () {
        budgetPage.open();
        budgetPage.goToBudgetPage();
    });

    Given(/^I have selected category "([^"]*)"$/, function (categoryName) {
        budgetPage.goToCategoryDropdown();
        budgetPage.selectCategory(categoryName);
    });

    Given(/^I added description "([^"]*)"$/, function (description) {
        budgetPage.addDescription(description);
    });

    //TODO: Improve regex
    Given(/^I added value ([^.*]*)$/, function (value) {
        budgetPage.addValue(value);
    });

    Given(/^I have added an expense budget of category "([^"]*)" with amount ([^.*]*)$/, function(category, value) {
        budgetPage.goToCategoryDropdown();
        budgetPage.selectCategory(category);
        budgetPage.addValue(value);
        budgetPage.clickOnAddButton();
    });
});
