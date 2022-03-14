import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import SearchInput from "components/guest/form/GuestSearchInput";
import PageCard from "components/atoms/PageCard";
import { getRouteIcon, Routes } from "constants/Routes";
import HomePageCard from "components/pages/home/HomePageCard";

const DashboardPage = ({}) => {
    const { t } = useTranslation(["dashboard"]);

    const homePageCards = [
        {
            body: t("dashboard:accommodations.description"),
            color: "accommodations",
            header: t("dashboard:accommodations.header"),
            icon: getRouteIcon(Routes.ACCOMMODATIONS),
            navigationButtonLabel: t(
                "dashboard:accommodations.navigateButtonLabel"
            ),
            navigationRoute: Routes.ACCOMMODATIONS,
        },
        {
            body: t("dashboard:guests.description"),
            color: "guests",
            header: t("dashboard:guests.header"),
            icon: getRouteIcon(Routes.GUESTS),
            navigationButtonLabel: t("dashboard:guests.navigateButtonLabel"),
            navigationRoute: Routes.GUESTS,
        },
        {
            body: t("dashboard:hosts.description"),
            color: "hosts",
            header: t("dashboard:hosts.header"),
            icon: getRouteIcon(Routes.HOSTS),
            navigationButtonLabel: t("dashboard:hosts.navigateButtonLabel"),
            navigationRoute: Routes.HOSTS,
        },
    ];

    const pageHeader = `${t("dashboard:card.title")}`;

    return (
        <PageCard header={pageHeader}>
        <SearchInput></SearchInput>
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
