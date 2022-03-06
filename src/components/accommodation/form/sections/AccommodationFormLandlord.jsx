import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import AccommodationFormSectionHeader from "components/accommodation/form/AccommodationFormSectionHeader";
import AccommodationFormSection from "components/accommodation/form/AccommodationFormSection";
import { accommodationFormLandlordPropTypes } from "proptypes/AccommodationFormPropTypes";
import AccommodationFormLandlordName from "components/accommodation/form/fields/AccommodationFormLandlordName";
import AccommodationFormLandlordEmail from "components/accommodation/form/fields/AccommodationFormLandlordEmail";
import AccommodationFormLandlordPhone from "components/accommodation/form/fields/AccommodationFormLandlordPhone";

const AccommodationFormLandlord = () => {
    const { t } = useTranslation();

    return (
        <AccommodationFormSection>
            <AccommodationFormSectionHeader>
                {t("accommodation.host_data")}
            </AccommodationFormSectionHeader>
            <Row>
                <Col xs={12} lg={6}>
                    <AccommodationFormLandlordName />
                </Col>
                <Col xs={12} lg={3}>
                    <AccommodationFormLandlordEmail />
                </Col>
                <Col xs={12} lg={3}>
                    <AccommodationFormLandlordPhone />
                </Col>
            </Row>
        </AccommodationFormSection>
    );
};

AccommodationFormLandlord.propTypes = accommodationFormLandlordPropTypes;

export default React.memo(AccommodationFormLandlord);
