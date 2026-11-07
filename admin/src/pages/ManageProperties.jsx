import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Loader2,
  Building2
} from 'lucide-react';
import { 
  fetchAdminProperties, 
  subscribeAdminProperties,
  deleteProperty, 
  togglePropertyStatus 
} from '../services/adminService';
import { 
  PROPERTY_TYPES, 
  POSSESSION_STATUSES, 
  formatIndianCurrency,
  BRAND 
} from '../utils/constants';

export default function ManageProperties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Realtime subscription to property catalog
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeAdminProperties((liveProps) => {
      setProperties(liveProps);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Redirect legacy ?new=1 query param to full page /properties/add
  useEffect(() => {
    if (searchParams.get('new') === '1') {
      navigate('/properties/add', { replace: true });
    }
  }, [searchParams, navigate]);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    // Optimistic instant state update in UI
    setProperties(prev => prev.map(p => p.id === id ? { ...p, active: newStatus, isActive: newStatus } : p));
    try {
      await togglePropertyStatus(id, currentStatus);
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      setProperties(prev => prev.filter(p => p.id !== id));
      try {
        await deleteProperty(id);
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  // Filter logic
  const filtered = properties.filter(p => {
    const matchesSearch = 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bhk?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || (p.type || p.propertyType) === typeFilter;
    
    const isLive = p.active !== false && p.isActive !== false;
    const matchesStatus = 
      statusFilter === 'All' ? true :
      statusFilter === 'Active' ? isLive :
      statusFilter === 'Draft' ? !isLive :
      ((p.possessionStatus || p.status) === statusFilter);

    return matchesSearch && matchesType && matchesStatus;
  });

  const activeCount = properties.filter(p => p.active !== false && p.isActive !== false).length;
  const draftCount = properties.length - activeCount;

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Property Catalog Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, edit, and publish verified Chennai residential and commercial properties
          </p>
        </div>

        <Link
          to="/properties/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C98A4B] hover:bg-[#b07436] text-white text-xs font-semibold tracking-wide transition-colors shadow-sm self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* 2. Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, location (e.g. OMR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C98A4B]/30 focus:border-[#C98A4B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
            <span className="text-xs text-slate-500 hidden sm:inline">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C98A4B]/30 focus:border-[#C98A4B] w-full sm:w-auto font-medium"
            >
              <option value="All">All Statuses ({properties.length})</option>
              <option value="Active">Active / Published ({activeCount})</option>
              <option value="Draft">Draft / Hidden ({draftCount})</option>
              <optgroup label="Possession Status">
                {POSSESSION_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
            <span className="text-xs text-slate-500 hidden sm:inline">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C98A4B]/30 focus:border-[#C98A4B] w-full sm:w-auto"
            >
              <option value="All">All Property Types</option>
              {PROPERTY_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Properties Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#C98A4B]" />
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
                      <div className="text-[11px] text-slate-400">{prop.type || prop.propertyType}</div>
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
                        onClick={() => handleToggleStatus(prop.id, prop.active !== false && prop.isActive !== false)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                          prop.active !== false && prop.isActive !== false
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Click to toggle visibility"
                      >
                        {prop.active !== false && prop.isActive !== false ? (
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
                          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="View on Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <Link
                          to={`/properties/edit/${prop.id}`}
                          className="p-1.5 rounded-md text-slate-500 hover:text-[#C98A4B] hover:bg-amber-50 transition-colors"
                          title="Edit Full Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>

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

    </div>
  );
}
