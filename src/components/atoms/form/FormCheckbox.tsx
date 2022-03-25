import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";

const FormCheckbox = ({ children, className, label, id, inline, field, form, ...props }: any) => {
    const error = FormikApiErrors.getError(field.name, form);
    const invalid = !!error;

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
