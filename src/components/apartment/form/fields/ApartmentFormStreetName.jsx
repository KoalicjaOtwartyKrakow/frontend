import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormStreetName = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_STREET_NAME;
    return (
        <FormGroup>
            <Label for={ fieldId } className="required">
                Ulica:
            </Label>
            <Field
                component={ FormInput }
                id={ fieldId }
                name={ fieldId }
                placeholder="al. Powstania Warszawskiego"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormStreetName.propTypes = {};

export default ApartmentFormStreetName;
