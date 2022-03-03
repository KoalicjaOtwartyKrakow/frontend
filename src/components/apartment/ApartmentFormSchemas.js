import * as Yup from "yup";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";
// import isSafeInteger from "lodash-es/isSafeInteger";
// import { appConfig } from "constants/AppConfig";
// import moment from "moment-es6";
import { t } from "i18n/formValidation";

// const toSafeIntegerWithUndefined = (value) => {
//   const safeInteger = isSafeInteger(+value) ? +value : value;
//   console.log(value, +value, isSafeInteger(+value), safeInteger)
//   return safeInteger;
// };

// const dateAsYMDValidator = () =>
//     Yup.mixed().test(
//         "is-date-yyyy-mm-dd",
//         `Proszę użyć formatu ${appConfig.dateFormat}`,
//         (value) =>
//             value === undefined ||
//             moment(value, appConfig.dateFormat, true).isValid()
//     );

const commonSchema = Yup.object().shape({
    [ApartmentFormFields.ADDRESS_STATE_NAME]: Yup.string().required(
        t.stateName
    ),
    [ApartmentFormFields.ADDRESS_CITY]: Yup.string().required(t.cityName),
    [ApartmentFormFields.ADDRESS_FLAT_NUMBER]: Yup.string(),
    [ApartmentFormFields.ADDRESS_STREET_NUMBER]: Yup.string().required(
        t.streetNumber
    ),
    [ApartmentFormFields.ADDRESS_STREET_NAME]: Yup.string().required(
        t.streetName
    ),
    [ApartmentFormFields.ADDRESS_ZIP]: Yup.string(),
    [ApartmentFormFields.DESCRIPTION]: Yup.string(),
    [ApartmentFormFields.IS_VERIFIED]: Yup.boolean(),
    [ApartmentFormFields.LANDLORD_EMAIL]: Yup.string().required(t.email),
    [ApartmentFormFields.LANDLORD_NAME]: Yup.string().required(t.fullName),
    [ApartmentFormFields.LANDLORD_PHONE]: Yup.string().required(t.phoneNumber),
    [ApartmentFormFields.VACANCIES_TOTAL]: Yup.number()
        .integer(t.integer)
        .moreThan(0, t.positiveNumber)
        .min(1, `${t.numberMin} 1 osoba`)
        .required(t.numberOfPeople),
    [ApartmentFormFields.VACANCIES_TAKEN]: Yup.number()
        .integer(t.integer)
        .moreThan(-1, t.positiveNumber)
        .required(t.numberOfPeople),
    [ApartmentFormFields.VOLUNTEER_NAME]: Yup.string().required(t.fullName),
    // [ ApartmentFormFields.UPDATED_AT ]: dateAsYMDValidator(),
});

const apartmentFormCreateSchema = Yup.object().concat(commonSchema);

const apartmentFormUpdateSchema = Yup.object()
    .shape({
        [ApartmentFormFields.ID]: Yup.string().required(t.missingId),
    })
    .concat(commonSchema);

export { apartmentFormCreateSchema, apartmentFormUpdateSchema };
