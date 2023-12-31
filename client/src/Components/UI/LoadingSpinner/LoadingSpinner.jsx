import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  let size = "45px";
  if (props.size) {
    switch (props.size) {
      case "small":
        break;
      case "medium":
        size = "90px";
        break;
      case "large":
        size = "180px";
        break;
    }
  }

  return (
    <div className={classes.container}>
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="48px"
        height="48px"
        viewBox="0 0 48 48"
        style={{
          width: size,
          height: size,
        }}
      >
        <path
          fill="#000"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      {props.optionalText ? (
        <p className={classes["optional-text"]}>{props.optionalText}</p>
      ) : (
        []
      )}
    </div>
  );
};

export default LoadingSpinner;
