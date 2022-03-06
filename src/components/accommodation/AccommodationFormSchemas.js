import * as Yup from "yup";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
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
    [AccommodationFormFields.ADDRESS_STATE_NAME]: Yup.string().required(
        t.stateName
    ),
    [AccommodationFormFields.ADDRESS_CITY]: Yup.string().required(t.cityName),
    [AccommodationFormFields.ADDRESS_FLAT_NUMBER]: Yup.string(),
    [AccommodationFormFields.ADDRESS_STREET_NUMBER]: Yup.string().required(
        t.streetNumber
    ),
    [AccommodationFormFields.ADDRESS_STREET_NAME]: Yup.string().required(
        t.streetName
    ),
    [AccommodationFormFields.ADDRESS_ZIP]: Yup.string(),
    [AccommodationFormFields.DESCRIPTION]: Yup.string(),
    [AccommodationFormFields.IS_VERIFIED]: Yup.boolean(),
    [AccommodationFormFields.HOST_EMAIL]: Yup.string().required(t.email),
    [AccommodationFormFields.HOST_NAME]: Yup.string().required(t.fullName),
    [AccommodationFormFields.HOST_PHONE]: Yup.string().required(t.phoneNumber),
    [AccommodationFormFields.VACANCIES_TOTAL]: Yup.number()
        .integer(t.integer)
        .moreThan(0, t.positiveNumber)
        .min(1, `${t.numberMin} 1 osoba`)
        .required(t.numberOfPeople),
    [AccommodationFormFields.VACANCIES_TAKEN]: Yup.number()
        .integer(t.integer)
        .moreThan(-1, t.positiveNumber)
        .required(t.numberOfPeople),
    [AccommodationFormFields.VOLUNTEER_NAME]: Yup.string().required(t.fullName),
    // [ AccommodationFormFields.UPDATED_AT ]: dateAsYMDValidator(),
});

const accommodationFormCreateSchema = Yup.object().concat(commonSchema);

const accommodationFormUpdateSchema = Yup.object()
    .shape({
        [AccommodationFormFields.ID]: Yup.string().required(t.missingId),
    })
    .concat(commonSchema);

export { accommodationFormCreateSchema, accommodationFormUpdateSchema };
