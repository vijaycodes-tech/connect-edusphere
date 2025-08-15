import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Users, Save, X } from "lucide-react";

interface AttendanceManagerProps {
  onClose: () => void;
}

export default function AttendanceManager({ onClose }: AttendanceManagerProps) {
  const { toast } = useToast();
  const [students, setStudents] = useState([
    { id: "STU001", name: "Rahul Sharma", rollNo: "01", present: true },
    { id: "STU002", name: "Priya Patel", rollNo: "02", present: true },
    { id: "STU003", name: "Arjun Kumar", rollNo: "03", present: true },
    { id: "STU004", name: "Sneha Reddy", rollNo: "04", present: true },
    { id: "STU005", name: "Vikram Singh", rollNo: "05", present: false },
    { id: "STU006", name: "Anita Gupta", rollNo: "06", present: true },
    { id: "STU007", name: "Kiran Joshi", rollNo: "07", present: true },
    { id: "STU008", name: "Deepika Nair", rollNo: "08", present: false }
  ]);

  const toggleAttendance = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, present: !student.present }
        : student
    ));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: true })));
  };

  const saveAttendance = () => {
    const presentCount = students.filter(s => s.present).length;
    const absentCount = students.length - presentCount;
    
    toast({
      title: "Attendance Saved",
      description: `${presentCount} present, ${absentCount} absent students marked for today.`,
    });
    
    onClose();
  };

  const presentStudents = students.filter(s => s.present).length;
  const absentStudents = students.length - presentStudents;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Mark Attendance - Class 10A
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{students.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{presentStudents}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">{absentStudents}</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllPresent}>
              <Users className="w-4 h-4 mr-2" />
              Mark All Present
            </Button>
          </div>

          {/* Student List */}
          <Card>
            <CardHeader>
              <CardTitle>Student Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map((student) => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={student.present}
                        onCheckedChange={() => toggleAttendance(student.id)}
                      />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Roll No: {student.rollNo} • ID: {student.id}
                        </p>
                      </div>
                    </div>
                    <Badge variant={student.present ? "default" : "destructive"}>
                      {student.present ? "Present" : "Absent"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={saveAttendance}>
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}