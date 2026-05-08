import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  Loader2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import BorderGlow from './BorderGlow';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  'Mining Construction',
  'Structural Steel',
  'Civil Construction',
  'Industrial Construction',
  'Commercial Construction',
  'Residential Construction',
  'Heavy Equipment Projects'
];

const SERVICES_REQUIRED = [
  'New Construction',
  'Structural Repairs',
  'Steel Fabrication',
  'Site Preparation',
  'Concrete Work',
  'Earthworks',
  'Maintenance',
  'Inspection & Assessment'
];

const PROJECT_SIZES = [
  'Small Project',
  'Medium Project',
  'Large-Scale Project',
  'Enterprise / Industrial Scale'
];

const BUDGET_RANGES = [
  'Under R50,000',
  'R50,000 – R150,000',
  'R150,000 – R500,000',
  'R500,000 – R1 Million',
  'R1 Million+'
];

const TIMELINES = [
  'Urgent / ASAP',
  'Within 1 Month',
  'Within 3 Months',
  'Planning Phase'
];

const QuoteForm: React.FC<QuoteFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: '',
    serviceRequired: '',
    projectSize: '',
    location: '',
    description: '',
    budget: '',
    timeline: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.location.trim()) newErrors.location = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Static simulation of submission for frontend stability
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          projectType: '',
          serviceRequired: '',
          projectSize: '',
          location: '',
          description: '',
          budget: '',
          timeline: '',
        });
      }, 4000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !showSuccess) return null;

  return (
    <AnimatePresence>
      {isOpen && !showSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10"
          >
            <BorderGlow 
              borderRadius={40}
              glowIntensity={1.5}
              glowColor="40 100 50"
              colors={['#f59e0b', '#ffffff', '#f59e0b']}
            >
              <div className="glass-dark p-8 md:p-12 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                      <Zap className="w-3 h-3" /> Industrial Excellence
                    </div>
                    <h2 className="text-responsive-h2 font-display font-bold text-white tracking-tighter">Request a Construction Quote</h2>
                    <p className="text-white/40 text-lg">Tell us about your project and our team will contact you within 24 hours with a tailored estimate.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-3 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Personal info */}
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    className="space-y-6"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1 flex items-center gap-2">
                        <User className="w-3 h-3" /> Full Name*
                      </label>
                      <input 
                        autoFocus
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={cn(
                          "w-full bg-white/5 border rounded-2xl px-5 py-4 focus:outline-none transition-all text-white focus:ring-4 focus:ring-amber-500/20",
                          errors.fullName ? "border-red-500/50" : "border-white/10 focus:border-amber-500/50"
                        )}
                      />
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="space-y-2"
                      >
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-1 flex items-center gap-2">
                          <Phone className="w-3 h-3" /> Phone*
                        </label>
                        <input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className={cn(
                            "w-full bg-white/5 border rounded-2xl px-5 py-4 focus:outline-none transition-all text-white focus:ring-4 focus:ring-amber-500/20",
                            errors.phone ? "border-red-500/50" : "border-white/10 focus:border-amber-500/50"
                          )}
                        />
                      </motion.div>
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="space-y-2"
                      >
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-1 flex items-center gap-2">
                          <Mail className="w-3 h-3" /> Email*
                        </label>
                        <input 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={cn(
                            "w-full bg-white/5 border rounded-2xl px-5 py-4 focus:outline-none transition-all text-white focus:ring-4 focus:ring-amber-500/20",
                            errors.email ? "border-red-500/50" : "border-white/10 focus:border-amber-500/50"
                          )}
                        />
                      </motion.div>
                    </div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1 flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Project Location*
                      </label>
                      <input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter project location"
                        className={cn(
                          "w-full bg-white/5 border rounded-2xl px-5 py-4 focus:outline-none transition-all text-white focus:ring-4 focus:ring-amber-500/20",
                          errors.location ? "border-red-500/50" : "border-white/10 focus:border-amber-500/50"
                        )}
                      />
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Project Description
                      </label>
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Briefly describe your construction project or requirements…"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white resize-none focus:ring-4 focus:ring-amber-500/20"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Right Column: Project Details */}
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                      }
                    }}
                    className="space-y-6"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Project Type</label>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white appearance-none focus:ring-4 focus:ring-amber-500/20"
                      >
                        <option value="" disabled className="bg-neutral-900">Select Project Type</option>
                        {PROJECT_TYPES.map(type => (
                          <option key={type} value={type} className="bg-neutral-900">{type}</option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Service Required</label>
                      <select 
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white appearance-none focus:ring-4 focus:ring-amber-500/20"
                      >
                        <option value="" disabled className="bg-neutral-900">Select Service Required</option>
                        {SERVICES_REQUIRED.map(service => (
                          <option key={service} value={service} className="bg-neutral-900">{service}</option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Project Size</label>
                      <select 
                        name="projectSize"
                        value={formData.projectSize}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white appearance-none focus:ring-4 focus:ring-amber-500/20"
                      >
                        <option value="" disabled className="bg-neutral-900">Select Project Size</option>
                        {PROJECT_SIZES.map(size => (
                          <option key={size} value={size} className="bg-neutral-900">{size}</option>
                        ))}
                      </select>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6">
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="space-y-2"
                      >
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Est. Budget</label>
                        <select 
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white appearance-none focus:ring-4 focus:ring-amber-500/20"
                        >
                          <option value="" disabled className="bg-neutral-900">Select Budget</option>
                          {BUDGET_RANGES.map(range => (
                            <option key={range} value={range} className="bg-neutral-900">{range}</option>
                          ))}
                        </select>
                      </motion.div>
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="space-y-2"
                      >
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Timeline</label>
                        <select 
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white appearance-none focus:ring-4 focus:ring-amber-500/20"
                        >
                          <option value="" disabled className="bg-neutral-900">Select Timeline</option>
                          {TIMELINES.map(time => (
                            <option key={time} value={time} className="bg-neutral-900">{time}</option>
                          ))}
                        </select>
                      </motion.div>
                    </div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      className="p-8 rounded-[32px] border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/20"
                      >
                        <ShieldCheck className="w-8 h-8 text-amber-500" />
                      </motion.div>
                      <div>
                        <h4 className="text-white font-bold">Secure Evaluation</h4>
                        <p className="text-white/40 text-sm">Your data is protected and will be reviewed by our senior engineering team.</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Footer CTA and Trust Elements */}
                  <div className="md:col-span-2 pt-6 border-t border-white/10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                       <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-white/40 text-sm">
                            <ShieldCheck className="w-4 h-4 text-amber-500" />
                            <span>Professional construction specialists</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/40 text-sm">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span>Fast response within 24 hours</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/40 text-sm">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span>Trusted industrial expertise</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/40 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-amber-500" />
                            <span>Quality workmanship guaranteed</span>
                          </div>
                       </div>

                       <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(245,158,11,0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className="w-full lg:w-auto px-16 py-6 bg-amber-500 text-black text-xl font-black rounded-3xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all shadow-[0_10px_40px_rgba(245,158,11,0.2)] glass-morphic border border-amber-400/50"
                       >
                         {isSubmitting ? (
                           <>
                             <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                           </>
                         ) : (
                           <>
                              Request My Quote <ChevronRight className="w-6 h-6" />
                           </>
                         )}
                       </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </BorderGlow>
          </motion.div>
        </motion.div>
      )}

      {/* Success State Overlay */}
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0c0c]"
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 800],
                  y: [0, (Math.random() - 0.5) * 800],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                className="absolute left-1/2 top-1/2 w-4 h-4 bg-amber-500/20 blur-xl rounded-full"
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            className="w-48 h-48 md:w-64 md:h-64 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_150px_rgba(245,158,11,0.5)] relative z-10"
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CheckCircle2 className="w-24 h-24 md:w-32 md:h-32 text-black stroke-[3]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 max-w-xl px-6 relative z-10"
          >
            <h3 className="text-responsive-h2 font-display font-bold text-white mb-6">Request Received</h3>
            <p className="text-responsive-p text-white/60 leading-relaxed font-light">
              Thank you. Your project request has been received. Our team will contact you shortly.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteForm;
