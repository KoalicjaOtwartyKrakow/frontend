import React from "react";

import { NavLink as RouterNavLink } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTranslation } from "react-i18next";
import classNames from "classnames";

const AuthenticatedNavbarItem = React.memo(({ exact, icon, i18nKey, path }) => {
    const { t } = useTranslation(["accommodation"]);
    const NavbarNavLink = (props: any) => {
        return <RouterNavLink {...props} className={(active) => classNames(props.className, { active })} />;
    };
    const options = {};
    if (exact) {
        options.exact = undefined;
    }
    return (
        <NavItem>
            <NavLink tag={NavbarNavLink} to={path} {...options}>
                <FontAwesomeIcon icon={icon} /> {t(i18nKey)}
            </NavLink>
        </NavItem>
    );
});

export default AuthenticatedNavbarItem;
