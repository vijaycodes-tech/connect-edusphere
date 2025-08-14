import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen } from "lucide-react";

export const UserRolesSection = () => {
  const roles = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Access homework, view grades, check attendance, and receive important announcements in real-time.",
      features: ["Homework Access", "Grade Viewing", "Attendance History", "Announcements", "Performance Analytics"],
      color: "bg-primary"
    },
    {
      icon: BookOpen,
      title: "Teachers", 
      description: "Manage classes, assign homework, track attendance, communicate with parents, and generate reports.",
      features: ["Attendance Marking", "Assignment Creation", "Grade Management", "Parent Communication", "Class Analytics"],
      color: "bg-secondary"
    },
    {
      icon: Users,
      title: "Administration",
      description: "Oversee entire school operations, manage announcements, monitor communications, and access analytics.",
      features: ["School-wide Management", "Analytics Dashboard", "Fee Management", "Communication Oversight", "Report Generation"],
      color: "bg-accent"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Designed for Every User
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tailored experiences for students, teachers, and administrators with role-based 
            access control and specialized dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="group hover:shadow-feature transition-all duration-300 hover:scale-105 bg-gradient-card border-none">
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-16 h-16 ${role.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {role.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-center leading-relaxed text-base">
                  {role.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {role.features.map((feature, featureIndex) => (
                    <Badge 
                      key={featureIndex} 
                      variant="secondary" 
                      className="text-xs bg-background border border-border hover:border-primary transition-colors"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};