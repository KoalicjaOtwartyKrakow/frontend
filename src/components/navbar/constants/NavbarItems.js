import { getRouteIcon, Routes } from "constants/Routes";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const navbarItems = [
    {
        path: Routes.ROOT,
        icon: faHome,
        i18nKey: "navbar:dashboard",
        exact: true,
    },
    {
        path: Routes.ACCOMMODATIONS,
        icon: getRouteIcon(Routes.ACCOMMODATIONS),
        i18nKey: "navbar:accommodations",
    },
    {
        path: Routes.GUESTS,
        icon: getRouteIcon(Routes.GUESTS),
        i18nKey: "navbar:guests",
    },
    {
        path: Routes.HOSTS,
        icon: getRouteIcon(Routes.HOSTS),
        i18nKey: "navbar:hosts",
    },
];

export default navbarItems;
