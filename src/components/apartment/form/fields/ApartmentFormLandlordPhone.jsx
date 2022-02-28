import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field } from 'formik';
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormLandlordPhone = (props) => {
    const fieldId = ApartmentFormFields.LANDLORD_PHONE;
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                Numer telefonu:
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="+48 123 456 789"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormLandlordPhone.propTypes = {};

export default ApartmentFormLandlordPhone;
