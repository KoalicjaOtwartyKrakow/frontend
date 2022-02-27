import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field } from 'formik';
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartments/apartment/ApartmentFormFields';

const ApartmentFormLandlordName = (props) => {
    const fieldId = 'landlordName';
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                Osoba udostępniająca lokal:
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={ApartmentFormFields.LANDLORD_NAME}
                placeholder="Janina Nowak"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormLandlordName.propTypes = {};

export default ApartmentFormLandlordName;
