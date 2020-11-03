import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  Provider,
  subscriptionExchange,
  createClient,
  defaultExchanges,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";

// chakra ui
import {
  CSSReset,
  ThemeProvider,
  theme,
  ColorModeProvider,
} from "@chakra-ui/core";

//Google Analytics
// import ReactGA from 'react-ga'

const { REACT_APP_SERVER_URL, REACT_APP_SERVER_SUBSCRIPTIONS } = process.env;
// const url = REACT_SERVER_URL?.toString() || "localhost:5000/graphql"
// const subscriptionsUrl = REACT_APP_SERVER_SUBSCRIPTIONS?.toString() || "ws://localhost:5000/graphql"
const subscriptionClient = new SubscriptionClient(
  "ws://20ed0f338bf7.ngrok.io/graphql"!,
  {
    reconnect: true,
  }
);
const client = createClient({
  url: REACT_APP_SERVER_URL!,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

// const trackingId = REACT_APP_GOOGLE_ANALYTICS
// ReactGA.initialize(trackingId!);


ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <App />
          <CSSReset />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
