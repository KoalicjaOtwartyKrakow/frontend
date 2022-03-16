import {
    faBed,
    faExclamation,
    faHandHoldingHeart,
    faHome,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

class Routes {
    static ROOT = "/";
    static ACCOMMODATIONS = "/accommodations";
    static ACCOMMODATION_CREATE = Routes.ACCOMMODATIONS + "/create";
    static ACCOMMODATION_EDIT =
        Routes.ACCOMMODATIONS + "/:accommodationId/edit";

    static HOSTS = "/hosts";
    static HOST_CREATE = Routes.HOSTS + "/create";
    static HOST_EDIT = Routes.HOSTS + "/:hostId/edit";

    static GUESTS = "/guests";
    static GUEST_CREATE = Routes.GUESTS + "/create";
    static GUEST_EDIT = Routes.GUESTS + "/:guestId/edit";
}

class RoutesIcons {
    static [Routes.ROOT] = faHome;
    static [Routes.ACCOMMODATIONS] = faBed;
    static [Routes.GUESTS] = faUserFriends;
    static [Routes.HOSTS] = faHandHoldingHeart;
}

const getRouteIcon = (route) => {
    const icon = RoutesIcons[route];

    if (!icon) {
        console.warn(
            `[Routes.getRouteIcon] Missing icon for router ${route}, please add it in RoutesIcons`
        );
        return faExclamation;
    }

    return icon;
};

export { Routes, getRouteIcon };
