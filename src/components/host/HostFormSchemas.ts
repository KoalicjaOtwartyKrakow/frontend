import * as Yup from "yup";
import { HostFormFields } from "components/host/HostFormFields";

const commonSchema = Yup.object().shape({
    [HostFormFields.EMAIL]: Yup.string()
        .trim()
        .email("common:form.validator.invalidEmailFormat")
        .required("common:form.validator.email"),
    [HostFormFields.FULL_NAME]: Yup.string().trim().required("common:form.validator.fullName"),
    [HostFormFields.LANGUAGES_SPOKEN]: Yup.array()
        .min(1, "common:form.validator.atLeastOneLanguage")
        .required("common:form.validator.atLeastOneLanguage"),
    [HostFormFields.PHONE_NUMBER]: Yup.string().trim().required("common:form.validator.phoneNumber"),
    [HostFormFields.STATUS]: Yup.string().required("host:form.validator.status"),
});

const hostFormCreateSchema = Yup.object().concat(commonSchema);

const hostFormUpdateSchema = Yup.object().concat(commonSchema);

export { hostFormCreateSchema, hostFormUpdateSchema };
