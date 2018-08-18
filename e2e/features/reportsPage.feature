Feature: Inflow and outflow report with amount for each category

    As a budgeting app user I want to see a report with my budget

    Background:
        Given I am on budget page

    Scenario Outline: Check that new added amount is being displayed correctly in inflow/outflow report page
        Given I have added an expense budget of category <category> with amount <value>
        When I am on report page
        Then I should see a report with category <category> and amount of <value>

        Examples:
            | category | value |
            | "Home"   | -500  |
