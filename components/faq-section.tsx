
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Smartphone, 
  Shield, 
  Battery, 
  Zap, 
  HelpCircle, 
  Settings,
  Package,
  Clock
} from 'lucide-react';

const faqCategories = [
  {
    title: "How NFC Works",
    icon: Smartphone,
    questions: [
      {
        question: "How does NFC tracking work?",
        answer: "DiskHound uses Near Field Communication (NFC) technology. When someone finds your disc and taps it with their smartphone, it instantly opens their phone's messaging app with your contact information pre-filled. No apps to download, no account creation - it just works."
      },
      {
        question: "What phones are compatible?",
        answer: "DiskHound works with iPhone 7 and newer, plus Android 4.0+ devices. This covers virtually all modern smartphones. The person finding your disc doesn't need any special apps - NFC is built into the phone's operating system."
      },
      {
        question: "Do I need an app to use DiskHound?",
        answer: "No app required! This is what makes DiskHound so effective. When someone finds your disc, they just tap it with their phone and can instantly contact you. The simpler it is for the finder, the more likely you are to get your disc back."
      }
    ]
  },
  {
    title: "Technical Specs",
    icon: Settings,
    questions: [
      {
        question: "Are the stickers waterproof?",
        answer: "Yes! DiskHound stickers are fully waterproof and weatherproof. They're designed to withstand rain, mud, snow, and all weather conditions you encounter on the course. The NFC chip is completely sealed and protected."
      },
      {
        question: "How long does the battery last?",
        answer: "DiskHound stickers have a 5+ year battery life. The NFC technology is passive, meaning it only uses power when being scanned. With typical use (occasional scanning), your tracker will work reliably for years without any maintenance."
      },
      {
        question: "Will the sticker affect my disc's flight?",
        answer: "No impact on flight characteristics! Each DiskHound sticker weighs less than 3 grams - that's lighter than a penny. The thin profile and strategic placement ensure zero affect on your disc's aerodynamics or performance."
      },
      {
        question: "Are DiskHound trackers PDGA approved?",
        answer: "NFC stickers are not explicitly covered in current PDGA rules as they're a new technology. We recommend checking with your tournament director for sanctioned events. For casual play, they're perfectly fine and widely used."
      }
    ]
  },
  {
    title: "Setup & Usage",
    icon: Package,
    questions: [
      {
        question: "How do I set up my DiskHound stickers?",
        answer: "Setup is incredibly simple: 1) Peel the sticker and place it on your disc (we recommend the underside center), 2) Use your phone's NFC settings or a free NFC app to program your contact info, 3) Test by tapping with your phone. The whole process takes less than 2 minutes per disc."
      },
      {
        question: "Where should I place the sticker on my disc?",
        answer: "We recommend placing the sticker on the underside center of your disc, away from the rim. This protects it from damage while maintaining easy access for scanning. The sticker is thin enough that it won't affect your grip or throwing."
      },
      {
        question: "Can I update my contact information?",
        answer: "Yes! You can reprogram your DiskHound stickers anytime using your smartphone's NFC capability or any free NFC app. This is perfect if you change phone numbers or want to update your contact details."
      }
    ]
  },
  {
    title: "Ordering & Support",
    icon: HelpCircle,
    questions: [
      {
        question: "What's included in each pack?",
        answer: "3-Pack: 3 waterproof NFC stickers. 10-Pack: 10 waterproof NFC stickers. 50-Pack Basic: 50 NTAG215 waterproof stickers. 50-Pack Glow: 50 glow-in-dark stickers. Pro Bundle: 50 premium stickers + IMU sensor for throw analytics."
      },
      {
        question: "How fast is shipping?",
        answer: "We offer free shipping on all orders over $50. Most orders are processed within 1-2 business days and delivered within 3-5 business days in the US. You'll receive tracking information once your order ships."
      },
      {
        question: "What's your return policy?",
        answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your DiskHound trackers, return them within 30 days for a full refund. We stand behind our products 100%."
      },
      {
        question: "Do you offer customer support?",
        answer: "Absolutely! Our support team is available Monday-Friday, 9AM-6PM PST. Email us at support@diskhound.com or use the contact form. We're here to help with setup, troubleshooting, or any questions."
      }
    ]
  }
];

export function FAQSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="space-y-12">
      {faqCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          className="space-y-6"
        >
          {/* Category Header */}
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
              <category.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-cyber font-bold neon-text">
              {category.title}
            </h2>
          </div>

          {/* Questions */}
          <div className="card-cyber rounded-lg overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`${categoryIndex}-${index}`}
                  className="border-b border-primary/20 last:border-b-0"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors duration-300 px-6 py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-foreground/80 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      ))}

      {/* Still have questions? */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center space-y-6 pt-12 border-t border-primary/20"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-cyber font-bold neon-text">
            Still Have Questions?
          </h3>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our support team is here to help. Get in touch and we'll answer any questions about DiskHound trackers.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center space-x-2 text-foreground/80">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm">Mon-Fri 9AM-6PM PST</span>
          </div>
          <div className="text-foreground/60">•</div>
          <div className="flex items-center space-x-2 text-foreground/80">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm">support@diskhound.com</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
