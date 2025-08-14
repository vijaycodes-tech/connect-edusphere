import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (role: string) => {
    // Demo login - in real app, this would authenticate with backend
    localStorage.setItem("userRole", role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-feature">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">SmartSchool Connect</CardTitle>
          <CardDescription>Choose your role to access the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student" className="text-xs">
                <GraduationCap className="w-4 h-4 mr-1" />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="text-xs">
                <BookOpen className="w-4 h-4 mr-1" />
                Teacher
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-xs">
                <Users className="w-4 h-4 mr-1" />
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="student-email">Student ID / Email</Label>
                <Input 
                  id="student-email" 
                  placeholder="student@school.edu"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <Input 
                  id="student-password" 
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin("student")}
              >
                Login as Student
              </Button>
            </TabsContent>

            <TabsContent value="teacher" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="teacher-email">Teacher Email</Label>
                <Input 
                  id="teacher-email" 
                  placeholder="teacher@school.edu"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher-password">Password</Label>
                <Input 
                  id="teacher-password" 
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin("teacher")}
              >
                Login as Teacher
              </Button>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input 
                  id="admin-email" 
                  placeholder="admin@school.edu"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input 
                  id="admin-password" 
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin("admin")}
              >
                Login as Admin
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              onClick={() => navigate("/")}
              className="text-sm"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}