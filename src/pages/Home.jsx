


import React from 'react';
import { Phone, Mail, MapPin, CheckCircle, Award, Baby,HeartHandshake , BrushCleaning, GraduationCap, X, Menu, TextAlignJustify } from 'lucide-react';
import { sendToTelegram } from '../utills/sendToTelegram';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [activeModal, setActiveModal] = React.useState(null);
   
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    experience: '',
    education: '',
    phone: '',
    telegram:'',
    message:"",
    serviceType: '',
    city: '',
    address: '',
    fullName: '',
    age: '',
    workerID:'',
    workerName:'',
    price_per_hour:'',
    workerContact:''

  });
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const location = useLocation();

  

      const handleSubmit= async (e) => {
  e.preventDefault();

  console.log(formData);
  
  let message = '';
  
  // Format message based on modal type
  if (activeModal === 'want-work' || activeModal === 'svo-work') {
    message = `
<b>🔔 НОВАЯ ЗАЯВКА НА РАБОТУ</b>
${activeModal === 'svo-work' ? '\n<b>⭐ СЕМЬЯ УЧАСТНИКА СВО</b>\n' : ''}
<b>Специализация:</b> ${ 'Не указан'}
<b>Город:</b> ${formData.city || 'Не указан'}
<b>Адрес:</b> ${formData.address || 'Не указан'}
<b>ФИО:</b> ${formData.name}
<b>Телефон:</b> ${formData.phone}
<b>Telegram:</b> ${formData.telegram || 'Не указан'}
<b>Возраст:</b> ${formData.age || '-'}
<b>Опыт работы:</b> ${formData.experience || 'Не указан'}
<b>Образование:</b> ${formData.education || 'Не указано'}
    `;
  } else if (activeModal === 'need-service' || activeModal?.startsWith('need-')) {
    message = `
<b>🔔 НОВЫЙ ЗАКАЗ УСЛУГИ</b>

<b>Услуга:</b> ${'Не указан'}
<b>Город:</b> ${ 'Не указан'}
<b>Имя:</b> ${formData.fullName}
<b>Телефон:</b> ${formData.phone}
<b>Дополнительно:</b> ${formData.message || 'Не указано'}
<b>Специалист:</b> ${ 'Не выбран'}
<b>Цена за час:</b> ${'Не указана'}
<b>Контакт специалиста:</b> ${'Не указан'}
    `;
  } else if (activeModal === 'contact-us') {
    message = `
<b>🔔 НОВОЕ СООБЩЕНИЕ</b>

<b>Имя:</b> ${formData.name}
<b>Телефон:</b> ${formData.phone}
<b>Telegram:</b> ${formData.telegram || 'Не указан'}
    `;
  } else {
        message = `
<b>🔔 НОВОЕ СООБЩЕНИЕ</b>

<b>Имя:</b> ${formData.name}
<b>Телефон:</b> ${formData.phone}
<b>Telegram:</b> ${formData.telegram || 'Не указан'}
    `;
  }
  
  // Send to Telegram
  const success = await sendToTelegram(message);
  
  if (success) {
    alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    setActiveModal(null);
    // closeModal()
    setFormData({
      serviceType: '',
      city: '',
      address: '',
      fullName: '',
      phone: '',
      age: '',
      experience: '',
      education: '',
      telegram:'',
      message:'',
      workerID:'',
      workerName:'',
      price_per_hour:'',
      workerContact:'',
      name:''
    });
  } else {
    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.');
  }
};

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  React.useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

    const partners = [
    { name: 'Моя работа', logo: '/moyaR.jpg' },
    { name: 'РУДН', logo: '/rudn.svg' },
    { name: 'МПГУ', logo: 'https://mpgu.su/wp-content/themes/mpgu20/img/logo.svg' },
    { name: 'Персона', logo: '/persona.svg' }
  ];

  return (
    <div className="min-h-screen bg-[#E1E1E1] sm:pt-8 md:pt-14">
     <div className='bg-[#3A466B] mb-14 sm:mx-3 overflow-hidden sm:rounded-xl'>
       {/* Header */}
      <header className={`bg-transparent text-white transition-all duration-300`}>
        
        <div className="max-w-7xl mx-auto px-3 md:px-5 py-1 mt-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-22 contrast- h-22 flex items-center justify-center font-bold text-xl">
              {/* БС */}
              <img src="/logo2.svg" alt="logo" className='' />
            </div>
            <div className="hidden sm:flex gap-6 text-base">
              <span className="flex items-center gap-1">
                {/* <Phone className="w-4 h-4" /> */}
                +7 927 321-82-43
              </span>
              <span className="flex items-center gap-1">
                {/* <Mail className="w-4 h-4" /> */}
                mail@allusine.ru
              </span>
            </div>
          </div>
          <nav className="hidden lg:flex gap-6 text-base font-light">
        <a href="/#about" className="hover:text-teal-400 transition">О НАС</a>
            <a href="/#ourcommand" className="hover:text-teal-400 transition">НАША КОМАНДА</a>
            <a href="/#services" className="hover:text-teal-400 transition">УСЛУГИ</a>
            <a href="/#contacts" className="hover:text-teal-400 transition">КОНТАКТЫ</a>
          </nav>
          <div className="men lg:hidden">
            <TextAlignJustify className="w-8 h-8 lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)}  />
          </div>
        </div>
      </header>



    {/* Header on scroll */}
        <header className={`text-white z-[11111] transition-all duration-500 backdrop-blur-lg bg-[#3A466B]/30 shadow-lg fixed top-0 w-full left-0 ${isScrolled ? ' translate-y-0' : 'translate-y-[-100%]'}`}>
        <div className="max-w-7xl mx-auto px-3 md:px-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex items-center justify-center font-bold text-xl">
              {/* БС */}
              <img src="/logo2.svg" alt="logo" className='' />
            </div>
            <div className="hidden sm:flex gap-6 text-base">
              <span className="flex items-center gap-1">
                {/* <Phone className="w-4 h-4" /> */}
                +7 927 321-82-43
              </span>
              <span className="flex items-center gap-1">
                {/* <Mail className="w-4 h-4" /> */}
                mail@allusine.ru
              </span>
            </div>
          </div>
          <nav className="hidden lg:flex gap-6 text-base font-light">
      <a href="/#about" className="hover:text-teal-400 transition">О НАС</a>
            <a href="/#ourcommand" className="hover:text-teal-400 transition">НАША КОМАНДА</a>
            <a href="/#services" className="hover:text-teal-400 transition">УСЛУГИ</a>
            <a href="/#contacts" className="hover:text-teal-400 transition">КОНТАКТЫ</a>
          </nav>
                  <div className="men lg:hidden">
            <TextAlignJustify className="w-8 h-8 lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)}  />
          </div>
        </div>
      </header>

      {/* Menu repsonsive drawer */}
      <div className={`fixed top-0 right-0 w-full h-full bg-black/50 z-[1111111111111] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 pt-6 flex flex-col items-end text-start">
            <button onClick={() => setIsMenuOpen(false)} className="mb-4">
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <nav className="flex flex-col gap-4 w-full">
              <a href="#about" className="text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>О НАС</a> 
              <a href="#ourcommand" className="text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>НАША КОМАНДА</a>

              <a href="#services" className="text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>УСЛУГИ</a>
              <a href="#contacts" className="text-gray-800 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>КОНТАКТЫ</a>
            </nav>
             <div className="flex flex-col mt-8 gap-1 text-base w-full">
              <span className="flex items-start gap-1">
                {/* <Phone className="w-4 h-4" /> */}
                +7 927 321-82-43
              </span>
              <span className="flex items-start gap-1">
                {/* <Mail className="w-4 h-4" /> */}
                mail@allusine.ru
              </span>
            </div>
          </div>
        </div>
      </div>


      {/* Hero Section */}
      <section className="relative bg-transparent text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-3 md:px-5 pt-10 sm:pt-20 pb-30 relative z-10">
          <h1 className="text-5xl sm:text-6xl font-medium mb-4">
            ALUSSINE<span className="text-teal-400"> СЕРВИС</span>
          </h1>
          <p className="text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
            {/* КОМПЛЕКСНАЯ ИНФОРМАЦИЯ В СФЕРЕ<br/>
            АВТОМАТИЗИРОВАННОГО ПОЛИВА ИРРИГАЦИИ */}

            НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ ПО <br /> ПОДДЕРЖКЕМНОГОДЕТНЫХ СЕМЕЙ И ПОМОЩИ С ДЕТЬМИ
          </p>
           <div className="flex gap-4 flex-wrap mt-8">
            <button 
          
              onClick={()=> setActiveModal('contact-us')}
              className="bg-teal-500 hover:bg-teal-600 text-white/90 px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-500">
              МНЕ НУЖНА ПОМОЩЬ
            </button>
            <button 
              onClick={() => setActiveModal('want-work')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#283457] px-6 md:px-8 py-1.5 sm:py-3 rounded-lg font-semibold transition-all duration-500">
              ХОЧУ РАБОТАТЬ
            </button>
          </div>

        </div>
       
      </section>
     </div>

      {/* About Section */}
      <section className="bg-[#F5F5F5] mx-auto px-3 md:px-5 py-16">
        <h2 className="text-3xl text-[#283457] font-medium mb-6">
          НАША КОМАНДА ЯВЛЯЕТСЯ <span className="text-teal-600">УНИКАЛЬНЫМИ<br/>СПЕЦИАЛИСТАМИ В ИРРИГАЦИИ</span>
        </h2>
        <p className="text-gray-700 mb-4 font-semibold">
          В сферу нашей деятельности попадают:
        </p>
        <ul className="space-y-2 text-gray-700 mb-8">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
            <span>Услуги домашнего персонала (няни, домработницы)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
            <span>Помощь молодым мамам в первое время</span>
          </li>
                <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
            <span>Психологическая поддержка семей</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
            <span>Места для стажировки выпускников педагогических и медицинских училищ</span>
          </li>
                 <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
            <span>Профессиональные повара на дом</span>
          </li>
                   <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
            <span>Присмотр за детьми от 0 лет</span>
          </li>
        </ul>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">120+</div>
            <div className="text-gray-600 text-3xl font-medium uppercase">Специалисты</div>
          </div>
          <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">10+ ЛЕТ</div>
            <div className="text-gray-600 text-3xl font-medium">НА РЫНКЕ</div>
          </div>
          <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">200+</div>
            <div className="text-gray-600 text-3xl font-medium uppercase">Семьи</div>
          </div>
          <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">10+ ЛЕТ</div>
            <div className="text-gray-600 text-3xl font-medium">НА РЫНКЕ</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id='services' className="bg-[#F5F5F5] pb-16 scroll-m-20">
        <div className="mx-auto px-3 md:px-5">
          <h2 className="text-3xl font-medium text-[#283457] mb-7">НАШИ УСЛУГИ</h2>
          <p className="text-xl mb-12 text-gray-700 font-medium">
           
            НАШИ СПЕЦИАЛИСТЫ ПРЕДОСТАВЛЯЮТ НАШИМ КЛИЕНТАМ<br/>
            <span className="text-teal-600">УДОБНЫЕ, ПОРЯДКОВЫЕ И НЕПРЕРЫВНЫЕ УСЛУГИ</span>
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Baby className="w-8 h-8" />,
                title: "НЯНЯ",
                desc: "Присмотр за детьми от 0 лет. Профессиональный уход, развивающие занятия."
              },
              {
                icon: <BrushCleaning className="w-8 h-8" />,
                title: "УБОРКА КВАРТИРЫ",
                desc: "Помощь в ведении домашнего хозяйства, поддержание чистоты"
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "ВОСПИТАТЕЛЬ",
                desc: "Помощь с уроками, развивающие занятия, присмотр"
              },
              {
                icon: <HeartHandshake className="w-8 h-8" />,
                title: "ПОМОЩЬ В БЫТУ",
                desc: "Готовка, уборка, помощь по хозяйству для многодетных семей."
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white text-[#213159] p-6 rounded-xl">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <p className="text-base font-medium leading-relaxed">{service.title}</p>
                <p className='text-sm line-clamp-3 mt-2'>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-[#F5F5F5] px-3 md:px-5 py-16">
        <h2 className="text-3xl font-medium text-[#283457] mb-8 border-b-[1.5px] border-b-teal-600/70 pb-3 uppercase">НАШИ <span className="text-teal-600">партнеры</span></h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className='bg-white p-4 h-max mt-5 rounded-md'>
            <h3 className="text-2xl font-medium mb-4 text-teal-600">
              {partners[0].name}
            </h3>
            <p className="text-gray-700 mb-4">
              Официальный канал Центра занятости населения города Москвы.
            </p>
        
          </div>
          <div className="rounded-lg overflow-hidden flex justify-center">
            <img 
              src={partners[0].logo} 
              alt="Building facade"
              className="w-full max-w-[400px] max-h-[400px] h-full object-contain lg:object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className="rounded-lg overflow-hidden flex justify-center min-h-[00px]">
            <img 
             src={partners[1].logo} 
              alt="Park area"
         className="w-full max-lg:max-w-[400px] max-h-[400px] h-full object-contain lg:object-cover"
            />
          </div>
            <div className='bg-white p-4 h-max mt-5 rounded-md'>
            <h3 className="text-2xl font-medium mb-4 text-teal-600">
              {partners[1].name}
            </h3>
            <p className="text-gray-700 mb-4">
              Объединяя знанием людей разных культур, РУДН формирует лидеров, которые делают мир лучше
            </p>
        
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className='bg-white p-4 h-max mt-5 rounded-md'>
            <h3 className="text-2xl font-medium mb-4 text-teal-600">
              {partners[2].name}
            </h3>
            <p className="text-gray-700 mb-4">
              Моско́вский педагоги́ческий госуда́рственный университе́т — высшее учебное заведение в Москве.
            </p>
        
          </div>
          <div className="rounded-lg overflow-hidden flex justify-center">
            <img 
              src={partners[2].logo} 
              alt="Building facade"
              className="w-full max-w-[400px] max-h-[400px] h-full object-contain lg:object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className="rounded-lg overflow-hidden flex justify-center min-h-[00px]">
            <img 
             src={partners[3].logo} 
              alt="Park area"
         className="w-full max-lg:max-w-[400px] max-h-[400px] h-full object-contain lg:object-cover"
            />
          </div>
            <div className='bg-white p-4 h-max mt-5 rounded-md'>
            <h3 className="text-2xl font-medium mb-4 text-teal-600">
              {partners[3].name}
            </h3>
            <p className="text-gray-700 mb-4">
              Персона
            </p>
        
          </div>
        </div>
      </section>

      {/* Private Clients CTA */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-7 lg:py-10 mx-4 rounded-xl ovrflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-5 flex max-md:flex-col items-end justify-between">
          <div>
            <h2 className="text-3xl font-medium mb-10 md:mb-14">Семьям участников СВО</h2>
            <p className="text-base max-w-2xl">
              Приоритетное трудоустройство для членов семей участников специальной военной операции.
            </p>
          </div>
          <button
          onClick={() => setActiveModal('svo-work')}
          className="bg-teal-600 max-md:mt-4 hover:bg-teal-700 px-6 md:px-8 py-2 md:py-4 rounded-md max-w-[200px] w-full uppercase font-normal transition">
            хочу работать
          </button>
        </div>
      </section>

      {/* Products */}
      <section id='ourcommand' className="bg-[#F5F5F5] px-3 md:px-5 py-16 scroll-m-10">
        <h2 className="text-3xl font-medium text-[#283457] mb-6 uppercase">специалисты</h2>
        <p className="text-gray-700 font-medium text-lg lg:text-xl max-w-5xl mb-12 leading-relaxed">
         Наши специалисты — это опытные профессионалы в каждой сфере социальной помощи, которые являются настоящими мастерами своего дела.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {[
{
    "name": "Доктор Анастасия Иванова",
    "experience": "10 лет",
    "price_per_hour": "5000₽",
    "about": "Доктор Анастасия Иванова — клинический психолог с 10-летним опытом работы в области психотерапии. Она помогает пациентам справляться с депрессией, тревожностью, семейными проблемами и посттравматическими расстройствами. Анастасия использует когнитивно-поведенческую терапию (КПТ) и методы осознанности для создания индивидуальных терапевтических планов. Она активно работает с подростками и взрослыми, помогая наладить внутреннюю гармонию и улучшить качество жизни."
  },
  {
    "name": "Доктор Алексей Смирнов",
    "experience": "15 лет",
    "price_per_hour": "7000₽",
    "about": "Доктор Алексей Смирнов — высококвалифицированный ортопед, специализирующийся на лечении спортивных травм и замене суставов. Он имеет более 15 лет опыта работы в крупных медицинских центрах России и за рубежом. Алексей применяет инновационные методы лечения, включая минимально инвазивные операции, что позволяет пациентам быстрее восстанавливаться после травм и операций. Он активно занимается реабилитацией и поддержанием физической активности своих пациентов."
  },
  {
    "name": "Ирина Васильева, PhD",
    "experience": "8 лет",
    "price_per_hour": "6000₽",
    "about": "Ирина Васильева — эксперт в области анализа данных и искусственного интеллекта, с более чем 8-летним опытом работы в российских и международных компаниях. Она разрабатывает алгоритмы машинного обучения для прогнозирования и оптимизации бизнес-процессов. Ирина помогает компаниям автоматизировать процессы и повышать их операционную эффективность, а также проводит тренинги по работе с большими данными и ИИ для специалистов и команд."
  }
          ].map((product, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500">
              <div className="tp flex sm:flex-wrap lg:flex-nowrap flex-row gap-4 p-2.5 transition-all duration-500">
                <div className="bg-[#009689] h-40 sm:h-48 min-w-40 sm:min-w-48 rounded-lg"></div>
           <div className="flex flex-col">
                              <h3 className="font-medium text-base mb-3 text-[#313656]">{product.name}</h3>
            <p className='mt-auto text-sm text-gray-600 mb-1'>
            Опыт: {product.experience}
            </p>
              <p className=' text-sm text-gray-600 mb-1'>
                {product.price_per_hour} руб/час
              </p>
                  <button className="bg-[#009689]  hover:bg-teal-700 text-white px-6 py-1.5 sm:py-2 rounded font-medium transition w-max">
                  Написать
                </button>
           </div>
              </div>
      <div className="p-2.5 relative">
  <p className="text-gray-600 max-md:hidden text-sm line-clamp-4 hover:line-clamp-none transition-all duration-300">
    {product.about}
  </p>
</div>

            </div>
          ))}
    
        </div>
              <div className="btn-div flex justify-center w-full mt-2 mb-14">
            <button onClick={()=> window.open('/workerlist', "_current")} className="bg-[#009689] hover:bg-teal-700 text-white px-6 py-2 rounded font-medium transition w-[200px]">
              Показать все
            </button>
          </div>

        {/* Company Info */}
        <div id='about' className="grid lg:grid-cols-2 gap-12 items-center scroll-m-14">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/logo.svg" 
              alt="Building detail"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className=' text-lg font-semibold text-[#283457] mb-1.5'>Наша миссия</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Повысить уровень жизни многодетных родителей, реализовать и увеличить покупательскую 
              способность страны, путем создания рабочих мест для женщин и молодых амбициозных 
              специалистов в области педагогики и сфер услуг. Облегчить бытовую жизнь многодетных семей.
            </p>
            <h4 className=' text-lg font-semibold text-[#283457] mb-1.5'>Наши цели</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-3 leading-relaxed">
              <li>Создание надежных рабочих мест в сфере домашнего персонала</li>
              <li>Поддержка многодетных семей в бытовых вопросах</li>
              <li>Предоставление вакансий выпускникам педагогических и медицинских учебных заведений</li>
              <li>Организация стажировок для молодых специалистов</li>
              <li>Психологическая поддержка и укрепление семейных ценностей</li>
            </ul>

            <div className="flex flex-col border-t-[1.5px] pt-3.5 border-t-[#4AB3AA] mt-8">
  <h4 className=' text-lg font-semibold text-[#283457] mb-1.5'>
              Премия «Вложение в семейные ценности» им. Греты Гевондян
            </h4>
            <p className=" text-gray-700 leading-relaxed mb-6">
              Ежегодная премия для мам, которые преодолели сложные жизненные ситуации 
              и внесли значительный вклад в сохранение и укрепление семейных ценностей.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="bg-white py-16">
        <div className="px-3 md:px-5">
          <h2 className="text-2xl sm:text-3xl font-medium text-[#283457] mb-12">БЛАГОДАРСТВЕННЫЕ ПИСЬМА</h2>
          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((cert) => (
              <div key={cert} className="bg-white rounded-lg shadow-lg p-4 aspect-[3/4]">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                  <Award className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
        <section id="contacts" className="my-5 scroll-m-20">
  <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 mx-4 rounded-xl overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-5 flex max-md:flex-col items-end justify-between">
      <div>
        <h2 className="text-3xl font-medium mb-14">Хотите узнать больше?</h2>
        {/* <p className="text-base max-w-2xl">
          Свяжитесь с нами для получения дополнительной информации о наших услугах и специалистах.
        </p> */}

        <form onSubmit={handleSubmit} className="flex flex-wrap w-full">
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="Ваше имя"
            className="border-b border-white/50 bg-transparent text-white placeholder-white/70 focus:border-teal-500 transition-all duration-700 p-2.5 mr-2 mb-2 w-full"
          />

          <div className="flex flex-col sm:flex-row w-full mt-4 gap-2">
            <input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              type="tel"
              placeholder="Ваш телефон"
              className="border-b border-white/50 bg-transparent text-white placeholder-white/70 focus:border-teal-500 transition-all duration-700 p-2.5 mr-2 mb-2 w-full"
            />

            <input
              value={formData.telegram}
              onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              type="text"
              placeholder="Ваш Telegram"
              className="border-b border-white/50 bg-transparent text-white placeholder-white/70 focus:border-teal-500 transition-all duration-700 p-2.5 mr-2 mb-2 w-full"
            />
          </div>

          <button
            // onClick={() => setActiveModal("formSubmite")}
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 px-6 sm:px-8 py-3 sm:py-4 mt-6 rounded-md max-w-[250px] w-full uppercase font-normal transition"
          >
            Связаться с нами
          </button>
        </form>
      </div>
    </div>
  </div>
</section>


      {/* Footer/Contact */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-md:flex max-md:flex-col-reverse md:grid md:grid-cols-2 gap-12">
            <div className="rounded-lg overflow-hidden shadow-lg">
      <div >
  <iframe
    src="https://yandex.ru/map-widget/v1/?ll=37.6176,55.7558&z=10&pt=37.6176,55.7558,pm2rdm"
    width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
    loading="lazy"
    className='h-[350px] w-full'
    referrerPolicy="no-referrer-when-downgrade">
  </iframe>
</div>

            </div>
            <div>
              <h2 className="text-3xl font-semibold text-[#283457] mb-6">
                ALUSSINE<span className="text-teal-600"> СЕРВИС</span>
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <span>ИП Георгиев Д.Р<br/>101000 Москва, ул. Покровка 1/13 стр 6</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <span>Телефон: +7 927 321-82-43</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <span>Эл. почта: mail@allusine.ru</span>
                </p>
              </div>
              <div className="mt-8 p-1.5 sm:p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-2 text-[#283457]">Реквизиты компании см на странице о нас</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Москва, ул. Покровка 1/13 стр.6 корп.?</li>
                  <li>+7 (495) 151 65 12</li>
                  <li>Понедельник - Пятница с 11:00 до 18:00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <footer className="bg-slate-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© 2024 ALUSSINE-Сервис. Все права защищены.</p>
        </div>
      </footer>

      {/* Contact modal */}
      {(activeModal && activeModal !== "formSubmite") && (
        <div
        // onClick={() => setActiveModal(null)}
        className="fixed inset-0 bg-black/28 z-[111111111111111111] bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-screen overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-[#283457]">
              {(activeModal === 'need-service' || activeModal === 'contact-us' ) ? 'Мне нужна помощь' : 'Хочу работать'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Имя</label>
                <input

                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e)=> setFormData({...formData, name: e.target.value})}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Телефон</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                                  onChange={(e)=> setFormData({...formData, phone: e.target.value})}

                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
                  <div>
                <label className="block text-sm font-medium text-gray-700">Телеграм</label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                                                   onChange={(e)=> setFormData({...formData, telegram: e.target.value})}

                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
             {
                activeModal === 'want-work' && (
                   <div>
                <label className="block text-sm font-medium text-gray-700">Опыт работы</label>
                <textarea
                  name="experience" 
                  value={formData.experience}
                                                   onChange={(e)=> setFormData({...formData, experience: e.target.value})}

                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                ></textarea>
              </div>)
             }
            <div className="dbtns space-x-4">
                <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition"
              >
                Отправить
              </button>
                <button
               
                onClick={() => setActiveModal(null)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition"
              >
                Закрыть
              </button>
            </div>
            </form> 
          </div>
        </div>
      )} 
    </div>
  );
}