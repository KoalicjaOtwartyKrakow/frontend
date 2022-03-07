import React from "react";
import {
    faBed,
    faHandHoldingHeart,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import PageCard from "components/atoms/PageCard";
import Routes from "constants/Routes";
import HomePageCard from "components/pages/home/HomePageCard";

const HomePage = ({}) => {
    const { t } = useTranslation();

    const homePageCards = [
        {
            body: t("homepage.accommodations.description"),
            color: "accommodations",
            header: t("homepage.accommodations.header"),
            icon: faHome,
            navigationButtonLabel: t(
                "homepage.accommodations.navigateButtonLabel"
            ),
            navigationRoute: Routes.ACCOMMODATIONS,
        },
        {
            body: t("homepage.guests.description"),
            color: "guests",
            header: t("homepage.guests.header"),
            icon: faBed,
            navigationButtonLabel: t("homepage.guests.navigateButtonLabel"),
            navigationRoute: Routes.GUESTS,
        },
        {
            body: t("homepage.hosts.description"),
            color: "hosts",
            header: t("homepage.hosts.header"),
            icon: faHandHoldingHeart,
            navigationButtonLabel: t("homepage.hosts.navigateButtonLabel"),
            navigationRoute: Routes.HOSTS,
        },
    ];

    const pageHeader = `${t("homepage.header")}`;

    return (
        <PageCard header={pageHeader}>
            <Row>
                <Col lg={{ size: 10, offset: 1 }}>
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

export default HomePage;
