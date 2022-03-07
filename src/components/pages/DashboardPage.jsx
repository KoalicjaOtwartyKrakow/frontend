import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import { getRouteIcon, Routes } from "constants/Routes";
import HomePageCard from "components/pages/home/HomePageCard";

const DashboardPage = ({}) => {
    const { t } = useTranslation();

    const homePageCards = [
        {
            body: t("homepage.accommodations.description"),
            color: "accommodations",
            header: t("homepage.accommodations.header"),
            icon: getRouteIcon(Routes.ACCOMMODATIONS),
            navigationButtonLabel: t(
                "homepage.accommodations.navigateButtonLabel"
            ),
            navigationRoute: Routes.ACCOMMODATIONS,
        },
        {
            body: t("homepage.guests.description"),
            color: "guests",
            header: t("homepage.guests.header"),
            icon: getRouteIcon(Routes.GUESTS),
            navigationButtonLabel: t("homepage.guests.navigateButtonLabel"),
            navigationRoute: Routes.GUESTS,
        },
        {
            body: t("homepage.hosts.description"),
            color: "hosts",
            header: t("homepage.hosts.header"),
            icon: getRouteIcon(Routes.HOSTS),
            navigationButtonLabel: t("homepage.hosts.navigateButtonLabel"),
            navigationRoute: Routes.HOSTS,
        },
    ];

    const pageHeader = `${t("homepage.header")}`;

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
