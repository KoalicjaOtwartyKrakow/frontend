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
        path: AppRoutes.ACCOMMODATIONS,
        icon: getRouteIcon(AppRoutes.ACCOMMODATIONS),
        i18nKey: "navbar:accommodations",
    },
    {
        path: AppRoutes.GUESTS,
        icon: getRouteIcon(AppRoutes.GUESTS),
        i18nKey: "navbar:guests",
    },
    {
        path: AppRoutes.HOSTS,
        icon: getRouteIcon(AppRoutes.HOSTS),
        i18nKey: "navbar:hosts",
    },
];

export default navbarItems;
