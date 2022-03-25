// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Address' or i... Remove this comment to see the full error message
import { polishVoivodeships } from "models/constants/Address";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormSele... Remove this comment to see the full error message
import FormSelect from "components/atoms/form/FormSelect";
import React from "react";

const FormItemsVoivodeships = (props: any) => {
    return <FormSelect {...props} items={polishVoivodeships} />;
};

export { FormItemsVoivodeships };
