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
    // @ts-expect-error ts-migrate(1166) FIXME: A computed property name in a class property decla... Remove this comment to see the full error message
    static [AppRoutes.ROOT] = faHome;
    // @ts-expect-error ts-migrate(1166) FIXME: A computed property name in a class property decla... Remove this comment to see the full error message
    static [AppRoutes.ACCOMMODATIONS] = faBed;
    // @ts-expect-error ts-migrate(1166) FIXME: A computed property name in a class property decla... Remove this comment to see the full error message
    static [AppRoutes.GUESTS] = faUserFriends;
    // @ts-expect-error ts-migrate(1166) FIXME: A computed property name in a class property decla... Remove this comment to see the full error message
    static [AppRoutes.HOSTS] = faHandHoldingHeart;
}

const getRouteIcon = (route: any) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const icon = RoutesIcons[route];

    if (!icon) {
        console.warn(`[Routes.getRouteIcon] Missing icon for router ${route}, please add it in RoutesIcons`);
        return faExclamation;
    }

    return icon;
};

export { AppRoutes, getRouteIcon };
