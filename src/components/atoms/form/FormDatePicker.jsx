import DatePicker from 'react-datepicker';
import MomentSerializer from 'serializers/MomentSerializer';
import React, { forwardRef } from 'react';
import { Button, FormFeedback, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { appConfig } from 'constants/AppConfig';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useField, useFormikContext } from 'formik';
import { FormikApiErrors } from 'components/atoms/form/FormikApiErrors';

const momentSerializer = new MomentSerializer();

const CustomDatepickerInput = forwardRef((props, ref) => (
  <InputGroup>
    <Input { ...props } type="text" innerRef={ ref } />
    <InputGroupAddon addonType="append">
      <Button color="secondary" outline={ true } onClick={ props.onClick }>
        <FontAwesomeIcon icon={ faCalendarAlt } />
      </Button>
    </InputGroupAddon>
  </InputGroup>
));

const FormDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [ field ] = useField(props);
  const form = useFormikContext();

  const onChange = value => {
    const fieldValue = momentSerializer.fromDate(value);
    setFieldValue(field.name, fieldValue);
  };

  const selected = momentSerializer.toDate(field.value);
  const ref = React.createRef();
  const customInput = <CustomDatepickerInput placeholder={ appConfig.dateFormat } ref={ ref } />;

  const error = FormikApiErrors.getError(field.name, form);
  const invalid = !!error;

  return (
    <>
      <DatePicker
        { ...field }
        { ...props }
        customInput={ customInput }
        onChange={ onChange }
        selected={ selected }
      />
      { invalid && <FormFeedback>{ error }</FormFeedback> }
    </>
  );
};

export default FormDatePicker;