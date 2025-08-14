import { FeatureCard } from "./FeatureCard";
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  BarChart3, 
  CreditCard, 
  Phone, 
  Bell, 
  Shield,
  Calendar,
  FileText,
  Globe,
  Bot
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Attendance Tracking",
      description: "Real-time attendance marking with automated notifications to parents via WhatsApp, SMS, and app alerts."
    },
    {
      icon: BookOpen,
      title: "Homework & Assignments",
      description: "Teachers create assignments with due dates. Students and parents receive reminders through multiple channels."
    },
    {
      icon: Bell,
      title: "Smart Announcements",
      description: "Role-based announcement system for admin-wide, class-specific, or grade-level communications."
    },
    {
      icon: BarChart3,
      title: "Grade Tracking",
      description: "Dynamic performance dashboards with subject-wise grades and printable report cards for parents."
    },
    {
      icon: MessageSquare,
      title: "Private Messaging",
      description: "Secure one-to-one communication between teachers and parents with admin moderation capabilities."
    },
    {
      icon: Users,
      title: "Class-Wide Notifications",
      description: "Send personalized messages to every parent individually while maintaining privacy and confidentiality."
    },
    {
      icon: CreditCard,
      title: "Fee Management",
      description: "Comprehensive fee tracking with automated reminders and overdue notices via multiple channels."
    },
    {
      icon: Phone,
      title: "IVR Payment Calls",
      description: "Voice call reminders for unpaid fees with auto-generated scripts and routing options."
    },
    {
      icon: FileText,
      title: "Parent Feedback Portal",
      description: "Centralized feedback system with WhatsApp integration and comprehensive query management."
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Full support for Telugu, Hindi, and English with dynamic content translation capabilities."
    },
    {
      icon: Shield,
      title: "Advanced Analytics",
      description: "AI-powered insights for attendance patterns, performance trends, and fee delay predictions."
    },
    {
      icon: Bot,
      title: "AI SmartAlert",
      description: "Machine learning model that predicts fee delays and identifies at-risk students for proactive follow-up."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive School Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to streamline communication, track performance, and enhance 
            the educational experience for students, teachers, and parents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="animate-in fade-in duration-500"
            />
          ))}
        </div>
      </div>
    </section>
  );
};