import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  shortcutEnable:boolean;
  bgColor:string
}
function SearchBar({placeholder, shortcutEnable, bgColor}: SearchBarProps) {
  return (
    <div className="w-full  min-w-[0px] mr-4">
      <div className={`mx-auto flex py-1 items-center rounded-[8px]  border-1 border-gray-600 bg-${bgColor} px-4 transition-all duration-200 focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-500/30`}>
        
        {/* Search Icon */}
        <Search
          size={15}
          className="mr-2 text-gray-300"
        />

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:italic placeholder:text-gray-400"
        />

        {/* Shortcut */}
        {shortcutEnable && (
          <div className="ml-4 flex items-center gap-2 text-gray-400">
            <span className="text-sm">[Option+S]</span>

            {/* Optional logo/icon */}
           
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;