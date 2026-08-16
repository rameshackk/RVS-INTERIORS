/**
 * Service to submit and fetch leads to/from the Excel backend
 * with seamless offline/localStorage fallback.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const leadService = {
  /**
   * Submit a new lead to the Backend Excel sheet and localStorage
   */
  async submitLead(leadData) {
    const formattedRecord = {
      id: Date.now(),
      name: leadData.name || '',
      phone: leadData.phone || '',
      email: leadData.email || '',
      location: leadData.location || 'Chennai',
      serviceType: leadData.serviceType || 'Interior Design',
      propertyType: leadData.propertyType || leadData.property || 'Residential',
      estimatedBudget: leadData.estimatedBudget || leadData.estimatedPrice || 'Quote on site visit',
      message: leadData.message || 'Free site consultation requested',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      source: leadData.source || 'Website Form'
    };

    // 1. Always save to localStorage immediately
    try {
      const existing = JSON.parse(localStorage.getItem('rvs_enquiries') || '[]');
      existing.unshift(formattedRecord);
      localStorage.setItem('rvs_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    // 2. Send to Node.js Backend to append into RVS_Leads.xlsx
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedRecord)
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, backendSaved: true, data: result };
      }
    } catch (apiError) {
      console.log('Backend API offline or unreachable; lead saved to local storage database:', apiError.message);
    }

    return { success: true, backendSaved: false, data: formattedRecord };
  },

  /**
   * Fetch all leads from the Backend Excel file
   */
  async getLeads() {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`);
      if (response.ok) {
        const data = await response.json();
        return data.leads || [];
      }
    } catch (err) {
      // fallback to local storage
    }
    return JSON.parse(localStorage.getItem('rvs_enquiries') || '[]');
  },

  /**
   * Get direct download URL for the Excel spreadsheet
   */
  getExcelDownloadUrl() {
    return `${API_BASE_URL}/leads/export`;
  }
};

export default leadService;
