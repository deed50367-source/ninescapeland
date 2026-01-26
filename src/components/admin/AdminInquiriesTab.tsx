import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  RefreshCw, 
  Eye, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Building,
  MessageSquare,
  Loader2,
  Filter,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { exportToExcel, inquiryExportColumns } from "@/utils/excelExport";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string;
  project_type: string;
  message: string | null;
  status: string | null;
  estimated_area: number | null;
  estimated_budget: string | null;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-info",
  contacted: "bg-warning",
  qualified: "bg-success",
  converted: "bg-category-purple",
  closed: "bg-muted-foreground",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  converted: "Converted",
  closed: "Closed",
};

const projectTypeLabels: Record<string, string> = {
  "indoor-playground": "Indoor Playground",
  "trampoline-park": "Trampoline Park",
  "ninja-course": "Ninja Course",
  "soft-play": "Soft Play",
  "fec": "Family Entertainment Center",
  "other": "Other",
};

const AdminInquiriesTab = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Failed to fetch inquiries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: newStatus })
        .eq("id", inquiryId);

      if (error) throw error;

      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === inquiryId ? { ...inq, status: newStatus } : inq
        )
      );

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }

      toast.success("Status updated");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;

    try {
      const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", inquiryId);

      if (error) throw error;

      setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryId));
      if (selectedInquiry?.id === inquiryId) {
        setIsDetailOpen(false);
        setSelectedInquiry(null);
      }
      toast.success("Inquiry deleted");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("Delete failed");
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const query = searchQuery.toLowerCase();
    return (
      inq.name.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      inq.country.toLowerCase().includes(query) ||
      (inq.phone && inq.phone.includes(query))
    );
  });

  const openDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailOpen(true);
  };

  const handleExport = async () => {
    if (filteredInquiries.length === 0) {
      toast.error("No data to export");
      return;
    }
    try {
      await exportToExcel(filteredInquiries, inquiryExportColumns, {
        filename: 'inquiries',
        sheetName: 'Inquiries'
      });
      toast.success(`Exported ${filteredInquiries.length} inquiries`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Export failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Inquiry Management</h2>
          <p className="text-muted-foreground">
            Total {inquiries.length} inquiries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button onClick={fetchInquiries} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No inquiries found</p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Info</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="group">
                  <TableCell>
                    <div>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {projectTypeLabels[inquiry.project_type] || inquiry.project_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{inquiry.country}</TableCell>
                  <TableCell>
                    <Select
                      value={inquiry.status || "new"}
                      onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                    >
                      <SelectTrigger className="w-28 h-8">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              statusColors[inquiry.status || "new"]
                            }`}
                          />
                          <span className="text-xs">
                            {statusLabels[inquiry.status || "new"]}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${statusColors[value]}`}
                              />
                              {label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(inquiry.created_at), "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDetail(inquiry)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(inquiry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">{selectedInquiry.name}</h3>
                
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-primary hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedInquiry.country}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="secondary">
                      {projectTypeLabels[selectedInquiry.project_type] ||
                        selectedInquiry.project_type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {format(new Date(selectedInquiry.created_at), "MMM dd, yyyy HH:mm")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {(selectedInquiry.estimated_area || selectedInquiry.estimated_budget) && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  {selectedInquiry.estimated_area && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Estimated Area: </span>
                      {selectedInquiry.estimated_area} sqm
                    </p>
                  )}
                  {selectedInquiry.estimated_budget && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Budget Range: </span>
                      {selectedInquiry.estimated_budget}
                    </p>
                  )}
                </div>
              )}

              {/* Message */}
              {selectedInquiry.message && (
                <div>
                  <h4 className="font-medium mb-2">Customer Message</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>
              )}

              {/* Status Change */}
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">Change Status</span>
                <Select
                  value={selectedInquiry.status || "new"}
                  onValueChange={(value) =>
                    handleStatusChange(selectedInquiry.id, value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          statusColors[selectedInquiry.status || "new"]
                        }`}
                      />
                      {statusLabels[selectedInquiry.status || "new"]}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${statusColors[value]}`}
                          />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    window.open(`mailto:${selectedInquiry.email}`, "_blank")
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                {selectedInquiry.phone && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${selectedInquiry.phone.replace(/\D/g, "")}`,
                        "_blank"
                      )
                    }
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiriesTab;