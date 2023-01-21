import React from "react";

function Message(props) {
  const text = props.text;
  const time = props.time;
  const sender = props.sender;
  const side = props.side;
  const date = props.date;
  return (
    <div className={`chat-message-${side} pb-4`}>
      <div>
       {sender.avatar?<img
          src={sender.avatar}
          className="rounded-circle mr-1"
          alt="Chris Wood"
          width={40}
          height={40}
        />:<i class="fas fa-user-circle text-muted fs-4"></i>}

        <div className=" text-muted small mb-1">{sender.nom} {sender.prenom}</div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
      <div className="text-muted small text-nowrap mt-2">{time} - {date}</div>
        {text}
      </div>
    </div>
  );
}

export default Message;
