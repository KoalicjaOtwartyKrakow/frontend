import React from "react";
import PropTypes from "prop-types";

import EntityFormButtons from "components/molecules/form/EntityFormButtons";
import { crudInProgressStates } from "constants/CrudProgress";

/**
 * @component
 */
const GuestFormButtons = React.memo((props) => {
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

GuestFormButtons.propTypes = {
    inProgress: PropTypes.any,
    isSubmitting: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    submitDisabled: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default GuestFormButtons;
