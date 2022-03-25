import React from "react";
import "components/guests/GuestListItem.sass";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/item... Remove this comment to see the full error message
import AccommodationItemAddress from "components/accommodations/item/AccommodationItemAddress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/item... Remove this comment to see the full error message
import AccommodationItemAvailability from "components/accommodations/item/AccommodationItemAvailability";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { Col, Row } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/hosts/item/HostItem... Remove this comment to see the full error message
import HostItemStatus from "components/hosts/item/HostItemStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostContext' o... Remove this comment to see the full error message
import { HostContext } from "components/host/HostContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/hosts/item/HostItem... Remove this comment to see the full error message
import HostItemContactDetails from "components/hosts/item/HostItemContactDetails";

const GuestFormAccommodationSearchItem = ({ accommodation }: any) => {
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
