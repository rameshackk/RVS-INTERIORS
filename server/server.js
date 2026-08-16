import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSXModule from 'xlsx';

const XLSX = XLSXModule.default || XLSXModule;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const EXCEL_FILE_PATH = path.join(DATA_DIR, 'RVS_Leads.xlsx');
const SHEET_NAME = 'Leads';

/**
 * Initialize Excel workbook if it doesn't exist yet
 */
function initExcelFile() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    const initialHeaders = [
      {
        'S.No': 1,
        'Submitted Date & Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Client Name': 'Sample Demo Lead (RVS Interior)',
        'Mobile Number': '9710453183',
        'Email Address': 'rvsinterior28@gmail.com',
        'Chennai Location': 'Arumbakkam, Chennai',
        'Service Requested': 'Turnkey Interior Design',
        'Property Type': '3 BHK',
        'Estimated Budget': '₹ 4,50,000',
        'Client Notes / Requirements': 'Interested in Modular Kitchen and False Ceiling under R. Stephen direct supervision.',
        'Lead Source': 'Website Initializer'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(initialHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, SHEET_NAME);
    XLSX.writeFile(workbook, EXCEL_FILE_PATH);
    console.log(`[Excel Backend] Initialized new leads workbook at: ${EXCEL_FILE_PATH}`);
  }
}

initExcelFile();

/**
 * Helper: Read all leads from the Excel sheet
 */
function readLeadsFromExcel() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    initExcelFile();
  }
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];
  if (!worksheet) return [];
  return XLSX.utils.sheet_to_json(worksheet);
}

/**
 * Helper: Save array of rows to the Excel sheet
 */
function saveLeadsToExcel(rows) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, SHEET_NAME);
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
}

/**
 * Helper: Append a new lead record to the Excel sheet
 */
function appendLeadToExcel(leadData) {
  const existingRows = readLeadsFromExcel();

  const newRow = {
    'S.No': existingRows.length + 1,
    'Submitted Date & Time': leadData.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    'Client Name': leadData.name || 'Anonymous Client',
    'Mobile Number': leadData.phone || '',
    'Email Address': leadData.email || 'Not provided',
    'Chennai Location': leadData.location || 'Chennai',
    'Service Requested': leadData.serviceType || 'General Consultation',
    'Property Type': leadData.propertyType || 'Residential',
    'Estimated Budget': leadData.estimatedBudget || 'Quote on site visit',
    'Client Notes / Requirements': leadData.message || 'Free site consultation requested',
    'Lead Source': leadData.source || 'Website Form'
  };

  existingRows.push(newRow);
  saveLeadsToExcel(existingRows);

  console.log(`[Excel Backend] New Lead recorded for: ${newRow['Client Name']} (${newRow['Mobile Number']})`);
  return newRow;
}

/**
 * Helper: Delete a single lead by S.No or Phone/Name match and re-index S.No
 */
function deleteLeadFromExcel(identifier) {
  const existingRows = readLeadsFromExcel();
  const idNum = Number(identifier);

  const filtered = existingRows.filter((row, idx) => {
    if (!isNaN(idNum) && row['S.No'] === idNum) {
      return false;
    }
    if (row['Mobile Number'] === String(identifier) || row['Client Name'] === String(identifier)) {
      return false;
    }
    // Also support index-based fallback if passed index (1-based)
    if (!isNaN(idNum) && idx + 1 === idNum) {
      return false;
    }
    return true;
  });

  // Re-index remaining rows with clean sequential S.No
  const updatedRows = filtered.map((row, index) => ({
    ...row,
    'S.No': index + 1
  }));

  saveLeadsToExcel(updatedRows);
  console.log(`[Excel Backend] Deleted lead (${identifier}). Remaining: ${updatedRows.length}`);
  return updatedRows;
}

// ------------------- API ENDPOINTS -------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'RVS Interior & Builders Leads Backend',
    excelFile: EXCEL_FILE_PATH,
    timestamp: new Date().toISOString()
  });
});

// 2. GET all leads from the Excel database
app.get('/api/leads', (req, res) => {
  try {
    const leads = readLeadsFromExcel();
    res.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    console.error('[Excel Backend Error]:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. POST new lead -> Appends directly into Excel spreadsheet
app.post('/api/leads', (req, res) => {
  try {
    const leadData = req.body;
    if (!leadData.name || !leadData.phone) {
      return res.status(400).json({
        success: false,
        error: 'Name and Phone number are required fields.'
      });
    }

    const recorded = appendLeadToExcel(leadData);

    res.status(201).json({
      success: true,
      message: 'Lead successfully saved to Excel sheet (RVS_Leads.xlsx)!',
      lead: recorded
    });
  } catch (error) {
    console.error('[Excel Backend Error]:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. DELETE a specific lead from Excel
app.delete('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const remaining = deleteLeadFromExcel(id);
    res.json({
      success: true,
      message: `Lead ${id} successfully deleted from Excel file!`,
      remainingCount: remaining.length,
      leads: remaining
    });
  } catch (error) {
    console.error('[Excel Backend Error]:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. DELETE clear all leads in Excel
app.delete('/api/leads-clear-all', (req, res) => {
  try {
    saveLeadsToExcel([]);
    console.log('[Excel Backend] Cleared all leads from RVS_Leads.xlsx');
    res.json({
      success: true,
      message: 'All leads cleared from Excel sheet.',
      leads: []
    });
  } catch (error) {
    console.error('[Excel Backend Error]:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. GET download live Excel file (.xlsx) directly
app.get('/api/leads/export', (req, res) => {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      initExcelFile();
    }
    const fileName = `RVS_Interior_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;
    res.download(EXCEL_FILE_PATH, fileName);
  } catch (error) {
    console.error('[Excel Backend Error]:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 RVS Leads Excel Backend running on http://localhost:${PORT}`);
  console.log(`📁 Realtime Excel file: ${EXCEL_FILE_PATH}`);
  console.log(`📥 API Endpoints:`);
  console.log(`   - POST   /api/leads            (Store new enquiry in Excel)`);
  console.log(`   - GET    /api/leads            (Fetch all rows from Excel)`);
  console.log(`   - DELETE /api/leads/:id        (Delete lead row from Excel)`);
  console.log(`   - DELETE /api/leads-clear-all  (Clear all leads in Excel)`);
  console.log(`   - GET    /api/leads/export     (Download RVS_Leads.xlsx file)`);
  console.log(`====================================================`);
});
