import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Star, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  MessageSquareQuote, 
  X, 
  UploadCloud, 
  Loader2, 
  AlertCircle,
  Quote,
  Sparkles
} from 'lucide-react';
import { 
  subscribeAdminTestimonials, 
  saveTestimonial, 
  deleteTestimonial, 
  toggleTestimonialStatus,
  compressAndUploadImage 
} from '../services/adminService';

const INITIAL_FORM_STATE = {
  author: '',
  role: '',
  rating: 5,
  highlight: '',
  content: '',
  avatar: '',
  verified: true,
  active: true
};

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // All | Active | Inactive

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete Confirm State
  const [deletingId, setDeletingId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const confirmDeleteTestimonial = async () => {
    if (!itemToDelete) return;
    const targetId = itemToDelete.id || itemToDelete._docId;
    if (!targetId) {
      setDeleteError('Missing feedback ID. Cannot delete.');
      return;
    }

    try {
      setDeletingId(targetId);
      setDeleteError('');
      setTestimonials(prev => prev.filter(t => t.id !== targetId));
      await deleteTestimonial(targetId);
      setItemToDelete(null);
    } catch (err) {
      console.error('Delete failed:', err);
      setTestimonials(prev => prev.some(t => t.id === targetId) ? prev : [...prev, itemToDelete]);
      setDeleteError(err.message || 'Failed to delete review from database.');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeAdminTestimonials((liveData) => {
      setTestimonials(liveData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(INITIAL_FORM_STATE);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      author: item.author || '',
      role: item.role || '',
      rating: item.rating || 5,
      highlight: item.highlight || '',
      content: item.content || (item.beforeHighlight ? `${item.beforeHighlight}${item.highlight || ''}${item.afterHighlight || ''}` : ''),
      avatar: item.avatar || '',
      verified: item.verified !== false,
      active: item.active !== false
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(INITIAL_FORM_STATE);
    setFormError('');
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    try {
      setImageUploading(true);
      setFormError('');
      const compressedUrl = await compressAndUploadImage(file, { type: 'avatar' });
      setFormData(prev => ({ ...prev, avatar: compressedUrl }));
    } catch (err) {
      console.error('Image compression failed:', err);
      setFormError('Could not process avatar image. Please try another file.');
    } finally {
      setImageUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.author.trim()) {
      setFormError('Client name is required.');
      return;
    }
    if (!formData.content.trim()) {
      setFormError('Testimonial / feedback content is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError('');

      const payload = {
        ...(editingItem ? { id: editingItem.id, createdAt: editingItem.createdAt } : {}),
        author: formData.author.trim(),
        role: formData.role.trim(),
        rating: Number(formData.rating) || 5,
        highlight: formData.highlight.trim(),
        content: formData.content.trim(),
        avatar: formData.avatar.trim(),
        verified: Boolean(formData.verified),
        active: Boolean(formData.active)
      };

      await saveTestimonial(payload);
      closeModal();
    } catch (err) {
      console.error('Failed to save testimonial:', err);
      setFormError('Failed to save feedback: ' + (err.message || 'Unknown error'));
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleToggleStatus = async (item) => {
    const currentActive = item.active !== false;
    const newStatus = !currentActive;
    // Instant optimistic UI update
    setTestimonials(prev => prev.map(t => t.id === item.id ? { ...t, active: newStatus } : t));
    try {
      await toggleTestimonialStatus(item.id, currentActive);
    } catch (err) {
      console.error('Status toggle failed:', err);
    }
  };

  const handleDelete = async (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    try {
      setDeletingId(id);
      await deleteTestimonial(id);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Filter Logic
  const filtered = testimonials.filter(t => {
    const matchesSearch = 
      t.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.highlight?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'All' ? true :
      statusFilter === 'Active' ? t.active !== false :
      t.active === false;

    return matchesSearch && matchesStatus;
  });

  const totalCount = testimonials.length;
  const activeCount = testimonials.filter(t => t.active !== false).length;
  const fiveStarCount = testimonials.filter(t => Number(t.rating) === 5).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#A88548]/10 rounded-lg text-[#A88548]">
              <MessageSquareQuote className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Client Feedbacks & Testimonials
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Realtime CRUD sync for verified Chennai homeowner reviews displayed on the website homepage.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gold-metallic text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all duration-200 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Feedback</span>
        </button>
      </div>

      {/* 2. Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Feedbacks</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active on Website</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">5-Star Rated</p>
            <p className="text-2xl font-bold text-[#A88548] mt-1">{fiveStarCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#A88548]/10 flex items-center justify-center text-[#A88548]">
            <Star className="w-5 h-5 fill-[#A88548]" />
          </div>
        </div>
      </div>

      {/* 3. Action / Search / Filter Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, project, or review keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            {['All', 'Active', 'Inactive'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  statusFilter === s 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Feedback Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#A88548] animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Syncing live testimonials from Firebase...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">No client feedbacks found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery 
              ? 'No reviews match your search query. Try clearing the search box.' 
              : 'Add your first verified client testimonial to feature on the website homepage.'}
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gold-metallic text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Feedback
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((item) => {
            const initials = item.initials || (item.author ? item.author.substring(0, 2).toUpperCase() : 'PG');
            const isActive = item.active !== false;

            return (
              <div 
                key={item.id}
                className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md ${
                  isActive ? 'border-slate-200/90' : 'border-slate-200/50 opacity-65 bg-slate-50/50'
                }`}
              >
                {/* Card Top: Badges & Actions */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {/* Stars */}
                    <div className="flex items-center text-[#A88548]">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#A88548]" />
                      ))}
                    </div>
                    {item.verified !== false && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Status Pill */}
                  <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isActive ? 'Published' : 'Hidden'}
                  </span>
                </div>

                {/* Card Body: Quote & Highlight */}
                <div className="p-4 sm:p-5 flex-1">
                  <div className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <Quote className="w-4 h-4 text-[#A88548] mb-1 inline mr-1 opacity-70" />
                    {item.beforeHighlight !== undefined ? (
                      <>
                        {item.beforeHighlight}
                        {item.highlight && (
                          <span className="font-bold text-slate-900 bg-amber-50 px-1 rounded">
                            {item.highlight}
                          </span>
                        )}
                        {item.afterHighlight}
                      </>
                    ) : (
                      <>
                        {item.highlight && (
                          <span className="font-bold text-slate-900 bg-amber-50 px-1 rounded mr-1">
                            {item.highlight}
                          </span>
                        )}
                        {item.content}
                      </>
                    )}
                  </div>
                </div>

                {/* Card Footer: Client Info & Buttons */}
                <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      {item.avatar ? (
                        <img 
                          src={item.avatar} 
                          alt={item.author} 
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#A88548]/40"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) {
                              e.target.nextElementSibling.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-9 h-9 rounded-full bg-gradient-to-br from-[#FAF9F6] to-[#E7E2D8] text-[#7D5D2A] font-bold text-xs ring-2 ring-[#A88548]/40 ${item.avatar ? 'hidden' : 'flex'} items-center justify-center`}
                      >
                        {initials}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">{item.author}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.role || 'Homeowner'}</p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggleStatus(item)}
                      title={isActive ? 'Hide from website' : 'Publish to website'}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isActive 
                          ? 'bg-white border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-amber-50' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => openEditModal(item)}
                      title="Edit feedback"
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#A88548] hover:bg-amber-50/50 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteError('');
                        setItemToDelete(item);
                      }}
                      disabled={deletingId === item.id}
                      title="Delete feedback"
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Add / Edit Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[#A88548]/10 rounded text-[#A88548]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                  {editingItem ? 'Edit Client Feedback' : 'Add New Client Feedback'}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-120px)]">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Author Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand & Meera Sundaram"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role / Project Purchased
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. OMR Corridor • 3 BHK High-Rise"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] outline-none"
                  />
                </div>
              </div>

              {/* Rating & Verified */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] outline-none"
                  >
                    <option value={5}>★★★★★ (5 Stars - Outstanding)</option>
                    <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Satisfactory)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div className="pt-2 sm:pt-4 flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.verified}
                      onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
                      className="w-4 h-4 text-[#A88548] rounded border-slate-300 focus:ring-[#A88548]"
                    />
                    <span className="text-xs font-medium text-slate-700">Verified Buyer Badge</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                      className="w-4 h-4 text-[#A88548] rounded border-slate-300 focus:ring-[#A88548]"
                    />
                    <span className="text-xs font-medium text-slate-700">Publish Active</span>
                  </label>
                </div>
              </div>

              {/* Highlight Phrase */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Highlight Phrase <span className="text-slate-400 font-normal">(bolded in quote)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. saving our family nearly ₹2.4 Lakhs in cash"
                  value={formData.highlight}
                  onChange={(e) => setFormData(prev => ({ ...prev, highlight: e.target.value }))}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-0.5">
                  This phrase will be highlighted with bold accent styling in the website review card.
                </p>
              </div>

              {/* Full Testimonial Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Feedback / Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share the client's authentic buying journey with Property Gateway..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] outline-none leading-relaxed"
                />
              </div>

              {/* Avatar Upload / URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Client Avatar Image (Optional)
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="flex-1 w-full">
                    <input
                      type="url"
                      placeholder="Image URL (or upload below)"
                      value={formData.avatar}
                      onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#A88548]/30 focus:border-[#A88548] outline-none"
                    />
                  </div>

                  <label className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-50/60 hover:bg-amber-100/70 text-[#A88548] text-xs font-semibold rounded-lg cursor-pointer border border-[#A88548]/30 transition-colors shadow-2xs">
                    {imageUploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A88548]" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5 text-[#A88548]" />
                    )}
                    <span>{imageUploading ? 'Converting to WebP...' : 'Upload Photo (WebP)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={imageUploading}
                      className="hidden"
                    />
                  </label>
                </div>

                {formData.avatar && (
                  <div className="mt-2.5 flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <img
                      src={formData.avatar}
                      alt="Avatar preview"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#A88548]/40 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-800">Avatar Ready</span>
                        {formData.avatar.includes('webp') && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">WebP Lite</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 truncate block">{formData.avatar}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                      className="text-xs text-rose-500 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={formSubmitting}
                  className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formSubmitting || imageUploading}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gold-metallic rounded-xl shadow-sm transition-all disabled:opacity-50 active:scale-95"
                >
                  {formSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingItem ? 'Save Changes' : 'Create Feedback'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Feedback Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-serif font-bold text-slate-900">
                  Delete Client Feedback?
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Are you sure you want to permanently delete the review from{' '}
                  <strong className="text-slate-800">{itemToDelete.author || 'this client'}</strong>? This will remove it from the website review marquee in real time.
                </p>
              </div>

              {deleteError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{deleteError}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setItemToDelete(null)}
                  disabled={deletingId === itemToDelete.id}
                  className="flex-1 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteTestimonial}
                  disabled={deletingId === itemToDelete.id}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
                >
                  {deletingId === itemToDelete.id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Yes, Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
