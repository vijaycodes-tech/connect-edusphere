import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  BookOpen, 
  BarChart3, 
  MessageSquare, 
  Bell,
  LogOut,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Dashboard() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole || userRole !== role) {
      navigate("/login");
      return;
    }
    setCurrentUser(role || "");
  }, [role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const getDashboardData = () => {
    switch (role) {
      case "student":
        return {
          title: "Student Dashboard",
          icon: User,
          stats: [
            { label: "Attendance", value: "92%", color: "bg-secondary" },
            { label: "Pending Assignments", value: "3", color: "bg-accent" },
            { label: "Current Grade", value: "A-", color: "bg-primary" },
            { label: "Messages", value: "2", color: "bg-muted" }
          ],
          quickActions: [
            { label: "View Homework", icon: BookOpen, path: "/homework" },
            { label: "Check Grades", icon: BarChart3, path: "/grades" },
            { label: "Attendance History", icon: Calendar, path: "/attendance" },
            { label: "Messages", icon: MessageSquare, path: "/messages" }
          ],
          recentActivity: [
            { type: "assignment", title: "Math Assignment Due Tomorrow", time: "2 hours ago" },
            { type: "grade", title: "Science Test Grade: A", time: "1 day ago" },
            { type: "announcement", title: "School Sports Day Announcement", time: "2 days ago" }
          ]
        };

      case "teacher":
        return {
          title: "Teacher Dashboard",
          icon: BookOpen,
          stats: [
            { label: "Total Students", value: "124", color: "bg-secondary" },
            { label: "Classes Today", value: "6", color: "bg-accent" },
            { label: "Pending Grades", value: "8", color: "bg-primary" },
            { label: "Parent Messages", value: "5", color: "bg-muted" }
          ],
          quickActions: [
            { label: "Mark Attendance", icon: Calendar, path: "/attendance" },
            { label: "Create Assignment", icon: BookOpen, path: "/assignments" },
            { label: "Grade Students", icon: BarChart3, path: "/grading" },
            { label: "Parent Communication", icon: MessageSquare, path: "/communication" }
          ],
          recentActivity: [
            { type: "attendance", title: "Marked attendance for Class 10A", time: "1 hour ago" },
            { type: "assignment", title: "Created new Physics assignment", time: "3 hours ago" },
            { type: "message", title: "Replied to parent inquiry", time: "5 hours ago" }
          ]
        };

      case "admin":
        return {
          title: "Admin Dashboard",
          icon: User,
          stats: [
            { label: "Total Students", value: "1,247", color: "bg-secondary" },
            { label: "Active Teachers", value: "84", color: "bg-accent" },
            { label: "Pending Fees", value: "₹2.1L", color: "bg-primary" },
            { label: "System Alerts", value: "3", color: "bg-destructive" }
          ],
          quickActions: [
            { label: "Fee Management", icon: BarChart3, path: "/fees" },
            { label: "Send Announcements", icon: Bell, path: "/announcements" },
            { label: "Analytics", icon: BarChart3, path: "/analytics" },
            { label: "System Settings", icon: User, path: "/settings" }
          ],
          recentActivity: [
            { type: "fee", title: "Fee reminder sent to 45 parents", time: "30 mins ago" },
            { type: "announcement", title: "School holiday announcement posted", time: "2 hours ago" },
            { type: "alert", title: "3 students marked absent today", time: "4 hours ago" }
          ]
        };

      default:
        return null;
    }
  };

  const dashboardData = getDashboardData();

  if (!dashboardData) {
    return <div>Invalid role</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <dashboardData.icon className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">{dashboardData.title}</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.stats.map((stat, index) => (
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
                {dashboardData.quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-card transition-all"
                    onClick={() => navigate(action.path)}
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
              {dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-accent" />}
                    {activity.type === 'grade' && <BarChart3 className="w-4 h-4 text-secondary" />}
                    {activity.type === 'announcement' && <Bell className="w-4 h-4 text-primary" />}
                    {activity.type === 'attendance' && <Calendar className="w-4 h-4 text-secondary" />}
                    {activity.type === 'message' && <MessageSquare className="w-4 h-4 text-accent" />}
                    {activity.type === 'fee' && <BarChart3 className="w-4 h-4 text-primary" />}
                    {activity.type === 'alert' && <AlertCircle className="w-4 h-4 text-destructive" />}
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

        {/* Today's Schedule (for students and teachers) */}
        {(role === 'student' || role === 'teacher') && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "09:00 AM", subject: "Mathematics", status: "completed" },
                  { time: "10:30 AM", subject: "Science", status: "completed" },
                  { time: "12:00 PM", subject: "English", status: "ongoing" },
                  { time: "01:30 PM", subject: "History", status: "upcoming" },
                  { time: "03:00 PM", subject: "Physical Education", status: "upcoming" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        item.status === 'completed' ? 'secondary' :
                        item.status === 'ongoing' ? 'default' : 'outline'
                      }>
                        {item.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {item.status === 'ongoing' && <Clock className="w-3 h-3 mr-1" />}
                        {item.time}
                      </Badge>
                      <span className="font-medium">{item.subject}</span>
                    </div>
                    <span className="text-sm text-muted-foreground capitalize">{item.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}