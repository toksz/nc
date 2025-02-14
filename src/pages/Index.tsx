
import { Button } from "@/components/ui/button";
import { NicheSelector } from "@/components/NicheSelector";
import { Testimonials } from "@/components/Testimonials";
import { NewsletterWizard } from "@/components/NewsletterWizard";
import { ArrowRight, MessageSquare, Settings, Zap, Check, GraduationCap, BrainCircuit, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-white">
      {/* Hero Section */}
      <section className="container px-4 pt-24 pb-16 md:pt-40 md:pb-32">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-slide-in hover:bg-primary/15 transition-colors">
            <TrendingUp className="w-4 h-4 mr-2" />
            Bleib deiner Konkurrenz einen Schritt voraus
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight tracking-tight">
            Deine News.{" "}
            <span className="text-primary">Dein Wissensvorsprung.</span>
            <br />
            <span className="text-3xl md:text-5xl">Direkt in WhatsApp.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            KI-kuratierte News für deinen beruflichen Erfolg. Präzise gefiltert, 
            intelligent zusammengefasst und perfekt in deinen Alltag integriert.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button
              size="lg"
              className="group text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setShowWizard(true)}
            >
                Jetzt 14 Tage kostenlos testen
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            <GraduationCap className="inline-block w-4 h-4 mr-1" />
            50% Rabatt mit deiner .edu E-Mail
          </p>
        </div>
      </section>

      {/* Newsletter Preview Section */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">So sieht dein Newsletter aus</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Kurz. Relevant. Handlungsorientiert.
            </p>
          </div>
          <div className="max-w-sm mx-auto bg-[#ECE5DD] rounded-3xl p-6 shadow-xl">
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Clock className="w-4 h-4" />
                Dein Morning Briefing, 08:00 Uhr
              </div>
              <div className="space-y-4 text-gray-800">
                <p className="font-bold">🚀 Heute wichtig für dich:</p>
                <div className="space-y-2">
                    <p>*KI & Tech:* OpenAI stellt GPT-5 vor - Die wichtigsten Updates für dich</p>
                    <p>*Wirtschaft:* EZB senkt Leitzins - Das bedeutet es für dich</p>
                  <p>*Innovation:* Durchbruch in der Quantentechnologie</p>
                </div>
                <p className="text-primary">➡️ Mehr Details zu deinen Themen...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-accent/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Dein Wettbewerbsvorteil</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Newsletter.Chat unterstützt dich dabei, bessere Entscheidungen zu treffen
              und deinen Wissensvorsprung auszubauen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Wissensvorsprung</h3>
                <p className="text-gray-600">
                    Erhalte relevante Insights noch vor deinen Mitbewerbern.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Zeitersparnis</h3>
                <p className="text-gray-600">
                    Spare 83% Zeit bei deiner Informationsbeschaffung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Investieren Sie in Ihren Erfolg</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Faire Preise für maximalen Nutzen.
            </p>
          </div>
          <div className="max-w-md mx-auto bg-accent rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-4xl font-bold">€9,99</span>
                <span className="text-gray-600">/Monat</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Unbegrenzte KI-kuratierte Updates</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Priorisierte Nachrichtenverarbeitung</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Tiefgehende Branchenanalysen</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>WhatsApp Integration</span>
              </div>
            </div>
            <Button 
              className="w-full group"
              size="lg"
              onClick={() => setShowWizard(true)}
            >
              14 Tage kostenlos testen
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              <GraduationCap className="inline-block w-4 h-4 mr-1" />
              50% Studentenrabatt verfügbar
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-accent/50">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Ihr persönlicher News-Assistent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl hover:bg-white transition-colors duration-300 animate-fade-in group">
              <MessageSquare className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-4">
                WhatsApp Integration
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nahtlos in Ihren Workflow integriert. Professionelle Insights, wo Sie sie brauchen.
              </p>
            </div>
            <div className="p-8 rounded-2xl hover:bg-white transition-colors duration-300 animate-fade-in group delay-100">
              <Settings className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-4">
                Präzise Personalisierung
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Maßgeschneiderte Inhalte für Ihre Branche und Position.
              </p>
            </div>
            <div className="p-8 rounded-2xl hover:bg-white transition-colors duration-300 animate-fade-in group delay-200">
              <Zap className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-4">KI-Kuratierung</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fortschrittliche KI filtert die relevantesten Insights für Ihren beruflichen Erfolg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Bereit für deinen nächsten Schritt?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
            Tausende Nutzer vertrauen bereits auf Newsletter.Chat für ihre täglichen Updates. 
            Sichere dir jetzt deinen Wissensvorsprung.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setShowWizard(true)}
          >
            14 Tage kostenlos testen
            <ArrowRight className="ml-2" />
          </Button>
          <p className="text-sm text-white/80 mt-4">
            <GraduationCap className="inline-block w-4 h-4 mr-1" />
            50% Studentenrabatt mit deiner .edu E-Mail
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white/50 to-transparent" />
      </section>

      {/* Newsletter Wizard Modal */}
      {showWizard && (
        <section className="py-20 bg-accent/50">
          <div className="container px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">
                Dein persönlicher Newsletter
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                In wenigen Schritten zu deinem maßgeschneiderten Nachrichtenerlebnis.
              </p>
            </div>
            <NewsletterWizard />
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
