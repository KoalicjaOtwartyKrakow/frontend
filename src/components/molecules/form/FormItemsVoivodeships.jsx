import { polishVoivodeships } from "models/constants/Address";
import FormSelect from "components/atoms/form/FormSelect";
import React from "react";

const FormItemsVoivodeships = (props) => {
    return <FormSelect {...props} items={polishVoivodeships} />;
};

export { FormItemsVoivodeships };
