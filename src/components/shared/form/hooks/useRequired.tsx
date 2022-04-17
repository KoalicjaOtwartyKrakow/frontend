import { useCallback } from "react";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import { Test } from "yup/lib/util/createValidation";
import { forEach } from "property-expr";
import { useValidationSchemaContext } from "components/shared/form/ValidationSchemaContext";

export function getIn<C = any>(schema: any, path: string, value?: any, context: C = value) {
    let parent: any, lastPart: string, lastPartDebug: string;

    // root path: ''
    if (!path) return { parent, parentPath: path, schema };

    forEach(path, (_part, isBracket, isArray) => {
        const part = isBracket ? _part.slice(1, -1) : _part;

        schema = schema.resolve({ context, parent, value });

        const isTuple = schema.type === "tuple";
        const index = isArray ? parseInt(part, 10) : 0;

        if (schema.innerType || isTuple) {
            if (isTuple && !isArray)
                throw new Error(
                    `[useReqired] Yup.reach cannot implicitly index into a tuple type. the path part "${lastPartDebug}" must contain an index to the tuple element, e.g. "${lastPartDebug}[0]"`
                );
            if (value && index >= value.length) {
                throw new Error(
                    `[useReqired] Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. because there is no value at that index`
                );
            }
            parent = value;
            value = value && value[index];
            schema = isTuple ? schema.spec.types[index] : schema.innerType;
        }

        // sometimes the array index part of a path doesn't exist: "nested.arr.child"
        // in these cases the current part is the next schema and should be processed
        // in this iteration. For cases where the index signature is included this
        // check will fail and we'll handle the `child` part on the next iteration like normal
        if (!isArray) {
            if (!schema.fields || !schema.fields[part]) {
                throw new Error(
                    `[useReqired] The schema does not contain the path: ${path}. (failed at: ${lastPartDebug} which is a type: "${schema.type}")`
                );
            }

            parent = value;
            value = value && value[part];
            schema = schema.fields[part];
        }

        lastPart = part;
        lastPartDebug = isBracket ? "[" + _part + "]" : "." + _part;
    });

    return {
        schema: schema.resolve({ context, parent, value }),
        parent,
        parentPath: lastPart!,
    };
}

const customReach = (obj: any, path: string, value?: any, context?: any) => getIn(obj, path, value, context).schema;

const useRequired = () => {
    const { schema, isCustomReachEnabled } = useValidationSchemaContext();
    const { values } = useFormikContext<any>();

    const isRequired = useCallback(
        (fieldId: string) => {
            const whichReach = isCustomReachEnabled ? customReach : Yup.reach;
            const fieldValidationSchema = schema
                ? whichReach(schema, fieldId, values, values).resolve({
                      parent: values,
                      context: values,
                      value: values,
                  })
                : false;

            /*
             * This doesn't work. Seems like fieldValidationSchema doesn't know
             * about parent and only is able to run on its own field level.
             * How to pass in context? How to make sure it uses deps?
             */
            const resolvedSchema = fieldValidationSchema
                ? fieldValidationSchema.resolve({
                      parent: values,
                      context: schema,
                  })
                : false;

            // fieldValidationSchema and resolvedSchema give the same result
            const tests = resolvedSchema ? resolvedSchema.describe().tests : false;

            return tests ? !!tests.find((test: Test) => test.name === "required") : false;
        },
        [schema, values, isCustomReachEnabled]
    );

    const getRequiredClassName = useCallback(
        (fieldId: string): string => {
            return isRequired(fieldId) ? "required" : "";
        },
        [schema, values, isCustomReachEnabled]
    );

    return {
        isRequired,
        getRequiredClassName,
    };
};

export { useRequired };
