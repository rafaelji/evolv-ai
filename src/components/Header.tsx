const Header = () => {
  return (
    <header className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <div className="text-2xl font-semibold text-gray-800">Evolv AI</div>
      <div className="text-sm text-gray-600">
        Last updated:{" "}
        <span className="font-medium text-blue-500">Just now</span>
      </div>
    </header>
  );
};

export default Header;
