import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
import { GuestStatus } from "models/constants/GuestStatus";
import * as Yup from "yup";
import { GuestFormFields } from "./GuestFormFields";

const childrenModelSchema = Yup.object().shape({
    [GuestFormFields.CHILD_AGE]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, `common:form.validator.numberMin`),
});

const phoneNumberRegexp = /^(\+\d{1,2} ?)?\d{3}[- \.]?\d{3}[- \.]?\d{3}$/;

const commonSchema = Yup.object().shape({
    [GuestFormFields.ADULT_FEMALE_COUNT]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, `common:form.validator.numberMin`),
    [GuestFormFields.ADULT_MALE_COUNT]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, "common:form.validator.numberMin"),
    [GuestFormFields.CHILDREN]: Yup.array().of(childrenModelSchema),
    [GuestFormFields.DESIRED_DESTINATION]: Yup.string().trim(),
    [GuestFormFields.EMAIL]: Yup.string()
        .email("common:form.validator.invalidEmailFormat")
        .required("common:form.validator.email"),
    [GuestFormFields.FINANCE_STATUS]: Yup.string().trim(),
    [GuestFormFields.FOOD_ALLERGIES]: Yup.string().trim(),
    [GuestFormFields.FULL_NAME]: Yup.string()
        .trim()
        .required("common:form.validator.fullName"),
    [GuestFormFields.GLUTEN_FREE_DIET]: Yup.bool(),
    [GuestFormFields.HAVE_PETS]: Yup.bool(),
    [GuestFormFields.HOW_LONG_TO_STAY]: Yup.string().trim(),
    [GuestFormFields.LACTOSE_FREE_DIET]: Yup.bool(),
    [GuestFormFields.MEAT_FREE_DIET]: Yup.bool(),
    [GuestFormFields.PEOPLE_IN_GROUP]: Yup.number()
        .integer("common:form.validator.integer")
        .moreThan(0, "common:form.validator.positiveNumber")
        .min(1, "common:form.validator.numberMin"),
    [GuestFormFields.PETS_DESCRIPTION]: Yup.string().trim(),
    [GuestFormFields.PHONE_NUMBER]: Yup.string()
        .trim()
        .matches(phoneNumberRegexp, "common:form.validator.invalidPhoneFormat")
        .required("common:form.validator.phoneNumber"),
    [GuestFormFields.PRIORITY_DATE]: Yup.string().trim(),
    [GuestFormFields.PRIORITY_STATUS]: Yup.string()
        .trim()
        .oneOf(Object.values(GuestPriorityStatus)),
    [GuestFormFields.SPECIAL_NEEDS]: Yup.string().trim(),
    [GuestFormFields.VERIFICATION_STATUS]: Yup.string()
        .trim()
        .oneOf(Object.values(GuestStatus)),
});

const guestFormCreateSchema = Yup.object().concat(commonSchema);

const guestFormUpdateSchema = Yup.object()
    .shape({
        [GuestFormFields.ID]: Yup.string().required(
            "common:form.validator.missingId"
        ),
    })
    .concat(commonSchema);

export { guestFormCreateSchema, guestFormUpdateSchema };
