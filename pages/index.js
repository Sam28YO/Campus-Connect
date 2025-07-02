import { useState, useEffect } from "react"
import {
  Search,
  MessageSquare,
  Bell,
  Star,
  ArrowRight,
  CheckCircle,
  Gift,
  Timer,
  Sparkles,
  Rocket,
  Award,
  Heart,
  Sun,
  Moon,
  Quote,
  Users,
  GraduationCap,
  Calendar,
  UserPlus,
  Filter,
  MapPin,
  Code,
  Mic,
  Notebook,
  GroupIcon as TeamIcon,
  Cpu,
  PenTool,
} from "lucide-react"
import Image from 'next/image'
const Home = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [showOffer, setShowOffer] = useState(false);
  const studentActivities = [
    "🚀 Aayushi from NIT just joined 'AI Builders Hackathon' - 2 minutes ago",
    "🎯 Rohan from IITB registered for 'Code Sprint' - 5 minutes ago",
    "🧠 Mehak from BITS is attending 'Neural Networks Talk' - 10 minutes ago",
    "👩‍💻 Anjali from VIT joined 'Frontend Fiesta' - 15 minutes ago",
    "📱 Aryan from IIITD is in 'Mobile Dev Bootcamp' - 20 minutes ago"
  ];

  // Dummy values (replace with real timer logic)
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 4,
    minutes: 8,
    seconds: 46,
  });

  const seatsLeft = 27; // replace with actual state/prop


  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    setIsVisible(true)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Enhanced countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    // Set future end time: now + 15d 8h 26m 59s
    const endTime = new Date().getTime() + (
      (15 * 24 * 60 * 60 + 8 * 60 * 60 + 26 * 60 + 59) * 1000
    );

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // initialize immediately

    return () => clearInterval(interval);
  }, []);


  const features = [
    {
      icon: Search,
      title: "AI-Powered Discovery",
      description:
        "Smart recommendations that learn your interests and connect you with perfect events, opportunities, and communities.",
      gradient: "from-indigo-500 to-purple-500",
      highlight: "Machine Learning Powered",
      delay: "0.1s",
    },
    {
      icon: TeamIcon,
      title: "Team Formation",
      description:
        "Find teammates with complementary skills for hackathons and projects using our intelligent matching system.",
      gradient: "from-purple-500 to-pink-500",
      highlight: "Skill-Based Matching",
      delay: "0.2s",
    },
    {
      icon: Calendar,
      title: "Event Calendar",
      description:
        "Never miss important campus events with integrated reminders and seamless calendar synchronization.",
      gradient: "from-blue-500 to-teal-500",
      highlight: "Google Calendar Sync",
      delay: "0.3s",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Intelligent notification system that learns your preferences and delivers personalized updates at the perfect time.",
      gradient: "from-purple-400 to-indigo-400",
      highlight: "AI-Driven Insights",
      delay: "0.4s",
    },
  ]

  const upcomingEvents = [
    {
      title: "Annual Hackathon",
      date: "Oct 15-17, 2023",
      type: "Hackathon",
      icon: <Code className="w-5 h-5" />,
      university: "IIT Delhi",
      participants: "500+",
      delay: "0.1s",
    },
    {
      title: "Tech Speaker Series",
      date: "Nov 5, 2023",
      type: "Lecture",
      icon: <Mic className="w-5 h-5" />,
      university: "BITS Pilani",
      participants: "200+",
      delay: "0.2s",
    },
    {
      title: "Coding Bootcamp",
      date: "Dec 10-12, 2023",
      type: "Workshop",
      icon: <Notebook className="w-5 h-5" />,
      university: "NIT Trichy",
      participants: "150+",
      delay: "0.3s",
    },
    {
      title: "AI & Robotics Challenge",
      date: "Jan 20-22, 2024",
      type: "Competition",
      icon: <Cpu className="w-5 h-5" />,
      university: "IIT Bombay",
      participants: "300+",
      delay: "0.4s",
    },
    {
      title: "Design Thinking Jam",
      date: "Feb 7, 2024",
      type: "Workshop",
      icon: <PenTool className="w-5 h-5" />,
      university: "NID Ahmedabad",
      participants: "100+",
      delay: "0.5s",
    },
    {
      title: "Future of Tech Panel",
      date: "Mar 15, 2024",
      type: "Talk",
      icon: <Users className="w-5 h-5" />,
      university: "IIIT Hyderabad",
      participants: "250+",
      delay: "0.6s",
    },
  ];


  // Enhanced testimonials data
  const testimonials = [
    {
      name: "Ananya Sharma",
      university: "IIT Delhi",
      course: "Computer Science",
      review:
        "Found my perfect hackathon team in just 2 days! We won the Smart India Hackathon thanks to CampusConnect's amazing matching system.",
      rating: 5,
      avatar: "AS",
      delay: "0.1s",
    },
    {
      name: "Rohan Verma",
      university: "BITS Pilani",
      course: "Electronics Engineering",
      review:
        "The event discovery saved me hours. I attended 3x more workshops this semester and my network has grown exponentially!",
      rating: 5,
      avatar: "RV",
      delay: "0.2s",
    },
    {
      name: "Priya Nair",
      university: "NIT Trichy",
      course: "Information Technology",
      review:
        "I've joined 3 new student clubs thanks to the discovery system. The community features are absolutely amazing!",
      rating: 5,
      avatar: "PN",
      delay: "0.3s",
    },
  ]

  const stats = [
    { value: "3,200+", label: "Students Joined", icon: Users },
    { value: "120+", label: "Events Hosted", icon: Calendar },
    { value: "45+", label: "Campuses", icon: GraduationCap },
  ]

  const howItWorksSteps = [
    {
      icon: "/profile.svg",
      title: "Create Profile",
      description: "Sign up as student or organizer in 30 seconds with skill verification",
      step: "1",
    },
    {
      icon: '/explore.svg',
      title: "Explore & Discover",
      description: "Find events or students by skills, interests, and location preferences",
      step: "2",
    },
    {
      icon: '/Collaborate.svg',
      title: "Connect & Collaborate",
      description: "Message and collaborate instantly with built-in project management tools",
      step: "3",
    },
  ]

  const searchFeatures = [
    {
      icon: <Filter className="w-5 h-5" />,
      text: "Filter by event type (Hackathons, Talks, Workshops, Competitions)",
    },
    {
      icon: <Code className="w-5 h-5" />,
      text: "Search by skills (Web Dev, AI, Design, Data Science, Mobile)",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Location-based recommendations with distance preferences",
    },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const AnimatedCounter = ({ value, label, icon: Icon }) => (
    <div
      className={`group ${theme === "dark" ? "bg-white/10 hover:bg-white/15 hover:shadow-purple-500/20" : "bg-indigo-50 hover:bg-indigo-100 hover:shadow-indigo-500/20"} backdrop-blur-xl rounded-2xl p-6 border ${theme === "dark" ? "border-white/20" : "border-indigo-200"} transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="flex items-center justify-center mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gradient-to-r from-purple-500 to-yellow-400" : "bg-gradient-to-r from-indigo-600 to-purple-600"} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div
        className={`text-4xl font-black mb-2 group-hover:scale-110 transition-transform duration-300 text-center ${theme === "dark" ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-300" : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"}`}
      >
        {value}
      </div>
      <div className={`font-medium text-center ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}>{label}</div>
    </div>
  )

  const FeatureCard = ({ feature, index }) => {
    const Icon = feature.icon
    return (
      <div
        className={`group relative ${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-yellow-50 hover:bg-yellow-100"} backdrop-blur-xl rounded-3xl p-8 border ${theme === "dark" ? "border-white/10" : "border-yellow-200"}   transform hover:-translate-y-4 hover:shadow-2xl `}
        style={{ animationDelay: feature.delay }}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10  rounded-3xl`}
        ></div>

        {/* Floating icon container */}
        <div
          className={`relative w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6  shadow-lg`}
        >
          <Icon className="w-10 h-10 text-white" />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 `}
          ></div>
        </div>

        <h3
          className={`text-2xl font-bold mb-4  ${theme === "dark" ? "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-yellow-300" : "text-indigo-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600"}`}
        >
          {feature.title}
        </h3>

        <p
          className={`leading-relaxed mb-6  ${theme === "dark" ? "text-gray-300 group-hover:text-gray-200" : "text-indigo-700 group-hover:text-indigo-800"}`}
        >
          {feature.description}
        </p>

        <div
          className={`inline-flex items-center gap-2 bg-gradient-to-r ${feature.gradient} bg-opacity-20 backdrop-blur-sm border ${theme === "dark" ? "border-white/20" : "border-indigo-200"} rounded-full px-4 py-2 group-hover:scale-105 `}
        >
          <CheckCircle className={`w-4 h-4 ${theme === "dark" ? "text-yellow-400" : "text-indigo-600"}`} />
          <span className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-indigo-800"}`}>
            {feature.highlight}
          </span>
        </div>
      </div>
    )
  }

  const TestimonialCard = ({ testimonial, index }) => (
    <div
      className={`group relative backdrop-blur-xl rounded-3xl p-8 border transition-all  transform hover:-translate-y-2 hover:shadow-2xl transform-transition ${theme === "dark" ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20" : "bg-yellow-50/80 hover:bg-yellow-100/80 border-yellow-200 hover:border-yellow-300"}`}
      style={{ animationDelay: testimonial.delay }}
    >
      {/* Quote icon */}
      <div className="absolute -top-4 -left-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"} shadow-lg`}
        >
          <Quote className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Rating stars */}
      <div className="flex items-center gap-1 mb-6 mt-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 fill-current ${theme === "dark" ? "text-yellow-400" : "text-yellow-500"} animate-pulse`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Review text */}
      <blockquote
        className={`text-lg leading-relaxed mb-8 ${theme === "dark" ? "text-gray-300 group-hover:text-white" : "text-indigo-800 group-hover:text-indigo-900"} transition-colors duration-300`}
      >
        "{testimonial.review}"
      </blockquote>
      {/* Student info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg ${theme === "dark" ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"} shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {testimonial.avatar}
        </div>

        <div className="flex-1">
          <div className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-indigo-900"}`}>
            {testimonial.name}
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className={`w-4 h-4 ${theme === "dark" ? "text-yellow-400" : "text-indigo-600"}`} />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-yellow-300" : "text-indigo-700"}`}>
              {testimonial.course}
            </span>
          </div>
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-indigo-600"}`}>
            {testimonial.university}
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${theme === "dark" ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-indigo-400 to-purple-400"}`}
      ></div>
    </div>
  )

  const EventCard = ({ event }) => (
    <div
      className={`group relative backdrop-blur-xl rounded-3xl p-8 border   transform hover:-translate-y-2 hover:shadow-2xl  ${theme === "dark" ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20" : "bg-yellow-50/80 hover:bg-yellow-100/80 border-yellow-200 hover:border-yellow-300"}`}
      style={{ animationDelay: event.delay }}
    >
      {/* Event type badge */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-3 rounded-xl ${theme === "dark" ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"} group-hover:scale-110 `}
        >
          {event.icon}
        </div>
        <span
          className={`font-bold px-3 py-1 rounded-full text-sm ${theme === "dark" ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-700"}`}
        >
          {event.type}
        </span>
      </div>

      <h3
        className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-yellow-300" : "text-indigo-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600"}  `}
      >
        {event.title}
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className={`w-4 h-4 ${theme === "dark" ? "text-yellow-400" : "text-indigo-600"}`} />
        <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}>
          {event.university}
        </span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          {event.date}
        </span>
        <span className={`text-sm font-bold ${theme === "dark" ? "text-yellow-400" : "text-indigo-600"}`}>
          {event.participants} participants
        </span>
      </div>

      <button
        className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${theme === "dark" ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"}`}
      >
        View Details
      </button>

      {/* Hover effect overlay */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${theme === "dark" ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-gradient-to-r from-indigo-400 to-purple-400"}`}
      ></div>
    </div>
  )

  const HowItWorksCard = ({ step, index }) => {
    return (
      <div
        className={`group relative rounded-3xl p-8 border   hover:shadow-2xl  ${theme === 'dark'
          ? 'bg-gradient-to-br from-yellow-600 via-yellow-500 to-orange-400 border-yellow-300'
          : 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-white border-yellow-200'
          }`}

      >

        {/* Step number */}
        <div className="absolute -top-4 -right-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${theme === 'dark'
              ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              } shadow-lg`}
          >
            {step.step}
          </div>
        </div>

        {/* Icon (SVG image) */}
        <div
          className={`w-40 h-40 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6  `}
        >
          <Image
            src={step.icon}
            alt={step.title}
            width={320} // equivalent to w-80 (80 x 4 = 320px)
            height={320} // equivalent to h-80
            className="rounded-xl"
          />
        </div>

        <h3
          className={`text-2xl font-bold mb-4 text-center ${theme === 'dark'
            ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600'
            : 'text-indigo-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600'
            } `}
        >
          {step.title}
        </h3>

        <p
          className={`text-center leading-relaxed ${theme === 'dark'
            ? 'text-black group-hover:text-gray-200'
            : 'text-indigo-700 group-hover:text-indigo-800'
            } `}
        >
          {step.description}
        </p>

        {/* Hover effect overlay */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${theme === 'dark'
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
            : 'bg-gradient-to-r from-indigo-400 to-purple-400'
            }`}
        ></div>
      </div>
    );
  };


  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-500 ${theme === "dark" ? "bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900" : "bg-gradient-to-br from-yellow-50 via-indigo-50 to-purple-50"}`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110 ${theme === "dark" ? "bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20" : "bg-indigo-100 border-indigo-200 text-indigo-600 hover:bg-indigo-200"}`}
      >
        {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse-slow ${theme === "dark" ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-indigo-300 to-purple-300"}`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse-slow animation-delay-2000 ${theme === "dark" ? "bg-gradient-to-r from-purple-500 to-yellow-400" : "bg-gradient-to-r from-purple-300 to-yellow-200"}`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl animate-pulse-slow animation-delay-4000 ${theme === "dark" ? "bg-gradient-to-r from-yellow-400 to-indigo-500" : "bg-gradient-to-r from-yellow-200 to-indigo-300"}`}
        ></div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-float ${theme === "dark" ? "bg-gradient-to-r from-indigo-400 to-yellow-300 opacity-40" : "bg-gradient-to-r from-indigo-400 to-purple-400 opacity-60"}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Mouse follower effect */}
      <div
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen transition-all duration-100 ease-out ${theme === "dark" ? "bg-gradient-to-r from-indigo-500 to-yellow-300 opacity-30" : "bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20"}`}
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: "scale(0.8)",
        }}
      ></div>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                {/* Animated pre-launch badge */}
                <div
                  className={`inline-flex items-center gap-3 backdrop-blur-xl rounded-full px-8 py-4 mb-8 border transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${theme === "dark" ? "bg-gradient-to-r from-purple-500/20 to-yellow-400/20 border-white/20" : "bg-gradient-to-r from-indigo-100 to-yellow-100 border-indigo-200"}`}
                >
                  <div className="relative">
                    <Rocket
                      className={`w-6 h-6 animate-bounce ${theme === "dark" ? "text-purple-400" : "text-indigo-600"}`}
                    />
                    <div
                      className={`absolute inset-0 rounded-full blur-md opacity-50 animate-pulse ${theme === "dark" ? "bg-purple-400" : "bg-indigo-400"}`}
                    ></div>
                  </div>
                  <span
                    className={`font-bold text-lg ${theme === "dark" ? "text-white bg-gradient-to-r from-purple-400 to-yellow-300 bg-clip-text text-transparent" : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"}`}
                  >
                    Early Access Now Open
                  </span>
                  <Sparkles
                    className={`w-6 h-6 animate-spin-slow ${theme === "dark" ? "text-yellow-400" : "text-purple-500"}`}
                  />
                </div>

                {/* Enhanced main heading */}
                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
                >
                  Connect with Students & Organizers for{" "}
                  <span
                    className={`text-transparent bg-clip-text animate-gradient-flow ${theme === "dark" ? "bg-gradient-to-r from-purple-400 via-yellow-300 to-indigo-400" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-yellow-500"}`}
                  >
                    Events, Hackathons
                  </span>{" "}
                  and More!
                </h1>

                <p
                  className={`text-xl mb-8 max-w-2xl transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}
                >
                  Find collaborators, speakers, or teams for your next college event in seconds with our AI-powered
                  matching system.
                </p>

                <div
                  className={`flex flex-wrap gap-4 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <button
                    className={`group px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl ${theme === "dark" ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"}`}
                  >
                    <span className="flex items-center gap-2">
                      Find Students
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  <button
                    className={`group px-8 py-4 rounded-2xl font-bold border transition-all duration-300 transform hover:scale-105 ${theme === "dark" ? "border-white/20 hover:bg-white/10 text-white" : "border-indigo-200 hover:bg-indigo-50 text-indigo-700"}`}
                  >
                    Host Event
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <div
                  className={`rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${theme === "dark" ? "ring-1 ring-white/10" : "ring-1 ring-indigo-200"}`}
                >
                  <Image
                    src="/campuspic.jpg" // Replace with your image path
                    alt="Campus Life"
                    width={700}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden mt-6">
            <div className="flex animate-scroll-loop whitespace-nowrap">
              {[...studentActivities, ...studentActivities].map((activity, index) => (
                <div
                  key={index}
                  className={`min-w-max px-6 py-3 mx-2 rounded-2xl text-sm font-bold shadow-md 
          ${theme === "dark" ? "bg-purple-900 text-purple-200" : "bg-indigo-100 text-indigo-800"}`}
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>


        </section>

        {/* How It Works Section */}
        <section
          className={`py-24 backdrop-blur-sm border-y ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-indigo-50/50 border-indigo-200"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2
                className={`text-4xl md:text-5xl font-black mb-6 ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
              >
                How{" "}
                <span
                  className={`text-transparent bg-clip-text animate-gradient-flow ${theme === "dark" ? "bg-gradient-to-r from-purple-400 via-yellow-300 to-indigo-400" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-yellow-500"}`}
                >
                  CampusConnect
                </span>{" "}
                Works
              </h2>
              <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}>
                Get started in just 3 simple steps and transform your campus experience
              </p>
            </div>


            <div className="grid md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => (
                <HowItWorksCard key={index} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>


        {/* Smart Search Section */}
        <section
          className={`py-24 ${theme === "dark" ? "bg-gradient-to-br from-slate-900 to-slate-950" : "bg-gradient-to-br from-yellow-50 to-indigo-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2
                  className={`text-4xl md:text-5xl font-black mb-8 ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
                >
                  Find Exactly What You{" "}
                  <span
                    className={`text-transparent bg-clip-text ${theme === "dark" ? "bg-gradient-to-r from-yellow-400 to-purple-400" : "bg-gradient-to-r from-indigo-600 to-purple-600"}`}
                  >
                    Need
                  </span>
                </h2>
                <p className={`text-xl mb-10 ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}>
                  Our powerful AI-driven search helps you discover opportunities that match your interests perfectly:
                </p>

                <div className="space-y-6">
                  {searchFeatures.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl mt-1 ${theme === "dark" ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"} shadow-lg`}
                      >
                        <div className="text-white">{item.icon}</div>
                      </div>
                      <p className={`text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-indigo-800"}`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <div
                  className={`rounded-3xl overflow-hidden shadow-2xl ${theme === "dark" ? "bg-white ring-1 ring-white/10" : "bg-white ring-1 ring-indigo-200"} backdrop-blur-xl`}
                >
                  <div className={`w-full h-96 flex items-center justify-center`}>
                    <Image
                      src="/profile.svg"
                      alt="Smart Search"
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className={`py-24 backdrop-blur-sm border-y ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-indigo-50/50 border-indigo-200"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl md:text-5xl font-black mb-6 ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
              >
                Upcoming{" "}
                <span
                  className={`text-transparent bg-clip-text ${theme === "dark" ? "bg-gradient-to-r from-yellow-400 to-purple-400" : "bg-gradient-to-r from-indigo-600 to-purple-600"}`}
                >
                  Featured Events
                </span>
              </h2>
              <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}>
                Don't miss these exciting opportunities to learn, network, and grow
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          </div>
        </section>
        {/* Enhanced Features Section */}
        <section
          className={`py-24 backdrop-blur-sm border-y ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-indigo-50/50 border-indigo-200"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2
                className={`text-4xl md:text-6xl font-black mb-8 ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
              >
                <span className="block">Powerful Features for</span>
                <span
                  className={`block text-transparent bg-clip-text animate-gradient-flow ${theme === "dark" ? "bg-gradient-to-r from-purple-400 via-yellow-300 to-indigo-400" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-yellow-500"}`}
                >
                  Modern Students
                </span>
              </h2>
              <p
                className={`text-xl max-w-3xl mx-auto leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}
              >
                Everything you need to excel in your academic and professional journey, all in one platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section
          className={`py-24 border-t ${theme === "dark" ? "bg-gradient-to-br from-slate-900 to-slate-950 border-white/10" : "bg-gradient-to-br from-yellow-50 to-indigo-50 border-indigo-200"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Users className={`w-8 h-8 ${theme === "dark" ? "text-yellow-400" : "text-indigo-600"}`} />
                <h2
                  className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text ${theme === "dark" ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-yellow-300" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-yellow-500"}`}
                >
                  What Students Say
                </h2>
                <Sparkles className={`w-8 h-8 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
              </div>
              <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}>
                Real success stories from students who transformed their campus experience with CampusConnect.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>

            {/* Additional stats */}
            <div className="mt-16 text-center">
              <div
                className={`inline-flex items-center gap-6 backdrop-blur-xl rounded-2xl px-8 py-4 border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-yellow-50/80 border-yellow-200"}`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-black ${theme === "dark" ? "text-yellow-400" : "text-indigo-600"}`}>
                    4.9/5
                  </div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-indigo-600"}`}>
                    Average Rating
                  </div>
                </div>
                <div className={`w-px h-12 ${theme === "dark" ? "bg-white/20" : "bg-indigo-200"}`}></div>
                <div className="text-center">
                  <div className={`text-2xl font-black ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>
                    500+
                  </div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-indigo-600"}`}>
                    Beta Testers
                  </div>
                </div>
                <div className={`w-px h-12 ${theme === "dark" ? "bg-white/20" : "bg-indigo-200"}`}></div>
                <div className="text-center">
                  <div className={`text-2xl font-black ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>
                    98%
                  </div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-indigo-600"}`}>
                    Would Recommend
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Activity Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl md:text-5xl font-black mb-6 ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
              >
                Join Our{" "}
                <span
                  className={`text-transparent bg-clip-text ${theme === "dark" ? "bg-gradient-to-r from-purple-400 to-yellow-300" : "bg-gradient-to-r from-indigo-600 to-purple-600"}`}
                >
                  Growing Community
                </span>
              </h2>
              <p className={`text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-indigo-700"}`}>
                Students from top campuses across India are already connecting and collaborating
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, i) => (
                <AnimatedCounter key={i} value={stat.value} label={stat.label} icon={stat.icon} />
              ))}
            </div>


          </div>
        </section>

        {/* Upcoming Events Section */}


        {/* Enhanced Countdown Timer Section */}
        <button
          onClick={() => setShowOffer(true)}
          className={`fixed bottom-6 left-6 z-50 py-4 px-6 rounded-full shadow-xl text-sm font-black flex items-center gap-4 transition-transform duration-300 hover:scale-105
    ${theme === "dark"
              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            }`}
        >
          <div className="flex items-center gap-1 font-bold">
            <Gift className="w-4 h-4" />
            Early Bird Offer
          </div>

          <span className="text-sm font-bold">•</span>

          <div className="text-xs font-bold">
            ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>

          <span className="text-sm font-bold">•</span>

          <div className="text-xs font-bold">
            {seatsLeft} seats left
          </div>
        </button>



        {showOffer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center px-4">
            <div
              className={`rounded-3xl max-w-md w-full p-6 relative z-50 shadow-2xl ${theme === "dark"
                ? "bg-gradient-to-br from-indigo-200 to-purple-200 text-indigo-900"
                : "bg-white text-indigo-900"
                }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowOffer(false)}
                className="absolute top-3 right-3 text-xl font-bold"
              >
                ✕
              </button>

              {/* Title + Offer */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-black">🎁 Early Bird Offer</h3>

                <p className="text-sm font-medium">
                  ₹2,500 <span className="line-through text-gray-500">₹2,500</span> → <span className="font-bold text-lg text-green-600">₹250</span> for 4 years
                </p>

                {/* Countdown */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl px-4 py-6 text-center shadow-md transition-all duration-300 
        ${theme === 'dark'
                          ? 'bg-gradient-to-br from-white/10 to-white/5 text-black'
                          : 'bg-gradient-to-br from-yellow-100 to-indigo-50 text-indigo-900'
                        }`}
                    >
                      <div className={`text-3xl font-extrabold tracking-wide`}>
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm font-semibold uppercase tracking-wide opacity-80">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>


                {/* Progress Bar for Seats */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span>Seats Remaining</span>
                    <span>{seatsLeft}/100</span>
                  </div>
                  <div className="h-3 rounded-full bg-indigo-100 dark:bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
                      style={{ width: `${100 - seatsLeft}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2 text-red-500 font-medium">
                    ⏳ Hurry! Only {seatsLeft} seats left
                  </p>
                </div>

                {/* CTA */}
                <button
                  className={`mt-6 w-full py-4 rounded-xl font-black text-white transition-transform hover:scale-105 ${theme === "dark"
                    ? "bg-gradient-to-r from-indigo-500 to-yellow-400"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600"
                    }`}
                >
                  Secure Your Spot Now
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Final CTA Section */}

      </div>
    </div>
  )
}

export default Home
