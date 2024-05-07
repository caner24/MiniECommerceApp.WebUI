import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import FormInput from "../FormInput/FormInput";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function Example({ state }) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  async function ResetPassword(values) {
    await axios
      .post(
        "https://miniecommerceapi.caprover.caneraycelep.social/api/identity/forgotPassword",
        {
          email: values.email,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          state(false);
        }
      })
      .catch((err) => console.log(err));
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçersiz e-mail adresi")
      .required("Zorunlu alan"),
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Şifre Sifirlama
                      </Dialog.Title>
                      <div className="mt-2 relative w-96">
                        <Formik
                          initialValues={{ email: "" }}
                          validationSchema={validationSchema}
                          onSubmit={async (values) => {
                            await ResetPassword(values);
                          }}
                        >
                          {({ handleSubmit, handleChange, values, errors }) => (
                            <form onSubmit={handleSubmit}>
                              <FormInput
                                setVariable={values.password}
                                nameInput={"email"}
                                onChange={handleChange}
                                typeInput={"email"}
                                labelText={"Email Adress"}
                              ></FormInput>
                              {errors.email && (
                                <p className="text-red-600">{errors.email}</p>
                              )}

                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="submit"
                                  className=" inline-flex  w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                >
                                  Gönder
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => {
                                    setOpen(false);
                                    state(false);
                                  }}
                                  ref={cancelButtonRef}
                                >
                                  Kapat
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
