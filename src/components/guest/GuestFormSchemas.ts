import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
import { GuestStatus } from "models/constants/GuestStatus";
import * as Yup from "yup";
import { GuestFormFields } from "./GuestFormFields";

const childrenModelSchema = Yup.number()
    .integer("common:form.validator.integer")
    .moreThan(-1, "common:form.validator.positiveNumber")
    .required(`common:form.validator.integer`);

const commonSchema = Yup.object().shape({
    [GuestFormFields.CLAIMED_BY_USER_ID]: Yup.string().nullable(),
    [GuestFormFields.PEOPLE_FEMALE_COUNT]: Yup.number()
        .integer("common:form.validator.integer")
        .min(0, "common:form.validator.numberMin")
        .moreThan(-1, "common:form.validator.positiveNumber")
        .required("common:form.validator.integer"),
    [GuestFormFields.PEOPLE_MALE_COUNT]: Yup.number()
        .integer("common:form.validator.integer")
        .min(0, "common:form.validator.numberMin")
        .moreThan(-1, "common:form.validator.positiveNumber")
        .required(`common:form.validator.integer`),
    [GuestFormFields.CHILDREN]: Yup.array().of(childrenModelSchema),
    [GuestFormFields.DESIRED_DESTINATION]: Yup.string().trim(),
    [GuestFormFields.EMAIL]: Yup.string().trim().email("common:form.validator.invalidEmailFormat"),
    [GuestFormFields.FINANCIAL_STATUS]: Yup.string().trim(),
    [GuestFormFields.FOOD_ALLERGIES]: Yup.string().trim(),
    [GuestFormFields.FULL_NAME]: Yup.string().trim().required("common:form.validator.fullName"),
    [GuestFormFields.GLUTEN_FREE_DIET]: Yup.bool(),
    [GuestFormFields.PETS_PRESENT]: Yup.bool(),
    [GuestFormFields.LACTOSE_FREE_DIET]: Yup.bool(),
    [GuestFormFields.MEAT_FREE_DIET]: Yup.bool(),
    [GuestFormFields.PEOPLE_TOTAL_COUNT]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, "common:form.validator.numberMin")
        .required(`common:form.validator.integer`),
    [GuestFormFields.PETS_DESCRIPTION]: Yup.string().trim(),
    [GuestFormFields.PHONE_NUMBER]: Yup.string().trim(),
    [GuestFormFields.PRIORITY_DATE]: Yup.string().trim(),
    [GuestFormFields.PRIORITY_STATUS]: Yup.string().oneOf(Object.values(GuestPriorityStatus)),
    [GuestFormFields.SPECIAL_NEEDS]: Yup.string().trim(),
    [GuestFormFields.STAFF_COMMENTS]: Yup.string().trim(),
    [GuestFormFields.VERIFICATION_STATUS]: Yup.string().oneOf(Object.values(GuestStatus)),
    [GuestFormFields.DURATION_OF_STAY_VALUE]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, "common:form.validator.numberMin")
        .required("common:form.validator.integer"),
    [GuestFormFields.IS_VALID_ACCOMMODATION_UNIT]: Yup.boolean().isTrue(),
});

const guestFormCreateSchema = Yup.object().concat(commonSchema);

const guestFormUpdateSchema = Yup.object()
    .shape({
        [GuestFormFields.ID]: Yup.string().required("common:form.validator.missingId"),
    })
    .concat(commonSchema);

export { guestFormCreateSchema, guestFormUpdateSchema };
