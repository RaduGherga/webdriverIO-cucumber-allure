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


    Scenario Outline: Income with negative amount is being converted to positive amount
        Given I have selected category "Income"
        And I added value <negativeAmount>
        When I click on add button
        Then I should see that new budget with amount of <positiveAmount> is reflected into my working balance


        Examples:
            | negativeAmount | positiveAmount |
            | -100           | 100            |

