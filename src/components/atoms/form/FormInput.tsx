import React from "react";
import { FormText, Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useFormikContext } from "formik";
import FormErrorsFeedback from "components/atoms/form/FormErrorsFeedback";

// @ts-ignore FIXME
const FormInput = ({ field, form, formText, ...props }) => {
    const name = field.name;
    const formikContext = useFormikContext();
    const errors = FormikApiErrors.getErrors(field.name, formikContext);
    const invalid = errors.length > 0;

    const showFormText = !invalid && formText;
    return (
        <React.Fragment>
            <Input invalid={invalid} {...field} {...props} />
            <FormErrorsFeedback name={name} />
            {showFormText && <FormText>{formText}</FormText>}
        </React.Fragment>
    );
};

export default React.memo(FormInput);
