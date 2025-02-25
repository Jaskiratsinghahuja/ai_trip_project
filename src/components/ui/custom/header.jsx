function Header() {
  return (
    <div className="flex flex-1 bg-gray-100 justify-between items-center px-5 py-3">
      <img src="/vite.svg" alt="Logo" className="w-10 h-auto" />
      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition ml-auto">
        Sign In
      </button>
    </div>
  );
}

export default Header;