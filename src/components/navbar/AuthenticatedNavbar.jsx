import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    UncontrolledDropdown,
} from "reactstrap";
import AuthenticatedNavbarItem from "components/navbar/AuthenticatedNavbarItem";
import { Routes } from "constants/Routes";
import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import navbarItems from "components/navbar/constants/NavbarItems";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "components/atoms/LanguageSwitcher";

const AuthenticatedNavbar = ({ onLogout }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href={Routes.ROOT}>KOK:on</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    {navbarItems.map((navbarItem) => (
                        <AuthenticatedNavbarItem
                            {...navbarItem}
                            key={navbarItem.path}
                        />
                    ))}
                </Nav>
                <LanguageSwitcher className="me-3" />
                <Nav navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <FontAwesomeIcon icon={faUser} />{" "}
                            {t("navbar.account")}
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem>
                                <FontAwesomeIcon icon={faCog} />{" "}
                                {t("navbar.settings")}
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={onLogout}>
                                {t("navbar.signOut")}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AuthenticatedNavbar;

AuthenticatedNavbar.propTypes = {
    onLogout: PropTypes.func.isRequired,
};