import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

import ApartmentFormSectionHeader from "components/apartment/form/ApartmentFormSectionHeader";
import ApartmentFormSection from "components/apartment/form/ApartmentFormSection";
import { apartmentFormLandlordPropTypes } from "proptypes/ApartmentFormPropTypes";
import ApartmentFormLandlordName from "components/apartment/form/fields/ApartmentFormLandlordName";
import ApartmentFormLandlordEmail from "components/apartment/form/fields/ApartmentFormLandlordEmail";
import ApartmentFormLandlordPhone from "components/apartment/form/fields/ApartmentFormLandlordPhone";

const ApartmentFormLandlord = () => {
    const { t } = useTranslation();

    return (
        <ApartmentFormSection>
            <ApartmentFormSectionHeader>
                {t("apartment.host_data")}
            </ApartmentFormSectionHeader>
            <Row>
                <Col xs={12} lg={6}>
                    <ApartmentFormLandlordName />
                </Col>
                <Col xs={12} lg={3}>
                    <ApartmentFormLandlordEmail />
                </Col>
                <Col xs={12} lg={3}>
                    <ApartmentFormLandlordPhone />
                </Col>
            </Row>
        </ApartmentFormSection>
    );
};

ApartmentFormLandlord.propTypes = apartmentFormLandlordPropTypes;

export default React.memo(ApartmentFormLandlord);