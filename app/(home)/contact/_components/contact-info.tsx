import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactDetails = [
  {
    icon: <MapPin className="size-6 text-gold" />,
    title: "Our Presence",
    details: ["123 Royal Palace Road,", "Jaipur, Rajasthan, 302001"],
  },
  {
    icon: <Phone className="size-6 text-gold" />,
    title: "Call Us",
    details: ["+91 141 2345678", "+91 98765 43210"],
  },
  {
    icon: <Mail className="size-6 text-gold" />,
    title: "Email Us",
    details: ["info@sanwariya.com", "sales@sanwariya.com"],
  },
  {
    icon: <Clock className="size-6 text-gold" />,
    title: "Working Hours",
    details: ["Mon - Sat: 9:00 AM - 9:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
  },
];

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
      {contactDetails.map((item, index) => (
        <Card key={index} className="bg-white/5 border-gold/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 group">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">{item.icon}</div>
            <h3 className="text-xl text-gold-bright">{item.title}</h3>
            <div className="space-y-1">
              {item.details.map((detail, i) => (
                <p key={i} className="text-beige/80">
                  {detail}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
