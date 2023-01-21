import React from "react";
import PropTypes from "prop-types";

function ProgressBar({percentage}) {
    console.log("rrrrrrrrrrrr",percentage);
  return (
    <div className="progress mt-3">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated p-3"
        role="progressbar"
        aria-valuenow={75}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width:`${percentage}%`}}
      />
      {percentage}%
    </div>
  );
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};
export default ProgressBar;
