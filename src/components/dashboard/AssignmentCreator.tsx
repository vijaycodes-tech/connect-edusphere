import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, X, Upload, FileText, Image } from "lucide-react";

interface AssignmentCreatorProps {
  onClose: () => void;
}

export default function AssignmentCreator({ onClose }: AssignmentCreatorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "text",
    dueDate: "",
    class: "10A",
    subject: "Mathematics"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Assignment Created",
      description: `Assignment "${formData.title}" has been created and sent to all students via WhatsApp and in-app notifications.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Assignment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10A">Class 10A</SelectItem>
                  <SelectItem value="10B">Class 10B</SelectItem>
                  <SelectItem value="9A">Class 9A</SelectItem>
                  <SelectItem value="9B">Class 9B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                placeholder="Enter assignment title..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Enter detailed assignment description..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Assignment Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text-based</SelectItem>
                    <SelectItem value="image">Image/Photo</SelectItem>
                    <SelectItem value="file">File Upload</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Assignment Type Preview */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Assignment Type: {formData.type === 'text' ? 'Text-based' : formData.type === 'image' ? 'Image/Photo' : 'File Upload'}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {formData.type === 'text' && (
                  <>
                    <FileText className="w-4 h-4" />
                    Students will submit text responses
                  </>
                )}
                {formData.type === 'image' && (
                  <>
                    <Image className="w-4 h-4" />
                    Students can upload photos of handwritten work
                  </>
                )}
                {formData.type === 'file' && (
                  <>
                    <Upload className="w-4 h-4" />
                    Students can upload files (PDF, DOC, etc.)
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Preview */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Delivery Method</h4>
              <div className="space-y-2 text-sm">
                <p>✅ WhatsApp message to all students individually</p>
                <p>✅ In-app notification to student accounts</p>
                <p>✅ Email notification to parents (if enabled)</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Create & Send Assignment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}