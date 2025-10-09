import { BadgeCheck, GraduationCap, Headset, Heart } from "lucide-react";
import React from "react";

const Trust = () => {
  const reasons = [
    {
      icon: BadgeCheck,
      title: "Тщательный отбор",
      description: "Проверка справок, собеседования, рекомендации",
    },
    {
      icon: Headset,
      title: "Поддержка 24/7",
      description: "Куратор всегда на связи для решения вопросов",
    },
    {
      icon: GraduationCap,
      title: "Образованные специалисты",
      description: "Партнерство с ведущими вузами страны",
    },
    {
      icon: Heart,
      title: "Особая забота о семьях СВО",
      description: "Специальные условия и приоритетный подбор",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14 uppercase tracking-wide">
          Почему нам доверяют
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 mx-auto mb-6">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trust;
