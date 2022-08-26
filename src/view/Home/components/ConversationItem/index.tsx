/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useFirestoreContext } from "../../../../contexts/Chat";
import { Conversation } from "../../../../contexts/Chat/interfaces";

import { MESSAGE_TYPE, USER_TYPE } from "../../../../constants/firesbase";
import CounterContainer from "../../../../components/Counter";

import { ReactComponent as ReadedMessage } from "../../../../assets/icons/readed.svg";
import { ReactComponent as UnreadedMessage } from "../../../../assets/icons/no-readed.svg";

interface ConversationItemProps {
  conversation: Conversation;
}

function ConversationItem(props: ConversationItemProps) {
  const { handleSetClientConversation } = useFirestoreContext();
  const { conversation } = props;

  function handleRenderMessageContent() {
    switch (conversation?.lastMessage?.type) {
      case MESSAGE_TYPE.IMAGE:
        return `📷 Imagem`;
      default:
        return conversation?.lastMessage?.messageText;
    }
  }

  return (
    <div
      id="conversation-item-container"
      onClick={() => handleSetClientConversation(conversation?.id)}
    >
      <section className="body">
        <span className="client-name">{conversation?.clientName || "-"}</span>
      </section>

      <div className="item-bottom">
        <div>
          {conversation?.lastMessage?.isRead &&
            conversation?.lastMessage?.userType === USER_TYPE.STORE && (
              <span className="readed-icon">
                <ReadedMessage />
              </span>
            )}
          {conversation?.lastMessage?.isRead === false &&
            conversation?.lastMessage?.userType === USER_TYPE.STORE && (
              <span className="readed-icon">
                <UnreadedMessage />
              </span>
            )}
          <div className="last-message">
            <span className="text">{handleRenderMessageContent()}</span>
          </div>
        </div>
        {conversation?.lastMessage?.isRead === false &&
          conversation?.lastMessage?.userType === USER_TYPE.CLIENT && (
            <CounterContainer value="!" hexaDecimalColor="#DF3828" />
          )}
      </div>
    </div>
  );
}

export default ConversationItem;
