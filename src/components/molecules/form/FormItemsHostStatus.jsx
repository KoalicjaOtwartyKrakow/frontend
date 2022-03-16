import { HostStatus } from "models/constants/HostStatus";
import FormSelect from "components/atoms/form/FormSelect";
import React from "react";
import { useTranslation } from "react-i18next";

const FormItemsHostStatus = (props) => {
    const { t } = useTranslation("host");
    const items = Object.values(HostStatus).map((value, index) => {
        return { name: t(`host:status.${value}`), id: index };
    });

    return <FormSelect {...props} items={items} />;
};

export { FormItemsHostStatus };
