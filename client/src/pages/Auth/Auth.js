import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { UserContext } from "../../contexts/UserContext";
import userServiceFactory from "../../services/users";

const User = () => {
  const { user, setUser } = useContext(UserContext);
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();

  const { login, register, edit, getSingle } = userServiceFactory(user);

  const onSubmitLogin = async data => {
    try {
      const userData = await login(data);
      setUser(userData);
      navigate("/catalog");
    } catch (error) {
      setFetchError(true);
    }
  };

  const onSubmitRegister = async data => {
    try {
      await register(data);
      navigate("/user/login");
    } catch (error) {
      setFetchError(true);
    }
  };

  const onSubmitEdit = async data => {
    try {
      const userData = await edit(data);
      setUser(userData);
      navigate("/catalog");
    } catch (error) {
      setFetchError(true);
    }
  };

  const context = {
    fetchError,
    onSubmitEdit,
    onSubmitLogin,
    onSubmitRegister,
    getSingle,
  };

  return (
    <Layout>
      <PageContainer styles={{ flexDirection: "column", gap: "20px" }}>
        <Outlet context={context} />
      </PageContainer>
    </Layout>
  );
};

export default User;
