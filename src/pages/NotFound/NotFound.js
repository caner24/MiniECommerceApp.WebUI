import { Link } from "react-router-dom";
import "./NotFound.css";
export default function NotFound() {
  return (
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 backgroundImg">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        You look lonely ı can fix that
        </h1>
        <p class="mt-6 text-base leading-7 text-white-600">
          Not found 
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={"/"}
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Fix it
          </Link>
        </div>
      </div>
    </main>
  );
}
