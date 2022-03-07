class Routes {
    static ROOT = "/";
    static ACCOMMODATIONS = "/accommodations";
    static ACCOMMODATIONS_CREATE = Routes.ACCOMMODATIONS + "/create";
    static ACCOMMODATION_EDIT =
        Routes.ACCOMMODATIONS + "/:accommodationId/edit";

    static HOSTS = "/hosts";
    static HOSTS_CREATE = Routes.HOSTS + "/create";
    static HOST_EDIT = Routes.HOSTS + "/:hostId/edit";

    static GUESTS = "/guests";
    static GUESTS_CREATE = Routes.GUESTS + "/create";
    static GUEST_EDIT = Routes.GUESTS + "/:guestId/edit";
}

export default Routes;
