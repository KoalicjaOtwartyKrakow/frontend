import React from "react";
import { Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";

const FormInputNoFeedback = React.memo(({ field, form, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const invalid = !!error;
    return <Input invalid={invalid} {...field} {...props} />;
});

export default FormInputNoFeedback;
