import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function Dashboard() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();

  // Mock user data - in a real app this would come from authentication
  const getUserData = () => {
    switch (role) {
      case "student":
        return { 
          name: "Rahul Sharma", 
          isPresent: true // Mock attendance status
        };
      case "teacher":
        return { 
          name: "Dr. Meera Singh", 
          isPresent: true // Mock teacher status
        };
      case "admin":
        return { 
          name: "Mr. Rajesh Kumar", 
          isActive: true // Mock admin status
        };
      default:
        return null;
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole || userRole !== role) {
      navigate("/login");
      return;
    }
  }, [role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const userData = getUserData();

  if (!userData) {
    return <div>Invalid role</div>;
  }

  const renderDashboard = () => {
    switch (role) {
      case "student":
        return (
          <StudentDashboard 
            studentName={userData.name} 
            isPresent={userData.isPresent} 
          />
        );
      case "teacher":
        return (
          <TeacherDashboard 
            teacherName={userData.name} 
            isPresent={userData.isPresent} 
          />
        );
      case "admin":
        return (
          <AdminDashboard 
            adminName={userData.name} 
            isActive={userData.isActive} 
          />
        );
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-primary">SmartSchool Connect</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {renderDashboard()}
      </div>
    </div>
  );
}