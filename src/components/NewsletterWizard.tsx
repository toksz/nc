
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  FileText,
  MessageCircle,
  Settings2,
  Globe,
  Bell,
} from "lucide-react";

interface NewsletterPreferences {
  frequency: string;
  deliveryTime: string;
  length: string;
  style: string;
  topics: string[];
  language: string;
  contentTypes: string[];
  breakingNews: boolean;
  whatsappNumber: string;
}

export function NewsletterWizard() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<NewsletterPreferences>({
    frequency: "daily",
    deliveryTime: "09:00",
    length: "medium",
    style: "casual",
    topics: [],
    language: "de",
    contentTypes: ["articles"],
    breakingNews: true,
    whatsappNumber: "",
  });

  const contentTypeOptions = [
    { id: "articles", label: "Artikel" },
    { id: "summaries", label: "Zusammenfassungen" },
    { id: "breaking", label: "Breaking News" },
    { id: "analysis", label: "Analysen" },
  ];

  const updatePreference = (key: keyof NewsletterPreferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
            <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Zustellungsrhythmus</h3>
              <Select
              value={preferences.frequency}
              onValueChange={(value) => updatePreference("frequency", value)}
              >
              <SelectTrigger>
                <SelectValue placeholder="Häufigkeit wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Täglich</SelectItem>
                <SelectItem value="weekly">Wöchentlich</SelectItem>
                <SelectItem value="biweekly">Zweiwöchentlich</SelectItem>
                <SelectItem value="monthly">Monatlich</SelectItem>
              </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Zustellungszeit</h3>
              <Input
              type="time"
              value={preferences.deliveryTime}
              onChange={(e) => updatePreference("deliveryTime", e.target.value)}
              className="w-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">WhatsApp Nummer</h3>
              <Input
              type="tel"
              placeholder="+49 123 456789"
              value={preferences.whatsappNumber}
              onChange={(e) => updatePreference("whatsappNumber", e.target.value)}
              className="w-full"
              />
            </div>
            </div>
        );
      case 2:
        return (
            <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter-Länge</h3>
              <RadioGroup
              value={preferences.length}
              onValueChange={(value) => updatePreference("length", value)}
              className="flex flex-col space-y-3"
              >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="short" id="short" />
                <label htmlFor="short">Kurz (2-3 Min.)</label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="medium" id="medium" />
                <label htmlFor="medium">Mittel (5-7 Min.)</label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="long" id="long" />
                <label htmlFor="long">Lang (10+ Min.)</label>
              </div>
              </RadioGroup>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Inhaltstypen</h3>
              <div className="space-y-3">
              {contentTypeOptions.map((type) => (
                <div key={type.id} className="flex items-center space-x-3">
                <Checkbox
                  id={type.id}
                  checked={preferences.contentTypes.includes(type.id)}
                  onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...preferences.contentTypes, type.id]
                    : preferences.contentTypes.filter((t) => t !== type.id);
                  updatePreference("contentTypes", newTypes);
                  }}
                />
                <label htmlFor={type.id}>{type.label}</label>
                </div>
              ))}
              </div>
            </div>
            </div>
        );
        case 3:
        return (
          <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sprache</h3>
            <Select
            value={preferences.language}
            onValueChange={(value) => updatePreference("language", value)}
            >
            <SelectTrigger>
              <SelectValue placeholder="Sprache wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="en">Englisch</SelectItem>
              <SelectItem value="mixed">Gemischt</SelectItem>
            </SelectContent>
            </Select>
          </div>
          </div>
        );

        case 4:
        return (
          <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Benachrichtigungen</h3>
            <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
              id="breaking-news"
              checked={preferences.breakingNews}
              onCheckedChange={(checked) => 
                updatePreference("breakingNews", checked)
              }
              />
              <label htmlFor="breaking-news">
              Breaking News erhalten
              </label>
            </div>
            <p className="text-sm text-gray-500 ml-7">
              Du erhältst wichtige Nachrichten sofort, auch außerhalb deiner gewählten Zustellzeit
            </p>
            </div>
          </div>
          </div>
        );

        case 5:
        return (
          <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">Übersicht</h3>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">
            Deine Newsletter-Einstellungen
            </h4>
            <ul className="space-y-3 text-gray-600">
            <li>
              <span className="font-medium">Häufigkeit:</span>{" "}
              {preferences.frequency === "daily" ? "Täglich" : 
               preferences.frequency === "weekly" ? "Wöchentlich" : 
               preferences.frequency === "biweekly" ? "Zweiwöchentlich" : "Monatlich"}
            </li>
            <li>
              <span className="font-medium">Zustellungszeit:</span>{" "}
              {preferences.deliveryTime} Uhr
            </li>
            <li>
              <span className="font-medium">WhatsApp:</span>{" "}
              {preferences.whatsappNumber}
            </li>
            <li>
              <span className="font-medium">Länge:</span>{" "}
              {preferences.length === "short" ? "Kurz" :
               preferences.length === "medium" ? "Mittel" : "Lang"}
            </li>
            <li>
              <span className="font-medium">Sprache:</span>{" "}
              {preferences.language === "de" ? "Deutsch" :
               preferences.language === "en" ? "Englisch" : "Gemischt"}
            </li>
            <li>
              <span className="font-medium">Breaking News:</span>{" "}
              {preferences.breakingNews ? "Aktiviert" : "Deaktiviert"}
            </li>
            </ul>
          </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[
            { icon: Clock, label: "Zustellung" },
            { icon: FileText, label: "Inhalt" },
            { icon: Globe, label: "Sprache" },
            { icon: Bell, label: "Benachrichtigungen" },
            { icon: Settings2, label: "Übersicht" },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              step > index + 1
                ? "text-primary"
                : step === index + 1
                ? "text-primary"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= index + 1 ? "bg-primary/10" : "bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-sm hidden md:block">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-8">{renderStep()}</div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
        </Button>
        <Button
            onClick={step === 5 ? () => console.log("Completing setup with preferences:", preferences) : nextStep}
            className="flex items-center"
          >
            {step === 5 ? "Einrichtung abschließen" : "Weiter"}
            {step !== 5 && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
