const express = require("express");
const path = require("path");
import { StaticRouter } from "react-router-dom/server";
import React from "react";
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-dom";

import { store } from "../src/store";
import { routers } from "../src/router";

const app = express();

const { App } = require("../src/containers/App.js");

app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, "../build"))
);

app.use("*", (req, res) => {
  const routes = matchRoutes(routers, req.originalUrl);
  const context = {};

  const promises = routes
    ?.map(({ route }) => {
      return route.loadData ? route.loadData(store, req.originalUrl) : null;
    })
    ?.map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(reject);
        });
      }
      return null;
    });

  Promise.all(promises)
    .then(() => {
      const html = renderer(req, store, context);

      res.contentType("text/html");
      res.status(200);

      if (routes && routes[0]?.route?.path !== "*") {
        res.status(200);
      } else {
        res.status(404);
      }

      res.send(html);
    })
    .catch(() => {
      res.status(404);
      res.send("no data1");
    });
});

function renderer(req, store, context) {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../build/index.html"),
    {
      encoding: "utf8",
    }
  );

  let appHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${appHTML}</div>`
  );

  return indexHTML;
}

app.listen("9000", () => {
  console.log("Express server started at <http://localhost:9000>");
});

module.exports = app;