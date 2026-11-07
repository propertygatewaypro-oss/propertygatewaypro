import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  PlusCircle, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  MessageSquareQuote
} from 'lucide-react';
import { fetchAdminProperties, fetchAdminLeads, fetchAdminTestimonials } from '../services/adminService';
import { BRAND } from '../utils/constants';

export default function DashboardPage() {
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [props, lds, tests] = await Promise.all([
          fetchAdminProperties(),
          fetchAdminLeads(),
          fetchAdminTestimonials()
        ]);
        setProperties(props);
        setLeads(lds);
        setTestimonials(tests || []);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activePropertiesCount = properties.filter(p => p.active !== false).length;
  const visitRequestsCount = leads.filter(l => l.leadType?.includes('Site Visit') || l.preferredDate).length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Executive Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time catalog metrics and client inquiries for Property Gateway
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/properties/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C98A4B] hover:bg-[#b07436] text-white text-xs font-semibold tracking-wide transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
          <a
            href={BRAND.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-xs"
          >
            <span>View Public Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Properties</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-slate-900">{properties.length}</span>
            <span className="text-xs text-slate-500">units</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {activePropertiesCount} Active on Website
          </div>
        </div>

        {/* New Inquiries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">New Leads</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-slate-900">{newLeadsCount}</span>
            <span className="text-xs text-amber-700 font-medium">Pending Response</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Total {leads.length} recorded inquiries
          </div>
        </div>

        {/* Client Testimonials */}
        <Link 
          to="/testimonials" 
          className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-[#C98A4B]/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-[#C98A4B] transition-colors">Client Feedbacks</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C98A4B] flex items-center justify-center">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-slate-900">{testimonials.length}</span>
            <span className="text-xs text-slate-500">reviews</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {testimonials.filter(t => t.active !== false).length} Active on Website
          </div>
        </Link>

        {/* Statutory Compliance */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">RERA Authority</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-slate-900">{BRAND.reraId}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Tamil Nadu RERA Validated
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Recent Customer Inquiries</h2>
            <p className="text-xs text-slate-500">Direct buyers from Chennai website portal</p>
          </div>
          <Link
            to="/leads"
            className="text-xs font-semibold text-brand-emerald-700 hover:text-brand-emerald-800 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading inquiries...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No leads recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Inquiry / Property</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.slice(0, 5).map((lead) => {
                  const cleanPhone = lead.phone?.replace(/[^0-9]/g, '');
                  const waText = encodeURIComponent(
                    `Hi ${lead.name || 'Sir/Madam'}, thank you for your inquiry on Property Gateway regarding "${lead.propertyTitle || 'Chennai Properties'}". How can I assist you with floor plans or a site visit?`
                  );
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{lead.name || 'Prospective Buyer'}</div>
                        <div className="text-[11px] text-slate-400">
                          {lead.submittedAt ? new Date(lead.submittedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <a href={`tel:${lead.phone}`} className="hover:text-emerald-700 font-mono font-medium">
                          {lead.phone}
                        </a>
                        {lead.email && <div className="text-[11px] text-slate-400">{lead.email}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 truncate max-w-xs">{lead.propertyTitle || lead.preferredLocation || 'General Inquiry'}</div>
                        <span className="inline-block px-2 py-0.5 mt-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                          {lead.leadType || 'Inquiry'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {(() => {
                          const s = lead.status || 'New';
                          const isVisit = s.includes('Visit');
                          const isContacted = s.includes('Contacted') || s.includes('Negotiation');
                          const isClosed = s.includes('Closed') || s.includes('Archived');
                          return (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              s === 'New' 
                                ? 'bg-amber-100 text-amber-800' 
                                : isContacted 
                                ? 'bg-blue-100 text-blue-800' 
                                : isVisit 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {isVisit ? 'Site Visit' : isClosed ? 'Closed' : isContacted ? 'Contacted' : 'New'}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/91${cleanPhone}?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] transition-colors"
                            title="Reply on WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                            title="Call customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
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
