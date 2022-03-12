import React from "react";
import { FormFeedback, Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";

const FormInput = React.memo(({ field, form, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const { t } = useTranslation(["common"]);
    const invalid = !!error;
    return (
        <React.Fragment>
            <Input invalid={invalid} {...field} {...props} />
            {invalid && <FormFeedback>{t(error)}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormInput;
