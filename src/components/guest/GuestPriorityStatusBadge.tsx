import React from "react";
import { Badge } from "reactstrap";

const GuestPriorityStatusBadge = ({ color, label }: any) => {
    const className = "d-inline-block me-1";
    if (!label) {
        return null;
    }
    return (
        <Badge color={color} className={className}>
            {label}
        </Badge>
    );
};

export default GuestPriorityStatusBadge;
