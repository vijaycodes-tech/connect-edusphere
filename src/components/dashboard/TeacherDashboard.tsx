import { useState } from "react";
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
  Search,
  Plus,
  UserCheck
} from "lucide-react";
import SearchFilter from "./SearchFilter";
import AttendanceManager from "./AttendanceManager";
import AssignmentCreator from "./AssignmentCreator";
import ParentCommunication from "./ParentCommunication";

interface TeacherDashboardProps {
  teacherName: string;
  isPresent: boolean;
}

export default function TeacherDashboard({ teacherName, isPresent }: TeacherDashboardProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const stats = [
    { label: "Total Students", value: "124", color: "bg-secondary" },
    { label: "Classes Today", value: "6", color: "bg-accent" },
    { label: "Pending Grades", value: "8", color: "bg-primary" },
    { label: "Parent Messages", value: "5", color: "bg-muted" }
  ];

  const quickActions = [
    { label: "Mark Attendance", icon: UserCheck, action: () => setActiveModal("attendance") },
    { label: "Create Assignment", icon: Plus, action: () => setActiveModal("assignment") },
    { label: "Grade Students", icon: BarChart3, action: () => {} },
    { label: "Parent Communication", icon: MessageSquare, action: () => setActiveModal("communication") }
  ];

  const recentActivity = [
    { type: "attendance", title: "Marked attendance for Class 10A", time: "1 hour ago" },
    { type: "assignment", title: "Created new Physics assignment", time: "3 hours ago" },
    { type: "message", title: "Replied to parent inquiry", time: "5 hours ago" }
  ];

  const professionalDevelopment = [
    { title: "Lesson Plan Review - Mathematics", dueDate: "Today", status: "pending" },
    { title: "Staff Meeting Preparation", dueDate: "Tomorrow", status: "completed" },
    { title: "Student Assessment Report", dueDate: "This Week", status: "in-progress" }
  ];

  const todaySchedule = [
    { time: "09:00 AM", subject: "Mathematics - Class 10A", status: "completed" },
    { time: "10:30 AM", subject: "Physics - Class 10B", status: "completed" },
    { time: "12:00 PM", subject: "Mathematics - Class 9A", status: "ongoing" },
    { time: "01:30 PM", subject: "Physics - Class 9B", status: "upcoming" },
    { time: "03:00 PM", subject: "Faculty Meeting", status: "upcoming" }
  ];

  return (
    <div className="space-y-8">
      {/* Teacher Info Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground">{teacherName}</p>
          </div>
        </div>
        <Badge variant={isPresent ? "default" : "destructive"} className="text-sm">
          {isPresent ? "🟢 Active" : "🔴 Inactive"}
        </Badge>
      </div>

      {/* Search Filter */}
      <SearchFilter />

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-card transition-all"
                  onClick={action.action}
                  disabled={!isPresent}
                >
                  <action.icon className="w-6 h-6 text-primary" />
                  <span className="font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 mt-1">
                  {activity.type === 'attendance' && <Calendar className="w-4 h-4 text-secondary" />}
                  {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-accent" />}
                  {activity.type === 'message' && <MessageSquare className="w-4 h-4 text-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Professional Development */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            My Assignments / Professional Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {professionalDevelopment.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Badge variant={
                    task.status === 'completed' ? 'secondary' :
                    task.status === 'in-progress' ? 'default' : 'outline'
                  }>
                    {task.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {task.dueDate}
                  </Badge>
                  <span className="font-medium">{task.title}</span>
                </div>
                <span className="text-sm text-muted-foreground capitalize">{task.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  !isPresent ? 'opacity-50 bg-muted/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Badge variant={
                    !isPresent ? 'secondary' :
                    item.status === 'completed' ? 'secondary' :
                    item.status === 'ongoing' ? 'default' : 'outline'
                  }>
                    {item.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {item.status === 'ongoing' && <Clock className="w-3 h-3 mr-1" />}
                    {item.time}
                  </Badge>
                  <span className="font-medium">{item.subject}</span>
                </div>
                <span className="text-sm text-muted-foreground capitalize">
                  {!isPresent ? "Unavailable" : item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {activeModal === "attendance" && (
        <AttendanceManager onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "assignment" && (
        <AssignmentCreator onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "communication" && (
        <ParentCommunication onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}