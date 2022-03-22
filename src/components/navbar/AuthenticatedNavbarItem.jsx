import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fasIconPropType } from "proptypes/CommonPropTypes";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const AuthenticatedNavbarItem = React.memo(({ exact, icon, i18nKey, path }) => {
    const { t } = useTranslation(["accommodation"]);
    const NavbarNavLink = (props) => {
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

AuthenticatedNavbarItem.propTypes = {
    exact: PropTypes.bool,
    icon: fasIconPropType,
    i18nKey: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default AuthenticatedNavbarItem;
