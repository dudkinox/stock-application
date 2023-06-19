import ContentLayOut from "../../layouts/ContentLayOut";
import Logo from "../../assets/logo.png";
import AccountServices from "../../services/AccountService";
import { useContext, useState } from "react";
import { AlertError, AlertSuccess } from "../../common/ToastrCommon";
import { AppContext } from "../../contexts";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(AppContext);

  const login = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    AccountServices.getLogin({ username: username, password: password })
      .then((res) => {
        if (res.data.code === "000") {
          AlertSuccess(res.data.message);
          sessionStorage.setItem("account", username);

          AccountServices.getFindUser(username).then((res) => {
            sessionStorage.setItem("major", res.data.MAJOR);
            setTimeout(() => {
              window.location.href =
                res.data.MAJOR === "admin" ? "/" : "/stock";
            }, 100);
          });
          setIsLoading(false);
        } else {
          AlertError(res.data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        AlertError(err);
        setIsLoading(false);
      });
  };

  return (
    <ContentLayOut
      title={"Login Page"}
      topic={"เข้าสู่ระบบ"}
      page={
        <>
          <div className="row my-3">
            <div className="col-xl-3 col-sm-1"></div>
            <div className="col-xl-6 col-sm-10">
              <div className="card card-outline card-primary">
                <div className="card-header text-center">
                  <a href="#login">
                    <img
                      src={Logo}
                      alt="#banner"
                      className="img-fluid"
                      style={{ width: "200px" }}
                    />
                  </a>
                </div>
                <div className="card-body">
                  <form onSubmit={login}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-address-book" />
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock" />
                        </div>
                      </div>
                    </div>
                    <div className="social-auth-links text-center mt-5">
                      <button
                        className="btn btn-block btn-primary"
                        type="submit"
                      >
                        เข้าสู่ระบบ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-1"></div>
          </div>
        </>
      }
    />
  );
}
