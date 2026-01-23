import * as XLSX from 'xlsx';
import { format } from 'date-fns';

interface ExportOptions {
  filename: string;
  sheetName?: string;
}

/**
 * Export data to Excel file
 */
export const exportToExcel = <T extends object>(
  data: T[],
  columns: { key: keyof T; header: string; transform?: (value: unknown, row: T) => string | number }[],
  options: ExportOptions
) => {
  // Transform data according to column definitions
  const exportData = data.map((row) => {
    const exportRow: Record<string, string | number> = {};
    columns.forEach((col) => {
      const value = row[col.key];
      exportRow[col.header] = col.transform 
        ? col.transform(value, row)
        : (value as string | number) ?? '';
    });
    return exportRow;
  });

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Auto-adjust column widths
  const maxWidths: number[] = [];
  columns.forEach((col, idx) => {
    const headerWidth = col.header.length;
    const maxDataWidth = Math.max(
      ...exportData.map((row) => String(row[col.header] ?? '').length)
    );
    maxWidths[idx] = Math.min(Math.max(headerWidth, maxDataWidth) + 2, 50);
  });
  ws['!cols'] = maxWidths.map((w) => ({ wch: w }));

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, options.sheetName || 'Sheet1');

  // Generate filename with timestamp
  const timestamp = format(new Date(), 'yyyy-MM-dd_HHmm');
  const filename = `${options.filename}_${timestamp}.xlsx`;

  // Download file
  XLSX.writeFile(wb, filename);
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
