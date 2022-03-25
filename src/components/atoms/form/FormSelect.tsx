import React from "react";
import { FormFeedback, Input } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormOpti... Remove this comment to see the full error message
import FormOptionPleaseSelect from "components/atoms/form/FormOptionPleaseSelect";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'field' does not exist on type '{ childre... Remove this comment to see the full error message
const FormSelect = React.memo(({ field, form, items, children, isPleaseSelect, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const { t } = useTranslation("common");
    const invalid = !!error;

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
            {invalid && <FormFeedback>{t(error)}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormSelect;
