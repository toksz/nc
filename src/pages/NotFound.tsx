import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Nicht existierende Route aufgerufen:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/50 to-white">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Seite nicht gefunden
          </h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            Die gesuchte Seite existiert leider nicht. Kehre zur Startseite zurück und bleibe auf dem Laufenden.
          </p>
        </div>
        <Button
          href="/"
          className="inline-flex items-center gap-2"
          variant="default"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
