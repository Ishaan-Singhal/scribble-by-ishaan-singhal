import React from "react";

import Form from ".";

const Create = ({ history }) => {
  const onClose = () => {
    history.push("/");
  };

  return (
    <div className="flex justify-center">
      <Form closeForm={onClose} isEdit={false} />
    </div>
  );
};

export default Create;
