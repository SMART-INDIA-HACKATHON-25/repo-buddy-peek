import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content with top padding for fixed nav */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to Your App
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of modern web design with smooth animations, 
              beautiful glassmorphism effects, and seamless dark mode.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="hover-scale">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="hover-scale">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Dark Mode",
                  description: "Seamless theme switching with system preference detection"
                },
                {
                  title: "Animated Background",
                  description: "Beautiful floating squares that respond to theme changes"
                },
                {
                  title: "Glass Navigation",
                  description: "Modern glassmorphism effect with backdrop blur"
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
