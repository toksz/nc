
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Schmidt",
    role: "Digital Marketing Managerin",
    content: "Newsletter.Chat hat meine morgendliche News-Routine revolutioniert. Präzise, relevant und genau dann, wenn ich es brauche.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Weber",
    role: "Tech-Enthusiast",
    content: "Die KI-Kuratierung ist beeindruckend präzise. Keine Informationsflut mehr, nur das Wichtigste auf einen Blick.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Fischer",
    role: "Content Creatorin",
    content: "Endlich ein Newsletter-Service, der versteht, was ich will. Die WhatsApp-Integration ist genial!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <div className="py-24 bg-white">
      <h2 className="text-4xl font-bold text-center mb-16">Stimmen unserer Nutzer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 animate-fade-in group"
          >
            <div className="flex mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-primary text-primary group-hover:scale-110 transition-transform"
                  strokeWidth={1}
                />
              ))}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{testimonial.content}</p>
            <div className="mt-6 border-t pt-6 border-gray-100">
              <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
              <p className="text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
