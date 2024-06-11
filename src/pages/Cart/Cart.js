import { Fragment, useCallback, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Example() {
  const basket = useSelector((x) => x.basket);
  const user = useSelector((x) => x.user);
  const bearer = useSelector((x) => x.bearer);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [subtotal, setSubTotal] = useState(0);

  const stripeCheckout = async () => {
    const productPriceAndAmount = {};
    basket.products.forEach((product) => {
      productPriceAndAmount[product.stripeProductId] = product.amount;
    });
    if (bearer !== null) {
      const options = {
        headers: {
          Authorization: `Bearer ${bearer.bearer}`,
        },
      };
      await axios
        .post(
          "https://miniecommerceapi.caprover.caneraycelep.social/api/stripe/create-checkout-session",
          productPriceAndAmount,
          options
        )
        .then(async (response) => {
          if (response.status === 200) {
            window.location.replace(response.headers.get("location"));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .post(
          "https://miniecommerceapi.caprover.caneraycelep.social/api/stripe/create-checkout-session",
          productPriceAndAmount
        )
        .then(async (response) => {
          if (response.status === 200) {
            localStorage.removeItem("basket");
            dispatch({
              type: "SET_BASKET",
              payload: { basket: null },
            });
            window.location.replace(response.headers.get("location"));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removeItemFromCart = async (id) => {
    if (user != null) {
      const options = {
        userId: user.userEmail,
        prodId: [id],
      };
      const config = {
        headers: {
          Authorization: `Bearer ${bearer.bearer}`,
        },
      };
      await axios.post(
        "https://miniecommerceapi.caprover.caneraycelep.social/api/basket/updateUserBasket",
        options,
        config
      );
    } else {
      const newBasket = basket.products.filter((x) => x.id !== id);
      localStorage.setItem("basket", JSON.stringify({ products: newBasket }));
      dispatch({
        type: "SET_BASKET",
        payload: { basket: { products: newBasket } },
      });
    }
  };

  useEffect(() => {
    if (basket) {
      let total = 0;
      basket.products.forEach((item) => {
        total += item.productPrice * item.amount;
      });
      setSubTotal(total);
    }
  }, [basket]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className=" fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {basket?.products.map((prod) => (
                              <li key={prod.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`https://miniecommerceapi.caprover.caneraycelep.social/${prod.productPhotos?.[0]?.photosUrl}`}
                                    alt={prod.productPhotos?.[0]?.photosUrl}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link to={`/productDetail/${prod.id}`}>
                                          {prod.productName}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        {prod.productPrice}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {prod.productName}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {prod.amount}
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={() => {
                                          removeItemFromCart(prod.id);
                                        }}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        {basket?.products.length !== 0 && (
                          <button
                            disabled={
                              basket?.products.length === 0 ? true : false
                            }
                            onClick={stripeCheckout}
                            className="w-96 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </button>
                        )}
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
