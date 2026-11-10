import React from 'react';
import PostRequirementIcon from './PostRequirementIcon';

export default function FloatingRequirementTab({ onClick }) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block animate-tab-slide-in">
      <button
        onClick={onClick}
        className="group flex items-center gap-2 py-3 px-3.5 bg-white hover:bg-[#FAF9F6] text-[#1E232F] border-l-2 border-t border-b border-[#A88548] rounded-l-2xl shadow-[0_8px_25px_rgba(20,25,35,0.12)] hover:shadow-[0_12px_35px_rgba(168,133,72,0.25)] hover:-translate-x-1.5 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
        title="Post your property requirement (BHK, Budget, Location)"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="flex items-center gap-2 rotate-180">
          <PostRequirementIcon className="w-4 h-4 text-[#A88548] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" color="#A88548" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E232F] group-hover:text-[#A88548] transition-colors duration-200">
            Post Requirement
          </span>
        </span>
      </button>
    </div>
  );
}
