import { AppRoutes, getRouteIcon } from "constants/AppRoutes";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const navbarItems = [
    {
        path: AppRoutes.ROOT,
        icon: faHome,
        i18nKey: "navbar:dashboard",
        exact: true,
    },
    {
        path: AppRoutes.ACCOMMODATION_CREATE,
        icon: getRouteIcon(AppRoutes.ACCOMMODATIONS),
        i18nKey: "navbar:accommodationCreate",
    },
    {
        path: AppRoutes.GUEST_CREATE,
        icon: getRouteIcon(AppRoutes.GUESTS),
        i18nKey: "navbar:guestCreate",
    },
    {
        path: AppRoutes.HOST_CREATE,
        icon: getRouteIcon(AppRoutes.HOSTS),
        i18nKey: "navbar:hostCreate",
    },
];

export default navbarItems;
