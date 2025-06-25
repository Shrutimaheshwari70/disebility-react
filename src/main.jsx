import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeZoomProvider } from "./context/ThemeZoomContext";
// import ContextProvider from "./context/Context.jsx"; 
// import { Provider } from "react-redux";
// import { store } from "./Store/Store.jsx";

createRoot(document.getElementById("root")).render(
   <ThemeZoomProvider>
  <BrowserRouter>
  <StrictMode>
    {/* <Provider store={store}> */}
      {/* <ContextProvider>  */}
          <App />
      {/* </ContextProvider> */}
    {/* </Provider> */}
  </StrictMode>
  </BrowserRouter>
  </ThemeZoomProvider>
);
