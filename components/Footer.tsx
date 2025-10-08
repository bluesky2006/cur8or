"use client";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} <span className="text-yellow-600">Simon Busby</span>. All
          rights reserved.
        </p>

        <div className="flex gap-6 mt-4 sm:mt-0">
          <a
            href="https://github.com/bluesky2006"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-600 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:simon.busby@gmail.com"
            className="hover:text-yellow-600 transition-colors"
          >
            Contact
          </a>
          {/* <a href="/about" className="hover:text-yellow-600 transition-colors">
            About
          </a> */}
        </div>
      </div>
    </footer>
  );
}
