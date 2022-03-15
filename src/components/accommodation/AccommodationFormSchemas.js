import * as Yup from "yup";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const commonSchema = Yup.object().shape({
    // Address
    [AccommodationFormFields.ADDRESS_CITY]: Yup.string()
        .trim()
        .required("accommodation:form.validator.cityName"),
    [AccommodationFormFields.ADDRESS_LINE]: Yup.string()
        .trim()
        .required("accommodation:form.validator.address"),
    [AccommodationFormFields.ADDRESS_VOIVODESHIP]: Yup.string().required(
        "common:form.validator.voivodeshipName"
    ),
    [AccommodationFormFields.ADDRESS_ZIP]: Yup.string()
        .trim()
        .required("common:form.validator.zip"),

    // Vacancies
    [AccommodationFormFields.VACANCIES_TAKEN]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(-1, "common:form.validator.positiveNumber")
        .max(
            Yup.ref(AccommodationFormFields.VACANCIES_TOTAL),
            "accommodation:form.validator.tooManyPeople"
        )
        .required("accommodation:form.validator.vacanciesTaken"),
    [AccommodationFormFields.VACANCIES_TOTAL]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, `common:form.validator.numberMin`)
        .required("accommodation:form.validator.vacanciesTotal"),

    // Info
    [AccommodationFormFields.OWNER_COMMENTS]: Yup.string().trim(),
    [AccommodationFormFields.STAFF_COMMENTS]: Yup.string().trim(),

    // Pets
    [AccommodationFormFields.PETS_ALLOWED]: Yup.bool(),
    [AccommodationFormFields.PETS_PRESENT]: Yup.bool(),

    // Accessibility
    [AccommodationFormFields.DISABLED_PEOPLE_FRIENDLY]: Yup.bool(),
    [AccommodationFormFields.EASY_AMBULANCE_ACCESS]: Yup.bool(),
    [AccommodationFormFields.LGBT_FRIENDLY]: Yup.bool(),
    [AccommodationFormFields.PARKING_PLACE]: Yup.bool(),
});

const accommodationFormCreateSchema = Yup.object().concat(commonSchema);

const accommodationFormUpdateSchema = Yup.object()
    .shape({
        [AccommodationFormFields.ID]: Yup.string().required(
            "common:form.validator.missingId"
        ),
    })
    .concat(commonSchema);

export { accommodationFormCreateSchema, accommodationFormUpdateSchema };
