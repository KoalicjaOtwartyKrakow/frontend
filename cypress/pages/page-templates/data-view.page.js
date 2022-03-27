import BasePage from "./base-page";

export class DataViewPage extends BasePage {
    get refreshButton() {
        return cy.get("button").contains("Refresh data");
    }

    get addButton() {
        return cy.get("button").contains(/^Add( a)? new/);
    }
    get table() {
        return cy.get("table.table");
    }

    get firstTableRow() {
        return cy.get("tbody tr:first");
    }

    get toastMessage() {
        return cy.get(".toast-content");
    }
}

export default DataViewPage;
