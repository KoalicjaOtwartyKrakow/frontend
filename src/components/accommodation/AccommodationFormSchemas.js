import * as Yup from "yup";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// import isSafeInteger from "lodash-es/isSafeInteger";
// import { appConfig } from "constants/AppConfig";
// import moment from "moment-es6";

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
    // Address
    [AccommodationFormFields.ADDRESS_CITY]: Yup.string().required(
        "form.validator.cityName"
    ),
    [AccommodationFormFields.ADDRESS_LINE]: Yup.string().required(
        "form.validator.address"
    ),
    [AccommodationFormFields.ADDRESS_VOIVODESHIP]: Yup.string().required(
        "form.validator.voivodeshipName"
    ),
    [AccommodationFormFields.ADDRESS_ZIP]:
        Yup.string().required("form.validator.zip"),
    // Vacancies
    [AccommodationFormFields.VACANCIES_TOTAL]: Yup.number()
        .integer("form.validator.integer")
        .moreThan(0, "form.validator.positiveNumber")
        .min(1, `form.validator.numberMin`)
        .required("form.validator.vacanciesTotal"),
    [AccommodationFormFields.VACANCIES_TAKEN]: Yup.number()
        .integer("form.validator.integer")
        .moreThan(-1, "form.validator.positiveNumber")
        .max(
            Yup.ref(AccommodationFormFields.VACANCIES_TOTAL),
            "form.validator.notEnoughTotalVacancies"
        )
        .required("form.validator.vacanciesTaken"),
    // Info
    [AccommodationFormFields.COMMENTS]: Yup.string(),
    // Pets
    [AccommodationFormFields.PETS_ALLOWED]: Yup.bool(),
    [AccommodationFormFields.PETS_PRESENT]: Yup.bool(),
    // Accessibility
    [AccommodationFormFields.DISABLED_PEOPLE_FRIENDLY]: Yup.bool(),
    [AccommodationFormFields.LGBT_FRIENDLY]: Yup.bool(),
    [AccommodationFormFields.PARKING_PLACE]: Yup.bool(),
    [AccommodationFormFields.EASY_AMBULANCE_ACCESS]: Yup.bool(),
    // ---
    // [AccommodationFormFields.DESCRIPTION]: Yup.string(),
    // [AccommodationFormFields.ADDRESS_FLAT_NUMBER]: Yup.string(),
    // [AccommodationFormFields.ADDRESS_STREET_NUMBER]: Yup.string().required(
    //     "form.validator.streetNumber"
    // ),
    // [AccommodationFormFields.ADDRESS_STREET_NAME]: Yup.string().required(
    //     "form.validator.streetName"
    // ),
    // [AccommodationFormFields.IS_VERIFIED]: Yup.boolean(),
    // [AccommodationFormFields.HOST_EMAIL]: Yup.string().required(
    //     "form.validator.email"
    // ),
    // [AccommodationFormFields.HOST_NAME]: Yup.string().required(
    //     "form.validator.fullName"
    // ),
    // [AccommodationFormFields.HOST_PHONE]: Yup.string().required(
    //     "form.validator.phoneNumber"
    // ),
    // [AccommodationFormFields.VOLUNTEER_NAME]: Yup.string().required(
    //     "form.validator.fullName"
    // ),
    // [ AccommodationFormFields.UPDATED_AT ]: dateAsYMDValidator(),
});

const accommodationFormCreateSchema = Yup.object().concat(commonSchema);

const accommodationFormUpdateSchema = Yup.object().shape({
    [AccommodationFormFields.ID]: Yup.string().required(
        "form.validator.missingId"
    ),
});
// .concat(commonSchema);

export { accommodationFormCreateSchema, accommodationFormUpdateSchema };
