export default function LogoHeader({ visible }: { visible: boolean }) {
  return (
    <header
      className={`
        text-center text-8xl font-bold text-yellow-500
        transition-opacity duration-800 ease-in-out
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      <p>cur8or</p>
    </header>
  );
}
