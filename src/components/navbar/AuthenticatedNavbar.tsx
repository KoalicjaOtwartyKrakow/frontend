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
import { AppRoutes } from "constants/AppRoutes";
import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "components/molecules/LanguageSwitcher";
import navbarItems from "components/navbar/constants/NavbarItems";

const AuthenticatedNavbar = ({ onLogout, onMenuItemSettings }: any) => {
    const { t } = useTranslation(["navbar"]);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleIsNavbarOpen = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <Navbar dark expand="md">
            <NavbarBrand href={AppRoutes.ROOT}>KOK:on</NavbarBrand>
            <NavbarToggler onClick={toggleIsNavbarOpen} />
            <Collapse isOpen={isNavbarOpen} navbar>
                <Nav className="me-auto" navbar>
                    {navbarItems.map((navbarItem: any) => (
                        <AuthenticatedNavbarItem {...navbarItem} key={navbarItem.path} />
                    ))}
                </Nav>
                <LanguageSwitcher className="me-3" />
                <Nav navbar>
                    <UncontrolledDropdown navbaritem="true">
                        <DropdownToggle nav caret>
                            <FontAwesomeIcon icon={faUser} /> {t("navbar:account")}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={onMenuItemSettings}>
                                <FontAwesomeIcon icon={faCog} /> {t("navbar:applicationSettings")}
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={onLogout}>{t("navbar:signOut")}</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AuthenticatedNavbar;
