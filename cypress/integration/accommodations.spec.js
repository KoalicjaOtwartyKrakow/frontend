import accommodations from "../pages/accommodations-page";

describe("Validate accommodations page", () => {
    beforeEach(() => {
        window.localStorage.setItem("kokon-settings", '{"isEnableMocks": true}');
        cy.loginByGoogleApi();
        cy.visit("/accommodations");
    });

    it("Accommodations page elements are rendered", () => {
        accommodations.cardsContainer.should("be.visible");
        accommodations.cardsHeader.should("contain.text", "Accommodation Units");
        accommodations.refreshButton.should("be.visible");
        accommodations.addButton.should("be.visible");
        accommodations.table.should("be.visible");
        accommodations.firstTableRow.should("be.visible");
    });

    it("Add accommodation button works", () => {
        accommodations.addButton.click();
        cy.url().should("contain", "/accommodations/create");
    });
});
