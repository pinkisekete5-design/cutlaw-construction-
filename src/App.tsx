import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Building2, 
  HardHat, 
  Hammer, 
  ChevronRight, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Star,
  CheckCircle2,
  Clock,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { cn } from './lib/utils';
import LineWaves from './components/LineWaves';
import BorderGlow from './components/BorderGlow';
import QuoteForm from './components/QuoteForm';

// Import images for production build optimization
import imgMiningConstruction from './assets/images/mining-construction.png';
import imgStructuralSteel from './assets/images/structural-steel.png';
import imgCivilEarthworks from './assets/images/civil-earthworks.png';
import imgMiningRehabBefore from './assets/images/mining-rehab-before.png';
import imgMiningRehabAfter from './assets/images/mining-rehab-after.png';

// --- Shared Components ---

const GlassCard = ({ children, className, delay = 0, borderRadius = 32 }: { children: React.ReactNode, className?: string, delay?: number, borderRadius?: number, key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for premium feel
    }}
    className="w-full h-full"
  >
    <BorderGlow 
      borderRadius={borderRadius}
      glowColor="40 100 50"
      colors={['#f59e0b', '#ffffff', '#f59e0b']}
      className={cn("w-full h-full transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]", className)}
    >
      <div className="glass h-full w-full overflow-hidden">
        {children}
      </div>
    </BorderGlow>
  </motion.div>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 relative">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: '40px' }}
      viewport={{ once: true }}
      className="h-1 bg-amber-500 mb-4 rounded-full"
    />
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-amber-500 font-medium tracking-widest uppercase text-[10px] mb-2 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      className="text-responsive-h2 font-display font-bold text-white tracking-tighter"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Main Sections ---

const App = () => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = React.useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const springHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });

  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 50], ["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]);
  const navPadding = useTransform(scrollY, [0, 50], ["32px", "16px"]);
  const navScale = useTransform(scrollY, [0, 50], [1, 0.95]);

  return (
    <div className="min-h-screen relative">
      {/* Background with Ambient Effects */}
      <div className="fixed inset-0 -z-10 bg-[#0c0c0c] overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" 
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        style={{ paddingTop: navPadding, paddingBottom: navPadding }}
        className="fixed top-0 w-full z-40 px-4 md:px-6 transition-all flex justify-center"
      >
        <motion.div 
          style={{ backgroundColor: navBackground, scale: navScale }}
          className="flex flex-row justify-between items-center backdrop-blur-xl px-10 py-0 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden w-full max-w-[884px] min-h-[78px]"
        >
          <div className="flex items-center gap-4 mb-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center font-bold text-black text-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">C</div>
            <span 
              className="font-display font-bold text-3xl flex items-center tracking-tighter"
            >
              CUTLAW <span 
                className="ml-2 italic underline font-normal text-[#6c6262] text-base whitespace-nowrap"
              >
                CONSTRUCTION
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 md:gap-10">
            <div className="hidden lg:flex gap-12 text-xs md:text-sm font-semibold text-white/70 uppercase tracking-widest">
              <a href="#services" className="hover:text-white transition-colors relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" className="hover:text-white transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#projects" className="hover:text-white transition-colors relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </a>
            </div>
            <button 
              onClick={() => setIsQuoteFormOpen(true)}
              className="bg-white px-8 h-[50px] rounded-2xl text-sm font-bold text-[#cca110] shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              Get Quote
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
        {/* LineWaves Animation Background */}
        <motion.div style={{ y: springHeroY, opacity: heroOpacity }} className="absolute inset-0 -z-0 opacity-30">
          <LineWaves 
            color1="#f59e0b" 
            color2="#ffffff" 
            color3="#f59e0b"
            speed={0.4}
            innerLineCount={24}
            outerLineCount={28}
            brightness={0.4}
            rotation={-30}
          />
        </motion.div>
        <div 
          className="grid lg:grid-cols-2 gap-12 items-start lg:items-center relative z-10 mx-auto w-full md:min-h-[70vh] py-12"
        >
          <motion.div style={{ y: springHeroY }} className="space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-500 text-sm font-bold uppercase tracking-[0.3em] backdrop-blur-md"
            >
              <Zap className="w-3 h-3 md:w-4 md:h-4 fill-amber-500" /> Premium Industry Leaders
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ 
                fontStyle: 'italic', 
                fontFamily: '"Times New Roman", Times, serif', 
                fontWeight: 'normal',
                lineHeight: '1.1',
              }}
              className="text-white tracking-tighter text-left text-responsive-h1"
            >
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">Construction.</span> Built for Scale.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-responsive-p max-w-xl leading-relaxed font-light"
            >
              Mining, structural steel, and civil construction specialists delivering industrial excellence across Sub-Saharan Africa.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <button 
                onClick={() => setIsQuoteFormOpen(true)}
                className="px-10 py-6 bg-amber-500 text-black text-xl font-black rounded-3xl flex items-center gap-3 hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] hover:scale-105 transition-all group"
              >
                Request Quote <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className="hidden sm:flex flex-col items-center gap-2 text-white/20">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] [writing-mode:vertical-lr]">Scroll</p>
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-0.5 h-12 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div 
                    animate={{ y: [-48, 48] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-full h-full bg-amber-500"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Smart Dashboard Mockup */}
          <motion.div style={{ scale: heroScale }} className="flex flex-col gap-10 h-full w-full max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-8 pt-8 w-full">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="iphone-widget bg-amber-500/10 overflow-hidden group border border-amber-500/20 rounded-[48px] aspect-video w-full cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1600" 
                  alt="Randfontein Mining Hub" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-[3000ms] ease-out shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-12 flex flex-col justify-end">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]">Operational</p>
                    </div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full">Recent Project</div>
                  </div>
                  <h2 className="text-[52px] font-display font-bold leading-none mb-2 tracking-tighter text-white">Randfontein Mining Hub</h2>
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <p className="text-xl font-light">Gauteng, South Africa</p>
                  </div>
                </div>
              </motion.div>
              <div 
                className="iphone-widget bg-white/5 space-y-8 p-12 border border-white/10 rounded-[48px] overflow-hidden w-full h-auto"
              >
                <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em]">Operational Readiness</p>
                <div className="space-y-6">
                  {[
                    { icon: <Building2 className="w-8 h-8" />, name: 'Structural Steel Engineering', status: 'In Progress' },
                    { icon: <HardHat className="w-8 h-8" />, name: 'Advanced Mining Civil', status: 'Active' },
                    { icon: <Hammer className="w-8 h-8" />, name: 'Premium Industrial Roofing', status: 'Design Phase' }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default group">
                      <div className="flex items-center gap-6">
                        <div className="text-amber-500 group-hover:scale-110 transition-transform">{s.icon}</div>
                        <span className="text-xl font-bold">{s.name}</span>
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-amber-500/50">{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto rounded-[60px] bg-black border border-white">
        <SectionHeading title="Comprehensive Solutions" subtitle="What We Do" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { 
              title: 'Mining Construction', 
              desc: 'Specialized structural and civil work for mining operations across South Africa.',
              icon: <Building2 className="w-8 h-8" />,
              img: imgMiningConstruction
            },
            { 
              title: 'Structural Steel', 
              desc: 'Premium precision-engineered steel structures designed for maximum durability.',
              icon: <Zap className="w-8 h-8" />,
              img: imgStructuralSteel
            },
            { 
              title: 'Civil & Earthworks', 
              desc: 'Complete site preparation, foundation, and infrastructure development.',
              icon: <MapPin className="w-8 h-8" />,
              img: imgCivilEarthworks
            }
          ].map((s, i) => (
            <GlassCard key={i} className="group hover:bg-white/5 transition-all">
              <div className="aspect-video overflow-hidden relative">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-amber-500">
                  {s.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-4">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{s.desc}</p>
                <button onClick={() => setIsQuoteFormOpen(true)} className="flex items-center gap-2 text-amber-500 text-sm font-bold group/btn">
                  Inquire Now <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      {/* Stats/About Section */}
      <section id="about" className="py-24 px-6 bg-white/2 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="iphone-widget p-0 overflow-hidden aspect-[4/5] relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200" 
                alt="About Us" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-5xl font-display font-bold">12+</p>
                <p className="text-white/60 font-medium">Years of Experience</p>
              </div>
            </div>
            {/* Floating iOS Card */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="hidden md:block absolute -top-8 -right-8 glass p-6 rounded-3xl border-white/20 shadow-2xl z-20 max-w-[240px]"
            >
              <div className="flex gap-4 items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <CheckCircle2 className="text-white w-6 h-6" />
                </div>
                <p className="text-xs font-bold leading-tight">ISO 9001 Certified Quality Managed</p>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1 }} className="h-full bg-blue-500" />
              </div>
            </motion.div>
          </div>
          <div>
            <SectionHeading title="Excellence in South African Construction" subtitle="About Us" />
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Based in Randfontein, <strong>Cutlaw Construction (Pty) Ltd</strong> delivers high-end professional construction services for the mining and commercial sectors. We combine traditional engineering expertise with modern AI-driven management.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Rating', val: '4.8/5' },
                { label: 'Safety Record', val: '100%' },
                { label: 'Location', val: 'Randfontein' },
                { label: 'Available', val: '24/7 Support' }
              ].map((st, i) => (
                <div key={i}>
                  <p className="text-amber-500 font-bold text-2xl">{st.val}</p>
                  <p className="text-white/40 text-xs uppercase font-medium">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery - Before & After */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeading title="Proven Transformations" subtitle="Project Gallery" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 }
            }
          }}
          className="grid md:grid-cols-2 gap-8"
        >
          {[
            { 
              title: "Mining Facility Rehabilitation", 
              location: "Randfontein West",
              before: imgMiningRehabBefore,
              after: imgMiningRehabAfter
            },
            { 
              title: "Structural Steel Expansion", 
              location: "Aureus Industrial",
              before: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&q=80&w=800",
              after: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
            }
          ].map((proj, i) => (
            <GlassCard key={i} className="group overflow-hidden">
               <div className="relative aspect-[16/10] flex overflow-hidden">
                  <div className="w-1/2 relative overflow-hidden border-r border-white/10">
                    <img src={proj.before} alt="Before" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60">Before</div>
                  </div>
                  <div className="w-1/2 relative overflow-hidden">
                    <img src={proj.after} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black">After</div>
                  </div>
               </div>
               <div className="p-6">
                  <h3 className="text-xl font-display font-bold">{proj.title}</h3>
                  <p className="text-white/40 text-sm">{proj.location}</p>
               </div>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeading title="Client Confidence" subtitle="Testimonials" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              text: "Cutlaw Construction's attention to detail in our mining structural steel build was exceptional. Their AI booking system made the initial consultation seamless.",
              author: "Mining Project Lead",
              rating: 5
            },
            { 
              text: "Professional, efficient, and reliable. They specialists in mining construction and it shows in their work.",
              author: "Industrial Site Manager",
              rating: 4.8
            },
            { 
              text: "Appointment required for major projects, but well worth the wait. The highest quality civil work in the Randfontein area.",
              author: "Civil Engineer",
              rating: 5
            }
          ].map((rev, i) => (
            <GlassCard key={i} className="p-8">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                   <Star key={star} className={cn("w-4 h-4", star <= Math.floor(rev.rating) ? "fill-amber-500 text-amber-500" : "text-white/20")} />
                ))}
              </div>
              <p className="text-lg italic text-white/80 mb-6">"{rev.text}"</p>
              <div>
                <p className="font-display font-bold text-white">{rev.author}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest">Verified Client</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 bg-white/5 rounded-[40px] border border-white/10 p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-amber-500 blur-[120px] rounded-full" />
          </div>
          
          <div className="relative z-10">
            <SectionHeading title="Let's Start Your Next Mega-Project" subtitle="Contact" />
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open('tel:0116932452')}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold">Call Us</p>
                  <p className="text-lg font-bold">011 693 2452</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold">Visit Us</p>
                  <p className="text-lg font-bold">8 Chevrolet St, Randfontein, 1759</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold">Office Hours</p>
                  <p className="text-lg font-bold">Mon - Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
              
              {/* Embedded Google Map Placeholder */}
              <div className="mt-8 rounded-3xl overflow-hidden glass border border-white/10 h-64 w-full grayscale">
                 <iframe 
                   title="Google Map"
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   style={{ border: 0 }}
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.5442534594244!2d27.72!3d-26.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e959ec!2s8%20Chevrolet%20St%2C%20Aureus%2C%20Randfontein%2C%201759!5e0!3m2!1sen!2sza!4v1700000000000"
                   allowFullScreen
                 ></iframe>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <GlassCard borderRadius={40} className="p-12 glass-dark h-full">
              <div className="space-y-4 mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                  <Zap className="w-3 h-3" /> Industrial Excellence
                </div>
                <h3 className="text-responsive-h2 font-display font-bold text-white tracking-tighter">Request a Construction Quote</h3>
                <p className="text-white/40 text-responsive-p">Tell us about your project and our team will contact you within 24 hours with a tailored estimate.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Full Name</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white" placeholder="Enter your full name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Phone</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white" placeholder="+27..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Email</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Project Type</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white appearance-none">
                      <option className="bg-[#111]">Mining Construction</option>
                      <option className="bg-[#111]">Structural Steel</option>
                      <option className="bg-[#111]">Civil Construction</option>
                      <option className="bg-[#111]">Commercial Projects</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Project Description</label>
                    <textarea 
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white resize-none" 
                      placeholder="Briefly describe your requirements..."
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(245,158,11,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsQuoteFormOpen(true)}
                    className="w-full py-6 bg-amber-500 text-black text-lg font-black rounded-3xl mt-4 flex items-center justify-center gap-3 transition-all shadow-[0_10px_40px_rgba(245,158,11,0.2)] border border-amber-400/50"
                  >
                    Request My Quote <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { icon: <ShieldCheck className="w-4 h-4 text-amber-500" />, text: "Premium Quality" },
                   { icon: <Clock className="w-4 h-4 text-amber-500" />, text: "Fast Response" },
                   { icon: <Zap className="w-4 h-4 text-amber-500" />, text: "Industrial Experts" },
                   { icon: <CheckCircle2 className="w-4 h-4 text-amber-500" />, text: "Certified Work" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-wider">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                 ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open('tel:0116932452')}
          className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <Phone className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs uppercase tracking-widest font-medium">
          © 2026 Cutlaw Construction (Pty) Ltd. Professional Construction Excellence.
        </p>
      </footer>

      {/* Forms and Overlays */}
      <QuoteForm isOpen={isQuoteFormOpen} onClose={() => setIsQuoteFormOpen(false)} />
    </div>
  );
};

export default App;
