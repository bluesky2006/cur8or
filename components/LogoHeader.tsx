export default function LogoHeader({ big }: { big: boolean }) {
  return (
    <div
      className={`
        font-bold text-yellow-500 transition-all duration-700 ease-in-out
        ${big ? "text-8xl text-center mb-10" : "text-4xl mb-0"}
      `}
    >
      <p>cur8or</p>
    </div>
  );
}
