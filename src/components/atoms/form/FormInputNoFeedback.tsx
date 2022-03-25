import React from "react";
import { Input } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'field' does not exist on type '{ childre... Remove this comment to see the full error message
const FormInputNoFeedback = React.memo(({ field, form, ...props }) => {
    const error = FormikApiErrors.getError(field.name, form);
    const invalid = !!error;
    return <Input invalid={invalid} {...field} {...props} />;
});

export default FormInputNoFeedback;
