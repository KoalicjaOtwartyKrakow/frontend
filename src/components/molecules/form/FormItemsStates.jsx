import { polishVoivodeships } from "models/constants/Address";
import FormSelect from "components/atoms/form/FormSelect";
import FormOptionPleaseSelect from "components/atoms/form/FormOptionPleaseSelect";
import React from "react";

const FormItemsStates = (props) => {
    return (
        <FormSelect {...props} items={polishVoivodeships}>
            <FormOptionPleaseSelect />
        </FormSelect>
    );
};

export { FormItemsStates };
