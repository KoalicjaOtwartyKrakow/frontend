import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartments/apartment/ApartmentFormFields';

const ApartmentFormStreetName = (props) => {
    const fieldId = "addressStreetName";
    return (
        <FormGroup>
            <Label for={ fieldId } className="required">
                Ulica:
            </Label>
            <Field
                component={ FormInput }
                id={ fieldId }
                name={ ApartmentFormFields.ADDRESS_STREET_NAME }
                placeholder="al. Powstania Warszawskiego"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormStreetName.propTypes = {};

export default ApartmentFormStreetName;
