import React from "react";
import { FirestoreProvider } from "../contexts/Chat";

import Home from "../view/Home";

function App() {
  return (
    <FirestoreProvider>
      <Home />
    </FirestoreProvider>
  );
}

export default App;
