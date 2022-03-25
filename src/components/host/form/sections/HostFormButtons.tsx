import React from "react";
import PropTypes from "prop-types";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'proptypes/HostFormPropTypes' o... Remove this comment to see the full error message
import { hostInProgressPropType } from "proptypes/HostFormPropTypes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Enti... Remove this comment to see the full error message
import EntityFormButtons from "components/molecules/form/EntityFormButtons";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/CrudProgress' or its... Remove this comment to see the full error message
import { crudInProgressStates } from "constants/CrudProgress";

/**
 * @component
 */
const HostFormButtons = React.memo((props) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSubmitting' does not exist on type '{ ... Remove this comment to see the full error message
    const { isSubmitting, onRemove, inProgress, submitDisabled, submitLabel } = props;

    return (
        <EntityFormButtons
            onRemove={onRemove}
            removeInProgress={inProgress === crudInProgressStates.DELETE}
            submitDisabled={submitDisabled}
            submitInProgress={isSubmitting}
            submitLabel={submitLabel}
        />
    );
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'Named... Remove this comment to see the full error message
HostFormButtons.propTypes = {
    inProgress: hostInProgressPropType,
    isSubmitting: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    submitDisabled: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default HostFormButtons;
