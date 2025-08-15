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

  const quickActions = [
    { label: "View Homework", icon: BookOpen, path: "/homework" },
    { label: "Check Grades", icon: BarChart3, path: "/grades" },
    { label: "Attendance History", icon: Calendar, path: "/attendance" },
    { label: "Messages", icon: MessageSquare, path: "/messages" }
  ];

  const recentActivity = [
    { type: "assignment", title: "Math Assignment Due Tomorrow", time: "2 hours ago" },
    { type: "grade", title: "Science Test Grade: A", time: "1 day ago" },
    { type: "announcement", title: "School Sports Day Announcement", time: "2 days ago" }
  ];

  const todaySchedule = [
    { time: "09:00 AM", subject: "Mathematics", status: "completed" },
    { time: "10:30 AM", subject: "Science", status: "completed" },
    { time: "12:00 PM", subject: "English", status: "ongoing" },
    { time: "01:30 PM", subject: "History", status: "upcoming" },
    { time: "03:00 PM", subject: "Physical Education", status: "upcoming" }
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
                  {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-accent" />}
                  {activity.type === 'grade' && <BarChart3 className="w-4 h-4 text-secondary" />}
                  {activity.type === 'announcement' && <Bell className="w-4 h-4 text-primary" />}
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
                    {!isPresent ? <AlertCircle className="w-3 h-3 mr-1" /> :
                     item.status === 'completed' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                     item.status === 'ongoing' ? <Clock className="w-3 h-3 mr-1" /> : null}
                    {item.time}
                  </Badge>
                  <span className="font-medium">{item.subject}</span>
                </div>
                <span className="text-sm text-muted-foreground capitalize">
                  {!isPresent ? "Not Applicable" : item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}