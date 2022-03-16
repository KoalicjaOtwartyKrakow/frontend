import * as Yup from "yup";
import { HostFormFields } from "components/host/HostFormFields";

const commonSchema = Yup.object().shape({
    [HostFormFields.STATUS]: Yup.string().required(
        "host:form.validator.status"
    ),
    [HostFormFields.FULL_NAME]: Yup.string()
        .trim()
        .required("common:form.validator.fullName"),
    [HostFormFields.EMAIL]: Yup.string()
        .trim()
        .email("common:form.validator.invalidEmailFormat")
        .required("common:form.validator.email"),
    [HostFormFields.PHONE_NUMBER]: Yup.string()
        .trim()
        .required("common:form.validator.phoneNumber"),
});

const hostFormCreateSchema = Yup.object().concat(commonSchema);

const hostFormUpdateSchema = Yup.object().concat(commonSchema);

export { hostFormCreateSchema, hostFormUpdateSchema };
