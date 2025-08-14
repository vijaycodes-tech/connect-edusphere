import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export const CTASection = () => {
  const benefits = [
    "WhatsApp & SMS Integration",
    "Multi-language Support", 
    "AI-Powered Analytics",
    "Secure & Reliable"
  ];

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your School's Communication?
          </h2>
          
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join thousands of schools already using SmartSchool Connect to streamline 
            operations and enhance parent-teacher collaboration.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="text-sm md:text-base">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => window.location.href = '/login'}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};