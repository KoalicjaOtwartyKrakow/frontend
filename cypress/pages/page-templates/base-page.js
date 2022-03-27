class BasePage {
    get cardsHeader() {
        return cy.get("div.card-header").find("h4");
    }

    get cardsContainer() {
        return cy.get(".card-body");
    }
}

export default BasePage;
