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

const GuestFormPetsDescription = (props: any) => {
    const fieldId = GuestFormFields.PETS_DESCRIPTION;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.petsDescription")}</FormLabel>
            <Field component={FormTextArea} id={fieldId} name={fieldId} type="textarea" rows={2} />
        </FormGroup>
    );
};

GuestFormPetsDescription.propTypes = {};

export default GuestFormPetsDescription;
