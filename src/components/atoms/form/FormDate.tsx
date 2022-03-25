import React from "react";
import { FormFeedback, Input } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/MomentSerializer' ... Remove this comment to see the full error message
import MomentSerializer from "serializers/MomentSerializer";

const momentSerializer = new MomentSerializer();

// @ts-expect-error ts-migrate(2339) FIXME: Property 'field' does not exist on type '{ childre... Remove this comment to see the full error message
const FormDate = React.memo(({ field, form, ...props }) => {
    const { t } = useTranslation(["common"]);

    const { setFieldValue } = useFormikContext();

    const onChange = (event: any) => {
        const fieldValue = momentSerializer.fromInputDate(event.target.value);
        setFieldValue(field.name, fieldValue);
    };

    const value = momentSerializer.toInputDate(field.value);

    const error = FormikApiErrors.getError(field.name, form);
    const invalid = !!error;

    return (
        <React.Fragment>
            <Input invalid={invalid} type="date" {...field} onChange={onChange} value={value} {...props} />
            {invalid && <FormFeedback>{t(error)}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormDate;
