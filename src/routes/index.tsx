import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTRPC } from "~/trpc/react";
import toast from "react-hot-toast";
import { Sun, Moon, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const trpc = useTRPC();
  const [username, setUsername] = useState("");

  const handleGetStarted = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    try {
      const result = await trpc.getOrCreateUser.query({ username });
      toast.success("Welcome! Let's start your dream journey");
      
      // Store user in local state or navigate
      sessionStorage.setItem("userId", result.userId.toString());
      sessionStorage.setItem("username", result.username);
      navigate({ to: "/dreams/new" });
    } catch (error) {
      console.error("Failed to create user:", error);
      toast.error("Failed to create user. Try another username.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Moon className="w-20 h-20 text-purple-400" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Melatonin
          </h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
            Your AI-powered dream journal with social circles, rituals, and deep insights
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5" />
              <span>Dream Journaling</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>AI Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Social Circles</span>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="max-w-md mx-auto bg-purple-900/30 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-semibold mb-6 text-center">Get Started</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-purple-800/30 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-gray-400"
                onKeyPress={(e) => e.key === "Enter" && handleGetStarted()}
              />
            </div>
            <button
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Dreaming
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-4">
            By continuing, you'll start tracking your dreams and unlocking insights
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            icon={<Moon className="w-8 h-8" />}
            title="Dream Journaling"
            description="Record dreams with voice notes, mood tracking, and detailed entries"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="AI Analysis"
            description="Get insights, symbol analysis, and pattern detection powered by AI"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Dream Circles"
            description="Share dreams in private circles and get insights from your community"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: JSX.Element, title: string, description: string }) {
  return (
    <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all">
      <div className="text-purple-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
