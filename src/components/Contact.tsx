
import { useState } from "react";
import { Github, Linkedin, Mail, PhoneCall, Send } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [commandResult, setCommandResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setCommandResult(`> Message sent successfully!\n> Thanks for reaching out, ${formState.name}. I'll get back to you soon.`);
      setFormState({
        name: "",
        email: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedCard className="animate-[fade-in-right_0.8s_ease-out]">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <a 
                href="mailto:pranavvk16@gmail.com" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-futuristic-blue/20 flex items-center justify-center text-futuristic-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <p className="text-white">pranavvk16@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="tel:+917907210906" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-futuristic-blue/20 flex items-center justify-center text-futuristic-accent">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Phone</p>
                  <p className="text-white">+91 7907210906</p>
                </div>
              </a>
              
              <a 
                href="https://linkedin.com/in/pranav-vk-6b6033165" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-futuristic-blue/20 flex items-center justify-center text-futuristic-accent">
                  <Linkedin size={18} />
                </div>
                <div>
                  <p className="text-sm text-white/60">LinkedIn</p>
                  <p className="text-white">pranav-vk-6b6033165</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/pranavvk16" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-futuristic-blue/20 flex items-center justify-center text-futuristic-accent">
                  <Github size={18} />
                </div>
                <div>
                  <p className="text-sm text-white/60">GitHub</p>
                  <p className="text-white">pranavvk16</p>
                </div>
              </a>
            </div>
          </AnimatedCard>
          
          <AnimatedCard className="bg-black/30 animate-[fade-in-left_0.8s_ease-out]">
            <div className="mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-sm text-white/80 font-mono">terminal_contact.sh</div>
            </div>
            
            <div className="font-mono text-sm">
              <p className="text-futuristic-accent mb-2">$ contact_init</p>
              <p className="text-white/70 mb-4">
                {'>'} Connection established. Please enter your message:
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-white/90 mb-1">
                    <span className="text-futuristic-accent">$</span> Name:
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-futuristic-accent/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-white/90 mb-1">
                    <span className="text-futuristic-accent">$</span> Email:
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-futuristic-accent/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-white/90 mb-1">
                    <span className="text-futuristic-accent">$</span> Message:
                  </label>
                  <textarea 
                    name="message" 
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-futuristic-accent/50 transition-colors"
                    placeholder="Hello, I'd like to discuss a project..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-futuristic-blue hover:bg-futuristic-accent rounded transition-colors text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
              
              {commandResult && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                  <div className="bg-white/5 rounded p-3 font-mono text-sm whitespace-pre-line">
                    {commandResult}
                  </div>
                </div>
              )}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
