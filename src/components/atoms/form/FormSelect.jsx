import React from "react";
import { CustomInput, FormFeedback } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";

const FormSelect = React.memo(({ field, form, items, children, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const invalid = !!error;

    return (
        <React.Fragment>
            <CustomInput {...field} {...props} type="select" invalid={invalid}>
                {children}
                {items.map((item) => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </CustomInput>
            {invalid && <FormFeedback>{error}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormSelect;
