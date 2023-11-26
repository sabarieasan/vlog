import { useState, useEffect, createContext, useContext } from "react";
import { getUserData } from "../utils/firebaseFunctions";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [users, setUsers] = useState([]);

  const [data, setData] = useState({});

  useEffect(() => {
    const usersData = async () => {
      const data = await getUserData();
      setUsers(data);
    };

    usersData();
  }, []);

  const userProfile = () => {
    const filterUser =
      users.length && users.find((user) => user.id === loginUser);

    setData(filterUser);
  };

  return (
    <BlogContext.Provider
      value={{
        isLogin,
        setIsLogin,
        loginUser,
        setLoginUser,
        userProfile,
        data,
        setData,
        users,
        setUsers,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  return useContext(BlogContext);
};
