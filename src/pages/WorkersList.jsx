import { ExternalLink, X, TextAlignJustify  } from "lucide-react";
import React from "react";

import dataLocal from  "../data/local.data.json";
import { sendToTelegram } from "../utills/sendToTelegram";


const WorkersList = () => {
        const [isScrolled, setIsScrolled] = React.useState(false);
          const [showFilter, setShowFilter] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedWorker, setSelectedWorker] = React.useState(null);

      const [selectedWorker2, setSelectedWorker2] = React.useState(null);
  const [showContactModal, setShowContactModal] = React.useState(false);


    // const skills = ["React", "Node.js", "UI/UX", "Python", "Django", "DevOps"];
  const categories = [
  "Уход за детьми 0-1 год",
  "Уход за детьми 1-3 года",
  "Уход за детьми 3-6 лет",
  "Уход за детьми 6+ лет",
  "Помощь с домашними заданиями",
  "Подготовка к школе",
  "Обучение языкам",
  "Приготовление еды",
  "Уборка",
  "Стирка",
  "Покупка продуктов"
]
;
  const cities = dataLocal.regions; 

  const labels = [
  "Английский язык",
  "Готовка",
  "Уборка",
  "Вождение",
  "Музыка",
  "Спорт",
  "Первая помощь",
  "Рисование",
  "Помощь с уроками",
  "Математика",
  "Наука",
  "Стирка",
  "Покупки",
  "Глажка"
]

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [activeModal, setActiveModal] = React.useState('need-service');
    const [formData, setFormData] = React.useState({
    serviceType: selectedWorker2?.category || selectedWorker?.category || '',
    city: selectedWorker2?.city ||  selectedWorker?.city || '',
    fullName: '',
    phone: '',
   
      telegram:'',
    message:"",
    workerID:selectedWorker2?.id || selectedWorker?.id || '',
    workerName:selectedWorker2?.name || selectedWorker?.name || '',
    price_per_hour:selectedWorker2?.price_per_hour || selectedWorker?.price_per_hour || '',
    workerContact:selectedWorker2?.contact?.phone || selectedWorker?.contact?.phone || '',
  });



  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) setList(list.filter((i) => i !== item));
    else setList([...list, item]);
  };

  const openContactModal = (worker) => {
    setSelectedWorker2(worker);
    setShowContactModal(true);
  };

  const closeModal = () => {
    setShowContactModal(false);
    setSelectedWorker2(null);
  };
  

      React.useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


      const handleSubmit = async (e) => {
  e.preventDefault();

  console.log(formData);
  console.log(selectedWorker)
  console.log(selectedWorker2)
  
  let message = '';
  
  // Format message based on modal type
  if (activeModal === 'want-work' || activeModal === 'svo-work') {
    message = `
<b>🔔 НОВАЯ ЗАЯВКА НА РАБОТУ</b>
${activeModal === 'svo-work' ? '\n<b>⭐ СЕМЬЯ УЧАСТНИКА СВО</b>\n' : ''}
<b>Специализация:</b> ${selectedWorker2?.category || selectedWorker?.category || ''}
<b>Город:</b> ${formData.city}
<b>Адрес:</b> ${formData.address}
<b>ФИО:</b> ${formData.fullName}
<b>Телефон:</b> ${formData.phone}
<b>Telegram:</b> ${formData.telegram || 'Не указан'}
<b>Возраст:</b> ${formData.age}
<b>Опыт работы:</b> ${formData.experience || 'Не указан'}
<b>Образование:</b> ${formData.education || 'Не указано'}
    `;
  } else if (activeModal === 'need-service' || activeModal.startsWith('need-')) {
    message = `
<b>🔔 НОВЫЙ ЗАКАЗ УСЛУГИ</b>

<b>Услуга:</b> ${selectedWorker2?.category || selectedWorker?.category || ''}
<b>Город:</b> ${selectedWorker2?.city ||  selectedWorker?.city || ''}
<b>Имя:</b> ${formData.fullName}
<b>Телефон:</b> ${formData.phone}
<b>Дополнительно:</b> ${formData.message || 'Не указано'}
<b>Специалист:</b> ${selectedWorker2?.name || selectedWorker?.name || 'Не выбран'}
<b>Цена за час:</b> ${selectedWorker2?.price_per_hour || selectedWorker?.price_per_hour || 'Не указана'}
<b>Контакт специалиста:</b> ${selectedWorker2?.contact?.phone || selectedWorker?.contact?.phone || 'Не указан'}
    `;
  } else if (activeModal === 'contact-us') {
    message = `
<b>🔔 НОВОЕ СООБЩЕНИЕ</b>

<b>Имя:</b> ${formData.fullName}
<b>Телефон:</b> ${formData.phone}
<b>Email:</b> ${formData.education || 'Не указан'}
<b>Сообщение:</b>
${formData.experience}
    `;
  }
  
  // Send to Telegram
  const success = await sendToTelegram(message);
  
  if (success) {
    alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    setActiveModal('need-service');
    closeModal()
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
      message:"",
      workerID:'',
      workerName:'',
      price_per_hour:'',
      workerContact:''
    });
  } else {
    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.');
  }
};


      const workers = [
  {
    "name": "Доктор Анастасия Иванова",
    "experience": "10 лет",
    "price_per_hour": "5000₽",
    "about": "Доктор Анастасия Иванова — клинический психолог с 10-летним опытом работы в области психотерапии. Она помогает пациентам справляться с депрессией, тревожностью, семейными проблемами и посттравматическими расстройствами.",
    "city": "Москва",
    "category": "Психология и психотерапия",
    "categories": ["Помощь с домашними заданиями", "Обучение языкам"],
    "skills": ["Первая помощь", "Музыка", "Наука"],
    "rating": 4.9,
    "reviews": 134,
    "contact": {
      "email": "ivanova.anastasia@example.com",
      "phone": "+7 (900) 123-45-67"
    }
  },
  {
    "name": "Доктор Алексей Смирнов",
    "experience": "15 лет",
    "price_per_hour": "7000₽",
    "about": "Доктор Алексей Смирнов — ортопед, специализирующийся на лечении спортивных травм и замене суставов. Применяет инновационные методы лечения, включая минимально инвазивные операции.",
    "city": "Санкт-Петербург",
    "category": "Ортопедия и спортивная медицина",
    "categories": ["Помощь с домашними заданиями", "Стирка"],
    "skills": ["Спорт", "Первая помощь", "Вождение"],
    "rating": 4.8,
    "reviews": 212,
    "contact": {
      "email": "smirnov.alexey@example.com",
      "phone": "+7 (921) 555-12-34"
    }
  },
  {
    "name": "Ирина Васильева, PhD",
    "experience": "8 лет",
    "price_per_hour": "6000₽",
    "about": "Ирина Васильева — эксперт по анализу данных и искусственному интеллекту. Разрабатывает алгоритмы машинного обучения для прогнозирования и оптимизации бизнес-процессов.",
    "city": "Новосибирск",
    "category": "ИТ и аналитика",
    "categories": ["Подготовка к школе", "Помощь с домашними заданиями"],
    "skills": ["Математика", "Наука", "Готовка"],
    "rating": 5.0,
    "reviews": 89,
    "contact": {
      "email": "vasilieva.irina@example.com",
      "phone": "+7 (913) 987-65-43"
    }
  },
  {
    "name": "Мария Петрова",
    "experience": "6 лет",
    "price_per_hour": "3500₽",
    "about": "Мария Петрова — репетитор по английскому языку. Работает со взрослыми и школьниками, готовит к экзаменам, применяет коммуникативные методики.",
    "city": "Екатеринбург",
    "category": "Образование",
    "categories": ["Обучение языкам", "Подготовка к школе"],
    "skills": ["Английский язык", "Помощь с уроками", "Математика"],
    "rating": 4.7,
    "reviews": 67,
    "contact": {
      "email": "petrova.maria@example.com",
      "phone": "+7 (912) 555-23-44"
    }
  },
  {
    "name": "Сергей Николаев",
    "experience": "12 лет",
    "price_per_hour": "5500₽",
    "about": "Сергей Николаев — веб-разработчик, создающий современные сайты и обучающий начинающих программистов.",
    "city": "Казань",
    "category": "ИТ и разработка",
    "categories": ["Помощь с домашними заданиями", "Обучение языкам"],
    "skills": ["Наука", "Математика", "Рисование"],
    "rating": 4.9,
    "reviews": 98,
    "contact": {
      "email": "nikolaev.sergey@example.com",
      "phone": "+7 (917) 666-77-88"
    }
  },
  {
    "name": "Ольга Кузнецова",
    "experience": "9 лет",
    "price_per_hour": "4500₽",
    "about": "Ольга Кузнецова — дизайнер интерьеров, создающая комфортные и функциональные пространства.",
    "city": "Москва",
    "category": "Дизайн",
    "categories": ["Уход за детьми 3-6 лет", "Уборка"],
    "skills": ["Рисование", "Музыка", "Глажка"],
    "rating": 4.8,
    "reviews": 121,
    "contact": {
      "email": "kuznetsova.olga@example.com",
      "phone": "+7 (916) 333-22-11"
    }
  },
  {
    "name": "Дмитрий Орлов",
    "experience": "5 лет",
    "price_per_hour": "3000₽",
    "about": "Дмитрий Орлов — фитнес-тренер, специализирующийся на персональных тренировках и похудении.",
    "city": "Ростов-на-Дону",
    "category": "Фитнес",
    "categories": ["Уход за детьми 6+ лет", "Приготовление еды"],
    "skills": ["Спорт", "Вождение", "Первая помощь"],
    "rating": 4.6,
    "reviews": 55,
    "contact": {
      "email": "orlov.dmitry@example.com",
      "phone": "+7 (908) 123-11-22"
    }
  },
  {
    "name": "Татьяна Громова",
    "experience": "11 лет",
    "price_per_hour": "4000₽",
    "about": "Татьяна Громова — логопед-дефектолог, работающая с детьми и развивающая их речь и коммуникацию.",
    "city": "Самара",
    "category": "Педагогика",
    "categories": ["Уход за детьми 3-6 лет", "Подготовка к школе"],
    "skills": ["Помощь с уроками", "Математика", "Наука"],
    "rating": 4.9,
    "reviews": 73,
    "contact": {
      "email": "gromova.tatiana@example.com",
      "phone": "+7 (909) 777-88-99"
    }
  },
  {
    "name": "Андрей Мельников",
    "experience": "14 лет",
    "price_per_hour": "8000₽",
    "about": "Андрей Мельников — юрист, специализирующийся на корпоративном и гражданском праве.",
    "city": "Москва",
    "category": "Юриспруденция",
    "categories": ["Помощь с домашними заданиями", "Покупка продуктов"],
    "skills": ["Математика", "Английский язык", "Наука"],
    "rating": 4.9,
    "reviews": 185,
    "contact": {
      "email": "melnikov.andrey@example.com",
      "phone": "+7 (905) 432-10-10"
    }
  },
  {
    "name": "Екатерина Волкова",
    "experience": "7 лет",
    "price_per_hour": "3800₽",
    "about": "Екатерина Волкова — визажист и стилист, создающая свадебные и вечерние образы.",
    "city": "Краснодар",
    "category": "Красота",
    "categories": ["Уход за детьми 1-3 года", "Уборка"],
    "skills": ["Рисование", "Глажка", "Покупки"],
    "rating": 4.8,
    "reviews": 102,
    "contact": {
      "email": "volkova.ekaterina@example.com",
      "phone": "+7 (964) 123-45-67"
    }
  },
  {
    "name": "Павел Киселёв",
    "experience": "9 лет",
    "price_per_hour": "4200₽",
    "about": "Павел Киселёв — маркетолог-аналитик, помогающий компаниям повышать эффективность рекламных кампаний.",
    "city": "Нижний Новгород",
    "category": "Маркетинг",
    "categories": ["Подготовка к школе", "Покупка продуктов"],
    "skills": ["Наука", "Математика", "Готовка"],
    "rating": 4.7,
    "reviews": 64,
    "contact": {
      "email": "kiselev.pavel@example.com",
      "phone": "+7 (910) 222-33-44"
    }
  },
  {
    "name": "Виктория Соколова",
    "experience": "4 года",
    "price_per_hour": "2500₽",
    "about": "Виктория Соколова — фотограф, специализирующаяся на портретных и свадебных съёмках.",
    "city": "Пермь",
    "category": "Фотография",
    "categories": ["Уход за детьми 1-3 года", "Стирка"],
    "skills": ["Рисование", "Музыка", "Покупки"],
    "rating": 4.8,
    "reviews": 79,
    "contact": {
      "email": "sokolova.viktoria@example.com",
      "phone": "+7 (902) 654-33-21"
    }
  },
  {
    "name": "Роман Захаров",
    "experience": "13 лет",
    "price_per_hour": "6500₽",
    "about": "Роман Захаров — бизнес-консультант и коуч по управлению персоналом, помогает компаниям развивать лидерство.",
    "city": "Воронеж",
    "category": "Бизнес и консалтинг",
    "categories": ["Помощь с домашними заданиями", "Обучение языкам"],
    "skills": ["Английский язык", "Наука", "Спорт"],
    "rating": 5.0,
    "reviews": 115,
    "contact": {
      "email": "zakharov.roman@example.com",
      "phone": "+7 (903) 777-12-34"
    }
  }
]


  return (
    <div className="min-h-screen bg-[#E1E1E1]">
           <header className={`text-white z-[11111] transition-all duration-500 backdrop-blur-lg bg-[#3A466B] shadow-lg w-full `}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 flex items-center justify-center font-bold text-xl cursor-pointer" onClick={()=> window.open('/', "_current")}>
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

{/* Content */}
        <div className="mx-auto px-3 md:px-5 py-14 sm:py-20">
           <div className="dive flex flex-col justify-between items-start max-sm:gap-2 sm:items-center mb-6">
             <h1 className="text-2xl sm:text-3xl font-medium text-[#283457] uppercase">Список специалистов</h1>
            
            <button           onClick={() => setShowFilter(!showFilter)}
 className="bg-[#009689] hover:bg-teal-700 text-white px-6 py-1 sm:py-2 rounded font-medium transition w-max">
                Фильтры
            </button>
           </div>
                 {/* Filter dropdown/modal */}
      {showFilter && (
        <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 mb-6 animate-fadeIn">
          {/* Search */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Поиск</label>
            <input
              type="text"
              placeholder="Поиск специалиста..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Цена (₽)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="От"
                min={0}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="До"
                min={0}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

       {/* Experience */}
<div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1">
    Опыт (лет)
  </label>
  <select
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
  >
    <option value="">Выберите опыт</option>
    <option value="no">Без опыта</option>
    <option value="1-3">1–3 года</option>
    <option value="3+">3+ лет</option>
  </select>
</div>


          {/* City & Region */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Город</label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setRegion("");
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Выберите город</option>
                {cities.map((c, ci) => (
                  <option key={ci} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Регион</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                disabled={!city}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:bg-gray-100"
              >
                <option value="">Выберите регион</option>
               {city &&
      cities
        .find((c) => c.name === city)
        ?.cities?.map((r, ri) => (
          <option key={ri} value={r}>
            {r}
          </option>
        ))}

              </select>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Навыки
            </label>
            <div className="flex flex-wrap gap-2">
              {labels.map((skill) => (
                <button
                  key={skill}
                  onClick={() =>
                    toggleItem(selectedSkills, setSelectedSkills, skill)
                  }
                  className={`px-4 py-1.5 rounded-full border transition ${
                    selectedSkills.includes(skill)
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Категории
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    toggleItem(selectedCategories, setSelectedCategories, cat)
                  }
                  className={`px-4 py-1.5 rounded-full border transition ${
                    selectedCategories.includes(cat)
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowFilter(false)}
              className="px-5 py-1.5 sm:py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
            >
              Отмена
            </button>
            <button className="px-5 py-1.5 sm:py-2 bg-[#009689] hover:bg-teal-700 text-white rounded transition">
              Применить
            </button>
          </div>
        </div>
      )}



            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Example worker card */}
                {workers.map((product, idx) => (
                         <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500">
              <div className="tp flex flex-col lg:flex-row gap-4 p-2.5 transition-all duration-500">
                <div className="bg-[#009689] h-48 min-w-48 rounded-lg"></div>
           <div className="flex flex-col">
                              <h3 className="font-medium text-base mb-3 text-[#313656]">{product.name}</h3>
            <p className='mt-auto text-sm text-gray-600 mb-1'>
            Опыт: {product.experience} ({product.rating}⭐)
            </p>
              <p className=' text-sm text-gray-600 mb-1'>
                {product.price_per_hour} руб/час
              </p>
                <div className="flex justify-between gap-2 items-center w-full">
                      <button                     onClick={() => openContactModal(product)}
 className="bg-[#009689]  hover:bg-teal-700 text-white px-6 py-2 rounded font-medium transition w-max">
                  Написать
                </button>
                <button                   onClick={() => setSelectedWorker(product)}
 className="mt-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition w-max flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-gray-600 hover:text-teal-700 transition" />
                </button>
                </div>
           </div>
              </div>
      <div className="p-2.5 relative">
  <p className="text-gray-600 text-sm line-clamp-4 transition-all duration-300">
    {product.about}
  </p>
</div>

            </div>
                ))}
            </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center py-10 w-full">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition">
              Пред
            </button>
            <button className="px-3 py-1 bg-[#009689] text-white rounded hover:bg-teal-700 transition">
              1
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition">
              2
            </button>
            <button className="max-sm:hidden px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition">
              3
            </button>
            <span className="px-3 py-1 text-gray-500">...</span>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition">
              10
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition">
              След
            </button>
          </div>
              
        </div>


        {/* Modal */}
    
          {selectedWorker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[111111111]">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative animate-fadeIn max-h-[98vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedWorker(null)}
              className="absolute top-5 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#009689] h-40 w-40 rounded-lg mb-4"></div>
              <h2 className="text-2xl font-semibold text-[#283457] mb-2">
                {selectedWorker.name}
              </h2>
              <p className="text-gray-600 mb-3">{selectedWorker.about}</p>

              <div className="w-full text-left space-y-2 mt-4">
                <p>
                  <span className="font-medium text-gray-800">Опыт:</span>{" "}
                  {selectedWorker.experience} 
                </p>
                <p>
                    <span className="font-medium text-gray-800">Рейтинг:</span>{" "}
                    {selectedWorker.rating} ({selectedWorker.reviews} отзывов)
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    Цена за час:
                  </span>{" "}
                  {selectedWorker.price_per_hour} руб
                </p>
                <p>
                  <span className="font-medium text-gray-800">Город:</span>{" "}
                  {selectedWorker.city}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Навыки:</span>{" "}
                  {selectedWorker.skills?.join(", ") || "—"}
                </p>
                <p>
                    <span className="font-medium text-gray-800">Категория:</span>{" "}
                    {selectedWorker.category}

                </p>
                <p>
                    <span className="font-medium text-gray-800">Контакты:</span>
                    <br />
                    Email: {selectedWorker.contact.email}
                    <br />
                    Телефон: {selectedWorker.contact.phone}
                </p>
              </div>

              <div className="flex justify-end gap-4 mt-6 w-full">
                  <button
                  onClick={() => {
                    openContactModal(selectedWorker);
                    setSelectedWorker(null);
                  }}
                  className="bg-[#009689] hover:bg-teal-700 text-white px-6 py-2 rounded font-medium transition"
                >
                  Написать
                </button>
                <button
                  onClick={() => setSelectedWorker(null)}
                  className="bg-[#009689] hover:bg-teal-700 text-white px-6 py-2 rounded font-medium transition"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


            {showContactModal && selectedWorker2 && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-[111111]">
          <div className="bg-white max-h-[98vh] overflow-y-auto rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Specialist Info */}
            <h2 className="text-2xl font-semibold text-[#283457] mb-4">
              Связаться с: <span className="text-teal-600">{selectedWorker2.name}</span>
            </h2>

            {/* Contact Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Ваше имя
                </label>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  onChange={(event)=> setFormData({ ...formData, fullName: event.target.value })
                }
                value={formData.fullName}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Ваш телефон
                </label>
                <input
                  type="phone"
                  placeholder="+7 (___) ___-__-__"
                      onChange={(event)=> setFormData({ ...formData, phone: event.target.value })
                }
                value={formData.phone}
                required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

                 <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Ваш телеграм
                </label>
                <input
                  type="text"
                  placeholder="@username"
                      onChange={(event)=> setFormData({ ...formData, telegram: event.target.value })
                }
                value={formData.telegram}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Ваше сообщение
                </label>
                <textarea
                    onChange={(event)=> setFormData({ ...formData, message: event.target.value })
                }
                value={formData.message}
                  rows="4"
                  placeholder="Напишите сообщение специалисту..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#009689] hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  )
}

export default WorkersList