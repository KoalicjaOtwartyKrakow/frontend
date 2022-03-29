import React from "react";
import { Input } from "reactstrap";

import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useFormikContext } from "formik";
import FormErrorsFeedback from "components/atoms/form/FormErrorsFeedback";

// @ts-ignore FIXME
const FormTextArea = ({ field, form, ...props }) => {
    const name = field.name;
    const formikContext = useFormikContext();
    const errors = FormikApiErrors.getErrors(name, formikContext);
    const invalid = errors.length > 0;
    return (
        <React.Fragment>
            <Input invalid={invalid} {...field} {...props} />
            <FormErrorsFeedback name={name} />
        </React.Fragment>
    );
};

export default React.memo(FormTextArea);
