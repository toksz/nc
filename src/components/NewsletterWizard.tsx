
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  FileText,
  MessageCircle,
  Settings2,
} from "lucide-react";

interface NewsletterPreferences {
  frequency: string;
  deliveryTime: string;
  length: string;
  style: string;
  topics: string[];
}

export function NewsletterWizard() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<NewsletterPreferences>({
    frequency: "",
    deliveryTime: "09:00",
    length: "medium",
    style: "casual",
    topics: [],
  });

  const updatePreference = (key: keyof NewsletterPreferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery Frequency</h3>
              <Select
                value={preferences.frequency}
                onValueChange={(value) => updatePreference("frequency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery Time</h3>
              <Input
                type="time"
                value={preferences.deliveryTime}
                onChange={(e) =>
                  updatePreference("deliveryTime", e.target.value)
                }
                className="w-full"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter Length</h3>
              <RadioGroup
                value={preferences.length}
                onValueChange={(value) => updatePreference("length", value)}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="short" id="short" />
                  <label htmlFor="short" className="cursor-pointer">
                    Short (2-3 min read)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="medium" id="medium" />
                  <label htmlFor="medium" className="cursor-pointer">
                    Medium (5-7 min read)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="long" id="long" />
                  <label htmlFor="long" className="cursor-pointer">
                    Long (10+ min read)
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Content Style</h3>
              <RadioGroup
                value={preferences.style}
                onValueChange={(value) => updatePreference("style", value)}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="casual" id="casual" />
                  <label htmlFor="casual" className="cursor-pointer">
                    Casual & Conversational
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="professional" id="professional" />
                  <label htmlFor="professional" className="cursor-pointer">
                    Professional & Formal
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="technical" id="technical" />
                  <label htmlFor="technical" className="cursor-pointer">
                    Technical & Detailed
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">
                Your Newsletter Settings
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">Frequency:</span>{" "}
                  {preferences.frequency}
                </li>
                <li>
                  <span className="font-medium">Delivery Time:</span>{" "}
                  {preferences.deliveryTime}
                </li>
                <li>
                  <span className="font-medium">Length:</span> {preferences.length}
                </li>
                <li>
                  <span className="font-medium">Style:</span> {preferences.style}
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
          { icon: Clock, label: "Delivery" },
          { icon: FileText, label: "Length" },
          { icon: MessageCircle, label: "Style" },
          { icon: Settings2, label: "Preview" },
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
          Previous
        </Button>
        <Button
          onClick={step === 4 ? () => console.log(preferences) : nextStep}
          className="flex items-center"
        >
          {step === 4 ? "Complete Setup" : "Next"}
          {step !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
