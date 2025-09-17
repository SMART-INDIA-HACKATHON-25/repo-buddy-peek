import { useState } from "react";
import { Calendar, Clock, MapPin, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: "upcoming" | "ongoing" | "completed";
  organizer: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Symposium 2024",
    description: "Annual technology symposium featuring latest innovations in AI and ML",
    date: "2024-01-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    category: "Technology",
    status: "upcoming",
    organizer: "CS Department"
  },
  {
    id: 2,
    title: "Cultural Fest",
    description: "Three-day cultural festival celebrating diversity and talent",
    date: "2024-01-20",
    time: "10:00 AM",
    location: "Campus Grounds",
    category: "Cultural",
    status: "ongoing",
    organizer: "Student Council"
  },
  {
    id: 3,
    title: "Career Fair 2024",
    description: "Connect with top companies and explore career opportunities",
    date: "2024-01-25",
    time: "11:00 AM",
    location: "Sports Complex",
    category: "Career",
    status: "upcoming",
    organizer: "Placement Cell"
  },
  {
    id: 4,
    title: "Hackathon Challenge",
    description: "48-hour coding challenge to solve real-world problems",
    date: "2024-02-01",
    time: "08:00 AM",
    location: "Computer Lab",
    category: "Technology",
    status: "upcoming",
    organizer: "Coding Club"
  },
  {
    id: 5,
    title: "Research Conference",
    description: "Present your research and learn from peers",
    date: "2024-02-10",
    time: "02:00 PM",
    location: "Conference Hall",
    category: "Academic",
    status: "upcoming",
    organizer: "Research Committee"
  }
];

export default function Events() {
  const [events] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "ongoing": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upcoming Events</h1>
        <p className="text-muted-foreground">Stay updated with college events and activities</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Cultural">Cultural</SelectItem>
            <SelectItem value="Academic">Academic</SelectItem>
            <SelectItem value="Career">Career</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>

              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{event.category}</Badge>
                  <span className="text-xs text-muted-foreground">{event.organizer}</span>
                </div>
              </div>

              <Button className="w-full mt-4" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}