import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import { COUNTRIES, DEFAULT_COUNTRY } from '../../utils/countryData';

export default function CountryPhoneInput({
  value = '',
  onChange,
  onCountryChange,
  placeholder = 'Mobile *',
  required = true,
  className = ''
}) {
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        phoneInputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase().trim();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    if (onCountryChange) onCountryChange(country);
    phoneInputRef.current?.focus();
  };

  const handlePhoneChange = (e) => {
    // Keep only numbers and spaces
    const raw = e.target.value.replace(/[^\d\s-]/g, '');
    onChange(raw);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Unified Responsive Input Container (h-10 on mobile, h-11 on desktop) */}
      <div className="flex h-10 sm:h-11 w-full rounded-xl border border-[#DDD6C8] bg-white transition-all focus-within:border-[#A88548] focus-within:ring-1 focus-within:ring-[#A88548]">
        
        {/* Country Code Trigger Selector */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex h-full items-center gap-1.5 px-2.5 sm:px-3 bg-[#FAF9F6] hover:bg-[#F2EFE9] border-r border-[#DDD6C8] rounded-l-xl text-slate-800 text-xs sm:text-sm select-none shrink-0 transition-colors cursor-pointer group focus:outline-none"
          title={`Selected: ${selectedCountry.name} (${selectedCountry.dialCode})`}
        >
          <span className="text-sm sm:text-base leading-none select-none">{selectedCountry.flag}</span>
          <span className="font-mono font-medium text-slate-800 text-xs sm:text-sm">{selectedCountry.dialCode}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#A88548] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#A88548]' : ''
            }`}
          />
        </button>

        {/* Mobile Number Input (16px on mobile to avoid iOS Safari auto-zoom) */}
        <input
          ref={phoneInputRef}
          type="tel"
          required={required}
          value={value}
          onChange={handlePhoneChange}
          placeholder={selectedCountry.placeholder || placeholder}
          className="w-full h-full px-3 sm:px-3.5 text-base md:text-sm bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none font-mono tracking-tight"
        />
      </div>

      {/* Modern Searchable Country Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-1.5 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] bg-white border border-[#DDD6C8] rounded-2xl shadow-[0_16px_40px_rgba(15,17,23,0.18)] z-50 overflow-hidden animate-fadeIn"
          role="listbox"
        >
          {/* Search Header */}
          <div className="p-2 sm:p-2.5 bg-[#FAF9F6] border-b border-[#E8E2D5]">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code (+971, UAE)..."
                className="w-full pl-8 pr-7 py-1.5 text-base md:text-xs bg-white border border-[#DDD6C8] rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#A88548] focus:ring-1 focus:ring-[#A88548]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Country List */}
          <div className="max-h-56 overflow-y-auto divide-y divide-slate-100/60 overscroll-contain py-1">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching country found
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#A88548]/10 text-[#A88548] font-semibold'
                        : 'text-slate-700 hover:bg-[#FAF9F6] hover:text-slate-900'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span className="text-base select-none shrink-0">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-mono text-xs text-slate-500 font-normal">
                        {c.dialCode}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#A88548] shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
