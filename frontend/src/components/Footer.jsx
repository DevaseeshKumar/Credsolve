export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4">
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Credsolve
      </div>
    </footer>
  );
}
