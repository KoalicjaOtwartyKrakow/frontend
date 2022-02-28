import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormStreetNumber = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_STREET_NUMBER;
    return (
        <FormGroup>
            <Label for={ fieldId } className="required">
                Nr domu:
            </Label>
            <Field
                component={ FormInput }
                id={ fieldId }
                name={ fieldId }
                placeholder="4A"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormStreetNumber.propTypes = {};

export default ApartmentFormStreetNumber;
