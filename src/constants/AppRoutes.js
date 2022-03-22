import { faBed, faExclamation, faHandHoldingHeart, faHome, faUserFriends } from "@fortawesome/free-solid-svg-icons";

class AppRoutes {
    static ROOT = "/";
    static ACCOMMODATIONS = "/accommodations";
    static ACCOMMODATION_CREATE = AppRoutes.ACCOMMODATIONS + "/create";
    static ACCOMMODATION_EDIT = AppRoutes.ACCOMMODATIONS + "/:accommodationId/edit";

    static HOSTS = "/hosts";
    static HOST_CREATE = AppRoutes.HOSTS + "/create";
    static HOST_EDIT = AppRoutes.HOSTS + "/:hostId/edit";

    static GUESTS = "/guests";
    static GUEST_CREATE = AppRoutes.GUESTS + "/create";
    static GUEST_EDIT = AppRoutes.GUESTS + "/:guestId/edit";
}

class RoutesIcons {
    static [AppRoutes.ROOT] = faHome;
    static [AppRoutes.ACCOMMODATIONS] = faBed;
    static [AppRoutes.GUESTS] = faUserFriends;
    static [AppRoutes.HOSTS] = faHandHoldingHeart;
}

const getRouteIcon = (route) => {
    const icon = RoutesIcons[route];

    if (!icon) {
        console.warn(`[Routes.getRouteIcon] Missing icon for router ${route}, please add it in RoutesIcons`);
        return faExclamation;
    }

    return icon;
};

export { AppRoutes, getRouteIcon };
