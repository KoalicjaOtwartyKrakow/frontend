import { merge } from "lodash";

import accommodations from "./accommodations";
import accommodation from "./accommodation";
import header from "./header";
import common from "./common";
import homepage from "./pages/homepage";

export default merge(accommodations, accommodation, header, common, homepage);
