import React from "react";
import { FormFeedback, FormText, Input } from "reactstrap";

import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";

const FormInput = React.memo(({ field, form, formText, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const { t } = useTranslation(["common"]);
    const invalid = !!error;
    const showFormText = !invalid && formText;
    return (
        <React.Fragment>
            <Input invalid={invalid} {...field} {...props} />
            {invalid && <FormFeedback>{t(error)}</FormFeedback>}
            {showFormText && <FormText>{formText}</FormText>}
        </React.Fragment>
    );
});

export default FormInput;
