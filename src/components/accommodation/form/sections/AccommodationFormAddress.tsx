import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormAddressLine from "components/accommodation/form/fields/AccommodationFormAddressLine";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormZip from "components/accommodation/form/fields/AccommodationFormZip";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormVoivodeship from "components/accommodation/form/fields/AccommodationFormVoivodeship";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormCity from "components/accommodation/form/fields/AccommodationFormCity";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/form/... Remove this comment to see the full error message
import AccommodationFormHost from "components/accommodation/form/fields/AccommodationFormHost";

/**
 * @component
 */
const AccommodationFormAddress = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("accommodation:form.section.addressData")}</FormSectionHeader>
            <Row>
                <Col xs={12} md={8}>
                    <AccommodationFormAddressLine />
                    <AccommodationFormVoivodeship />
                </Col>
                <Col xs={12} md={4}>
                    <Row>
                        <Col xs={6} md={12}>
                            <AccommodationFormCity />
                        </Col>
                        <Col xs={6} md={12}>
                            <AccommodationFormZip />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <AccommodationFormHost />
        </FormSection>
    );
};

AccommodationFormAddress.propTypes = {};

export default React.memo(AccommodationFormAddress);
