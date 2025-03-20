
import { useState, useEffect } from "react";
import { Menu, X, Code, Terminal, Zap, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "#home", icon: <User size={16} /> },
    { name: "About", href: "#about", icon: <User size={16} /> },
    { name: "Skills", href: "#skills", icon: <Zap size={16} /> },
    { name: "Experience", href: "#experience", icon: <Terminal size={16} /> },
    { name: "Tech Stack", href: "#tech-stack", icon: <Code size={16} /> },
    { name: "Projects", href: "#projects", icon: <Code size={16} /> },
    { name: "Contact", href: "#contact", icon: <User size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Smooth scroll to the section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-futuristic-dark/90 backdrop-blur-lg border-b border-white/5 shadow-lg"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 border border-futuristic-accent/30">
            <AvatarImage src="https://github.com/pranavvk16.png" alt="Pranav VK" />
            <AvatarFallback className="bg-futuristic-dark">
              <Terminal size={16} className="text-futuristic-accent" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-white text-lg">Pranav VK</span>
            <span className="text-xs text-white/60">Senior Software Engineer</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <a 
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`px-4 py-2 text-sm relative flex items-center space-x-1 rounded-md transition-colors
                      ${activeSection === item.href.substring(1) 
                        ? "text-futuristic-accent bg-white/5" 
                        : "text-white/70 hover:text-white hover:bg-white/5"}`}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    <span>{item.name}</span>
                    {activeSection === item.href.substring(1) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-futuristic-accent to-futuristic-blue"></span>
                    )}
                  </a>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-futuristic-dark/95 backdrop-blur-lg border-t border-white/10 shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors
                  ${activeSection === item.href.substring(1) 
                    ? "bg-white/10 text-futuristic-accent" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"}`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
