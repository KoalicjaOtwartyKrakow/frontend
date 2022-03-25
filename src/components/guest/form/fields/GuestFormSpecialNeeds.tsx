import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormText... Remove this comment to see the full error message
import FormTextArea from "components/atoms/form/FormTextArea";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormSpecialNeeds = (props: any) => {
    const fieldId = GuestFormFields.SPECIAL_NEEDS;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.specialNeeds")}</FormLabel>
            <Field component={FormTextArea} id={fieldId} name={fieldId} type="textarea" rows={1} />
        </FormGroup>
    );
};

GuestFormSpecialNeeds.propTypes = {};

export default GuestFormSpecialNeeds;
