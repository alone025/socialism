import React from 'react';

const Partners = () => {
  const partners = [
    { name: 'Моя работа', logo: '/moyaR.jpg' },
    { name: 'РУДН', logo: '/rudn.svg' },
    { name: 'МПГУ', logo: 'https://mpgu.su/wp-content/themes/mpgu20/img/logo.svg' },
    { name: 'Персона', logo: '/persona.svg' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14 uppercase tracking-wide">
          Наши партнеры
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-4 text-gray-600">
                <img src={partner.logo} alt={partner.name} className='w-36' />
              </div>
              {/* <p className="text-lg font-semibold text-gray-700">{partner.name}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
