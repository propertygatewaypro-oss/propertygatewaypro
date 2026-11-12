import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  UploadCloud, 
  X, 
  AlertCircle, 
  Loader2, 
  Building2 
} from 'lucide-react';
import { 
  fetchAdminProperties, 
  saveProperty, 
  compressAndUploadImage 
} from '../services/adminService';
import { 
  CHENNAI_LOCATIONS, 
  PROPERTY_TYPES, 
  POSSESSION_STATUSES, 
  FACING_OPTIONS, 
  AMENITIES_CATALOG, 
  formatIndianCurrency 
} from '../utils/constants';

const INITIAL_FORM = {
  title: '',
  slug: '',
  tagline: '',
  location: CHENNAI_LOCATIONS[0],
  type: PROPERTY_TYPES[0],
  price: 10000000,
  priceDisplay: '₹1.00 Cr',
  bhk: '3 BHK',
  builtUpArea: 1500,
  carpetArea: 1200,
  possessionStatus: 'Ready to Move',
  furnishing: 'Semi-Furnished',
  facing: 'East',
  floor: '5th of 12 Floors',
  reraId: '',
  featured: false,
  active: true,
  overview: '',
  amenities: ['24/7 Security', 'Power Backup', 'Covered Car Parking'],
  images: []
};

export default function AddEditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [pageLoading, setPageLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddImageUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, trimmed]
    }));
    setImageUrlInput('');
  };

  // Load existing property data if in edit mode
  useEffect(() => {
    async function loadTargetProperty() {
      if (!id) return;
      try {
        setPageLoading(true);
        const allProps = await fetchAdminProperties();
        const found = allProps.find(p => p.id === id || p.slug === id);
        if (found) {
          setFormData({
            ...INITIAL_FORM,
            ...found,
            active: found.active !== false && found.isActive !== false,
            priceDisplay: found.priceDisplay || formatIndianCurrency(found.price || 10000000)
          });
        } else {
          setErrorMessage('Property listing not found.');
        }
      } catch (err) {
        console.error('Failed to load property:', err);
        setErrorMessage('Could not load property details: ' + err.message);
      } finally {
        setPageLoading(false);
      }
    }
    loadTargetProperty();
  }, [id]);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || !isEditing ? autoSlug : prev.slug
    }));
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setFormData(prev => ({
      ...prev,
      price: val,
      priceDisplay: (!prev.priceDisplay || prev.priceDisplay === formatIndianCurrency(prev.price))
        ? formatIndianCurrency(val)
        : prev.priceDisplay
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists 
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImageUploading(true);
    setErrorMessage('');
    try {
      const uploadPromises = files.map(file => compressAndUploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to compress and upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.title.trim()) {
      setErrorMessage('Property title is required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.images.length === 0) {
      setErrorMessage('Please upload or attach at least 1 image.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSubmitting(true);
      await saveProperty({
        ...formData,
        id: isEditing ? id : undefined,
        priceDisplay: formData.priceDisplay?.trim() || formatIndianCurrency(formData.price)
      });
      navigate('/properties');
    } catch (err) {
      console.error('Save property failed:', err);
      setErrorMessage('Failed to save property: ' + err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#A88548] animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* 1. Sticky / Top Action Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-16 md:top-4 z-20">
        <div className="flex items-center gap-3">
          <Link
            to="/properties"
            className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Back to Properties"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 bg-[#A88548]/10 rounded text-[#A88548]">
                <Building2 className="w-4 h-4" />
              </span>
              <h1 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                {isEditing ? `Edit: ${formData.title || 'Property Listing'}` : 'Add New Property Listing'}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing ? 'Update specifications and real-time website status' : 'Enter project specs, upload WebP compressed imagery, and publish'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Link
            to="/properties"
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || imageUploading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gold-metallic text-white shadow-sm transition-all disabled:opacity-50 active:scale-95"
          >
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isEditing ? 'Save Changes' : 'Create Listing'}</span>
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Full Page Form Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section 1: Basic Information & Pricing */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A88548]">1. Project Overview & Pricing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sovereign Bay Luxury 4 BHK Villa"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                required
                placeholder="sovereign-bay-villa"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Marketing Tagline / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. Unobstructed Bay of Bengal sea views with private plunge pool and 2-car covered garage."
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Chennai Micro-Market *
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              >
                {CHENNAI_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              >
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Base Price in INR (₹) *
                </label>
              </div>
              <input
                type="number"
                required
                step="50000"
                placeholder="4100000"
                value={formData.price}
                onChange={handlePriceChange}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] font-mono"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Used for price filters & sliders</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Price Display Label *
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priceDisplay: formatIndianCurrency(prev.price) }))}
                  className="text-[10px] font-semibold text-[#A88548] hover:underline"
                  title="Format automatically from Base Price"
                >
                  Auto-sync
                </button>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. ₹41 Lakh - ₹2.20 Cr"
                value={formData.priceDisplay}
                onChange={(e) => setFormData(prev => ({ ...prev, priceDisplay: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] font-semibold text-[#7D5D2A]"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Shown to website visitors</span>
            </div>
          </div>
        </div>

        {/* Section 2: Specifications & Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A88548]">2. Physical Specifications & Sanctions</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                BHK Config
              </label>
              <input
                type="text"
                placeholder="e.g. 3 BHK"
                value={formData.bhk}
                onChange={(e) => setFormData(prev => ({ ...prev, bhk: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Built-Up Area (sq.ft)
              </label>
              <input
                type="number"
                placeholder="1500"
                value={formData.builtUpArea}
                onChange={(e) => setFormData(prev => ({ ...prev, builtUpArea: Number(e.target.value) }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Carpet Area (sq.ft)
              </label>
              <input
                type="number"
                placeholder="1200"
                value={formData.carpetArea}
                onChange={(e) => setFormData(prev => ({ ...prev, carpetArea: Number(e.target.value) }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Possession Status
              </label>
              <select
                value={formData.possessionStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, possessionStatus: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              >
                {POSSESSION_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Facing Orientation
              </label>
              <select
                value={formData.facing}
                onChange={(e) => setFormData(prev => ({ ...prev, facing: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              >
                {FACING_OPTIONS.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Floor Position
              </label>
              <input
                type="text"
                placeholder="e.g. 5th of 14 Floors"
                value={formData.floor}
                onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                TNRERA Sanction Number
              </label>
              <input
                type="text"
                placeholder="e.g. TN/29/Building/0088/2024"
                value={formData.reraId}
                onChange={(e) => setFormData(prev => ({ ...prev, reraId: e.target.value }))}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Detailed Architecture & Builder Overview
            </label>
            <textarea
              rows={4}
              placeholder="Describe architectural highlights, ventilation, Italian marble finishes, builder pedigree, and neighborhood highlights..."
              value={formData.overview}
              onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
              className="w-full text-xs sm:text-sm p-3.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] leading-relaxed"
            />
          </div>
        </div>

        {/* Section 3: Amenities & Features */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A88548]">3. Verified Amenities & Infrastructure</span>
            <span className="text-xs text-slate-500 font-medium">{formData.amenities.length} selected</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {AMENITIES_CATALOG.map((amenity) => {
              const isChecked = formData.amenities.includes(amenity);
              return (
                <label 
                  key={amenity}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all duration-150 ${
                    isChecked 
                      ? 'bg-amber-50/70 border-[#A88548]/50 text-slate-900 font-semibold shadow-2xs' 
                      : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100/80'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="h-4 w-4 rounded border-slate-300 text-[#A88548] focus:ring-[#A88548]"
                  />
                  <span className="truncate">{amenity}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 4: Property Gallery Images */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A88548]">4. Gallery & Media Assets *</span>
              <p className="text-[11px] text-slate-500 mt-0.5">High-res photos auto-compressed into lightweight WebP (&lt; 250 KB)</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">{formData.images.length} photos</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {formData.images.map((imgUrl, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video shadow-xs">
                <img src={imgUrl} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                    Cover
                  </span>
                )}
              </div>
            ))}

            <label className="border-2 border-dashed border-slate-300 hover:border-[#A88548] rounded-xl flex flex-col items-center justify-center cursor-pointer p-4 aspect-video transition-colors bg-slate-50/50 hover:bg-amber-50/20">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={imageUploading}
                className="hidden"
              />
              {imageUploading ? (
                <div className="flex flex-col items-center gap-1">
                  <Loader2 className="w-5 h-5 text-[#A88548] animate-spin" />
                  <span className="text-[10px] text-slate-500">Compressing...</span>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[11px] font-semibold text-slate-600">+ Upload Photos</span>
                </>
              )}
            </label>
          </div>

          {/* Direct Image URL Input (No Cloud Storage billing required) */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Or paste direct Image URL (CDN / Web link)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or any hosted image link"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548]"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs whitespace-nowrap"
              >
                + Add Image URL
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Visibility & Publishing Status */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A88548]">5. Publishing & Website Visibility</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#A88548] focus:ring-[#A88548]"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Publish Listing Live on Website</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  When enabled, prospective clients can browse this property on the website catalog and send inquiries.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#A88548] focus:ring-[#A88548]"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Feature on Home Page Showcase</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Promotes this listing into the top curated luxury cards on the homepage.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/properties"
            className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting || imageUploading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gold-metallic text-white shadow-sm transition-all disabled:opacity-50 active:scale-95"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isEditing ? 'Save Changes' : 'Create Listing'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
