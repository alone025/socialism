import React from 'react';

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Заголовок страницы */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center tracking-tight">
            О нас
          </h1>

          {/* Миссия и цели */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
              Наша миссия
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              Повысить уровень жизни многодетных родителей, реализовать и увеличить покупательскую 
              способность страны, путем создания рабочих мест для женщин и молодых амбициозных 
              специалистов в области педагогики и сфер услуг. Облегчить бытовую жизнь многодетных семей.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
              Наши цели
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 leading-relaxed">
              <li>Создание надежных рабочих мест в сфере домашнего персонала</li>
              <li>Поддержка многодетных семей в бытовых вопросах</li>
              <li>Предоставление вакансий выпускникам педагогических и медицинских учебных заведений</li>
              <li>Организация стажировок для молодых специалистов</li>
              <li>Психологическая поддержка и укрепление семейных ценностей</li>
            </ul>
          </div>

          {/* Премия */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
              Премия «Вложение в семейные ценности» им. Греты Гевондян
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Ежегодная премия для мам, которые преодолели сложные жизненные ситуации 
              и внесли значительный вклад в сохранение и укрепление семейных ценностей.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Как номинировать?
              </h3>
              <p className="text-blue-800 leading-relaxed">
                Для номинации кандидата свяжитесь с нами по электронной почте или через 
                форму обратной связи. Мы расскажем о критериях отбора и процедуре номинации.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
