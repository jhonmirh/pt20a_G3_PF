
import Login from "@/components/Login/Login";
import { ILogin } from "@/interfaces/LoginRegister";
import React from "react";

const login = (dataUser?: ILogin) => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default login;
