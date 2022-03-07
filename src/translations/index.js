import merge from "lodash-es/merge";

import accommodations from "translations/accommodations";
import accommodation from "translations/accommodation";
import header from "translations/header";
import navbar from "translations/components/navbar.json";
import common from "translations/common";
import homepage from "translations/pages/homepage";

export default merge(
    accommodations,
    accommodation,
    common,
    header,
    homepage,
    navbar
);
