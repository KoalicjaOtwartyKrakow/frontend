import BasePage from "./page-templates/base-page";

class HomePage extends BasePage {
    get accommodationsCardTitle() {
        return cy.get(".bg-accommodations").find("h5");
    }

    get accommodationsCardDesc() {
        return cy.get(".bg-accomodations").find(".card-text");
    }

    get accommodationsButton() {
        return cy.get(".btn-accommodations");
    }

    get guestsCardTitle() {
        return cy.get(".bg-guests").find("h5");
    }

    get guestsCardDesc() {
        return cy.get(".bg-guests").find(".card-text");
    }

    get guestsButton() {
        return cy.get(".btn-guests");
    }

    get hostsCardTitle() {
        return cy.get(".bg-hosts").find("h5");
    }

    get accommodationsCardDesc() {
        return cy.get(".bg-hosts").find(".card-text");
    }

    get hostsButton() {
        return cy.get(".btn-hosts");
    }
}

export default new HomePage();
