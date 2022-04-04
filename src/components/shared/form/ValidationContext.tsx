import React from "react";
import * as Yup from "yup";

const ValidationContext = React.createContext(Yup.object());

export { ValidationContext };
