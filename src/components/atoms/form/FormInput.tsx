import React from "react";
import { FormFeedback, FormText, Input } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'field' does not exist on type '{ childre... Remove this comment to see the full error message
const FormInput = React.memo(({ field, form, formText, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const { t } = useTranslation(["common"]);
    const invalid = !!error;
    const showFormText = !invalid && formText;
    return (
        <React.Fragment>
            <Input invalid={invalid} {...field} {...props} />
            {invalid && <FormFeedback>{t(error)}</FormFeedback>}
            {showFormText && <FormText>{formText}</FormText>}
        </React.Fragment>
    );
});

export default FormInput;
