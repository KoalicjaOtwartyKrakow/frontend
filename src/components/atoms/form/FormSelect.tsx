import React from "react";
import { Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import FormErrorsFeedback from "components/atoms/form/FormErrorsFeedback";
import FormOptionPleaseSelect from "components/atoms/form/FormOptionPleaseSelect";

// @ts-ignore FIXME
const FormSelect = React.memo(({ field, form, items, children, isPleaseSelect, ...props }) => {
    const name = field.name;
    const errors = FormikApiErrors.getErrors(name, form);
    const invalid = errors.length > 0;

    return (
        <React.Fragment>
            <Input {...field} {...props} type="select" invalid={invalid}>
                {isPleaseSelect && <FormOptionPleaseSelect />}
                {children}
                {items.map((item: any) => (
                    <option value={item.id} key={`key-${item.id}`}>
                        {item.name}
                    </option>
                ))}
            </Input>
            <FormErrorsFeedback name={name} />
        </React.Fragment>
    );
});

export default FormSelect;
