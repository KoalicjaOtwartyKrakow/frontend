import { useContext } from "react";
import { ValidationContext } from "components/shared/form/ValidationContext";
import * as Yup from "yup";
import { useField } from "formik";

const useRequired = () => {
    const validationSchema = useContext(ValidationContext);
    const isRequired = (predicate: () => boolean) => {
        return predicate() ? "required" : "";

        // TODO: figure out some proper option to access resolved validation schema for field
        // fieldId: string

        // if (!validationSchema) {
        //     return false;
        // }
        // try {
        //     const fieldSchema = Yup.reach(validationSchema, fieldId);
        //     const [{ value }] = useField(fieldId);
        //
        //     const context: { [key: string]: any } = {};
        //     const dependencies = fieldSchema.deps || [];
        //     dependencies.forEach((dependency: string) => {
        //         const [inputProps] = useField(dependency);
        //         context[dependency] = inputProps.value;
        //     });
        //
        //     const options = { value: context };
        //     const x = Yup.reach(fieldSchema, "", value, context);
        //     // if (fieldId === "vacanciesTaken") {
        //     //     debugger;
        //     // }
        //     const y = x.describe(options);
        //     const z = validationSchema.validateAt(fieldId, value, { context });
        //
        //     let a;
        //
        //     x.conditions.forEach((condition: any) => {
        //         debugger;
        //         a = condition.resolve();
        //     });
        //
        //     console.log(a);
        //
        //     const schemaDescription = Yup.reach(validationSchema, fieldId, value, context).describe(options);
        //     // console.log(fieldSchema);
        //     // console.log(schemaDescription);
        //     return schemaDescription.tests.indexOf("required") > -1;
        // } catch (error) {
        //     console.error(error);
        //     return false;
        // }
    };

    return {
        isRequired,
    };
};

export { useRequired };
