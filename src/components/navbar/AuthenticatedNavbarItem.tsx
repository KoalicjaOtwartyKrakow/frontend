import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'proptypes/CommonPropTypes' or ... Remove this comment to see the full error message
import { fasIconPropType } from "proptypes/CommonPropTypes";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'exact' does not exist on type '{ childre... Remove this comment to see the full error message
const AuthenticatedNavbarItem = React.memo(({ exact, icon, i18nKey, path }) => {
    const { t } = useTranslation(["accommodation"]);
    const NavbarNavLink = (props: any) => {
        return <RouterNavLink {...props} className={(active) => classNames(props.className, { active })} />;
    };
    const options = {};
    if (exact) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'exact' does not exist on type '{}'.
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

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'Named... Remove this comment to see the full error message
AuthenticatedNavbarItem.propTypes = {
    exact: PropTypes.bool,
    icon: fasIconPropType,
    i18nKey: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default AuthenticatedNavbarItem;
