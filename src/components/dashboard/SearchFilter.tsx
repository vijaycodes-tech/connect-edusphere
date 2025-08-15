import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, User, BookOpen, BarChart3 } from "lucide-react";

interface SearchFilterProps {
  showAdvanced?: boolean;
}

export default function SearchFilter({ showAdvanced = false }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("student");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockStudents = [
    { id: "STU001", name: "Rahul Sharma", class: "10A", attendance: "94%", grade: "A-" },
    { id: "STU002", name: "Priya Patel", class: "9B", attendance: "98%", grade: "A+" },
    { id: "STU003", name: "Arjun Kumar", class: "10B", attendance: "89%", grade: "B+" }
  ];

  const mockTeachers = [
    { id: "TCH001", name: "Dr. Meera Singh", subject: "Mathematics", classes: "10A, 10B", experience: "8 years" },
    { id: "TCH002", name: "Rajesh Gupta", subject: "Physics", classes: "9A, 9B", experience: "12 years" }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    if (searchType === "student") {
      const results = mockStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      const results = mockTeachers.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search & Filter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder={`Search by ${searchType === 'student' ? 'Student' : 'Teacher'} ID or Name...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Search Results:</h4>
            {searchResults.map((result, index) => (
              <Card key={index} className="p-4">
                {searchType === "student" ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {result.id} • Class: {result.class}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        {result.attendance}
                      </Badge>
                      <Badge variant="default">Grade: {result.grade}</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {result.id} • Subject: {result.subject}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">Classes: {result.classes}</Badge>
                      <Badge variant="secondary">{result.experience}</Badge>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}