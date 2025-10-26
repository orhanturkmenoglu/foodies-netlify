import React, { useContext, useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

export const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSignInLoading(true);

    try {
      const response = await login(data);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await loadCartData(response.data.token);
        navigate("/");
      } else {
        toast.error("Unable to login. Please try again");
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error("Unable to login. Please try again");
    } finally {
      setIsSignInLoading(false);
    }
  };

  const onResetHandler = () => {
    setIsResetLoading(true);
    setTimeout(() => {
      setData({ email: "", password: "" });
      setIsResetLoading(false);
      toast.info("Form has been reset.");
    }, 300); // Küçük gecikme, spinner görünmesi için
  };

  return (
    <div className="login-container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>
              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className={`btn btn-outline-primary btn-login text-uppercase fw-bold d-flex justify-content-center align-items-center ${
                      isSignInLoading ? "opacity-50" : ""
                    }`}
                    disabled={isSignInLoading}
                  >
                    {isSignInLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>

                <div className="d-grid mt-2">
                  <button
                    type="button"
                    className={`btn btn-outline-danger btn-login text-uppercase fw-bold d-flex justify-content-center align-items-center ${
                      isResetLoading ? "opacity-50" : ""
                    }`}
                    onClick={onResetHandler}
                    disabled={isResetLoading}
                  >
                    {isResetLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Resetting...
                      </>
                    ) : (
                      "Reset"
                    )}
                  </button>
                </div>

                <div className="mt-4 text-center">
                  Don't have an account? <Link to={"/register"}>Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
