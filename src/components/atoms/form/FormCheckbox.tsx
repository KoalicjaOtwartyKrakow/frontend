import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useFormikContext } from "formik";

const FormCheckbox = ({ children, className, label, id, inline, field, form, ...props }: any) => {
    const formikContext = useFormikContext();
    const errors = FormikApiErrors.getErrors(field.name, formikContext);
    const invalid = errors.length > 0;

    return (
        <FormGroup check className={className} inline={inline}>
            <Input {...props} id={id} invalid={invalid} {...field} />
            <Label check for={id}>
                {label}
            </Label>
            {children}
        </FormGroup>
    );
};

export default FormCheckbox;
