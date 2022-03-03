import { merge } from "lodash";

import address from "./apartments";
import apartments from "./apartments";
import apartment from "./apartment";
import header from "./header";
import common from "./common";

export default merge(apartments, apartment, header, common);
