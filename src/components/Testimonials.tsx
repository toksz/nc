
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Schmidt",
    role: "Digital Marketing Managerin",
    content: "Newsletter.Chat hat meine morgendliche News-Routine revolutioniert. Die KI-Zusammenfassungen sparen mir jeden Tag wertvolle Zeit.",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    id: 2,
    name: "Michael Weber",
    role: "Tech-Enthusiast",
    content: "Die Personalisierung ist unglaublich präzise. Keine Informationsflut mehr, nur relevante News direkt in WhatsApp.",
    rating: 5,
    avatar: "👨‍💻",
  },
  {
    id: 3,
    name: "Emma Fischer",
    role: "Content Creatorin",
    content: "Endlich ein Newsletter-Service, der mich versteht! Die Breaking News Funktion hält mich immer auf dem Laufenden.",
    rating: 5,
    avatar: "👩‍🎨",
  },
  {
    id: 4,
    name: "Thomas Müller",
    role: "Freiberuflicher Berater",
    content: "Perfekt für meinen vollen Terminkalender. Die flexiblen Zustellzeiten passen sich meinem Tag an.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    id: 5,
    name: "Lisa Wagner",
    role: "Startup-Gründerin",
    content: "Die Mischung aus Tech- und Wirtschaftsnews ist genau das, was ich brauche. Kompakt und relevant!",
    rating: 5,
    avatar: "👩‍🚀",
  }
];

export function Testimonials() {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Das sagen unsere Nutzer</h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Tausende zufriedener Nutzer vertrauen bereits auf unseren personalisierten News-Service
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 group"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary group-hover:scale-110 transition-transform"
                    strokeWidth={1}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {testimonial.content}
              </p>
              <div className="mt-6 border-t pt-6 border-gray-100 flex items-center gap-4">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
