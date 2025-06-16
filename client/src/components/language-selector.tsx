"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

export default function Language() {
     const [language, setLanguage] = useState("FRA");
      const [open, setOpen] = useState(false);
    
      const languages = [
        { label: "FRA", value: "fr" },
        { label: "ENG", value: "en" },
      ];
    
  return (
   <> {/* Language switcher */}
   <div className="relative  ">
     <button
       onClick={() => setOpen(!open)}
       className="flex items-center gap-2 border border-[#ADAEAF] px-3 py-2 rounded-md text-sm bg-white/40  relative h-[48px] flex items-center justify-center w-[125px] border-2 cursor-pointer"
     >
       <Globe size={16} className="text-[#4C4D4D]" />
       <span className="text-gray-700">{language}</span>
       <svg
         className={`w-3 h-3 text-[#4C4D4D] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
       >
         <path
           d="M19 9l-7 7-7-7"
           strokeWidth={2}
           strokeLinecap="round"
           strokeLinejoin="round"
         />
       </svg>
     </button>

     {open && (
       <ul className="absolute top-full mt-2 right-0 bg-white border rounded-lg shadow-md text-sm w-28 z-50 ">
         {languages.map((lang) => (
           <li
             key={lang.value}
             onClick={() => {
               setLanguage(lang.label);
               setOpen(false);
             }}
             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
           >
             {lang.label}
           </li>
         ))}
       </ul>
     )}
   </div></>
  );
}
