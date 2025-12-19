export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">

        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
          Expense Sharing Made Simple
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed">
          Track shared expenses, split bills fairly, and settle dues effortlessly
          with a clean and intuitive experience.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <a
            href="/register"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-full border border-indigo-600
                       text-indigo-600 font-semibold hover:bg-indigo-50 transition-all"
          >
            Login
          </a>
        </div>

      </div>
    </div>
  );
}
