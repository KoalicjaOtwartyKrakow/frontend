import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { GuestStatus } from "models/constants/GuestStatus";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormVerificationStatus = (props) => {
    const fieldId = GuestFormFields.VERIFICATION_STATUS;

    const { t } = useTranslation(["guest"]);

    const items = [
        {
            id: GuestStatus.CREATED,
            name: t("guest:status.created"),
        },
        {
            id: GuestStatus.VERIFIED,
            name: t("guest:status.verified"),
        },
        {
            id: GuestStatus.REJECTED,
            name: t("guest:status.rejected"),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.status")}
            </FormLabel>
            <Field
                component={FormSelect}
                id={fieldId}
                name={fieldId}
                items={items}
            />
        </FormGroup>
    );
};

GuestFormVerificationStatus.propTypes = {};

export default GuestFormVerificationStatus;
