import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  BookOpen, 
  BarChart3, 
  MessageSquare, 
  Bell,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface StudentDashboardProps {
  studentName: string;
  isPresent: boolean;
}

export default function StudentDashboard({ studentName, isPresent }: StudentDashboardProps) {
  const stats = [
    { label: "Attendance", value: "92%", color: "bg-secondary" },
    { label: "Pending Assignments", value: "3", color: "bg-accent" },
    { label: "Current Grade", value: "A-", color: "bg-primary" },
    { label: "Messages", value: "2", color: "bg-muted" }
  ];

  return (
    <div className="space-y-8">
      {/* Student Info Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground">{studentName}</p>
          </div>
        </div>
        <Badge variant={isPresent ? "default" : "destructive"} className="text-sm">
          {isPresent ? "🟢 Present" : "🔴 Absent"}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-card transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}