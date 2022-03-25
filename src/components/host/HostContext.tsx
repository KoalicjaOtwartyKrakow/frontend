import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Host' or its correspond... Remove this comment to see the full error message
import Host from "models/Host";

export const HostContext = React.createContext(new Host());
