import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginContent, setLoginContent] = useState("");
  const dispatch = useDispatch();

  async function LoginUser(e) {
    e.preventDefault();
    await axios
      .post(
        "https://miniecommerceapi.caprover.caneraycelep.social/api/identity/login?useCookies=false&useSessionCookies=false",
        {
          email: userEmail,
          password: userPassword,
        }
      )
      .then(async (response) => {
        var bearer = { bearer: response.data.accessToken };
        var refreshToken = { refreshToken: response.data.refreshToken };

        dispatch({ type: "SET_BEARER", payload: { bearer } });
        dispatch({ type: "SET_REFRESH", payload: { refreshToken } });
        const options = {
          headers: {
            Authorization: `Bearer ${bearer.bearer}`,
          },
        };
        await axios
          .get(
            "https://miniecommerceapi.caprover.caneraycelep.social/api/identity/manage/info",
            options
          )
          .then((response) => {
            var responseUser = response.data.email;
            responseUser = responseUser.substring(0, responseUser.indexOf("@"));
            var user = {
              userName: responseUser,
              userEmail: response.data.email,
            };
            dispatch({ type: "LOGIN_USER", payload: { user } });
            localStorage.setItem("userDetails", JSON.stringify(user));
            localStorage.setItem("bearer", JSON.stringify(bearer));
            localStorage.setItem("refresh", JSON.stringify(refreshToken));
          });

        navigate("../", { replace: true });
      })
      .catch((error) => {
        setLoginContent("Şifreniz veya kullanıcı adınız hatalı !.");
        console.log(error);
      });
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <image
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Hesabınıza Giriş Yapın
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={LoginUser}>
          {loginContent !== "" && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-4">
              {loginContent}
            </div>
          )}
          <FormInput
            setVariable={setUserEmail}
            nameInput={"email"}
            typeInput={"email"}
            labelText={"Email Adress"}
          ></FormInput>

          <FormInput
            setVariable={setUserPassword}
            nameInput={"password"}
            typeInput={"password"}
            labelText={"Password"}
          ></FormInput>

          <div className="text-sm text-right">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Şifremi Unuttum?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Üyeliğim yok?
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Üye Ol
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
