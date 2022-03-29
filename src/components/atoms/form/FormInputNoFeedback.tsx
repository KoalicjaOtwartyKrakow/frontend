import React from "react";
import { Input } from "reactstrap";

import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useFormikContext } from "formik";

// @ts-ignore FIXME
const FormInputNoFeedback = React.memo(({ field, form, ...props }) => {
    const formikContext = useFormikContext();
    const errors = FormikApiErrors.getErrors(field.name, formikContext);
    const invalid = errors.length > 0;
    return <Input invalid={invalid} {...field} {...props} />;
});

export default FormInputNoFeedback;
