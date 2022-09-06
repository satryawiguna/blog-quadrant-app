import React from "react";

const Message = ({ messages, closeMessage }) => {
  return (
    <>
      {messages && messages.length > 0 ? (
        <div className="notification is-danger mb-5">
          <button className="delete" onClick={closeMessage}></button>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Message;
