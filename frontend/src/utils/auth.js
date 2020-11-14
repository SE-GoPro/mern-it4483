import moment from "moment";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default () => {
  let token = cookies.get("token");
  let user = cookies.get("user");

  const setAuth = ({ token, user } = {}) => {
    const options = {
      path: "/",
      //maxAge: 86400 * 365
      expires: moment().add(1, "years").toDate(),
    };
    cookies.set("token", token, options);
    cookies.set("user", user, options);
  };
  const logout = () => {
    cookies.remove("token", {
      path: "/",
    });
    cookies.remove("user", {
      path: "/",
    });
  };
  return {
    token,
    user,
    setAuth,
    logout,
  };
};
