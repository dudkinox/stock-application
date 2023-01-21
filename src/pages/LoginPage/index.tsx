import ContentLayOut from "../../layouts/ContentLayOut";
import Logo from "../../assets/logo.png";
import AccountServices from "../../services/AccountService";
import { useState } from "react";
import { AlertError, AlertSuccess } from "../../common/ToastrCommon";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    AccountServices.getLogin({ username: username, password: password })
      .then((res) => {
        if (res.data.code === "000") {
          AlertSuccess(res.data.message);
          sessionStorage.setItem("account", username);
          window.location.href = "/";
        } else {
          AlertError(res.data.message);
        }
      })
      .catch((err) => {
        AlertError(err);
      });
  };

  return (
    <ContentLayOut
      title={"Login Page"}
      topic={"เข้าสู่ระบบ"}
      page={
        <>
          <div className="row my-3">
            <div className="col-3"></div>
            <div className="col-6">
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
                    <a
                      href="#"
                      onClick={login}
                      className="btn btn-block btn-primary"
                    >
                      เข้าสู่ระบบ
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </>
      }
    />
  );
}
