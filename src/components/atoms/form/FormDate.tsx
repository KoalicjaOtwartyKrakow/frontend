import React from "react";
import { FormFeedback, Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import MomentSerializer from "serializers/MomentSerializer";

const momentSerializer = new MomentSerializer();

const FormDate = React.memo(({ field, form, ...props }) => {
    const { t } = useTranslation(["common"]);

    const { setFieldValue } = useFormikContext();

    const onChange = (event) => {
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
