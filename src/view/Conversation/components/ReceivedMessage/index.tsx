import React, { memo } from "react";
import { MessageProps } from "../../../../contexts/Chat/interfaces";

import { getHourAndMinutes } from "../../../../helpers/time";

interface ReceivedMessageProps {
  message: MessageProps;
}

function ReceivedMessage(props: ReceivedMessageProps) {
  const { message } = props;

  return (
    <div id="received-message-container" className="tri-left left-bottom">
      <span className="message-text">{message.messageText}</span>
      <div>
        <span className="hour-message">{getHourAndMinutes(message.date)}</span>
      </div>
    </div>
  );
}

export default memo(ReceivedMessage);
