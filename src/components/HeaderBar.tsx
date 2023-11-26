export default function HeaderBar() {
  return (
    <header className="flex flex-col sm:flex-row mx-[15%] justify-between">
      <h2 className="text-primary-800 hover:text-primary-950 hover:underline text-3xl text-center font-heading">
        <a href="/">FLYBY events</a>
      </h2>
    </header>
  );
}
