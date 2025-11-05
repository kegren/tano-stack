import type { ErrorRouteComponent } from "@tanstack/react-router";

export const DefaultCatchBoundary: ErrorRouteComponent = ({ error }) => (
  <div className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 font-bold text-2xl text-gray-900">
        Something went wrong!
      </h1>
      <p className="mb-4 text-gray-600">
        {error instanceof Error
          ? error.message
          : "An unexpected error occurred"}
      </p>
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        onClick={() => window.location.reload()}
        type="button"
      >
        Reload Page
      </button>
    </div>
  </div>
);
