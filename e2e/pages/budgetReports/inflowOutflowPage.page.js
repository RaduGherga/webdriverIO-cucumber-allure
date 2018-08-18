import Page from '../page'
var currencyFormatter = require('currency-formatter');
var assert = require('assert');

class InflowOutflowReport extends Page {

    get inflowText() { return browser.element('.//*[contains(text(),"INFLOW")]'); }
    get reportPageLink() { return browser.element('div a[href="/reports"]'); }

    open() {
        super.open('http://localhost:3000/reports/inflow-outflow')
        this.waitForReportInflowOutflowToLoad();
    }

    goToReportPage() {
        this.reportPageLink.click();
        this.waitForReportInflowOutflowToLoad();
    }

    waitForReportInflowOutflowToLoad() {
        if (!this.inflowText.isVisible()) {
            this.inflowText.waitForVisible(10000);
        }
    }

    getAmountFromReportPageCategory(categoryType) {
        let categorySelector = './/span[text()="' + categoryType + '"]/following-sibling::span';
        let currency = browser.getText(categorySelector);
        return currencyFormatter.unformat(currency, { code: 'USD' });
    }

    checkCategoryAmountIsCorrect(categoryType, expectedAmount) {
        let actualAmount = Number(this.getAmountFromReportPageCategory(categoryType));
        assert.equal(actualAmount, Number(expectedAmount), 
        "Wrong amount is being displayed, expected: " + Number(expectedAmount) + " but found: " + actualAmount)
    }
}

export default new InflowOutflowReport()