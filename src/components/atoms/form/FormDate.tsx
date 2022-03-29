import React from "react";
import { Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { FieldInputProps, useFormikContext } from "formik";
import FormErrorsFeedback from "components/atoms/form/FormErrorsFeedback";

const FormDate = ({ name, field, ...props }: { name: string; field: FieldInputProps<string> }) => {
    const formikContext = useFormikContext();
    const errors = FormikApiErrors.getErrors(name, formikContext);
    const invalid = errors.length > 0;

    return (
        <React.Fragment>
            <Input invalid={invalid} type="date" {...field} {...props} />
            <FormErrorsFeedback name={name} />
        </React.Fragment>
    );
};

export default React.memo(FormDate);
