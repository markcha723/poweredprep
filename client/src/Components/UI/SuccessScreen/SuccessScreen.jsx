import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

import classes from "../LoadingScreen/LoadingScreen.module.css";

/* 
  takes in two props:
    messages: string[]
    destinations: string[] <--- inputs should be relative paths.
*/
const SuccessScreen = (props) => {
  const { messages, destinationsText, destinations } = props;
  const navigate = useNavigate();

  return (
    <div className={classes["loading-screen"]}>
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
      <div
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-evenly",
        }}
      >
        {destinations.map((destination, index) => {
          const { text, address } = destination;
          return (
            <Button
              size="medium"
              key={text}
              color={(index + 1) % 2 > 1 ? "pink" : "teal"}
              option={`go to ${text}`}
              onClick={() => {
                navigate(address);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SuccessScreen;
