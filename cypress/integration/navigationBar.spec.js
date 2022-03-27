import navigationBar from "../pages/navigation-bar";

describe("Use navigation bar", () => {
    beforeEach(() => {
        cy.loginByGoogleApi();
    });

    it("Open accommodation from navbar", () => {
        cy.visit("/");
        navigationBar.accommodation.click();
    });

    it("Open guests from navbar", () => {
        cy.visit("/");
        navigationBar.guests.click();
        cy.url().should("eq", `${Cypress.config().baseUrl}guests`);
    });

    it("Open hosts from navbar", () => {
        cy.visit("/");
        navigationBar.hosts.click();
        cy.url().should("eq", `${Cypress.config().baseUrl}hosts`);
    });

    it("Open home dashboard from navbar", () => {
        cy.visit("/accommodation");
        navigationBar.home.click();
        cy.url().should("eq", Cypress.config().baseUrl);
    });
});
