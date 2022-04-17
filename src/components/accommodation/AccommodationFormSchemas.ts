import * as Yup from "yup";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { AccommodationWorkflowStatus } from "models/constants/AccommodationWorkflowStatus";

const requiredIfNotWithdrawn = (errorMessage: string) => ({
    is: AccommodationWorkflowStatus.WITHDRAWN,
    then: (schema: Yup.AnySchema) => schema.optional(),
    otherwise: (schema: Yup.AnySchema) => schema.required(errorMessage),
});

const workflowStatus = AccommodationFormFields.WORKFLOW_STATUS;

const commonSchema = Yup.object().shape({
    // Address
    [AccommodationFormFields.ADDRESS_CITY]: Yup.string()
        .trim()
        .when(workflowStatus, requiredIfNotWithdrawn("accommodation:form.validator.cityName")),
    [AccommodationFormFields.ADDRESS_LINE]: Yup.string()
        .trim()
        .when(workflowStatus, requiredIfNotWithdrawn("accommodation:form.validator.address")),
    [AccommodationFormFields.ADDRESS_VOIVODESHIP]: Yup.string().when(
        workflowStatus,
        requiredIfNotWithdrawn("common:form.validator.voivodeshipName")
    ),
    [AccommodationFormFields.ADDRESS_ZIP]: Yup.string()
        .trim()
        .when(workflowStatus, requiredIfNotWithdrawn("common:form.validator.zip")),
    [AccommodationFormFields.DURATION_OF_STAY_VALUE]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, `common:form.validator.numberMin`)
        .when(workflowStatus, requiredIfNotWithdrawn("accommodation:form.validator.durationOfStay")),

    // Host
    [AccommodationFormFields.HOST_ID]: Yup.string().when(
        workflowStatus,
        requiredIfNotWithdrawn("accommodation:form.validator.hostRequired")
    ),

    // Vacancies
    [AccommodationFormFields.VACANCIES_TAKEN]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(-1, "common:form.validator.positiveNumber")
        .max(Yup.ref(AccommodationFormFields.VACANCIES_TOTAL), "accommodation:form.validator.tooManyPeople")
        .when(workflowStatus, requiredIfNotWithdrawn("accommodation:form.validator.vacanciesTaken")),
    [AccommodationFormFields.VACANCIES_TOTAL]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, `common:form.validator.numberMin`)
        .when(workflowStatus, requiredIfNotWithdrawn("accommodation:form.validator.vacanciesTotal")),

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

    [AccommodationFormFields.VERIFICATION_STATUS]: Yup.string().required(),
    [AccommodationFormFields.WORKFLOW_STATUS]: Yup.string().required(),
});

const accommodationFormCreateSchema = Yup.object().concat(commonSchema);

const accommodationFormUpdateSchema = Yup.object()
    .shape({
        [AccommodationFormFields.ID]: Yup.string().required("common:form.validator.missingId"),
    })
    .concat(commonSchema);

export { accommodationFormCreateSchema, accommodationFormUpdateSchema };
