import { Outlet } from "react-router-dom";
import React from "react";
import MainHeader from "../components/MainHeader";

export default function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
