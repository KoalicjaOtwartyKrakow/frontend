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
                            exact={navbarItem.exact}
                            icon={navbarItem.icon}
                            key={navbarItem.path}
                            name={navbarItem.name}
                            path={navbarItem.path}
                        />
                    ))}
                </Nav>
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
                                Logout
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
