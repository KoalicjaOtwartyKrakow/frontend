import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/PageCard' or ... Remove this comment to see the full error message
import PageCard from "components/atoms/PageCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes, getRouteIcon } from "constants/AppRoutes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/home/HomePageCard' or it... Remove this comment to see the full error message
import HomePageCard from "pages/home/HomePageCard";

const DashboardPage = () => {
    const { t } = useTranslation(["dashboard"]);

    const homePageCards = [
        {
            body: t("dashboard:accommodations.description"),
            color: "accommodations",
            header: t("dashboard:accommodations.header"),
            icon: getRouteIcon(AppRoutes.ACCOMMODATIONS),
            navigationButtonLabel: t("dashboard:accommodations.navigateButtonLabel"),
            navigationRoute: AppRoutes.ACCOMMODATIONS,
        },
        {
            body: t("dashboard:guests.description"),
            color: "guests",
            header: t("dashboard:guests.header"),
            icon: getRouteIcon(AppRoutes.GUESTS),
            navigationButtonLabel: t("dashboard:guests.navigateButtonLabel"),
            navigationRoute: AppRoutes.GUESTS,
        },
        {
            body: t("dashboard:hosts.description"),
            color: "hosts",
            header: t("dashboard:hosts.header"),
            icon: getRouteIcon(AppRoutes.HOSTS),
            navigationButtonLabel: t("dashboard:hosts.navigateButtonLabel"),
            navigationRoute: AppRoutes.HOSTS,
        },
    ];

    const pageHeader = `${t("dashboard:card.title")}`;

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
                    {homePageCards.map((item, index) => (
                        <HomePageCard {...item} key={index}>
                            {item.body}
                        </HomePageCard>
                    ))}
                </Col>
            </Row>
        </PageCard>
    );
};

export default DashboardPage;
