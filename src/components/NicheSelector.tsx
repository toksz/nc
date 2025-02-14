
import { useState } from "react";
import { Search } from "lucide-react";

const niches = [
  { id: 1, name: "Technologie", description: "Neueste Tech-News und Innovationen" },
  { id: 2, name: "Wirtschaft", description: "Markttrends und Analysen" },
  { id: 3, name: "Sport", description: "Aktuelles aus der Sportwelt" },
  { id: 4, name: "Unterhaltung", description: "Filme, Musik und Kultur" },
  { id: 5, name: "Wissenschaft", description: "Wissenschaftliche Entdeckungen und Forschung" },
];

export function NicheSelector() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNiches = niches.filter((niche) =>
    niche.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Durchsuchen Sie Ihre Interessensgebiete..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNiches.map((niche) => (
          <button
            key={niche.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 text-left group animate-fade-in"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {niche.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{niche.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
