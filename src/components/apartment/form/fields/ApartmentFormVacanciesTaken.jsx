import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormVacanciesTaken = (props) => {
    const fieldId = ApartmentFormFields.VACANCIES_TAKEN;
    return (
        <FormGroup>
            <Label for={ fieldId } className="required">
                Przydzielono osób:
            </Label>
            <Field
                component={ FormInput }
                id={ fieldId }
                name={ fieldId }
                placeholder="0"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormVacanciesTaken.propTypes = {};

export default ApartmentFormVacanciesTaken;
