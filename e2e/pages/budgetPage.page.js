import Page from './page';
var assert = require('assert');
var currencyFormatter = require('currency-formatter');
let defaultWorkingBalance = 2213.93;

class BudgetPage extends Page {

    get budgetButton() { return browser.element('div a[href="/budget"]'); }
    get categoryDropdown() { return browser.element('.//select[@name="categoryId"]'); }
    get descriptionInput() { return browser.element('.//*[@name="description"]'); }
    get valueInput() { return browser.element('.//*[@name="value"]'); }
    get addButton() { return browser.element('.//button[@type="submit"]'); }
    get budgetTable() { return browser.element('.//*[@id="root"]/main/section/table'); }
    get workingBalance() { return browser.element('.//div[text()="Working Balance"]/preceding-sibling::div') }

    open() {
        super.open('http://localhost:3000/budget')
        browser.pause(2000);
    }

    waitForBudgetPageToLoad() {
        if (!this.budgetButton.isVisible()) {
            this.budgetButton.waitForVisible(10000);
        }
    }

    goToBudgetPage() {
        this.waitForBudgetPageToLoad();
        this.budgetButton.click();
    }

    goToCategoryDropdown() {
        this.categoryDropdown.click()
    }

    // TODO: Find a better way to pass the element other explicit string value
    selectCategory(categoryType) {
        browser.selectByVisibleText('.//select[@name="categoryId"]', categoryType);
        //Add assertion that correct category was selected
    }

    addDescription(description) {
        this.descriptionInput.setValue(description);
    }

    addValue(value) {
        this.valueInput.setValue(value)

    }

    clickOnAddButton() {
        if (!browser.isVisible(".//button[@disabled]")) {
            this.addButton.click();
        }
        else (assert.fail("Add button is disabled!"))
    }

    checkBudgetRecoredIsAdded(filterName, filterValue) {
        var rowRecordElement = ".//table//tr//td//div[text()=" + filterName + "]/following-sibling::div[text()=" + filterValue + "]";
        browser.isVisible(rowRecordElement)
    }

    checkWorkingBalanceIsUpdated(budgetValue) {
        let budgetToNumberValue = Number(budgetValue);
        if (Math.sign(budgetToNumberValue) == 1) {
            let expectedIncomeBudget = defaultWorkingBalance + budgetToNumberValue;
            assert.equal(expectedIncomeBudget, this.getWorkingBalanceAmount());
        }
        else {
            let numberValueToPositive = Math.abs(budgetToNumberValue);
            let expectedExpenseBudget = Number(defaultWorkingBalance - numberValueToPositive).toFixed(2);
            assert.equal(expectedExpenseBudget, this.getWorkingBalanceAmount());
        }
    }

    getWorkingBalanceAmount() {
        let currency = browser.getText(".//div[text()='Working Balance']/preceding-sibling::div");
        return currencyFormatter.unformat(currency, { code: 'USD' });
    }
}


export default new BudgetPage()