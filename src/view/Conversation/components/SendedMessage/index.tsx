import React, { memo } from "react";

import { getHourAndMinutes } from "../../../../helpers/time";

import { MessageProps } from "../../../../contexts/Chat/interfaces";

import { ReactComponent as ReadedMessage } from "../../../../assets/icons/readed.svg";
import { ReactComponent as UnreadedMessage } from "../../../../assets/icons/no-readed.svg";

interface SendedMessageProps {
  message: MessageProps;
}

function SendedMessage(props: SendedMessageProps) {
  const { message } = props;

  return (
    <div id="sended-message-container" className="tri-right right-bottom">
      <span className="message-text">{message.messageText}</span>

      <div>
        <span className="hour-message">{getHourAndMinutes(message.date)}</span>
        <span>{message.isRead ? <ReadedMessage /> : <UnreadedMessage />}</span>
      </div>
    </div>
  );
}

export default memo(SendedMessage);
