import home from "../pages/home";

describe("Validate home page", () => {
    beforeEach(() => {
        cy.loginByGoogleApi();
        cy.visit("/");
    });

    it("Home page elements are rendered", () => {
        home.cardsContainer.should("be.visible");
        home.cardsHeader.should("contain.text", "What do you want to do?");

        home.accommodationsCardTitle.should("contain.text", "Accommodation Units management");
        home.accommodationsButton.should("be.visible");

        home.guestsCardTitle.should("contain.text", "Guests management");
        home.guestsButton.should("be.visible");

        home.hostsCardTitle.should("contain.text", "Hosts management");
        home.hostsButton.should("be.visible");
    });

    it("Navigate to Accommodations", () => {
        home.accommodationsButton.click();
        cy.url().should("eq", `${Cypress.config().baseUrl}accommodations`);
    });

    it("Navigate to Guests", () => {
        home.guestsButton.click();
        cy.url().should("eq", `${Cypress.config().baseUrl}guests`);
    });

    it("Navigate to Hosts", () => {
        home.hostsButton.click();
        cy.url().should("eq", `${Cypress.config().baseUrl}hosts`);
    });
});
