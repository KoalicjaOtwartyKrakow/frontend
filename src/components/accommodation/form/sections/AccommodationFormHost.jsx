import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import { accommodationFormHostPropTypes } from "proptypes/AccommodationFormPropTypes";
import AccommodationFormHostName from "components/host/form/fields/AccommodationFormHostName";
import AccommodationFormHostEmail from "components/host/form/fields/AccommodationFormHostEmail";
import AccommodationFormHostPhone from "components/host/form/fields/AccommodationFormHostPhone";

const AccommodationFormHost = () => {
    const { t } = useTranslation(["accommodation"]);

    return (
        <AccommodationFormSection>
            <AccommodationFormSectionHeader>
                {t("accommodation:form.section.host")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12} lg={6}>
                    <AccommodationFormHostName />
                </Col>
                <Col xs={12} lg={3}>
                    <AccommodationFormHostEmail />
                </Col>
                <Col xs={12} lg={3}>
                    <AccommodationFormHostPhone />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormHost.propTypes = accommodationFormHostPropTypes;

export default React.memo(AccommodationFormHost);
