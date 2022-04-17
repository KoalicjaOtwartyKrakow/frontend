import React, { useMemo, createContext, useContext } from "react";
import * as Yup from "yup";

export const ValidationSchemaContext = createContext<{
    schema: Yup.ObjectSchema<any> | undefined;
    isCustomReachEnabled?: boolean;
}>({
    schema: undefined,
    isCustomReachEnabled: true,
});

export const ValidationSchemaProvider = (props: {
    schema: Yup.AnyObjectSchema;
    isCustomReachEnabled?: boolean;
    children: React.ReactNode;
}) => {
    const { schema, children, isCustomReachEnabled } = props;

    const value = useMemo(() => ({ schema, isCustomReachEnabled }), [schema, isCustomReachEnabled]);

    return <ValidationSchemaContext.Provider value={value}>{children}</ValidationSchemaContext.Provider>;
};

export const useValidationSchemaContext = () => {
    const { schema, isCustomReachEnabled } = useContext(ValidationSchemaContext);

    return {
        isCustomReachEnabled,
        schema,
    };
};
