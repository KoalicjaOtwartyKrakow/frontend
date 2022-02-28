import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormFlatNumber = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_FLAT_NUMBER;
    return (
        <FormGroup>
            <Label for={ fieldId } className="required">
                Nr lokalu:
            </Label>
            <Field
                component={ FormInput }
                id={ fieldId }
                name={ fieldId }
                placeholder="27"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormFlatNumber.propTypes = {};

export default ApartmentFormFlatNumber;
