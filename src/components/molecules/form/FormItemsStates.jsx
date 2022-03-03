import { polishStates } from "models/fixtures/Address";
import FormSelect from "components/atoms/form/FormSelect";
import FormOptionPleaseSelect from "components/atoms/form/FormOptionPleaseSelect";
import React from "react";

const FormItemsStates = (props) => {
    return (
        <FormSelect {...props} items={polishStates}>
            <FormOptionPleaseSelect />
        </FormSelect>
    );
};

export { FormItemsStates };
