import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 *
 * @param {boolean} inProgress
 * @param {JSX.Element} label
 * @param {boolean} [centered]
 * @returns {null|JSX.Element}
 * @constructor
 */
const InProgress = ({ inProgress, label, centered = true }) => {
    const className = classNames(
        'mb-3',
        {
            'text-center': centered,
        }
    );

    if (inProgress === false) {
        return null;
    }

    return (
        <p className={className}>
            <FontAwesomeIcon icon={faSpinner} spin />
            {' '}
            {label}
        </p>
    );
};

InProgress.defaultProps = {
    label: 'Trwa ładowanie danych…'
};

InProgress.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    label: PropTypes.string,
};

export default InProgress;