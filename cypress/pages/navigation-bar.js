class NavigationBar {
    get home() {
        return cy.get('li.nav-item').contains('Dashboard')
    }

    get accommodation() {
        return cy.get('li.nav-item').contains('Accommodation')
    }

    get guests() {
        return cy.get('li.nav-item').contains('Guests')
    }

    get hosts() {
        return cy.get('li.nav-item').contains('Hosts')
    }
}

export default new NavigationBar()