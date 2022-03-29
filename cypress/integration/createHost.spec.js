import createHost from "../pages/create-host-page";
import hosts from "../pages/hosts-page";

describe("Create a Hosts", () => {
    beforeEach(() => {
        window.localStorage.setItem("kokon-settings", '{"isEnableMocks": true}');
        cy.loginByGoogleApi();
        cy.visit("/hosts/create");
    });
    it("Create host form is rendered", () => {
        createHost.cardsContainer.should("be.visible");
        createHost.cardsHeader.should("contain.text", "Create a new Host");
        createHost.submitButton.should("be.visible");
    });

    it("Add a new host", () => {
        createHost.fillHostForm();
        createHost.submitButton.click();
        cy.url().should("eq", `${Cypress.config().baseUrl}hosts`);
        hosts.validateNewHostAdded();
    });
});
