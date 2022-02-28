import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field } from 'formik';
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormLandlordEmail = (props) => {
    const fieldId = ApartmentFormFields.LANDLORD_EMAIL;
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                Adres e-mail:
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="imie.nazwisko@domena.tld"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormLandlordEmail.propTypes = {};

export default ApartmentFormLandlordEmail;
