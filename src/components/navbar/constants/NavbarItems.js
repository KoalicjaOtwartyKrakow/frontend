import { getRouteIcon, Routes } from "constants/Routes";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import i18n from "i18n";

const navbarItems = [
    { path: Routes.ROOT, icon: faHome, name: "Dashboard", exact: true },
    {
        path: Routes.ACCOMMODATIONS,
        icon: getRouteIcon(Routes.ACCOMMODATIONS),
        name: i18n.t("navbar.accommodations"),
    },
    {
        path: Routes.GUESTS,
        icon: getRouteIcon(Routes.GUESTS),
        name: i18n.t("navbar.guests"),
    },
    {
        path: Routes.HOSTS,
        icon: getRouteIcon(Routes.HOSTS),
        name: i18n.t("navbar.hosts"),
    },
];

export default navbarItems;
