import ExcelJS from 'exceljs';
import { format } from 'date-fns';

interface ExportOptions {
  filename: string;
  sheetName?: string;
}

/**
 * Export data to Excel file using ExcelJS (secure alternative to xlsx)
 */
export const exportToExcel = async <T extends object>(
  data: T[],
  columns: { key: keyof T; header: string; transform?: (value: unknown, row: T) => string | number }[],
  options: ExportOptions
) => {
  // Create workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(options.sheetName || 'Sheet1');

  // Set up columns with headers and widths
  worksheet.columns = columns.map((col) => {
    // Calculate width based on header length and data
    const headerWidth = col.header.length;
    const maxDataWidth = Math.max(
      0,
      ...data.map((row) => {
        const value = row[col.key];
        const transformedValue = col.transform 
          ? col.transform(value, row)
          : (value as string | number) ?? '';
        return String(transformedValue).length;
      })
    );
    const width = Math.min(Math.max(headerWidth, maxDataWidth) + 2, 50);

    return {
      header: col.header,
      key: col.header,
      width,
    };
  });

  // Style header row
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' },
  };

  // Add data rows
  data.forEach((row) => {
    const rowData: Record<string, string | number> = {};
    columns.forEach((col) => {
      const value = row[col.key];
      rowData[col.header] = col.transform 
        ? col.transform(value, row)
        : (value as string | number) ?? '';
    });
    worksheet.addRow(rowData);
  });

  // Generate filename with timestamp
  const timestamp = format(new Date(), 'yyyy-MM-dd_HHmm');
  const filename = `${options.filename}_${timestamp}.xlsx`;

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Inquiry export columns configuration
 */
export const inquiryExportColumns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'email' as const, header: 'Email' },
  { key: 'phone' as const, header: 'Phone' },
  { key: 'country' as const, header: 'Country' },
  { 
    key: 'project_type' as const, 
    header: 'Project Type',
    transform: (value: unknown) => {
      const labels: Record<string, string> = {
        'indoor-playground': 'Indoor Playground',
        'trampoline-park': 'Trampoline Park',
        'ninja-course': 'Ninja Course',
        'soft-play': 'Soft Play',
        'fec': 'Family Entertainment Center',
        'other': 'Other',
      };
      return labels[value as string] || (value as string) || '';
    }
  },
  { 
    key: 'status' as const, 
    header: 'Status',
    transform: (value: unknown) => {
      const labels: Record<string, string> = {
        new: 'New',
        contacted: 'Contacted',
        qualified: 'Qualified',
        converted: 'Converted',
        closed: 'Closed',
      };
      return labels[value as string] || (value as string) || 'New';
    }
  },
  { key: 'estimated_area' as const, header: 'Estimated Area (sqm)' },
  { key: 'estimated_budget' as const, header: 'Budget Range' },
  { key: 'message' as const, header: 'Message' },
  { 
    key: 'created_at' as const, 
    header: 'Submitted At',
    transform: (value: unknown) => value ? format(new Date(value as string), 'yyyy-MM-dd HH:mm') : ''
  },
];

/**
 * Product export columns configuration
 */
export const productExportColumns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'name_en' as const, header: 'Name (EN)' },
  { key: 'slug' as const, header: 'URL Slug' },
  { 
    key: 'category' as const, 
    header: 'Category',
    transform: (value: unknown) => (value as { name?: string })?.name || ''
  },
  { key: 'short_description' as const, header: 'Short Description' },
  { key: 'price_min' as const, header: 'Min Price' },
  { key: 'price_max' as const, header: 'Max Price' },
  { key: 'price_unit' as const, header: 'Currency' },
  { 
    key: 'features' as const, 
    header: 'Features',
    transform: (value: unknown) => Array.isArray(value) ? value.join('; ') : ''
  },
  { 
    key: 'is_active' as const, 
    header: 'Active',
    transform: (value: unknown) => value ? 'Yes' : 'No'
  },
  { 
    key: 'is_featured' as const, 
    header: 'Featured',
    transform: (value: unknown) => value ? 'Yes' : 'No'
  },
  { key: 'sort_order' as const, header: 'Sort Order' },
  { 
    key: 'created_at' as const, 
    header: 'Created At',
    transform: (value: unknown) => value ? format(new Date(value as string), 'yyyy-MM-dd HH:mm') : ''
  },
];

/**
 * Category export columns configuration
 */
export const categoryExportColumns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'name_en' as const, header: 'Name (EN)' },
  { key: 'slug' as const, header: 'URL Slug' },
  { key: 'description' as const, header: 'Description' },
  { 
    key: 'is_active' as const, 
    header: 'Active',
    transform: (value: unknown) => value ? 'Yes' : 'No'
  },
  { key: 'sort_order' as const, header: 'Sort Order' },
];

/**
 * WhatsApp clicks export columns configuration
 */
export const whatsappClicksExportColumns = [
  { 
    key: 'created_at' as const, 
    header: 'Date/Time',
    transform: (value: unknown) => value ? format(new Date(value as string), 'yyyy-MM-dd HH:mm:ss') : ''
  },
  { 
    key: 'source' as const, 
    header: 'Source',
    transform: (value: unknown) => {
      const labels: Record<string, string> = {
        'floating_cta': 'Floating CTA',
        'header': 'Header',
        'footer': 'Footer',
        'mobile_nav': 'Mobile Nav',
        'contact_page': 'Contact Page',
        'hero_section': 'Hero Section',
        'product_page': 'Product Page',
        'live_chat': 'Live Chat',
      };
      return labels[value as string] || (value as string) || '';
    }
  },
  { key: 'page_url' as const, header: 'Page URL' },
  { key: 'referrer' as const, header: 'Referrer' },
  { key: 'language' as const, header: 'Language' },
  { key: 'country' as const, header: 'Country' },
  { key: 'user_agent' as const, header: 'User Agent' },
  { key: 'session_id' as const, header: 'Session ID' },
];