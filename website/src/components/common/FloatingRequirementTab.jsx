import React from 'react';
import PostRequirementIcon from './PostRequirementIcon';

export default function FloatingRequirementTab({ onClick }) {
  return (
    <div className="fixed right-0 top-1/2 z-40 hidden md:block animate-tab-slide-in">
      <button
        onClick={onClick}
        className="group flex items-center gap-2 py-3 px-3.5 bg-[#0F1117] hover:bg-[#1A1E29] text-white border-l-2 border-t border-b border-[#C98A4B] rounded-l-2xl shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(201,138,75,0.4)] hover:-translate-x-1.5 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
        title="Post your property requirement (BHK, Budget, Location)"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="flex items-center gap-2 rotate-180">
          <PostRequirementIcon className="w-4 h-4 text-[#C98A4B] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" color="#C98A4B" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#FAF9F6] group-hover:text-[#C98A4B] transition-colors duration-200">
            Post Requirement
          </span>
        </span>
      </button>
    </div>
  );
}
