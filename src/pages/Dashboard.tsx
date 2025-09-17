import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { AchievementCard } from "@/components/AchievementCard";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { api, type Achievement } from "@/utils/api";

interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  portfolioProgress: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔑 New state for animated chart
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, achievementsData] = await Promise.all([
          api.getDashboardStats(),
          api.getMyAchievements()
        ]);
        setStats(statsData as DashboardStats);
        setRecentAchievements(achievementsData.slice(0, 3)); // Show only recent 3
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔑 Animate doughnut when stats load
  useEffect(() => {
    if (stats?.portfolioProgress !== undefined) {
      let start = 0;
      const end = stats.portfolioProgress;
      const duration = 1000; // 1 second
      const stepTime = 10;
      const step = (end - start) / (duration / stepTime);

      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setAnimatedProgress(Math.round(start));
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [stats?.portfolioProgress]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah! 👋</h1>
        <p className="text-muted-foreground">Here's your achievement overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Achievements"
          value={stats?.total || 0}
          trend="+2 this month"
          icon={<Trophy className="w-5 h-5" />}
        />
        <StatsCard
          title="Pending Approvals"
          value={stats?.pending || 0}
          icon={<Clock className="w-5 h-5" />}
        />
        <StatsCard
          title="Approved"
          value={stats?.approved || 0}
          trend="+1 this week"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatsCard
          title="Rejected"
          value={stats?.rejected || 0}
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Achievements */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Achievements</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Portfolio Progress */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <h3 className="text-lg font-semibold mb-4">Portfolio Progress</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted"
                  />
                  {/* Animated progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - animatedProgress / 100)}`}
                    className="text-primary transition-all duration-100 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {animatedProgress}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Complete your profile to stand out
              </p>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Keep uploading achievements to build your portfolio!
              </p>
            </div>
          </div>

          {/* This Week Section */}
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <h3 className="text-lg font-semibold mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                <div>
                  <p className="font-medium text-sm">Achievements Submitted</p>
                  <p className="text-2xl font-bold text-primary">2</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                <div>
                  <p className="font-medium text-sm">Portfolio Views</p>
                  <p className="text-2xl font-bold text-primary">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
