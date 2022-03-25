import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormSele... Remove this comment to see the full error message
import FormSelect from "components/atoms/form/FormSelect";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/GuestStatus' ... Remove this comment to see the full error message
import { GuestStatus } from "models/constants/GuestStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormVerificationStatus = (props: any) => {
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
            <Field component={FormSelect} id={fieldId} name={fieldId} items={items} />
        </FormGroup>
    );
};

GuestFormVerificationStatus.propTypes = {};

export default GuestFormVerificationStatus;
