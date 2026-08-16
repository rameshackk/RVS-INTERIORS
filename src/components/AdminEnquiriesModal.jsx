import React, { useState, useEffect } from 'react';
import { 
  X, Download, Trash2, Phone, MessageSquare, 
  Search, Shield, Users, RefreshCw, FileSpreadsheet 
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { companyData } from '../data/companyData';

export default function AdminEnquiriesModal({ isOpen, onClose }) {
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadEnquiries = () => {
    try {
      const data = JSON.parse(localStorage.getItem('rvs_enquiries') || '[]');
      setEnquiries(data);
    } catch (e) {
      setEnquiries([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadEnquiries();
    }
  }, [isOpen]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      const updated = enquiries.filter(item => item.id !== id);
      localStorage.setItem('rvs_enquiries', JSON.stringify(updated));
      setEnquiries(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL enquiries?")) {
      localStorage.removeItem('rvs_enquiries');
      setEnquiries([]);
    }
  };

  const handleExportExcel = () => {
    if (enquiries.length === 0) {
      alert("No enquiries to export.");
      return;
    }

    const exportRows = enquiries.map((item, index) => ({
      "S.No": index + 1,
      "Client Name": item.name || '',
      "Mobile Number": item.phone || '',
      "Email": item.email || '',
      "Chennai Location": item.location || '',
      "Service Requested": item.serviceType || '',
      "Property Size": item.propertyType || '',
      "Estimated Budget": item.estimatedBudget || '',
      "Client Notes": item.message || '',
      "Submitted Date & Time": item.submittedAt || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RVS_Enquiries");
    XLSX.writeFile(workbook, `RVS_Interior_Enquiries_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  if (!isOpen) return null;

  const filtered = enquiries.filter(e => {
    const q = searchQuery.toLowerCase();
    return (
      (e.name && e.name.toLowerCase().includes(q)) ||
      (e.phone && e.phone.includes(q)) ||
      (e.location && e.location.toLowerCase().includes(q)) ||
      (e.serviceType && e.serviceType.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-brand-light">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-icon.png" 
              alt="RVS Interiors Logo" 
              className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-brand-accent/40 shadow-xs" 
            />
            <div>

              <span className="text-[10px] text-brand-accent uppercase tracking-widest font-extrabold block">
                Management Portal
              </span>
              <h3 className="text-lg font-bold text-brand-primary font-serif-luxury">
                Client Enquiries & Estimate Leads (R. Stephen)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              disabled={enquiries.length === 0}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition-all"
            >
              <FileSpreadsheet size={14} />
              <span>Export to Excel (.xlsx)</span>
            </button>

            {enquiries.length > 0 && (
              <button
                onClick={handleClearAll}
                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Clear all records"
              >
                <Trash2 size={16} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 px-6 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-grow max-w-md">
            <Search size={15} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, mobile, location, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
            />
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Total Leads: <strong className="text-brand-primary">{enquiries.length}</strong>
          </div>
        </div>

        {/* Leads Table / List */}
        <div className="p-6 overflow-y-auto flex-grow space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Users size={36} className="mx-auto opacity-30 text-slate-400" />
              <p className="text-sm font-semibold text-slate-600">No client enquiries found.</p>
              <p className="text-xs text-slate-400">
                New estimate requests submitted on the website will populate here automatically.
              </p>
            </div>
          ) : (
            filtered.map((lead) => (
              <div
                key={lead.id}
                className="p-4 sm:p-5 rounded-2xl bg-brand-light border border-brand-lightBorder hover:border-brand-accent/40 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-brand-primary">{lead.name}</h4>
                    <span className="bg-amber-100 text-brand-accentHover text-[10px] font-bold px-2 py-0.2 rounded-full border border-amber-300">
                      {lead.serviceType}
                    </span>
                    <span className="text-[10px] text-slate-400">{lead.propertyType}</span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-0.5">
                    <span><strong>Phone:</strong> <a href={`tel:${lead.phone}`} className="text-brand-primary font-bold hover:underline">{lead.phone}</a></span>
                    {lead.email && <span><strong>Email:</strong> {lead.email}</span>}
                    {lead.location && <span><strong>Location:</strong> {lead.location}</span>}
                    {lead.estimatedBudget && <span className="text-emerald-700 font-semibold"><strong>Budget:</strong> {lead.estimatedBudget}</span>}
                  </div>

                  {lead.message && (
                    <p className="text-[11px] text-slate-500 italic pt-1">
                      "{lead.message}"
                    </p>
                  )}

                  <span className="text-[10px] text-slate-400 block pt-1">
                    Submitted: {lead.submittedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <a
                    href={`tel:${lead.phone}`}
                    className="p-2 rounded-xl bg-brand-primary text-white hover:bg-brand-surface shadow-xs transition-colors"
                    title="Direct Call Client"
                  >
                    <Phone size={14} />
                  </a>
                  <a
                    href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20this%20is%20R.%20Stephen%20from%20RVS%20Interior%20&%20Builders.%20I%20received%20your%20enquiry%20for%20${encodeURIComponent(lead.serviceType)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors"
                    title="WhatsApp Client"
                  >
                    <MessageSquare size={14} />
                  </a>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-brand-light flex items-center justify-between text-xs text-slate-500">
          <span>RVS Interior Proprietor Authority Dashboard</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-primary text-white font-bold rounded-xl text-xs"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
}
