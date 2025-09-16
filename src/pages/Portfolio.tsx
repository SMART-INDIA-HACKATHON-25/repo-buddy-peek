import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Calendar, Trophy } from "lucide-react";
import { api, type Achievement } from "@/utils/api";

export default function Portfolio() {
  const [approvedAchievements, setApprovedAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await api.getMyAchievements();
        setApprovedAchievements(data.filter(a => a.status === 'Approved'));
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const handleDownloadPDF = () => {
    // Stub for PDF download functionality
    alert('PDF download feature coming soon!');
  };

  const getCategoryColor = (category: Achievement['category']) => {
    const colors = {
      'Academic': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Technical': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Sports': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Arts': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Community Service': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Leadership': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Portfolio</h1>
          <p className="text-muted-foreground">Showcase your approved achievements</p>
        </div>
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download as PDF
        </Button>
      </div>

      {/* Portfolio Header */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">SJ</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Sarah Johnson</h2>
              <p className="text-muted-foreground">Computer Science Student</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span>{approvedAchievements.length} Achievements</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Updated {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Categories Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {['Academic', 'Technical', 'Sports', 'Arts', 'Community Service', 'Leadership'].map(category => {
          const count = approvedAchievements.filter(a => a.category === category).length;
          return (
            <Card key={category} className="text-center p-4">
              <CardContent className="p-0">
                <p className="text-2xl font-bold text-primary">{count}</p>
                <p className="text-sm text-muted-foreground">{category}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievements Grid */}
      {approvedAchievements.length === 0 ? (
        <Card className="p-12 text-center">
          <CardContent>
            <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Approved Achievements Yet</h3>
            <p className="text-muted-foreground">
              Start by uploading your achievements to build your portfolio!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedAchievements.map((achievement) => (
            <Card key={achievement.id} className="hover-scale">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <FileText className="w-6 h-6 text-primary" />
                    <Badge className={getCategoryColor(achievement.category)}>
                      {achievement.category}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Approved on {achievement.approvedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}