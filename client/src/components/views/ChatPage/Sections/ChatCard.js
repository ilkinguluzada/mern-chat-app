import React from "react";
import moment from "moment";
import { Comment, Tooltip, Avatar } from "antd";

function ChatCard(props) {
  var content = "";

  if (props.message.includes("uploads")) {
    content = (
      <>
        <small>
          <i>{props.sender.name}</i>
        </small>
        <img
          style={{ maxWidth: "200px" }}
          src={`http://localhost:5000/${props.message}`}
          alt="img"
        />
      </>
    );
  } else {
    content = (
      <>
        <small>
          <i>{props.sender.name}</i>
        </small>
        <p>{props.message}</p>
      </>
    );
  }

  return (
    <div class="chat chat-left">
      <div class="chat-avatar">
        <a href="#" class="avatar">
          <img alt="" src={props.sender.image} />
        </a>
      </div>
      <div class="chat-body">
        <div class="chat-bubble">
          <div class="chat-content">
            {content}
            <span class="chat-time">{moment().fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
