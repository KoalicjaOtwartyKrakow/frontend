import React from "react";

type Props = {
    children: React.ReactNode;
};

const FormSectionHeader = ({ children }: Props) => (
    <React.Fragment>
        <h5 className="mb-3">{children}</h5>
    </React.Fragment>
);

export default FormSectionHeader;
