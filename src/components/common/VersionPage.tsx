const VersionPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 mb-6">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Available in v2
        </div>

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <svg
            className="h-10 w-10 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Available in Version 2
        </h1>

        {/* Description */}
        <p className="mt-4 text-base leading-7 text-gray-500">
          This feature isn't available in the current version yet.
          <br />
          Upgrade to <span className="font-semibold text-gray-700">v2</span>{" "}
          to unlock it.
        </p>

        {/* Version Cards */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-left shadow-sm">
            <p className="text-xs text-gray-400">Current</p>
            <p className="mt-1 font-semibold text-gray-700">v1</p>
          </div>

          <div className="text-gray-300">→</div>

          <div className="rounded-lg border border-gray-900 bg-gray-900 px-5 py-3 text-left shadow-sm">
            <p className="text-xs text-gray-400">Available</p>
            <p className="mt-1 font-semibold text-white">v2</p>
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          className="mt-8 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
        >
          Upgrade to v2
        </button>

      </div>
    </div>
  );
};

export default VersionPage;