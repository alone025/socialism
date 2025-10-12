import { ExternalLink, X, TextAlignJustify  } from "lucide-react";
import React from "react";

import dataLocal from  "../data/local.data.json";
import { sendToTelegram } from "../utills/sendToTelegram";


const workers = [
  {
    "name": "Анна Смирнова",
    "experience": "7 лет",
    "price_per_hour": "4000₽",
    "about": "Опытная няня, работала с детьми от 6 месяцев до 7 лет. Проводит развивающие занятия, помогает с режимом дня и питанием.",
    "city": "Москва",
    "region":" Москва",
    "category": "НЯНЯ",
    "categories": ["Уход за детьми 0-1 год", "Уход за детьми 1-3 года", "Уход за детьми 3-6 лет", "Развивающие игры", "Прогулки с детьми"],
    "skills": ["Уход за детьми", "Первая помощь", "Спокойствие", "Английский язык", "Готовка"],
    "rating": 4.9,
    "reviews": 120,
    "contact": {
      "email": "smirnova.anna@example.com",
      "phone": "+7 (915) 123-45-67"
    }
  },
  {
    "name": "Мария Петрова",
    "experience": "5 лет",
    "price_per_hour": "3500₽",
    "about": "Профессиональная сиделка для пожилых людей. Ответственная, внимательная, с медицинским образованием.",
    "city": "Санкт-Петербург",
    "region":"Ленинградская область",
    "category": "СИДЕЛКА",
    "categories": ["Приготовление еды", "Уборка", "Стирка", "Покупка продуктов", "Медицинский уход"],
    "skills": ["Первая помощь", "Уборка", "Готовка", "Терпение", "Внимательность"],
    "rating": 4.8,
    "reviews": 85,
    "contact": {
      "email": "petrova.maria@example.com",
      "phone": "+7 (911) 234-56-78"
    }
  },
  {
    "name": "Елена Козлова",
    "experience": "8 лет",
    "price_per_hour": "4500₽",
    "about": "Репетитор по английскому языку и математике. Индивидуальный подход к каждому ученику, подготовка к экзаменам.",
    "city": "Москва",
    "region":" Москва",
    "category": "РЕПЕТИТОР",
    "categories": ["Помощь с домашними заданиями", "Подготовка к школе", "Обучение языкам", "Математика", "Наука"],
    "skills": ["Английский язык", "Помощь с уроками", "Математика", "Объяснение", "Терпение"],
    "rating": 4.9,
    "reviews": 150,
    "contact": {
      "email": "kozlova.elena@example.com",
      "phone": "+7 (916) 345-67-89"
    }
  },
  {
    "name": "Ольга Новикова",
    "experience": "6 лет",
    "price_per_hour": "3000₽",
    "about": "Домработница с опытом работы в семьях. Поддерживаю чистоту и порядок, ответственная и аккуратная.",
    "city": "Москва",
    "region":" Москва",
    "category": "УБОРЩИЦА",
    "categories": ["Уборка", "Стирка", "Глажка", "Покупка продуктов", "Поддержание порядка"],
    "skills": ["Уборка", "Стирка", "Глажка", "Покупки", "Аккуратность"],
    "rating": 4.7,
    "reviews": 95,
    "contact": {
      "email": "novikova.olga@example.com",
      "phone": "+7 (917) 456-78-90"
    }
  },
  {
    "name": "Ирина Федорова",
    "experience": "10 лет",
    "price_per_hour": "5000₽",
    "about": "Профессиональный повар с образованием. Готовлю блюда русской, европейской и азиатской кухни.",
    "city": "Санкт-Петербург",
    "region":"Ленинградская область",
    "category": "ПОВАР",
    "categories": ["Приготовление еды", "Покупка продуктов", "Диетическое питание", "Детское питание"],
    "skills": ["Готовка", "Покупки", "Кулинария", "Творчество", "Чистота"],
    "rating": 4.9,
    "reviews": 200,
    "contact": {
      "email": "fedorova.irina@example.com",
      "phone": "+7 (918) 567-89-01"
    }
  },
  {
    "name": "Светлана Иванова",
    "experience": "12 лет",
    "price_per_hour": "3500₽",
    "about": "Опытный водитель с безаварийной ездой. Аккуратная, пунктуальная, знаю город отлично.",
    "city": "Москва",
    "region":" Москва",
    "category": "ВОДИТЕЛЬ",
    "categories": ["Вождение", "Транспортные услуги", "Покупка продуктов", "Сопровождение"],
    "skills": ["Вождение", "Покупки", "Пунктуальность", "Внимательность", "Опыт"],
    "rating": 4.8,
    "reviews": 110,
    "contact": {
      "email": "ivanova.svetlana@example.com",
      "phone": "+7 (919) 678-90-12"
    }
  },
  {
    "name": "Татьяна Волкова",
    "experience": "4 года",
    "price_per_hour": "3800₽",
    "about": "Няня-репетитор для детей дошкольного и младшего школьного возраста. Развивающие занятия и подготовка к школе.",
    "city": "Екатеринбург",
    "region":"Свердловская область",
    "category": "НЯНЯ",
    "categories": ["Уход за детьми 3-6 лет", "Подготовка к школе", "Развивающие игры", "Помощь с домашними заданиями"],
    "skills": ["Уход за детьми", "Рисование", "Спорт", "Помощь с уроками", "Творчество"],
    "rating": 4.7,
    "reviews": 65,
    "contact": {
      "email": "volkova.tatyana@example.com",
      "phone": "+7 (920) 789-01-23"
    }
  },
  {
    "name": "Наталья Белова",
    "experience": "2 года",
    "price_per_hour": "2500₽",
    "about": "Помощница по хозяйству. Выполняю уборку, стирку, глажку, покупку продуктов. Ответственная и трудолюбивая.",
    "city": "Новосибирск",
    "region":"Новосибирская область",
    "category": "УБОРЩИЦА",
    "categories": ["Уборка", "Стирка", "Глажка", "Покупка продуктов", "Уход за домом"],
    "skills": ["Уборка", "Стирка", "Глажка", "Покупки", "Трудолюбие"],
    "rating": 4.6,
    "reviews": 45,
    "contact": {
      "email": "belova.natalya@example.com",
      "phone": "+7 (921) 890-12-34"
    }
  },
  {
    "name": "Юлия Дмитриева",
    "experience": "9 лет",
    "price_per_hour": "4200₽",
    "about": "Репетитор по музыке и английскому языку. Обучаю игре на фортепиано и вокалу детей и взрослых.",
    "city": "Москва",
    "region":" Москва",
    "category": "РЕПЕТИТОР",
    "categories": ["Обучение языкам", "Музыка", "Творческое развитие", "Уход за детьми 6+ лет"],
    "skills": ["Музыка", "Английский язык", "Творчество", "Обучение", "Терпение"],
    "rating": 4.8,
    "reviews": 130,
    "contact": {
      "email": "dmitrieva.yulia@example.com",
      "phone": "+7 (922) 901-23-45"
    }
  },
  {
    "name": "Александра Павлова",
    "experience": "5 лет",
    "price_per_hour": "3200₽",
    "about": "Сиделка с медицинским образованием. Специализируюсь на послеоперационном уходе и хронических заболеваниях.",
    "city": "Казань",
    "region":"Татарстан",
    "category": "СИДЕЛКА",
    "categories": ["Медицинский уход", "Приготовление еды", "Уборка", "Покупка продуктов", "Первая помощь"],
    "skills": ["Первая помощь", "Готовка", "Уборка", "Забота", "Медицина"],
    "rating": 4.7,
    "reviews": 75,
    "contact": {
      "email": "pavlova.alexandra@example.com",
      "phone": "+7 (923) 012-34-56"
    }
  },
  {
    "name": "Виктория Соколова",
    "experience": "8 лет",
    "price_per_hour": "4500₽",
    "about": "Профессиональная няня для грудничков. Имею медицинское образование и рекомендации от предыдущих работодателей.",
    "city": "Москва",
    "region":" Москва",
    "category": "НЯНЯ",
    "categories": ["Уход за детьми 0-1 год", "Первая помощь", "Детское питание", "Режим дня"],
    "skills": ["Уход за детьми", "Первая помощь", "Готовка", "Спокойствие", "Внимательность"],
    "rating": 4.9,
    "reviews": 140,
    "contact": {
      "email": "sokolova.viktoria@example.com",
      "phone": "+7 (924) 123-45-67"
    }
  },
  {
    "name": "Екатерина Морозова",
    "experience": "3 года",
    "price_per_hour": "2800₽",
    "about": "Помощница по хозяйству и уходу за детьми младшего школьного возраста. Помогаю с уроками и домашними делами.",
    "city": "Ростов-на-Дону",
    "region":"Ростовская область",
    "category": "УБОРЩИЦА",
    "categories": ["Уборка", "Стирка", "Уход за детьми 6+ лет", "Помощь с домашними заданиями", "Готовка"],
    "skills": ["Уборка", "Стирка", "Помощь с уроками", "Готовка", "Ответственность"],
    "rating": 4.6,
    "reviews": 55,
    "contact": {
      "email": "morozova.ekaterina@example.com",
      "phone": "+7 (925) 234-56-78"
    }
  }
];

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

  // New states
  const [search, setSearch] = React.useState("");
const [minPrice, setMinPrice] = React.useState("");
const [maxPrice, setMaxPrice] = React.useState("");
const [experience, setExperience] = React.useState("");

const [filteredSpecialists, setFilteredSpecialists] = React.useState(workers);



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

// Filter function
const applyFilter = () => {
  let filtered = [...workers];

  // Search filter (by name, about, skills, or categories)
  if (search.trim()) {
    const searchTerm = search.toLowerCase().trim();
    filtered = filtered.filter(worker => 
      worker.name?.toLowerCase().includes(searchTerm) ||
      worker.about?.toLowerCase().includes(searchTerm) ||
      worker.skills?.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      worker.categories?.some(category => category.toLowerCase().includes(searchTerm))
    );
  }

  // Price filter - extract numeric value from price_per_hour string
  if (minPrice) {
    filtered = filtered.filter(worker => {
      const workerPrice = parseInt(worker.price_per_hour.replace(/[^\d]/g, ''));
      return workerPrice >= parseInt(minPrice);
    });
  }
  if (maxPrice) {
    filtered = filtered.filter(worker => {
      const workerPrice = parseInt(worker.price_per_hour.replace(/[^\d]/g, ''));
      return workerPrice <= parseInt(maxPrice);
    });
  }

  // Experience filter - extract years from experience string
  if (experience) {
    filtered = filtered.filter(worker => {
      const expYears = parseInt(worker.experience.split(' ')[0]);
      
      switch (experience) {
        case 'no':
          return expYears === 0 || worker.experience.toLowerCase().includes('нет');
        case '1-3':
          return expYears >= 1 && expYears <= 3;
        case '3+':
          return expYears >= 3;
        default:
          return true;
      }
    });
  }

  // City filter
  if (city) {
    filtered = filtered.filter(worker => 
      worker.region?.toLowerCase().includes(city.toLowerCase())
    );
  }

    // Region filter (removed since we only have city in new data structure)
  if (region && city) {
    filtered = filtered.filter(worker => 
      worker.city?.toLowerCase().includes(region.toLowerCase())
    );
  }





  // Skills filter
  if (selectedSkills.length > 0) {
    filtered = filtered.filter(worker =>
      selectedSkills.every(skill => 
        worker.skills?.some(workerSkill => 
          workerSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }

  // Categories filter (using the category field and categories array)
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(worker =>
      selectedCategories.some(category => {
        // Map filter categories to worker category values
        const categoryMap = {
          'Няни': ['НЯНЯ', 'няня', 'уход за детьми'],
          'Сиделки': ['СИДЕЛКА', 'сиделка', 'медицинский уход'],
          'Уборщицы': ['УБОРЩИЦА', 'уборщица', 'помощник по хозяйству', 'домработница'],
          'Репетиторы': ['РЕПЕТИТОР', 'репетитор', 'преподаватель', 'учитель'],
          'Повара': ['ПОВАР', 'повар', 'кулинар'],
          'Водители': ['ВОДИТЕЛЬ', 'водитель', 'шофер']
        };

        const workerProperties = [
          worker.category,
          ...(worker.categories || [])
        ].map(prop => prop?.toLowerCase());

        return categoryMap[category]?.some(term => 
          workerProperties.some(prop => prop?.includes(term.toLowerCase()))
        );
      })
    );
  }

  // Update filtered results
  setFilteredSpecialists(filtered);
  setShowFilter(false);
  
  // Show results count
  if (filtered.length === 0) {
    alert('По вашему запросу ничего не найдено');
  }
};



// Reset filters function (updated for new data structure)
const resetFilters = () => {
  setSearch('');
  setMinPrice('');
  setMaxPrice('');
  setExperience('');
  setCity('');
  setRegion(''); // Keep for compatibility, but not used in new structure
  setSelectedSkills([]);
  setSelectedCategories([]);
  setFilteredSpecialists(workers); // Reset to all workers
  setShowFilter(false);
};



  return (
    <div className="min-h-screen bg-[#E1E1E1]">
           <header className={`text-white z-[11111] transition-all duration-500 backdrop-blur-lg bg-[#3A466B] shadow-lg w-full `}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 flex items-center justify-center font-bold text-xl cursor-pointer" onClick={()=> window.open('/', "_current")}>
              {/* БС */}
              <img src="/logo23.png" alt="logo" className='' />
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
            <div onClick={()=> window.open("/", "_current")} className="w-20 h-20 cursor-pointer flex items-center justify-center font-bold text-xl">
              {/* БС */}
              <img src="/logo23.png" alt="logo" className='' />
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
                value={search}
  onChange={(e) => setSearch(e.target.value)}

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
                  value={minPrice}
  onChange={(e) => setMinPrice(e.target.value)}

                min={0}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="До"
                  value={maxPrice}
  onChange={(e) => setMaxPrice(e.target.value)}

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
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
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
              onClick={resetFilters}
              className="px-5 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Сбросить
            </button>
            <button
              onClick={() => setShowFilter(false)}
              className="px-5 py-1.5 sm:py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
            >
              Отмена
            </button>
            <button   onClick={applyFilter}
 className="px-5 py-1.5 sm:py-2 bg-[#009689] hover:bg-teal-700 text-white rounded transition">
              Применить
            </button>
          </div>
        </div>
      )}



            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Example worker card */}
                {filteredSpecialists.map((product, idx) => (
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