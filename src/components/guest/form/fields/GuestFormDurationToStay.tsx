import React from "react";
import { FormGroup, FormText } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormInpu... Remove this comment to see the full error message
import FormInput from "components/atoms/form/FormInput";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormDurationToStay = () => {
    const fieldId = GuestFormFields.DURATION_OF_STAY;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.durationOfStay")}
            </FormLabel>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder={t("guest:form.placeholder.durationOfStay")}
                type="text"
            />
            <FormText>{t("guest:form.text.durationOfStay")}</FormText>
        </FormGroup>
    );
};

GuestFormDurationToStay.propTypes = {};

export default GuestFormDurationToStay;
