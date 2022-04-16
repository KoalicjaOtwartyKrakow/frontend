import { useContext } from "react";
import { ValidationContext } from "components/shared/form/ValidationContext";
import * as Yup from "yup";
import type { SchemaDescription } from "yup/lib/schema";
import BaseSchema from "yup/lib/schema";
import { useField } from "formik";

const useRequired = () => {
    const validationSchema = useContext(ValidationContext);

    const isRequired = (fieldId: string) => {
        if (!validationSchema) {
            console.warn("[useRequired] ValidationContext must be defined before isRequired() can be called");
            return false;
        }

        try {
            // const context: { [key: string]: any } = {};
            // const options = { value };
            const fieldSchema: BaseSchema<any> = Yup.reach(validationSchema, fieldId);
            const dependencies = fieldSchema.deps || [];

            const options: { value: { [key: string]: any } } = {
                value: dependencies.reduce((previousValue, field) => {
                    const [inputProps] = useField(field);
                    return { ...previousValue, [field]: inputProps.value };
                }, {}),
            };

            if (fieldId === "addressLine") {
                const [{ value }] = useField(fieldId);
                debugger;
                const a = Yup.reach(validationSchema, fieldId, value, options);
            }

            const [{ value }] = useField(fieldId);
            options.value[fieldId] = value;

            const resolvedSchema = fieldSchema.resolve(options);

            // @ts-ignore
            const schemaDescription: SchemaDescription = resolvedSchema.describe(options);
            if (fieldId === "addressLine") {
                console.log("** ", { fieldId, options, fieldSchema, resolvedSchema, schemaDescription });
            }

            if (schemaDescription.tests.some((test) => test.name === "required")) {
                return true;
            }

            // debugger;
            //
            // const [{ value }] = useField(fieldId);
            // console.log("**", { fieldSchema });
            //
            // const context: { [key: string]: any } = {};
            // const dependencies = fieldSchema.deps || [];
            // dependencies.forEach((dependency: string) => {
            //     const [inputProps] = useField(dependency);
            //     context[dependency] = inputProps.value;
            // });
            //
            // const options = { value: context };
            // const x = Yup.reach(fieldSchema, "", value, context);
            // // if (fieldId === "vacanciesTaken") {
            // //     debugger;
            // // }
            // const y = x.describe(options);
            // const z = validationSchema.validateAt(fieldId, value, { context });
            //
            // let a;
            //
            // x.conditions.forEach((condition: any) => {
            //     debugger;
            //     a = condition.resolve();
            // });
            //
            // console.log(a);
            //
            // const schemaDescription = Yup.reach(validationSchema, fieldId, value, context).describe(options);
            // // console.log(fieldSchema);
            // // console.log(schemaDescription);
            // return schemaDescription.tests.indexOf("required") > -1;
        } catch (error) {
            console.error("[useRequired] Failed during isRequired(): ", error);
            return false;
        }
    };

    const getRequiredClassName = (fieldId: string): string => {
        return isRequired(fieldId) ? "required" : "";
    };

    return {
        isRequired,
        getRequiredClassName,
    };
};

export { useRequired };
