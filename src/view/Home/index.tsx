import React from "react";
import { useFirestoreContext } from "../../contexts/Chat";

import Conversation from "../Conversation";
import ConversationList from "./components/ConversationList";

function Home() {
  const { openedClientConversation } = useFirestoreContext();

  return (
    <div id="home-container">
      <ConversationList />

      {openedClientConversation && <Conversation />}
    </div>
  );
}

export default Home;
