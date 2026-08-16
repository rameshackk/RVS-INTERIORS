/**
 * Service to submit, fetch, and delete leads to/from the Excel backend
 * with seamless offline/localStorage fallback and Admin Authentication.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ADMIN_PASS = 'JOYCE2810';

export const leadService = {
  /**
   * Verify Proprietor Admin Password
   */
  verifyPassword(inputPass) {
    return inputPass === ADMIN_PASS;
  },

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
      console.log('Backend API offline; saved to local database:', apiError.message);
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
        if (data.leads && data.leads.length > 0) {
          return data.leads;
        }
      }
    } catch (err) {
      // Fallback
    }
    return JSON.parse(localStorage.getItem('rvs_enquiries') || '[]');
  },

  /**
   * Delete a lead from both server Excel and local storage
   */
  async deleteLead(identifier) {
    // 1. Delete from localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('rvs_enquiries') || '[]');
      const updated = existing.filter(item => 
        item.id !== identifier && 
        item.phone !== identifier && 
        item['Mobile Number'] !== identifier &&
        item['S.No'] !== Number(identifier)
      );
      localStorage.setItem('rvs_enquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage delete error:', e);
    }

    // 2. Delete from Backend Excel file
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${encodeURIComponent(identifier)}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const resData = await response.json();
        return { success: true, serverDeleted: true, leads: resData.leads };
      }
    } catch (err) {
      console.log('Backend delete error / offline:', err.message);
    }

    return { success: true, serverDeleted: false };
  },

  /**
   * Clear all leads from server Excel and local storage
   */
  async clearAllLeads() {
    try {
      localStorage.removeItem('rvs_enquiries');
    } catch (e) {}

    try {
      await fetch(`${API_BASE_URL}/leads-clear-all`, {
        method: 'DELETE'
      });
    } catch (e) {}

    return { success: true };
  },

  /**
   * Get direct download URL for the Excel spreadsheet
   */
  getExcelDownloadUrl() {
    return `${API_BASE_URL}/leads/export`;
  }
};

export default leadService;
