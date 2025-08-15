import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, Filter, Clock, User, X } from "lucide-react";

interface ParentCommunicationProps {
  onClose: () => void;
}

export default function ParentCommunication({ onClose }: ParentCommunicationProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const messages = [
    {
      id: "MSG001",
      studentId: "STU001",
      studentName: "Rahul Sharma",
      parentName: "Mr. Amit Sharma",
      message: "My son was absent yesterday due to fever. Please excuse his absence.",
      timestamp: "2 hours ago",
      source: "WhatsApp",
      status: "unread",
      type: "excuse"
    },
    {
      id: "MSG002",
      studentId: "STU003",
      studentName: "Arjun Kumar",
      parentName: "Mrs. Sunita Kumar",
      message: "Thank you for the extra math practice sheets. Arjun is improving a lot!",
      timestamp: "4 hours ago",
      source: "In-app",
      status: "read",
      type: "feedback"
    },
    {
      id: "MSG003",
      studentId: "STU005",
      studentName: "Vikram Singh",
      parentName: "Mr. Rajesh Singh",
      message: "Can we schedule a parent-teacher meeting to discuss Vikram's performance?",
      timestamp: "1 day ago",
      source: "WhatsApp",
      status: "replied",
      type: "meeting"
    },
    {
      id: "MSG004",
      studentId: "STU002",
      studentName: "Priya Patel",
      parentName: "Mrs. Kavita Patel",
      message: "Priya mentioned there's a science project due next week. Could you share the requirements?",
      timestamp: "1 day ago",
      source: "In-app",
      status: "unread",
      type: "inquiry"
    },
    {
      id: "MSG005",
      studentId: "STU007",
      studentName: "Kiran Joshi",
      parentName: "Mr. Suresh Joshi",
      message: "Kiran has been struggling with physics concepts. Any additional resources you'd recommend?",
      timestamp: "2 days ago",
      source: "WhatsApp",
      status: "read",
      type: "help"
    }
  ];

  const absentStudents = [
    {
      studentId: "STU005",
      studentName: "Vikram Singh",
      rollNo: "05",
      parentContact: "+91 9876543210",
      lastSeen: "Yesterday",
      consecutiveAbsent: 2
    },
    {
      studentId: "STU008",
      studentName: "Deepika Nair",
      rollNo: "08",
      parentContact: "+91 9876543211",
      lastSeen: "Today",
      consecutiveAbsent: 1
    }
  ];

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || msg.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "destructive";
      case "read": return "secondary";
      case "replied": return "default";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "excuse": return "🏥";
      case "feedback": return "👍";
      case "meeting": return "📅";
      case "inquiry": return "❓";
      case "help": return "📚";
      default: return "💬";
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Parent Communication Center
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages">Messages & Feedback</TabsTrigger>
            <TabsTrigger value="absent">Absent Students</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by student name, ID, or message content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "unread" ? "default" : "outline"}
                onClick={() => setFilterStatus("unread")}
              >
                Unread
              </Button>
              <Button
                variant={filterStatus === "replied" ? "default" : "outline"}
                onClick={() => setFilterStatus("replied")}
              >
                Replied
              </Button>
            </div>

            {/* Messages List */}
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <Card key={message.id} className={`hover:shadow-md transition-shadow ${
                  message.status === 'unread' ? 'border-primary' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl">{getTypeIcon(message.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{message.studentName}</h4>
                            <Badge variant="outline" className="text-xs">
                              ID: {message.studentId}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {message.source}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            From: {message.parentName}
                          </p>
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="absent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Absent Students - Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg border">
                      <p className="text-2xl font-bold text-destructive">{absentStudents.length}</p>
                      <p className="text-sm text-muted-foreground">Total Absent</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <p className="text-2xl font-bold text-amber-600">
                        {absentStudents.filter(s => s.consecutiveAbsent > 1).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Consecutive Absent</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <p className="text-2xl font-bold text-primary">
                        {absentStudents.filter(s => s.consecutiveAbsent === 1).length}
                      </p>
                      <p className="text-sm text-muted-foreground">First Day Absent</p>
                    </div>
                  </div>

                  {absentStudents.map((student) => (
                    <Card key={student.studentId} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{student.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              Roll No: {student.rollNo} • ID: {student.studentId}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Contact: {student.parentContact}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={student.consecutiveAbsent > 1 ? "destructive" : "secondary"}>
                            {student.consecutiveAbsent} day{student.consecutiveAbsent > 1 ? 's' : ''} absent
                          </Badge>
                          <Button size="sm" variant="outline">
                            Contact Parent
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}