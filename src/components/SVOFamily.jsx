import { BadgeCheck, HeartHandshake, Rocket } from "lucide-react";
import React from "react";

const SVOFamily = () => {
  return (
    <section
      id="svo"
      className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-10 md:p-14">
            {/* Flag / Heading */}
            <div className="text-5xl mb-6 font-bold">🇷🇺</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              Семьям участников СВО
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Для вас — особые условия и приоритетный подбор помощников
            </p>

            {/* Contact Box */}
            <div className="bg-blue-50 rounded-md p-6 mb-10 border border-blue-100">
              <p className="text-base md:text-lg text-gray-700 mb-5">
                Если вы из семьи участника СВО, пожалуйста, свяжитесь с нашим
                куратором напрямую:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+79999999999"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-sm uppercase tracking-wide hover:bg-blue-700 transition-colors"
                >
                  +7 (999) 999-99-99
                </a>
                <a
                  href="https://t.me/svo_family_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-sm uppercase tracking-wide hover:bg-blue-700 transition-colors"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Rocket,
                  title: "Приоритетный подбор",
                  desc: "Находим помощников в течение 24 часов",
                },
                {
                  icon: HeartHandshake,
                  title: "Специальные условия",
                  desc: "Лучшие цены и индивидуальный подход",
                },
                {
                  icon: BadgeCheck,
                  title: "Полная поддержка",
                  desc: "Персональный куратор 24/7",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mx-auto mb-5">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SVOFamily;
