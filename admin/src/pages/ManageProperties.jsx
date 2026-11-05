import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  UploadCloud, 
  X, 
  Check, 
  AlertCircle,
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { 
  fetchAdminProperties, 
  saveProperty, 
  deleteProperty, 
  togglePropertyStatus,
  compressAndUploadImage 
} from '../services/adminService';
import { 
  CHENNAI_LOCATIONS, 
  PROPERTY_TYPES, 
  POSSESSION_STATUSES, 
  FURNISHING_OPTIONS, 
  FACING_OPTIONS, 
  AMENITIES_CATALOG, 
  formatIndianCurrency,
  BRAND 
} from '../utils/constants';

export default function ManageProperties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [modalError, setModalError] = useState('');

  // Form State
  const initialForm = {
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

  const [formData, setFormData] = useState(initialForm);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const list = await fetchAdminProperties();
      setProperties(list);
    } catch (err) {
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  // Check if URL has ?new=1
  useEffect(() => {
    if (searchParams.get('new') === '1') {
      openCreateModal();
      searchParams.delete('new');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const openCreateModal = () => {
    setEditingProperty(null);
    setFormData(initialForm);
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (prop) => {
    setEditingProperty(prop);
    setFormData({
      ...initialForm,
      ...prop,
      priceDisplay: formatIndianCurrency(prop.price)
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

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
      slug: prev.slug === '' || !editingProperty ? autoSlug : prev.slug
    }));
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setFormData(prev => ({
      ...prev,
      price: val,
      priceDisplay: formatIndianCurrency(val)
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
    try {
      const uploadPromises = files.map(file => compressAndUploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (err) {
      console.error(err);
      setModalError('Failed to compress and upload image. Please try again.');
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
    setModalError('');

    if (!formData.title.trim()) {
      setModalError('Property title is required.');
      return;
    }

    if (formData.images.length === 0) {
      setModalError('Please upload or attach at least 1 image.');
      return;
    }

    setModalLoading(true);
    try {
      await saveProperty({
        ...formData,
        priceDisplay: formatIndianCurrency(formData.price)
      });
      await loadProperties();
      closeModal();
    } catch (err) {
      console.error("Save property failed:", err);
      setModalError('Failed to save property. ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = await togglePropertyStatus(id, currentStatus);
      setProperties(prev => prev.map(p => p.id === id ? { ...p, active: newStatus } : p));
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      try {
        await deleteProperty(id);
        setProperties(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  // Filtered properties
  const filtered = properties.filter(p => {
    const matchesSearch = 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bhk?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Property Catalog Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, edit, and publish verified Chennai residential and commercial properties
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white text-xs font-semibold tracking-wide transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, location (e.g. OMR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 hidden sm:inline">Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600 w-full sm:w-auto"
          >
            <option value="All">All Property Types</option>
            {PROPERTY_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            <span>Loading property catalog...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No properties match your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Location & Type</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">RERA Sanction</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80'}
                          alt={prop.title}
                          className="w-14 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">{prop.title}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{prop.bhk}</span>
                            <span>•</span>
                            <span>{prop.builtUpArea} sq.ft</span>
                            {prop.featured && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold text-[9px] uppercase">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      <div className="font-medium">{prop.location}</div>
                      <div className="text-[11px] text-slate-400">{prop.type}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 font-mono text-sm">
                        {prop.priceDisplay || formatIndianCurrency(prop.price)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {prop.reraId || 'Sanction Pending'}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(prop.id, prop.active !== false)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                          prop.active !== false 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Click to toggle visibility"
                      >
                        {prop.active !== false ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-700" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-500" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`${BRAND.websiteUrl}/property/${prop.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-slate-500 hover:text-brand-emerald-700 hover:bg-slate-100 transition-colors"
                          title="View on Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openEditModal(prop)}
                          className="p-1.5 rounded-md text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prop.id, prop.title)}
                          className="p-1.5 rounded-md text-slate-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-base font-serif font-bold text-slate-900">
                  {editingProperty ? 'Edit Property Details' : 'Add New Property to Catalog'}
                </h2>
                <p className="text-[11px] text-slate-500">
                  Fill in project specifications. Images are auto-compressed to WebP (&lt;250KB).
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
              {modalError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Title & Tagline */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
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
                      className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Marketing Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unobstructed sea views with private plunge pool and 2-car garage."
                    value={formData.tagline}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  />
                </div>
              </div>

              {/* Location, Type, Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Chennai Micro-Market *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  >
                    {CHENNAI_LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  >
                    {PROPERTY_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    step="50000"
                    value={formData.price}
                    onChange={handlePriceChange}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600 font-mono"
                  />
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                    Display: {formData.priceDisplay}
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    BHK Config
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 BHK"
                    value={formData.bhk}
                    onChange={(e) => setFormData(prev => ({ ...prev, bhk: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
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
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Possession Status
                  </label>
                  <select
                    value={formData.possessionStatus}
                    onChange={(e) => setFormData(prev => ({ ...prev, possessionStatus: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  >
                    {POSSESSION_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Facing
                  </label>
                  <select
                    value={formData.facing}
                    onChange={(e) => setFormData(prev => ({ ...prev, facing: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  >
                    {FACING_OPTIONS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RERA and Floor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    TNRERA Sanction Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TN/29/Building/0088/2024"
                    value={formData.reraId}
                    onChange={(e) => setFormData(prev => ({ ...prev, reraId: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  />
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
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Architectural features, ventilation, builder track record..."
                  value={formData.overview}
                  onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
                />
              </div>

              {/* Amenities Multi-Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Project Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AMENITIES_CATALOG.map(amenity => {
                    const isChecked = formData.amenities.includes(amenity);
                    return (
                      <label 
                        key={amenity}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Image Upload with Client Compression */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Property Gallery Images *
                  </label>
                  <span className="text-[11px] text-slate-500">Auto-compressed WebP (&lt; 250 KB)</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-video">
                      <img src={imgUrl} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  <label className={`
                    border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-lg aspect-video flex flex-col items-center justify-center p-3 text-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors
                    ${imageUploading ? 'opacity-50 pointer-events-none' : ''}
                  `}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {imageUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                    ) : (
                      <>
                        <UploadCloud className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-[10px] font-semibold text-slate-600">Upload Photos</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Active & Featured Flags */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-semibold text-slate-700">Publish Listing Live on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-semibold text-slate-700">Feature on Home Page Carousel</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading || imageUploading}
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {modalLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProperty ? 'Save Changes' : 'Create Listing'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
