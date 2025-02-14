
import { useState } from "react";
import { Search, Check } from "lucide-react";
import { Badge } from "./ui/badge";

const niches = [
  { id: 1, name: "Technologie", description: "Neueste Tech-News und Innovationen", tags: ["KI", "Apps", "Gadgets"] },
  { id: 2, name: "Wirtschaft", description: "Markttrends und Analysen", tags: ["Finanzen", "Börse", "Startups"] },
  { id: 3, name: "Sport", description: "Aktuelles aus der Sportwelt", tags: ["Fußball", "Formel 1", "Tennis"] },
  { id: 4, name: "Unterhaltung", description: "Filme, Musik und Kultur", tags: ["Kino", "Streaming", "Events"] },
  { id: 5, name: "Wissenschaft", description: "Wissenschaftliche Entdeckungen", tags: ["Forschung", "Medizin", "Klima"] },
  { id: 6, name: "Politik", description: "Politische Entwicklungen", tags: ["Deutschland", "International", "EU"] },
  { id: 7, name: "Gesundheit", description: "Gesundheit und Wellness", tags: ["Ernährung", "Fitness", "Mental"] },
  { id: 8, name: "Digital", description: "Digitale Transformation", tags: ["Software", "Cloud", "Cyber"] }
];

interface NicheSelectorProps {
  onSelectionChange?: (selectedNiches: number[]) => void;
}

export function NicheSelector({ onSelectionChange }: NicheSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<number[]>([]);

  const filteredNiches = niches.filter((niche) =>
    niche.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    niche.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleNiche = (nicheId: number) => {
    const newSelection = selectedNiches.includes(nicheId)
      ? selectedNiches.filter(id => id !== nicheId)
      : [...selectedNiches, nicheId];
    
    setSelectedNiches(newSelection);
    onSelectionChange?.(newSelection);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Suche nach Themen oder Schlagworten..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {selectedNiches.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedNiches.map((id) => {
            const niche = niches.find(n => n.id === id);
            return niche && (
              <Badge
                key={id}
                variant="secondary"
                className="px-3 py-1 cursor-pointer"
                onClick={() => toggleNiche(id)}
              >
                {niche.name} ✕
              </Badge>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNiches.map((niche) => {
          const isSelected = selectedNiches.includes(niche.id);
          return (
            <button
              key={niche.id}
              onClick={() => toggleNiche(niche.id)}
              className={`p-4 rounded-lg border ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-primary'
              } hover:shadow-lg transition-all duration-300 text-left group relative`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {niche.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{niche.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {niche.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {isSelected && (
                  <Check className="text-primary w-5 h-5" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
