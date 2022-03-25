import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormSele... Remove this comment to see the full error message
import FormSelect from "components/atoms/form/FormSelect";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Accommodation... Remove this comment to see the full error message
import { AccommodationStatus } from "models/constants/AccommodationStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormAddressStatus = () => {
    const fieldId = AccommodationFormFields.STATUS;

    const { t } = useTranslation(["accommodation"]);

    const items = [
        {
            id: [AccommodationStatus.CREATED],
            name: t("accommodation:form.value.status.created"),
        },
        {
            id: [AccommodationStatus.VERIFIED],
            name: t("accommodation:form.value.status.verified"),
        },
        {
            id: [AccommodationStatus.REJECTED],
            name: t("accommodation:form.value.status.rejected"),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.status")}
            </FormLabel>
            <Field component={FormSelect} id={fieldId} name={fieldId} items={items} />
        </FormGroup>
    );
};

AccommodationFormAddressStatus.propTypes = {};

export default AccommodationFormAddressStatus;
