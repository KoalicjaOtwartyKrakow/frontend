import React from "react";
import { FormFeedback, Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";

const FormTextArea = React.memo(({ field, form, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const invalid = !!error;
    return (
        <React.Fragment>
            <Input invalid={invalid} {...field} {...props} />
            {invalid && <FormFeedback>{error}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormTextArea;
