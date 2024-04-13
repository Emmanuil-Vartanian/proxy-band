import React from "react";

import Home, { homeLoadData } from "../pages/Home/Home";
import Post, { postLoadData } from "../pages/Post/Post";
import Counter from "../pages/Counter";

export const routers = [
  { path: "/", element: <Home />, loadData: homeLoadData },
  {
    path: "/post/:id",
    element: <Post />,
    loadData: (store, path) => postLoadData(store, path.split("/").pop()),
  },
  { path: "/counter", element: <Counter /> },
];
