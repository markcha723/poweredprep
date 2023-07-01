import React from "react";

import ProgressButton from "./ProgressButton";

const ProgressBar = (props) => {
  const renderButtons = (purpose) => {
    switch (purpose) {
      case "create":
        return (
          <React.Fragment>
            <ProgressButton
              name="section"
              active={props.active}
              onSelect={props.onSelect}
            />
            <ProgressButton
              name="questions"
              active={props.active}
              onSelect={props.onSelect}
            />
            <ProgressButton
              name="passages"
              active={props.active}
              onSelect={props.onSelect}
            />
            <ProgressButton
              name="extras"
              active={props.active}
              onSelect={props.onSelect}
            />
          </React.Fragment>
        );
    }
  };

  return <div className={props.className}>{renderButtons(props.barFor)}</div>;
};

export default ProgressBar;
