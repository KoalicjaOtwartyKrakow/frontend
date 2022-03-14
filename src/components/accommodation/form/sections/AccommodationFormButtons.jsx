import React from "react";
import PropTypes from "prop-types";

import { accommodationInProgressPropType } from "proptypes/AccommodationFormPropTypes";
import EntityFormButtons from "components/molecules/form/EntityFormButtons";
import { crudInProgressStates } from "constants/CrudProgress";

/**
 * @component
 */
const AccommodationFormButtons = React.memo((props) => {
    const { isSubmitting, onRemove, inProgress, submitDisabled, submitLabel } =
        props;

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

AccommodationFormButtons.propTypes = {
    inProgress: accommodationInProgressPropType,
    isSubmitting: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    submitDisabled: PropTypes.bool.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default AccommodationFormButtons;
