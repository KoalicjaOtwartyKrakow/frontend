import * as Yup from 'yup';
import { ApartmentFormFields } from 'components/apartments/apartment/ApartmentFormFields';
import isSafeInteger from 'lodash-es/isSafeInteger';
import { DATE_FORMAT } from 'constants/Config';
import moment from 'moment-es6';

const toSafeIntegerWithUndefined = (value) => (isSafeInteger(+value) && +value) || undefined;

const integerRequired = (requiredMessage) => Yup
    .number()
    .integer('Podaj liczbę całkowitą.')
    .transform(toSafeIntegerWithUndefined)
    .typeError('Podaj liczbę.');

const positiveIntegerRequired = (requiredMessage) => Yup
  .number()
  .integer('Podaj liczbę całkowitą.')
  .transform(toSafeIntegerWithUndefined)
  .typeError('Podaj liczbę.')
  .positive('Wartość musi być większa od 0.');
  // .required(requiredMessage);

const numericIndex = () => Yup
  .number()
  .transform(toSafeIntegerWithUndefined);

const dateAsYMDValidator = () => Yup
  .mixed()
  .test(
    'is-date-yyyy-mm-dd',
    `Proszę użyć formatu ${ DATE_FORMAT }`,
    (value) => value === undefined || moment(value, DATE_FORMAT, true).isValid()
  );

const commonSchema = Yup.object().shape({
  [ ApartmentFormFields.ADDRESS_COUNTY_NAME ]: Yup.string().required('Proszę podać województwo.'),
  [ ApartmentFormFields.ADDRESS_CITY ]: Yup.string().required('Proszę podać miejscowość.'),
  [ ApartmentFormFields.ADDRESS_FLAT_NUMBER ]: Yup.string(),
  [ ApartmentFormFields.ADDRESS_STREET_NUMBER ]: Yup.string().required('Wpisz nazwę ulicy.'),
  [ ApartmentFormFields.ADDRESS_STREET_NAME ]: Yup.string().required('Wpisz nazwę ulicy.'),
  [ ApartmentFormFields.ADDRESS_ZIP ]: Yup.string(),
  [ ApartmentFormFields.DESCRIPTION ]: Yup.string(),
  [ ApartmentFormFields.IS_VERIFIED ]: Yup.boolean(),
  [ ApartmentFormFields.LANDLORD_EMAIL ]: Yup.string().required('Uzupełnij adres e-mail.'),
  [ ApartmentFormFields.LANDLORD_NAME ]: Yup.string().required('Uzupełnij imię i nazwisko.'),
  [ ApartmentFormFields.LANDLORD_PHONE ]: Yup.string().required('Podaj numer telefonu.'),
  [ ApartmentFormFields.VACANCIES_TOTAL ]: Yup.number().required('Wpisz maks. liczbę osób.'),
  [ ApartmentFormFields.VACANCIES_TAKEN ]: Yup.number().required('Wpisz liczbę zakwaterowanych.'),
  [ ApartmentFormFields.VOLUNTEER_NAME ]: Yup.string().required('Uzupełnij imię i nazwisko.'),
  // [ ApartmentFormFields.UPDATED_AT ]: dateAsYMDValidator(),
});

const apartmentFormCreateSchema = Yup.object()
  .concat(commonSchema);

const apartmentFormUpdateSchema = Yup.object()
  .shape({
    [ApartmentFormFields.ID]: Yup.string().required("Missing ID field, something is wrong…"),
  })
  .concat(commonSchema);

export {
  apartmentFormCreateSchema,
  apartmentFormUpdateSchema
};