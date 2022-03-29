import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface Props {
    icon: IconDefinition;
    i18nKey: string;
    path: string;
}

const AuthenticatedNavbarItem = ({ icon, i18nKey, path }: Props) => {
    const { t } = useTranslation(["accommodation"]);
    const NavbarNavLink = (props: any) => {
        return (
            <RouterNavLink
                {...props}
                className={(active) => classNames(props.className, { active: active.isActive })}
            />
        );
    };
    const options = {};
    return (
        <NavItem>
            <NavLink tag={NavbarNavLink} to={path} {...options}>
                <FontAwesomeIcon icon={icon} /> {t(i18nKey)}
            </NavLink>
        </NavItem>
    );
};

export default React.memo(AuthenticatedNavbarItem);
