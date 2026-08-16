import React, { useState, useEffect } from 'react';
import { 
  X, Download, Trash2, Phone, MessageSquare, 
  Search, Shield, Users, RefreshCw, FileSpreadsheet,
  Lock, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, LogOut,
  UserCheck, Building2, Sparkles
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { companyData } from '../data/companyData';
import { brandAssets } from '../assets';
import { leadService } from '../services/leadService';

export default function AdminEnquiriesModal({ isOpen, onClose }) {
  // Always require login each time the modal opens
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Reset state on modal open
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(false);
      setPasswordInput('');
      setAuthError('');
      setStatusMessage('');
    }
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthError('');

    setTimeout(() => {
      const trimmed = passwordInput.trim();
      if (trimmed === 'JOYCE2810' || trimmed.toUpperCase() === 'JOYCE2810') {
        setIsAuthenticated(true);
        setAuthError('');
        setPasswordInput('');
        loadEnquiries();
      } else {
        setAuthError('Access Denied: Invalid Security Password. Authorized for R. Stephen only.');
      }
      setIsSubmittingAuth(false);
    }, 300);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
    setEnquiries([]);
  };

  const loadEnquiries = async () => {
    setIsLoading(true);
    try {
      const data = await leadService.getLeads();
      const normalized = data.map((item, idx) => ({
        id: item.id || item['S.No'] || idx + 1,
        sNo: item['S.No'] || idx + 1,
        name: item.name || item['Client Name'] || '',
        phone: item.phone || item['Mobile Number'] || '',
        email: item.email || item['Email Address'] || item['Email'] || '',
        location: item.location || item['Chennai Location'] || '',
        serviceType: item.serviceType || item['Service Requested'] || '',
        propertyType: item.propertyType || item['Property Type'] || '',
        estimatedBudget: item.estimatedBudget || item['Estimated Budget'] || '',
        message: item.message || item['Client Notes / Requirements'] || item['Client Notes'] || '',
        submittedAt: item.submittedAt || item['Submitted Date & Time'] || '',
        source: item.source || item['Lead Source'] || 'Website'
      }));
      setEnquiries(normalized);
    } catch (e) {
      setEnquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item) => {
    const targetIdentifier = item.phone || item.id || item.sNo;
    const clientName = item.name || 'this client';
    if (window.confirm(`Are you sure you want to permanently delete enquiry for "${clientName}" from the Server & Excel Database?`)) {
      setIsLoading(true);
      await leadService.deleteLead(targetIdentifier);
      setStatusMessage(`Deleted "${clientName}" from server Excel database.`);
      await loadEnquiries();
      setTimeout(() => setStatusMessage(''), 3500);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL client records from both the Server Excel spreadsheet and local database?")) {
      setIsLoading(true);
      await leadService.clearAllLeads();
      setEnquiries([]);
      setStatusMessage('All leads successfully erased from Server Excel sheet.');
      setIsLoading(false);
      setTimeout(() => setStatusMessage(''), 3500);
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
      "Submitted Date & Time": item.submittedAt || '',
      "Source": item.source || 'Website Lead'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RVS_Enquiries");
    XLSX.writeFile(workbook, `RVS_Interior_Leads_${new Date().toISOString().slice(0,10)}.xlsx`);
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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      
      {/* AUTHENTICATION LOCK SCREEN MODAL */}
      {!isAuthenticated ? (
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 animate-scale-up">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="text-center space-y-4">
            
            {/* Brand Logo & Lock Badge */}
            <div className="relative inline-block mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-brand-primary p-2 border-2 border-brand-accent/40 shadow-lg flex items-center justify-center mx-auto">
                <img 
                  src={brandAssets.logoIcon} 
                  alt="RVS Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-md border-2 border-white">
                <Lock size={14} />
              </div>
            </div>

            {/* Header Text */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-brand-accent/30 text-brand-accentHover text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                <Shield size={11} className="text-brand-accent" />
                <span>Proprietor Security Access</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-primary font-serif-luxury tracking-tight">
                R. Stephen Admin Portal
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your administrative security password to view real-time client enquiries and manage the Excel database.
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-2 text-left animate-shake">
                <AlertCircle size={16} className="shrink-0 text-red-500" />
                <span className="font-semibold">{authError}</span>
              </div>
            )}

            {/* Password Login Form */}
            <form onSubmit={handleLogin} className="space-y-3.5 pt-1 text-left">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Proprietor Authority Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    placeholder="Enter password (JOYCE2810)..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all bg-slate-50/50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth || !passwordInput}
                className="w-full py-3.5 bg-gradient-to-r from-brand-primary via-brand-surface to-brand-primary hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmittingAuth ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Verifying Authority...</span>
                  </>
                ) : (
                  <>
                    <Lock size={14} className="text-brand-accent" />
                    <span>Unlock Client Leads Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>Direct Oversight: <strong>R. Stephen</strong></span>
              <button 
                type="button" 
                onClick={onClose}
                className="text-slate-500 hover:text-brand-primary underline"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* AUTHENTICATED LEADS DASHBOARD */
        <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative animate-scale-up">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-brand-light">
            <div className="flex items-center gap-3">
              <img 
                src={brandAssets.logoIcon} 
                alt="RVS Interiors Logo" 
                className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-brand-accent/40 shadow-xs shrink-0" 
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-brand-accent uppercase tracking-widest font-extrabold block">
                    Proprietor Portal
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Authenticated (R. Stephen)
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-primary font-serif-luxury">
                  Client Enquiries & Server Excel Leads
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 pr-8 sm:pr-0">
              <button
                onClick={handleExportExcel}
                disabled={enquiries.length === 0}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <FileSpreadsheet size={14} />
                <span>Export to Excel (.xlsx)</span>
              </button>

              <button
                onClick={loadEnquiries}
                className="p-2 bg-white text-slate-700 hover:text-brand-accent border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
                title="Refresh Leads from Server"
              >
                <RefreshCw size={15} className={isLoading ? "animate-spin text-brand-accent" : ""} />
              </button>

              <button
                onClick={handleLogout}
                className="p-2 bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold"
                title="Lock & Logout Admin"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Lock</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Status Message Notification */}
          {statusMessage && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 flex items-center gap-2 font-medium animate-fade-in">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Search & Stats Bar */}
          <div className="p-3.5 sm:px-6 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by client name, mobile, location, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent"
              />
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span>Total Leads: <strong className="text-brand-primary font-bold">{enquiries.length}</strong></span>
              {enquiries.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Trash2 size={12} />
                  <span>Clear All Server Leads</span>
                </button>
              )}
            </div>
          </div>

          {/* Leads Table */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Users size={22} />
                </div>
                <p className="text-xs sm:text-sm font-medium">
                  {searchQuery ? "No matching enquiries found for your search." : "No client enquiries recorded yet in the database."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-100/80 text-slate-800 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-3.5 py-3">#</th>
                      <th className="px-3.5 py-3">Client Info</th>
                      <th className="px-3.5 py-3">Requirement</th>
                      <th className="px-3.5 py-3">Location & Budget</th>
                      <th className="px-3.5 py-3">Date & Time</th>
                      <th className="px-3.5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filtered.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-amber-50/30 transition-colors">
                        <td className="px-3.5 py-3 font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="px-3.5 py-3">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <a
                              href={`tel:${item.phone.replace(/\s+/g, '')}`}
                              className="font-semibold text-brand-accent hover:underline flex items-center gap-0.5 text-[11px]"
                            >
                              <Phone size={10} />
                              {item.phone}
                            </a>
                            {item.email && item.email !== 'Not provided' && (
                              <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                                • {item.email}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3.5 py-3">
                          <span className="inline-block bg-amber-100/70 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 mb-0.5">
                            {item.serviceType || 'Interior'}
                          </span>
                          <div className="text-[11px] text-slate-500 font-medium">
                            Type: {item.propertyType || 'Standard'}
                          </div>
                          {item.message && (
                            <p className="text-[10px] text-slate-400 line-clamp-1 italic mt-0.5">
                              "{item.message}"
                            </p>
                          )}
                        </td>
                        <td className="px-3.5 py-3">
                          <div className="font-semibold text-slate-800 text-[11px]">
                            {item.location || 'Chennai'}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                            Budget: {item.estimatedBudget || 'Quote on site'}
                          </div>
                        </td>
                        <td className="px-3.5 py-3 text-[10px] text-slate-400 whitespace-nowrap">
                          {item.submittedAt || 'Recent'}
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/91${item.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(item.name)},%20this%20is%20R.%20Stephen%20from%20RVS%20Interior%20%26%20Builders%20regarding%20your%20project%20enquiry.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={13} />
                            </a>
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Delete from Server & Excel"
                            >
                              <Trash2 size={13} />
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

          {/* Footer */}
          <div className="p-3 sm:px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500">
              RVS Interior & Builders Proprietary Lead System • Connected to <code>RVS_Leads.xlsx</code>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Close Portal
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
