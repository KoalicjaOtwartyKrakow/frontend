import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fasIconPropType } from "proptypes/CommonPropTypes";
import { useTranslation } from "react-i18next";

const AuthenticatedNavbarItem = React.memo(({ exact, icon, i18nKey, path }) => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <NavItem>
            <NavLink
                tag={RouterNavLink}
                to={path}
                activeClassName="active"
                exact={exact}
            >
                <FontAwesomeIcon icon={icon} /> {t(i18nKey)}
            </NavLink>
        </NavItem>
    );
});

AuthenticatedNavbarItem.propTypes = {
    exact: PropTypes.bool,
    icon: fasIconPropType,
    i18nKey: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default AuthenticatedNavbarItem;
