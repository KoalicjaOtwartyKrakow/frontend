import React from "react";
import "components/guests/GuestListItem.sass";
import AccommodationItemAddress from "components/accommodations/item/AccommodationItemAddress";
import AccommodationItemAvailability from "components/accommodations/item/AccommodationItemAvailability";
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { Col, Row } from "reactstrap";
import HostItemStatus from "components/hosts/item/HostItemStatus";
import { HostContext } from "components/host/HostContext";
import HostItemContactDetails from "components/hosts/item/HostItemContactDetails";

const GuestFormAccommodationSearchItem = ({ accommodation }) => {
    return (
        <AccommodationContext.Provider value={accommodation}>
            <Row>
                <Col lg={4}>
                    <AccommodationItemAddress />
                </Col>
                <HostContext.Provider value={accommodation.host}>
                    <>
                        <Col>
                            <HostItemContactDetails />
                        </Col>
                        <Col lg={2}>
                            <HostItemStatus />
                        </Col>
                    </>
                </HostContext.Provider>
                <Col lg={1}>
                    <AccommodationItemAvailability />
                </Col>
            </Row>
        </AccommodationContext.Provider>
    );
};

export default GuestFormAccommodationSearchItem;
