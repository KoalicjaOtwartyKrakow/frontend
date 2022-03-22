import React from "react";
import { FormFeedback, Input } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";
import FormOptionPleaseSelect from "components/atoms/form/FormOptionPleaseSelect";

const FormSelect = React.memo(({ field, form, items, children, isPleaseSelect, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const { t } = useTranslation("common");
    const invalid = !!error;

    return (
        <React.Fragment>
            <Input {...field} {...props} type="select" invalid={invalid}>
                {isPleaseSelect && <FormOptionPleaseSelect />}
                {children}
                {items.map((item) => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </Input>
            {invalid && <FormFeedback>{t(error)}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormSelect;
