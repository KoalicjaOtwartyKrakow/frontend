import hosts from "../pages/hosts-page";

describe("Validate hosts page", () => {
    beforeEach(() => {
        window.localStorage.setItem("kokon-settings", '{"isEnableMocks": true}');
        cy.loginByGoogleApi();
        cy.visit("/hosts");
    });
    it("Hosts page elements are rendered", () => {
        hosts.cardsContainer.should("be.visible");
        hosts.cardsHeader.should("contain.text", "Hosts");
        hosts.refreshButton.should("be.visible");
        hosts.addButton.should("be.visible");
        hosts.table.should("be.visible");
        hosts.firstTableRow.should("be.visible");
    });

    it("Add host button works", () => {
        hosts.addButton.click();
        cy.url().should("eq", `${Cypress.config().baseUrl}hosts/create`);
    });
});
