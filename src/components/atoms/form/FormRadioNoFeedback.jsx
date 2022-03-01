import React from "react";
import { CustomInput } from "reactstrap";

const FormRadioNoFeedback = React.memo(
    ({ field, form: { touched, errors, values, setFieldValue }, ...props }) => {
        return (
            <CustomInput
                {...props}
                type="radio"
                name={field.name}
                invalid={!!(touched[field.name] && errors[field.name])}
                checked={values[field.name] === field.value}
                value={field.value}
                onChange={(event, value) =>
                    setFieldValue(field.name, field.value)
                }
            />
        );
    }
);

export default FormRadioNoFeedback;
