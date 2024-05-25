import axios from "axios";
import { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const location = useLocation();
  const [password, setPassword] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('Token');
  const email = queryParams.get('email');

  const resetPassword = (e) => {
    e.preventDefault();

    const options = {
      email: email,
      resetCode: token,
      newPassword: password,
    };
    axios
      .post(
        "https://miniecommerceapi.caprover.caneraycelep.social/api/identity/resetPassword",
        options
      )
      .then((response) => {
        if (response.success) {
          alert("Şifreniz başarıyla sıfırlandı.");
        } else {
          alert("Şifre sıfırlanırken bir hata oluştu.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Şifrenizi Sıfırlayın
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={resetPassword} method="post">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Şifre
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sıfırla
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
