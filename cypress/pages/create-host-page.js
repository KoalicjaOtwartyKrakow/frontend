import BasePage from "./page-templates/base-page";
import hosts from "./hosts-page";

class CreateHostPage extends BasePage {
    get submitButton() {
        return cy.get('button[type="submit"]');
    }
    get statusField() {
        return cy.get("#status");
    }

    get fullNameField() {
        return cy.get("#fullName");
    }

    get emailField() {
        return cy.get("#email");
    }

    get phoneNumberField() {
        return cy.get("#phoneNumber");
    }

    get commentsField() {
        return cy.get("#comments");
    }

    fillHostForm() {
        this.fullNameField.type("Tester Testerski");
        this.fullNameField.should("have.value", "Tester Testerski");
        this.emailField.type("tester@testerski.pl");
        this.emailField.should("have.value", "tester@testerski.pl");
        this.phoneNumberField.type("+48101202303");
        this.phoneNumberField.should("have.value", "+48101202303");
        this.commentsField.type("It's a test");
        this.commentsField.should("have.value", "It's a test");
    }
}

export default new CreateHostPage();
