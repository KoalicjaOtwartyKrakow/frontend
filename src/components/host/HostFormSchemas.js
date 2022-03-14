import * as Yup from "yup";

const commonSchema = Yup.object().shape({});

const hostFormCreateSchema = Yup.object().concat(commonSchema);

const hostFormUpdateSchema = Yup.object().concat(commonSchema);

export { hostFormCreateSchema, hostFormUpdateSchema };
