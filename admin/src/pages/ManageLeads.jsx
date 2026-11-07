import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Trash2, 
  Filter,
  Loader2,
  Inbox
} from 'lucide-react';
import { subscribeAdminLeads, updateLeadStatus, deleteLead } from '../services/adminService';

const STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Site Visit',
  'Closed'
];

function normalizeLeadStatus(status) {
  if (!status || status === 'New') return 'New';
  if (status.includes('Visit')) return 'Site Visit';
  if (status.includes('Closed') || status.includes('Archived')) return 'Closed';
  if (status.includes('Contacted') || status.includes('Negotiation')) return 'Contacted';
  return status;
}

export default function ManageLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeAdminLeads((liveLeads) => {
      setLeads(liveLeads);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    // Optimistic instant state update in UI
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    try {
      await updateLeadStatus(leadId, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (leadId, name) => {
    if (window.confirm(`Permanently remove lead record for "${name}"?`)) {
      setLeads(prev => prev.filter(l => l.id !== leadId));
      try {
        await deleteLead(leadId);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone?.includes(searchQuery) ||
      l.propertyTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const leadNormStatus = normalizeLeadStatus(l.status);
    const matchesStatus = statusFilter === 'All' || leadNormStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Client Inquiries & Site Visit Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming Chennai buyer inquiries, site visit requests, and 1-tap WhatsApp responses
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-medium">
            Total Inquiries: <strong className="text-slate-900">{leads.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald-600 w-full sm:w-auto"
          >
            <option value="All">All Statuses ({leads.length})</option>
            {STATUS_OPTIONS.map(s => {
              const count = leads.filter(l => normalizeLeadStatus(l.status) === s).length;
              return (
                <option key={s} value={s}>{s} ({count})</option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            <span>Loading inquiries...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 px-6 text-center text-xs text-slate-500 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              {searchQuery || statusFilter !== 'All' ? 'No inquiries match your filter' : 'No Inquiries Recorded Yet'}
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'All' 
                ? 'Try resetting your search query or status filter to see all leads.' 
                : 'Live client inquiries and site visit requests submitted via the website will appear here in real time.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Inquiry / Request</th>
                  <th className="py-3 px-4">Preferences / Message</th>
                  <th className="py-3 px-4">Lead Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone?.replace(/[^0-9]/g, '');
                  const waText = encodeURIComponent(
                    `Hi ${lead.name || 'Sir/Madam'}, thank you for contacting Property Gateway regarding "${lead.propertyTitle || 'Chennai Properties'}". How can I assist you with floor plans or scheduling a site visit?`
                  );

                  const isSiteVisit = lead.leadType?.includes('Site Visit') || lead.preferredDate;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{lead.name || 'Anonymous Inquiry'}</div>
                        <div className="mt-0.5 space-y-0.5">
                          <a href={`tel:${lead.phone}`} className="text-slate-700 hover:text-emerald-700 font-mono font-medium block">
                            {lead.phone}
                          </a>
                          {lead.email && <span className="text-[11px] text-slate-400 block">{lead.email}</span>}
                          <span className="text-[10px] text-slate-400 block">
                            {lead.submittedAt ? new Date(lead.submittedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900 line-clamp-1">
                          {lead.propertyTitle || 'General Consultation'}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          {isSiteVisit ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              <Calendar className="w-3 h-3" />
                              <span>Site Visit: {lead.preferredDate || 'Requested'}</span>
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                              {lead.leadType || 'Inquiry'}
                            </span>
                          )}
                        </div>
                        {lead.preferredLocation && (
                          <div className="text-[11px] text-slate-500 mt-1">
                            📍 {lead.preferredLocation}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                        <p className="line-clamp-2 text-xs leading-relaxed">
                          {lead.message || 'Customer requested direct callback / floor plans.'}
                        </p>
                      </td>

                      <td className="py-3.5 px-4">
                        {(() => {
                          const currentStatus = normalizeLeadStatus(lead.status);
                          return (
                            <select
                              value={currentStatus}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`text-xs py-1 px-2.5 rounded-lg border font-semibold focus:outline-none transition-colors ${
                                currentStatus === 'New'
                                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                                  : currentStatus === 'Contacted'
                                  ? 'bg-blue-50 border-blue-300 text-blue-800'
                                  : currentStatus === 'Site Visit'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                  : 'bg-slate-100 border-slate-300 text-slate-700'
                              }`}
                            >
                              {STATUS_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          );
                        })()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`https://wa.me/91${cleanPhone}?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] transition-colors shadow-2xs"
                            title="Direct WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDelete(lead.id, lead.name)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
