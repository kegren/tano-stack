import { Link, type NotFoundRouteComponent } from "@tanstack/react-router";

export const DefaultNotFound: NotFoundRouteComponent = () => (
  <div className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
      <h1 className="mb-4 font-bold text-4xl text-gray-900">404</h1>
      <p className="mb-6 text-gray-600">Page not found</p>
      <Link
        className="inline-block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        to="/"
      >
        Go Home
      </Link>
    </div>
  </div>
);
