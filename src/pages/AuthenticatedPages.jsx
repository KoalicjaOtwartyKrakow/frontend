import React from "react";
import { Container } from "reactstrap";
import { Notifications } from "services/Notifications";
import { ToastProvider } from "react-toast-notifications";
import AuthenticatedNavbar from "components/navbar/AuthenticatedNavbar";
import { CustomToast } from "components/atoms/Toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppRoutes } from "constants/AppRoutes";
import DashboardPage from "pages/DashboardPage";
import AccommodationsPage from "pages/accommodation/AccommodationsPage";
import AccommodationCreatePage from "pages/accommodation/AccommodationCreatePage";
import AccommodationEditPage from "pages/accommodation/AccommodationEditPage";
import GuestsPage from "pages/guest/GuestsPage";
import GuestCreatePage from "pages/guest/GuestCreatePage";
import GuestEditPage from "pages/guest/GuestEditPage";
import HostsPage from "pages/host/HostsPage";
import HostCreatePage from "pages/host/HostCreatePage";
import HostEditPage from "pages/host/HostEditPage";
import Auth from "services/Auth";
import AuthenticatedHeader from "pages/authenticated/AuthenticatedHeader";

const RequireAuth = ({ children }) => {
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

const AuthenticatedPages = ({ onLogout }) => {
    return (
        <ToastProvider autoDismiss={Notifications.toastAutoDismiss} components={{ Toast: CustomToast }}>
            <AuthenticatedNavbar onLogout={onLogout} />
            <AuthenticatedHeader />
            <Container>
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
        </ToastProvider>
    );
};

export default AuthenticatedPages;
