import React, { useEffect, useCallback, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/1714053167474.json";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [comments, setComment] = useState("");
  const dispatch = useDispatch();
  const reviews = { href: "#", average: 4, totalCount: 117 };
  const user = useSelector((x) => x.user);
  const bearer = useSelector((x) => x.bearer);

  const leaveComment = async (e) => {
    e.preventDefault();
    const options = {
      headers: {
        Authorization: `Bearer ${bearer.bearer}`,
      },
    };
    await axios
      .post(
        "https://miniecommerceapi.caprover.caneraycelep.social/api/comments/addCommentToProduct",
        {
          userId: user.userEmail,
          productId: productId,
          commentText: comments,
        },
        options
      )
      .then((response) => {
        if (response.data.isCommentConfirmed === true) {
          console.log("Yorum başarıyla eklendi");
        } else {
          alert("Yorumda bir argo bulnmaktadir !.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToBasket = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (user != null) {
      const options = {
        userId: user.userEmail,
        prodId: productId,
        amount: 1,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${bearer.bearer}`,
        },
      };

      await axios
        .post(
          "https://miniecommerceapi.caprover.caneraycelep.social/api/basket/addProductToBasket",
          options,
          config
        )
        .catch((err) => console.log(err));
    } else {
      const userBasket =
        localStorage.getItem("basket") != null
          ? JSON.parse(localStorage.getItem("basket"))
          : { products: [] };
      userBasket.products.push({
        productName: productDetail.productName,
        id: productDetail.id,
        productPrice: productDetail.productPrice,
        productPhotos: productDetail.productPhotos,
      });
      localStorage.setItem("basket", JSON.stringify(userBasket));
      dispatch({
        type: "SET_BASKET",
        payload: { basket: userBasket },
      });
    }
    setLoading(false);
  };

  const fetchData = useCallback(async () => {
    await axios
      .get(
        `https://miniecommerceapi.caprover.caneraycelep.social/api/product/getProductById/${productId}`
      )
      .then((response) => {
        setProductDetail(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return loading === true ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie animationData={loadingAnimation} />
    </div>
  ) : (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productDetail.productName}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={`https://miniecommerceapi.caprover.caneraycelep.social/${productDetail.productPhotos?.[0]?.photosUrl}`}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={`https://miniecommerceapi.caprover.caneraycelep.social/${productDetail.productPhotos?.[1]?.photosUrl}`}
                alt={product.images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={`https://miniecommerceapi.caprover.caneraycelep.social/${productDetail.productPhotos?.[2]?.photosUrl}`}
                alt={product.images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={`https://miniecommerceapi.caprover.caneraycelep.social/${productDetail.productPhotos?.[3]?.photosUrl}`}
              alt={product.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {productDetail.productName}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${productDetail.productPrice}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {
                    productDetail.comments.filter(
                      (x) => x.isValidComment === true
                    ).length
                  }{" "}
                  reviews
                </a>
              </div>
            </div>

            <form className="mt-10" onSubmit={addToBasket}>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Comments</h2>
            </div>
            <div class="bg-gray-100 rounded-lg p-4 mb-4">
              {productDetail.comments
                .filter((comment) => comment.isValidComment === true)
                .map((x) => {
                  return (
                    <>
                      <div class="flex items-start">
                        <div class="ml-3">
                          <p class="text-sm font-medium text-gray-900">
                            {x.userId}
                          </p>

                          <p class="text-sm text-gray-500">April 27, 2024</p>
                        </div>
                      </div>
                      <div class="mt-2">
                        <p class="text-sm text-gray-800">{x.commentText}</p>
                      </div>
                    </>
                  );
                })}
            </div>
            {user && user.userEmail !== null && (
              <form className="flex justify-evenly" onSubmit={leaveComment}>
                <input
                  onChange={(e) => setComment(e.target.value)}
                  className=" w-96 text-sm font-medium text-gray-900"
                  type="text"
                  placeholder="Bir yorum birak"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white text-base font-medium ms-5 p-2 w-96"
                >
                  Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
