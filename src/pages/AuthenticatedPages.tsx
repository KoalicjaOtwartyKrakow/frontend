import React, { useState } from "react";
import { Container } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Notifications' or its... Remove this comment to see the full error message
import { Notifications } from "services/Notifications";
import { ToastProvider } from "react-toast-notifications";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/navbar/Authenticate... Remove this comment to see the full error message
import AuthenticatedNavbar from "components/navbar/AuthenticatedNavbar";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/Toast' or its... Remove this comment to see the full error message
import { CustomToast } from "components/atoms/Toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/DashboardPage' or its co... Remove this comment to see the full error message
import DashboardPage from "pages/DashboardPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/accommodation/Accommodat... Remove this comment to see the full error message
import AccommodationsPage from "pages/accommodation/AccommodationsPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/accommodation/Accommodat... Remove this comment to see the full error message
import AccommodationCreatePage from "pages/accommodation/AccommodationCreatePage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/accommodation/Accommodat... Remove this comment to see the full error message
import AccommodationEditPage from "pages/accommodation/AccommodationEditPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/guest/GuestsPage' or its... Remove this comment to see the full error message
import GuestsPage from "pages/guest/GuestsPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/guest/GuestCreatePage' o... Remove this comment to see the full error message
import GuestCreatePage from "pages/guest/GuestCreatePage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/guest/GuestEditPage' or ... Remove this comment to see the full error message
import GuestEditPage from "pages/guest/GuestEditPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/host/HostsPage' or its c... Remove this comment to see the full error message
import HostsPage from "pages/host/HostsPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/host/HostCreatePage' or ... Remove this comment to see the full error message
import HostCreatePage from "pages/host/HostCreatePage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/host/HostEditPage' or it... Remove this comment to see the full error message
import HostEditPage from "pages/host/HostEditPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Auth' or its correspo... Remove this comment to see the full error message
import Auth from "services/Auth";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/authenticated/Authentica... Remove this comment to see the full error message
import AuthenticatedHeader from "pages/authenticated/AuthenticatedHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/authenticated/Authentica... Remove this comment to see the full error message
import AuthenticatedBreadcrumbs from "pages/authenticated/AuthenticatedBreadcrumbs";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/aside/Aside' or its... Remove this comment to see the full error message
import Aside from "components/aside/Aside";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/mocks/Mocks' or its... Remove this comment to see the full error message
import Mocks from "components/mocks/Mocks";

const RequireAuth = ({ children }: any) => {
    const token = Auth.getAuthTokenFromStorage();
    const isAuthenticated = token !== Auth.emptyToken;

    let location = useLocation();

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={AppRoutes.ROOT} state={{ from: location }} replace />;
    }

    return children;
};

const AuthenticatedPages = ({ onLogout }: any) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const toggleIsAsideOpen = () => {
        setIsAsideOpen(!isAsideOpen);
    };

    return (
        <ToastProvider autoDismiss={Notifications.toastAutoDismiss} components={{ Toast: CustomToast }}>
            <Mocks />
            <AuthenticatedNavbar onLogout={onLogout} onMenuItemSettings={toggleIsAsideOpen} />
            <AuthenticatedHeader />
            <Container>
                <AuthenticatedBreadcrumbs />
                <Routes>
                    <Route
                        path={AppRoutes.ROOT}
                        element={
                            <RequireAuth>
                                <DashboardPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.ACCOMMODATIONS}
                        element={
                            <RequireAuth>
                                <AccommodationsPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.ACCOMMODATION_CREATE}
                        element={
                            <RequireAuth>
                                <AccommodationCreatePage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.ACCOMMODATION_EDIT}
                        element={
                            <RequireAuth>
                                <AccommodationEditPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.GUESTS}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; exact: true; element: Element; ... Remove this comment to see the full error message
                        exact
                        element={
                            <RequireAuth>
                                <GuestsPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.GUEST_CREATE}
                        element={
                            <RequireAuth>
                                <GuestCreatePage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.GUEST_EDIT}
                        element={
                            <RequireAuth>
                                <GuestEditPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.HOSTS}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; exact: true; element: Element; ... Remove this comment to see the full error message
                        exact
                        element={
                            <RequireAuth>
                                <HostsPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.HOST_CREATE}
                        element={
                            <RequireAuth>
                                <HostCreatePage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={AppRoutes.HOST_EDIT}
                        element={
                            <RequireAuth>
                                <HostEditPage />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Container>
            <Aside isOpen={isAsideOpen} toggleIsOpen={toggleIsAsideOpen} />
        </ToastProvider>
    );
};

export default AuthenticatedPages;
