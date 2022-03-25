import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSection from "components/molecules/form/FormSection";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import FormSectionHeader from "components/molecules/form/FormSectionHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPetsPresence from "components/guest/form/fields/GuestFormPetsPresence";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormPetsDescription from "components/guest/form/fields/GuestFormPetsDescription";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormFinancialStatus from "components/guest/form/fields/GuestFormFinancialStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormDocumentNumber from "components/guest/form/fields/GuestFormDocumentNumber";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/fields/G... Remove this comment to see the full error message
import GuestFormIsAgent from "components/guest/form/fields/GuestFormIsAgent";

const GuestFormAdditional = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <FormSection>
            <FormSectionHeader>{t("guest:form.section.additionalInfo")}</FormSectionHeader>
            <Row>
                <Col xs={12}>
                    <GuestFormPetsPresence />
                    <GuestFormPetsDescription />
                    <GuestFormFinancialStatus />
                    <GuestFormDocumentNumber />
                    <GuestFormIsAgent />
                </Col>
            </Row>
        </FormSection>
    );
};

GuestFormAdditional.propTypes = {};

export default React.memo(GuestFormAdditional);
