import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Bell,
  User,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Settings
} from "lucide-react";
import SearchFilter from "./SearchFilter";

interface AdminDashboardProps {
  adminName: string;
  isActive: boolean;
}

export default function AdminDashboard({ adminName, isActive }: AdminDashboardProps) {
  const stats = [
    { label: "Total Students", value: "1,247", color: "bg-secondary" },
    { label: "Active Teachers", value: "84", color: "bg-accent" },
    { label: "Pending Fees", value: "₹2.1L", color: "bg-primary" },
    { label: "System Alerts", value: "3", color: "bg-destructive" }
  ];

  const quickActions = [
    { label: "Fee Management", icon: DollarSign, path: "/fees" },
    { label: "Send Announcements", icon: Bell, path: "/announcements" },
    { label: "Analytics", icon: BarChart3, path: "/analytics" },
    { label: "System Settings", icon: Settings, path: "/settings" }
  ];

  const recentActivity = [
    { type: "fee", title: "Fee reminder sent to 45 parents", time: "30 mins ago" },
    { type: "announcement", title: "School holiday announcement posted", time: "2 hours ago" },
    { type: "alert", title: "3 students marked absent today", time: "4 hours ago" }
  ];

  const systemAlerts = [
    { type: "critical", message: "Server maintenance scheduled for tonight", time: "1 hour ago" },
    { type: "warning", message: "High fee pending rate in Class 8B", time: "3 hours ago" },
    { type: "info", message: "New teacher onboarding completed", time: "1 day ago" }
  ];

  const performanceMetrics = [
    { metric: "Overall Attendance", value: "94.2%", trend: "up", change: "+2.1%" },
    { metric: "Fee Collection Rate", value: "87.5%", trend: "down", change: "-1.3%" },
    { metric: "Parent Engagement", value: "78.9%", trend: "up", change: "+5.2%" },
    { metric: "Teacher Satisfaction", value: "92.1%", trend: "up", change: "+0.8%" }
  ];

  return (
    <div className="space-y-8">
      {/* Admin Info Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">{adminName}</p>
          </div>
        </div>
        <Badge variant={isActive ? "default" : "secondary"} className="text-sm">
          {isActive ? "🟢 Active" : "🔴 Inactive"}
        </Badge>
      </div>

      {/* Universal Search */}
      <SearchFilter showAdvanced={true} />

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

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Key Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                  <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'}>
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Administrative Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-card transition-all"
                  disabled={!isActive}
                >
                  <action.icon className="w-6 h-6 text-primary" />
                  <span className="font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 mt-1">
                  <AlertCircle className={`w-4 h-4 ${
                    alert.type === 'critical' ? 'text-destructive' :
                    alert.type === 'warning' ? 'text-accent' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Recent Administrative Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className="flex-shrink-0 mt-1">
                {activity.type === 'fee' && <DollarSign className="w-4 h-4 text-primary" />}
                {activity.type === 'announcement' && <Bell className="w-4 h-4 text-primary" />}
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

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Today's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg border">
              <p className="text-3xl font-bold text-primary">1,173</p>
              <p className="text-sm text-muted-foreground">Students Present</p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <p className="text-3xl font-bold text-accent">74</p>
              <p className="text-sm text-muted-foreground">Students Absent</p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <p className="text-3xl font-bold text-secondary">82</p>
              <p className="text-sm text-muted-foreground">Teachers Present</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}