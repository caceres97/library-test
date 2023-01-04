import React, { useState, useEffect } from "react";

const UserContext = React.createContext({} as any);

export const UserProvider = (props: any) => {
  const [userContext, setUser] = useState<Object>({}) as any;

  useEffect(() => {
    const getUser = () => {
      let stor = localStorage.getItem("user");
      if (!stor) {
        return;
      }
      let user = JSON.parse(stor || "{}");
      setUser(user);
    };

    getUser();
    // eslint-disable-next-line
  }, []);

  const changeUser = (items: any) => {
    localStorage.setItem("user", JSON.stringify(items));
    setUser(items);
  };

  const value = {
    userContext,
    changeUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro del proveedor UserContext");
  }
  return context;
}
