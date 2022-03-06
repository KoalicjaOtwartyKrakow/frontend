class Routes {
    static ROOT = "/";
    static ACCOMMODATIONS = "/accommodations";
    static ACCOMMODATIONS_CREATE = Routes.ACCOMMODATIONS + "/create";
    static ACCOMMODATION_EDIT =
        Routes.ACCOMMODATIONS + "/:accommodationId/edit";
}

export default Routes;
