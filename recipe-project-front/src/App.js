import React from 'react';
import appRoutes from "./routes.js";

function App() {
  return (
    <div className="App">
      {appRoutes()}
    </div>
  );
}

export default App;