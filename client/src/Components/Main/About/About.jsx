import React from "react";
import Dialog from "../../UI/Dialog/Dialog";

const About = (props) => {
  const description =
    "this app was developed by mark cha. for any questions or inquiries, please message markcha723@gmail.com.";

  return (
    <Dialog
      type="about"
      message={description}
      onDialogClose={props.onDialogClose}
    />
  );
};

export default About;
