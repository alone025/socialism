import React, { useState, useEffect } from 'react';
import OrderForm from './OrderForm';

const NeedHelpForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    address: '',
    budget: '',
    experience: '',
    medicalEducation: false,
    trips: false,
    skills: [],
    country: 'Россия',
    region: '',
    city: ''
  });

  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const regions = [
    { name: 'Московская область', cities: ['Москва', 'Химки', 'Подольск', 'Люберцы'] },
    { name: 'Ленинградская область', cities: ['Санкт-Петербург', 'Выборг', 'Гатчина'] },
    { name: 'Новосибирская область', cities: ['Новосибирск', 'Бердск', 'Искитим'] }
  ];

  const services = [
    { id: 'nanny', name: 'Няня', description: 'Присмотр от 0 лет' },
    { id: 'housekeeper', name: 'Помощник по хозяйству', description: 'Уборка, готовка' },
    { id: 'tutor', name: 'Воспитатель', description: 'Помощь с уроками' }
  ];

  const skills = ['Английский язык', 'Подготовка к школе', 'Музыка', 'Спорт', 'Творчество'];

  // Fetch candidates from backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workers/approved');
        const result = await response.json();
        if (result.success) {
          setCandidates(result.workers);
        } else {
          // Fallback to mock data
          setCandidates(getMockCandidates());
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setCandidates(getMockCandidates());
      }
    };

    fetchCandidates();
  }, []);

  const getMockCandidates = () => {
    return [
      {
        id: 1,
        name: 'Анна Иванова',
        service: 'nanny',
        experience: '1-3',
        rate: 450,
        location: 'Москва',
        skills: ['Английский язык', 'Подготовка к школе'],
        medicalEducation: true,
        trips: true,
        rating: 4.8,
        reviews: 12,
        image: '👩‍🏫',
        contact: '+7 999 123-45-67'
      },
      {
        id: 2,
        name: 'Мария Петрова',
        service: 'housekeeper',
        experience: '3+',
        rate: 350,
        location: 'Москва',
        skills: ['Творчество'],
        medicalEducation: false,
        trips: false,
        rating: 4.9,
        reviews: 8,
        image: '👩‍🍳',
        contact: '+7 999 123-45-68'
      },
      {
        id: 3,
        name: 'Елена Сидорова',
        service: 'tutor',
        experience: '3+',
        rate: 600,
        location: 'Москва',
        skills: ['Английский язык', 'Музыка', 'Спорт'],
        medicalEducation: true,
        trips: true,
        rating: 5.0,
        reviews: 15,
        image: '👩‍🎓',
        contact: '+7 999 123-45-69'
      },
      {
        id: 4,
        name: 'Ольга Козлова',
        service: 'nanny',
        experience: '1-3',
        rate: 400,
        location: 'Москва',
        skills: ['Подготовка к школе', 'Творчество'],
        medicalEducation: false,
        trips: true,
        rating: 4.7,
        reviews: 5,
        image: '👩‍💼',
        contact: '+7 999 123-45-70'
      }
    ];
  };

  const filterCandidates = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = candidates;

      // Filter by service
      if (formData.service) {
        filtered = filtered.filter(candidate => candidate.service === formData.service);
      }

      // Filter by location
      if (formData.city) {
        filtered = filtered.filter(candidate => 
          candidate.location.toLowerCase().includes(formData.city.toLowerCase())
        );
      }

      // Filter by budget
      if (formData.budget) {
        filtered = filtered.filter(candidate => candidate.rate <= parseInt(formData.budget));
      }

      // Filter by experience
      if (formData.experience) {
        filtered = filtered.filter(candidate => candidate.experience === formData.experience);
      }

      // Filter by medical education
      if (formData.medicalEducation) {
        filtered = filtered.filter(candidate => candidate.medicalEducation);
      }

      // Filter by trips
      if (formData.trips) {
        filtered = filtered.filter(candidate => candidate.trips);
      }

      // Filter by skills
      if (formData.skills.length > 0) {
        filtered = filtered.filter(candidate =>
          formData.skills.every(skill => candidate.skills.includes(skill))
        );
      }

      setFilteredCandidates(filtered);
      setShowResults(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterCandidates();
  };

  const handleHireClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsOrderModalOpen(true);
  };

  const handleOrderClose = () => {
    setIsOrderModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'medicalEducation' || name === 'trips') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (name === 'region') {
      // Reset city when region changes
      setFormData(prev => ({
        ...prev,
        [name]: value,
        city: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      service: serviceId
    }));
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Услуга';
  };

  const currentCities = formData.region 
    ? regions.find(r => r.name === formData.region)?.cities || []
    : [];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Заголовок */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center tracking-tight">
            Мне нужна помощь
          </h1>

          <form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-xl shadow-md border border-gray-200 p-10 space-y-12 mb-12"
          >

            {/* Выбор услуги */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Выберите услугу</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map(service => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`cursor-pointer rounded-lg border-2 p-5 transition-all duration-200 ${
                      formData.service === service.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Местоположение */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Местоположение</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Страна */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Страна</label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                    >
                      <option value="Россия">Россия</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Регион */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Регион</label>
                  <div className="relative">
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                    >
                      <option value="">Выберите регион</option>
                      {regions.map((region) => (
                        <option key={region.name} value={region.name}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Город / район */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Город / район</label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                      disabled={!formData.region}
                    >
                      <option value="">Выберите город или район</option>
                      {currentCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Адрес */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Адрес</h2>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Введите ваш адрес для поиска исполнителей поблизости"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-1 outline-none focus:ring-blue-800 focus:border-blue-800"
              />
            </div>

            {/* Дополнительные требования */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Дополнительные требования</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Бюджет */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Бюджет (руб/час)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    min={0}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-1 outline-none focus:ring-blue-800 focus:border-blue-800"
                    placeholder="Например, 500"
                  />
                </div>

                {/* Опыт */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Требуемый опыт</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-1 outline-none focus:ring-blue-800 focus:border-blue-800"
                  >
                    <option value="">Не важно</option>
                    <option value="no">Без опыта</option>
                    <option value="1-3">1-3 года</option>
                    <option value="3+">Более 3 лет</option>
                  </select>
                </div>
              </div>

              {/* Чекбоксы */}
              <div className="mt-6 space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="medicalEducation"
                    checked={formData.medicalEducation}
                    onChange={handleInputChange}
                    className="rounded text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Медицинское образование</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="trips"
                    checked={formData.trips}
                    onChange={handleInputChange}
                    className="rounded text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Готовность к небольшим командировкам</span>
                </label>
              </div>

              {/* Навыки */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Особые навыки</label>
                <div className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
                        formData.skills.includes(skill)
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Кнопка */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 text-white py-4 font-semibold text-lg shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Поиск...' : 'Найти исполнителя'}
              </button>
            </div>
          </form>

          {/* Results Section */}
          {showResults && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Найдено исполнителей: {filteredCandidates.length}
              </h2>
              
              {filteredCandidates.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 mb-4">
                    По вашему запросу не найдено подходящих исполнителей.
                  </p>
                  <p className="text-gray-500">
                    Попробуйте изменить параметры поиска или свяжитесь с нами для индивидуального подбора.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCandidates.map(candidate => (
                    <div key={candidate.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="text-4xl mr-4">{candidate.image}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{getServiceName(candidate.service)}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ставка:</span>
                          <span className="font-semibold">{candidate.rate} руб/час</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Опыт:</span>
                          <span>{candidate.experience === '1-3' ? '1-3 года' : 
                                candidate.experience === '3+' ? 'Более 3 лет' : 'Без опыта'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Рейтинг:</span>
                          <span className="flex items-center">
                            ⭐ {candidate.rating} ({candidate.reviews} отзывов)
                          </span>
                        </div>
                        {candidate.medicalEducation && (
                          <div className="text-green-600 text-sm">✅ Медицинское образование</div>
                        )}
                        {candidate.trips && (
                          <div className="text-blue-600 text-sm">✈️ Готова к командировкам</div>
                        )}
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Навыки:</h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map(skill => (
                            <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleHireClick(candidate)}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Нанять кандидата
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Order Modal */}
          {isOrderModalOpen && selectedCandidate && (
            <OrderForm 
              candidate={selectedCandidate} 
              onClose={handleOrderClose} 
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default NeedHelpForm;