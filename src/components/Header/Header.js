import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "./Header.css";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { id: 1, name: "Anasayfa", href: "/" },
  { id: 2, name: "Ürünler", href: "/product" },
  { id: 3, name: "Hakkimizda", href: "/info" },
];

export default function Header() {
  const user = useSelector((x) => x.user);
  const bearer = useSelector((x) => x.bearer);

  const dispatch = useDispatch();
  const [userDet, setUserDet] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [basket, setBasket] = useState([{}]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logOut = (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_USER", payload: { user: null } });
    dispatch({ type: "SET_BEARER", payload: { bearer: null } });
    dispatch({ type: "SET_BASKET", payload: { basket: null } });
    localStorage.removeItem("bearer");
    localStorage.removeItem("userDetails");
    setLoggedIn(false);
  };

  const getUserBasket = useCallback(async () => {
    if (user && user.userEmail) {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${bearer.bearer}`,
          },
        };
        const response = await axios.get(
          `https://miniecommerceapi.caprover.caneraycelep.social/api/basket/getUserBasket/${user.userEmail}`,
          options
        );
        dispatch({
          type: "SET_BASKET",
          payload: { basket: response.data },
        });
      } catch (error) {
        console.error("Error fetching user basket:", error);
      }
    }
  }, [user, bearer]);

  useEffect(() => {
    if (user === null) setLoggedIn(false);
    else {
      setLoggedIn(true);
      setUserDet(user);
      getUserBasket();
    }
  }, [basket, user, getUserBasket]);

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="https://github.com/caner24">
              <span className="sr-only">Your Company</span>
              <img
                className="h-12 w-auto"
                src={require("../../assets/1711287093330.jpg")}
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.id} to={item.href}>
                {item.name}{" "}
              </Link>
            ))}
            <div class="flex items-center flex-end">
              <div class="mr-4">
                <Link to="/cart" class="text-gray-600">
                  Cart:
                </Link>
                <span class="text-blue-500 font-semibold">
                  {basket !== undefined ? basket.length : 0}
                </span>
              </div>
            </div>
          </div>

          {loggedIn === false ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link to="/login">Log in </Link>
            </div>
          ) : (
            <Menu as="div" className="hidden lg:flex lg:flex-1 lg:justify-end">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {userDet.userName}
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <form onSubmit={logOut}>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="https://github.com/caner24">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-12 w-auto"
                  src={require("../../assets/1711287093330.jpg")}
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Link to="/login">Log in </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
