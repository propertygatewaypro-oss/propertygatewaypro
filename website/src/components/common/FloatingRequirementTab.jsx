import React from 'react';
import PostRequirementIcon from './PostRequirementIcon';

export default function FloatingRequirementTab({ onClick }) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <button
        onClick={onClick}
        className="group flex items-center gap-2 py-3 px-3.5 bg-[#0F1117] hover:bg-[#1A1E29] text-white border-l-2 border-t border-b border-[#B37D4E] rounded-l-2xl shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_35px_rgba(179,125,78,0.3)] transition-all cursor-pointer focus:outline-none"
        title="Post your property requirement (BHK, Budget, Location)"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="flex items-center gap-2 rotate-180">
          <PostRequirementIcon className="w-4 h-4 text-[#B37D4E] group-hover:scale-110 transition-transform" color="#B37D4E" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#FAF9F6] group-hover:text-[#B37D4E] transition-colors">
            Post Requirement
          </span>
        </span>
      </button>
    </div>
  );
}
