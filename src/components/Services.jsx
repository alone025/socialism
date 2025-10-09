import { Baby, BookType, BriefcaseMedical, BrushCleaning } from "lucide-react";
import React from "react";

const Services = () => {
  const services = [
    {
      icon: Baby,
      title: "Няня",
      description:
        "Присмотр за детьми от 0 лет, прогулки, развивающие занятия",
      age: "от 0 лет",
    },
    {
      icon: BrushCleaning,
      title: "Помощник по хозяйству",
      description: "Уборка, готовка, помощь в бытовых вопросах",
      features: ["Уборка", "Готовка"],
    },
    {
      icon: BookType,
      title: "Воспитатель",
      description: "Помощь с уроками, развивающие занятия, подготовка к школе",
      features: ["Уроки", "Развитие"],
    },
    {
      icon: BriefcaseMedical,
      title: "Бебиситер с мед. образованием",
      description:
        "Специалисты с медицинским образованием для особых случаев",
      features: ["Мед. образование"],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14 uppercase tracking-wide">
          Наши услуги
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-6">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Age Badge */}
                {service.age && (
                  <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide">
                    {service.age}
                  </span>
                )}

                {/* Features */}
                {service.features && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
