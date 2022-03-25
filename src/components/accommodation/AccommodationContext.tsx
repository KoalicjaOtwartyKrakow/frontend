import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Accommodation' or its c... Remove this comment to see the full error message
import Accommodation from "models/Accommodation";

export const AccommodationContext = React.createContext(new Accommodation());
