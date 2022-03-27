import guests from "../pages/guests-page";

describe("Validate guests page", () => {
    beforeEach(() => {
        window.localStorage.setItem("kokon-settings", '{"isEnableMocks": true}');
        cy.loginByGoogleApi();
        cy.visit("/guests");
    });
    it("Guests page elements are rendered", () => {
        guests.cardsContainer.should("be.visible");
        guests.cardsHeader.should("contain.text", "Guests");
        guests.refreshButton.should("be.visible");
        guests.addButton.should("be.visible");
        guests.table.should("be.visible");
        guests.firstTableRow.should("be.visible");
    });

    it("Add guest button works", () => {
        guests.addButton.click();
        cy.url().should("contain", "/guests/create");
    });
});
