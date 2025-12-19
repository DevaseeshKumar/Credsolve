export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
            About CRED Split
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A simple and transparent way to manage shared expenses, avoid confusion,
            and maintain trust among friends, teams, and groups.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">
              Why CRED Split?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Managing shared expenses manually often leads to confusion and missed
              payments. CRED Split eliminates guesswork by keeping every transaction
              clear and traceable.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">
              What You Can Do
            </h3>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Create groups and add members</li>
              <li>Add and split expenses fairly</li>
              <li>Track who owes whom</li>
              <li>Settle balances instantly</li>
              <li>View full settlement history</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">
              Built With Trust
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every action is recorded and visible, ensuring transparency.
              No hidden calculations, no confusion — just a clear financial overview
              for everyone involved.
            </p>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Start managing expenses the smart way
          </h2>

          <div className="flex justify-center gap-6">
            <a
              href="/register"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600
                         text-white font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </a>

           
          </div>
        </div>

      </div>
    </div>
  );
}
