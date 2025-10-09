import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-white py-28 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Поддержка семей и развитие карьеры
            <span className="block text-primary-700">
              надёжные решения для будущего
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Мы создаём возможности для многодетных семей и профессионалов, формируя доверие и укрепляя ценности общества.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              to="/need-help" 
              className="bg-primary-600 text-white px-8 py-3 rounded-md font-semibold text-base uppercase tracking-wide hover:bg-primary-700 transition-colors"
            >
              Решения для семей
            </Link>
            <Link 
              to="/want-work" 
              className="bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-semibold text-base uppercase tracking-wide hover:bg-gray-200 transition-colors"
            >
              Карьерные возможности
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
