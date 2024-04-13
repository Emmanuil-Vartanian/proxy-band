import React from "react";
import { Link, useRoutes } from "react-router-dom";

import { routers } from "../router";

export const App = () => {
  const router = useRoutes(routers);

  return (
    <>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/counter"}>Counter</Link>
      {router}
    </>
  );
};
