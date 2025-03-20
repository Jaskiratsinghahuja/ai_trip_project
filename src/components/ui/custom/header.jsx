function Header() {
  return (
    <div style={{ backgroundColor: "#e0f7fa" , width:"100vw" }}
    >
    <div className="w-full fixed top-0 left-0 bg-gray-100 flex justify-between items-center px-10 py-4 shadow-md h-20 z-50">
      <img src="/vite.svg" alt="Logo" className="w-40 h-auto" /> {/* Increased logo size */}
     
<h2 className="font-bold text-3xl italic text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in border-2 border-black p-2">
  Ahuja Tours And Travels 🚓
</h2>


      <button className="bg-black text-white px-8 py-3 text-lg rounded-md hover:bg-gray-800 transition">
        Sign In
      </button> {/* Increased button size */}
    </div>
    </div>
  );
}

export default Header;

  