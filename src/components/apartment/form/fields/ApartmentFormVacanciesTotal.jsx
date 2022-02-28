import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import FormInput from 'components/atoms/form/FormInput';
import { ApartmentFormFields } from 'components/apartment/ApartmentFormFields';

const ApartmentFormVacanciesTotal = (props) => {
    const fieldId = ApartmentFormFields.VACANCIES_TOTAL;
    return (
        <FormGroup>
            <Label for={ fieldId } className="required">
                Dopuszczalna liczba osób:
            </Label>
            <Field
                component={ FormInput }
                id={ fieldId }
                name={ fieldId }
                placeholder="5"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormVacanciesTotal.propTypes = {};

export default ApartmentFormVacanciesTotal;
