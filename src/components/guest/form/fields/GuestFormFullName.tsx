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

const GuestFormFullName = () => {
    const fieldId = GuestFormFields.FULL_NAME;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("common:form.label.fullName")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="Alexandra Bondarenko" type="text" />
            <FormText></FormText>
        </FormGroup>
    );
};

GuestFormFullName.propTypes = {};

export default GuestFormFullName;
