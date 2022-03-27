import DataViewPage from "./page-templates/data-view.page";

class HostsPage extends DataViewPage {
    validateNewHostAdded() {
        this.toastMessage.should("be.visible");
        this.toastMessage.should("contain.text", "Action successful");
        this.firstTableRow.should("contain.text", "Tester Testerski");
        this.firstTableRow.should("contain.text", "tester@testerski.pl");
        this.firstTableRow.should("contain.text", "+48101202303");
        this.firstTableRow.should("contain.text", "It's a test");
    }
}
export default new HostsPage();
