import PropTypes from "prop-types";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormFields... Remove this comment to see the full error message
import { HostFormFields } from "components/host/HostFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Language' or its corres... Remove this comment to see the full error message
import Language from "models/Language";

const hostFormInitialValuesPropTypes = PropTypes.shape({
    [HostFormFields.FULL_NAME]: PropTypes.string,
    [HostFormFields.EMAIL]: PropTypes.string,
    [HostFormFields.PHONE_NUMBER]: PropTypes.string,
    [HostFormFields.CALL_AFTER]: PropTypes.string,
    [HostFormFields.CALL_BEFORE]: PropTypes.string,
    [HostFormFields.COMMENTS]: PropTypes.string,
    [HostFormFields.LANGUAGES_SPOKEN]: PropTypes.arrayOf(PropTypes.instanceOf(Language).isRequired).isRequired,
    [HostFormFields.STATUS]: PropTypes.string,
});

const hostFormHostPropTypes = {};

const hostInProgressPropType = PropTypes.string.isRequired;

const hostFormPropTypesBase = {
    initialValues: hostFormInitialValuesPropTypes,
    onSubmit: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    hostInProgress: hostInProgressPropType,
};

const hostFormPropTypes = {
    ...hostFormPropTypesBase,
    onHostNameChange: PropTypes.func,
};

const hostFormCardPropTypes = {
    ...hostFormPropTypesBase,
    formLabel: PropTypes.string.isRequired,
};

export { hostFormCardPropTypes, hostFormHostPropTypes, hostFormPropTypes, hostInProgressPropType };
