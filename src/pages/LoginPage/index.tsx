import ContentLayOut from "../../layouts/ContentLayOut";
import Logo from "../../assets/logo.png";

export default function LoginPage() {
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
                  <form method="post">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
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
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="social-auth-links text-center mt-5">
                    <a href="#" className="btn btn-block btn-primary">
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
