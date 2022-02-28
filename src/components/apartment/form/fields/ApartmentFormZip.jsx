import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormZip = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_ZIP;
    return (
        <FormGroup>
            <Label for={ fieldId } className="required">
                Kod pocztowy:
            </Label>
            <Field
                component={ FormInput }
                id={ fieldId }
                name={ fieldId }
                placeholder="XX-XXX"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormZip.propTypes = {};

export default ApartmentFormZip;
