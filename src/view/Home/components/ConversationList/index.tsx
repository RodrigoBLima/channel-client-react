import React from "react";

import { v4 as uuidv4 } from "uuid";

import Card from "../../../../components/Card";

import { useFirestoreContext } from "../../../../contexts/Chat";

import ConversationItem from "../ConversationItem";

import clientIcon from "../../../../assets/icons/person-face.svg";

function ConversationList() {
  const { allConversations } = useFirestoreContext();

  return (
    <div id="conversation-list-container">
      <Card
        title="Listagem de conversas"
        iconNode={clientIcon}
        counterValue={allConversations.length}
        counterColor="#DF3828"
      >
        <section className="area">
          {(allConversations || []).map((conversation) => (
            <ConversationItem conversation={conversation} key={uuidv4()} />
          ))}
        </section>
      </Card>
    </div>
  );
}

export default ConversationList;
