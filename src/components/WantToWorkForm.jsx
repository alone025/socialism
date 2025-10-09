import React, { useState } from 'react';

const WorkerWizardForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    personalInfo: {
      fullName: '',
      birthDate: '',
      phone: '',
      telegram: '',
      email: '',
      address: '',
      passport: {
        series: '',
        number: '',
        issuedBy: '',
        issueDate: '',
        address: ''
      }
    },
    experience: '',
    education: '',
    services: [],
    rate: '',
    description: '',
    availability: {
      monday: false, tuesday: false, wednesday: false,
      thursday: false, friday: false, saturday: false, sunday: false
    },
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    skills: [],
    country: 'Россия',
    region: '',
    city: '',
    documents: {
      criminalRecord: null,
      passportPhoto: null,
      diploma: null,
      otherDocuments: [],
      nondisclosure: false
    },
    under18: false,
    photo: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const steps = [
    { number: 1, title: 'Выбор роли', description: 'Выберите тип работы' },
    { number: 2, title: 'Личная информация', description: 'Основные данные' },
    { number: 3, title: 'Паспортные данные', description: 'Информация из паспорта' },
    { number: 4, title: 'Профессиональная информация', description: 'Опыт и навыки' },
    { number: 5, title: 'Расписание', description: 'Доступность' },
    { number: 6, title: 'Документы', description: 'Загрузка файлов' },
    { number: 7, title: 'Подтверждение', description: 'Проверка данных' }
  ];

  const regions = [
    { name: 'Московская область', cities: ['Москва', 'Химки', 'Подольск', 'Люберцы'] },
    { name: 'Ленинградская область', cities: ['Санкт-Петербург', 'Выборг', 'Гатчина'] },
    { name: 'Новосибирская область', cities: ['Новосибирск', 'Бердск', 'Искитим'] }
  ];

  const roles = [
    { id: 'nanny', name: 'Няня', icon: '👶', description: 'Уход за детьми, развивающие занятия' },
    { id: 'housekeeper', name: 'Помощник по хозяйству', icon: '🏠', description: 'Уборка, готовка, помощь в быту' },
    { id: 'tutor', name: 'Воспитатель', icon: '📚', description: 'Помощь с уроками, подготовка к школе' }
  ];

  const skillsOptions = {
    nanny: ['english', 'cooking', 'music', 'sports', 'firstAid', 'painting', 'schoolHelp'],
    housekeeper: ['cooking', 'cleaning', 'laundry', 'shopping', 'ironing'],
    tutor: ['english', 'math', 'science', 'music', 'painting', 'schoolHelp']
  };

  const servicesOptions = {
    nanny: ['childcare_0_1', 'childcare_1_3', 'childcare_3_6', 'childcare_6_plus'],
    housekeeper: ['cooking', 'cleaning', 'laundry', 'shopping'],
    tutor: ['homework_help', 'school_preparation', 'language_tutoring']
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role, skills: [], services: [] }));
    setCurrentStep(2);
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (name.startsWith('personalInfo.')) {
      const path = name.split('.');
      if (path[1] === 'passport') {
        setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            passport: {
              ...prev.personalInfo.passport,
              [path[2]]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            [path[1]]: value
          }
        }));
      }
    } else if (name.startsWith('availability.')) {
      const day = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        availability: {
          ...prev.availability,
          [day]: checked
        }
      }));
    } else if (name.startsWith('workingHours.')) {
      const timeType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [timeType]: value
        }
      }));
    } else if (type === 'file') {
      if (name === 'criminalRecord' || name === 'passportPhoto' || name === 'diploma') {
        setFormData(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [name]: files[0]
          }
        }));
      } else if (name === 'otherDocuments') {
        setFormData(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            otherDocuments: Array.from(files)
          }
        }));
      } else if (name === 'photo') {
        setFormData(prev => ({ ...prev, photo: files[0] }));
      }
    } else if (type === 'checkbox') {
      if (name === 'nondisclosure' || name === 'under18') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const submitData = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'documents' || key === 'photo') {
          // Handle files separately
          return;
        }
        
        if (typeof formData[key] === 'object' && formData[key] !== null) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Append files
      if (formData.documents.criminalRecord) {
        submitData.append('criminalRecord', formData.documents.criminalRecord);
      }
      if (formData.documents.passportPhoto) {
        submitData.append('passportPhoto', formData.documents.passportPhoto);
      }
      if (formData.documents.diploma) {
        submitData.append('diploma', formData.documents.diploma);
      }
      if (formData.documents.otherDocuments.length > 0) {
        formData.documents.otherDocuments.forEach(file => {
          submitData.append('otherDocuments', file);
        });
      }
      if (formData.photo) {
        submitData.append('photo', formData.photo);
      }

      submitData.append('nondisclosure', formData.documents.nondisclosure);
      submitData.append('under18', formData.under18);

      const response = await fetch('http://localhost:5000/api/workers', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('✅ Заявка успешно отправлена! Мы свяжемся с вами после проверки.');
        setCurrentStep(1);
        // Reset form
        setFormData({
          role: '',
          personalInfo: {
            fullName: '',
            birthDate: '',
            phone: '',
            telegram: '',
            email: '',
            address: '',
            passport: {
              series: '',
              number: '',
              issuedBy: '',
              issueDate: '',
              address: ''
            }
          },
          experience: '',
          education: '',
          services: [],
          rate: '',
          description: '',
          availability: {
            monday: false, tuesday: false, wednesday: false,
            thursday: false, friday: false, saturday: false, sunday: false
          },
          workingHours: {
            start: '09:00',
            end: '18:00'
          },
          skills: [],
          country: 'Россия',
          region: '',
          city: '',
          documents: {
            criminalRecord: null,
            passportPhoto: null,
            diploma: null,
            otherDocuments: [],
            nondisclosure: false
          },
          under18: false,
          photo: null
        });
      } else {
        setSubmitMessage(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('❌ Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RoleSelectionStep onRoleSelect={handleRoleSelect} roles={roles} />;
      case 2:
        return <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PassportInfoStep formData={formData} handleInputChange={handleInputChange} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ProfessionalInfoStep formData={formData} handleInputChange={handleInputChange} handleSkillToggle={handleSkillToggle} handleServiceToggle={handleServiceToggle} onNext={handleNext} onBack={handleBack} skillsOptions={skillsOptions} servicesOptions={servicesOptions} />;
      case 5:
        return <ScheduleStep formData={formData} handleInputChange={handleInputChange} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <DocumentsStep formData={formData} handleInputChange={handleInputChange} onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <ConfirmationStep formData={formData} onBack={handleBack} onSubmit={handleSubmit} isSubmitting={isSubmitting} submitMessage={submitMessage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 w-12 h-0.5 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

// Step 1: Role Selection
const RoleSelectionStep = ({ onRoleSelect, roles }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Выберите вашу роль</h2>
    <p className="text-gray-600 mb-8">Выберите тип работы, который вам подходит</p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {roles.map(role => (
        <div
          key={role.id}
          onClick={() => onRoleSelect(role.id)}
          className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-200"
        >
          <div className="text-4xl mb-4">{role.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{role.name}</h3>
          <p className="text-gray-600 text-sm">{role.description}</p>
        </div>
      ))}
    </div>
  </div>
);

// Step 2: Personal Information
const PersonalInfoStep = ({ formData, handleInputChange, onNext, onBack }) => {
  const regions = [
    { name: 'Московская область', cities: ['Москва', 'Химки', 'Подольск', 'Люберцы'] },
    { name: 'Ленинградская область', cities: ['Санкт-Петербург', 'Выборг', 'Гатчина'] },
    { name: 'Новосибирская область', cities: ['Новосибирск', 'Бердск', 'Искитим'] }
  ];

  const currentCities = formData.region 
    ? regions.find(r => r.name === formData.region)?.cities || []
    : [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Личная информация</h2>
      <p className="text-gray-600 mb-8">Заполните основные данные о себе</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ФИО *</label>
          <input
            type="text"
            name="personalInfo.fullName"
            value={formData.personalInfo.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Дата рождения *</label>
          <input
            type="date"
            name="personalInfo.birthDate"
            value={formData.personalInfo.birthDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
          <input
            type="tel"
            name="personalInfo.phone"
            value={formData.personalInfo.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            name="personalInfo.email"
            value={formData.personalInfo.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telegram</label>
          <input
            type="text"
            name="personalInfo.telegram"
            value={formData.personalInfo.telegram}
            onChange={handleInputChange}
            placeholder="@username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Регион *</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Выберите регион</option>
            {regions.map(region => (
              <option key={region.name} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Город *</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={!formData.region}
          >
            <option value="">Выберите город</option>
            {currentCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Адрес проживания *</label>
          <input
            type="text"
            name="personalInfo.address"
            value={formData.personalInfo.address}
            onChange={handleInputChange}
            placeholder="Полный адрес проживания"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Назад
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

// Step 3: Passport Information
const PassportInfoStep = ({ formData, handleInputChange, onNext, onBack }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Паспортные данные</h2>
    <p className="text-gray-600 mb-8">Заполните информацию из вашего паспорта</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Серия паспорта *</label>
        <input
          type="text"
          name="personalInfo.passport.series"
          value={formData.personalInfo.passport.series}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Номер паспорта *</label>
        <input
          type="text"
          name="personalInfo.passport.number"
          value={formData.personalInfo.passport.number}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Кем выдан *</label>
        <input
          type="text"
          name="personalInfo.passport.issuedBy"
          value={formData.personalInfo.passport.issuedBy}
          onChange={handleInputChange}
          placeholder="Наименование органа, выдавшего паспорт"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Дата выдачи *</label>
        <input
          type="date"
          name="personalInfo.passport.issueDate"
          value={formData.personalInfo.passport.issueDate}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Адрес регистрации *</label>
        <input
          type="text"
          name="personalInfo.passport.address"
          value={formData.personalInfo.passport.address}
          onChange={handleInputChange}
          placeholder="Адрес по месту регистрации в паспорте"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
    </div>

    <div className="flex justify-between mt-8">
      <button
        onClick={onBack}
        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
      >
        Назад
      </button>
      <button
        onClick={onNext}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Далее
      </button>
    </div>
  </div>
);

// Step 4: Professional Information
const ProfessionalInfoStep = ({ formData, handleInputChange, handleSkillToggle, handleServiceToggle, onNext, onBack, skillsOptions, servicesOptions }) => {
  const getSkillLabel = (skill) => {
    const labels = {
      'english': 'Английский язык',
      'cooking': 'Готовка',
      'cleaning': 'Уборка',
      'driving': 'Вождение',
      'music': 'Музыка',
      'sports': 'Спорт',
      'firstAid': 'Первая помощь',
      'painting': 'Рисование',
      'schoolHelp': 'Помощь с уроками',
      'math': 'Математика',
      'science': 'Наука',
      'laundry': 'Стирка',
      'shopping': 'Покупки',
      'ironing': 'Глажка'
    };
    return labels[skill] || skill;
  };

  const getServiceLabel = (service) => {
    const labels = {
      'childcare_0_1': 'Уход за детьми 0-1 год',
      'childcare_1_3': 'Уход за детьми 1-3 года',
      'childcare_3_6': 'Уход за детьми 3-6 лет',
      'childcare_6_plus': 'Уход за детьми 6+ лет',
      'homework_help': 'Помощь с домашними заданиями',
      'school_preparation': 'Подготовка к школе',
      'language_tutoring': 'Обучение языкам',
      'cooking': 'Приготовление еды',
      'cleaning': 'Уборка',
      'laundry': 'Стирка',
      'shopping': 'Покупка продуктов'
    };
    return labels[service] || service;
  };

  const currentSkills = skillsOptions[formData.role] || [];
  const currentServices = servicesOptions[formData.role] || [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Профессиональная информация</h2>
      <p className="text-gray-600 mb-8">Расскажите о вашем опыте и навыках</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Опыт работы *</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Выберите опыт</option>
            <option value="0">Без опыта</option>
            <option value="1-3">1-3 года</option>
            <option value="3+">Более 3 лет</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Почасовая ставка (руб) *</label>
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Образование</label>
        <textarea
          name="education"
          value={formData.education}
          onChange={handleInputChange}
          rows="3"
          placeholder="Опишите ваше образование, курсы, сертификаты..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">О себе</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          placeholder="Расскажите о себе, вашем подходе к работе..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Services */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Предоставляемые услуги</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentServices.map(service => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{getServiceLabel(service)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Навыки</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {currentSkills.map(skill => (
            <label key={skill} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.skills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{getSkillLabel(skill)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Назад
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

// Step 5: Schedule
const ScheduleStep = ({ formData, handleInputChange, onNext, onBack }) => {
  const days = [
    { id: 'monday', label: 'Понедельник' },
    { id: 'tuesday', label: 'Вторник' },
    { id: 'wednesday', label: 'Среда' },
    { id: 'thursday', label: 'Четверг' },
    { id: 'friday', label: 'Пятница' },
    { id: 'saturday', label: 'Суббота' },
    { id: 'sunday', label: 'Воскресенье' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Расписание</h2>
      <p className="text-gray-600 mb-8">Укажите вашу доступность</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Дни работы</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {days.map(day => (
            <label key={day.id} className="flex items-center">
              <input
                type="checkbox"
                name={`availability.${day.id}`}
                checked={formData.availability[day.id]}
                onChange={handleInputChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{day.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Начало рабочего дня</label>
          <input
            type="time"
            name="workingHours.start"
            value={formData.workingHours.start}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Конец рабочего дня</label>
          <input
            type="time"
            name="workingHours.end"
            value={formData.workingHours.end}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Назад
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

// Step 6: Documents
const DocumentsStep = ({ formData, handleInputChange, onNext, onBack }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Документы</h2>
      <p className="text-gray-600 mb-8">Загрузите необходимые документы</p>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Фото профиля</label>
          <input
            type="file"
            name="photo"
            onChange={handleInputChange}
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">Ваше фото для профиля</p>
        </div>

        {/* Passport Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Фото паспорта (разворот с фото) *</label>
          <input
            type="file"
            name="passportPhoto"
            onChange={handleInputChange}
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Четкое фото разворота паспорта с вашим фото</p>
        </div>

        {/* Criminal Record */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Справка о несудимости</label>
          <input
            type="file"
            name="criminalRecord"
            onChange={handleInputChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (макс. 10MB)</p>
        </div>

        {/* Diploma */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Диплом об образовании</label>
          <input
            type="file"
            name="diploma"
            onChange={handleInputChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (макс. 10MB)</p>
        </div>

        {/* Other Documents */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Другие документы</label>
          <input
            type="file"
            name="otherDocuments"
            onChange={handleInputChange}
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">Сертификаты, рекомендации и другие документы</p>
        </div>

        {/* Agreements */}
        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="nondisclosure"
              checked={formData.documents.nondisclosure}
              onChange={handleInputChange}
              className="rounded text-blue-600 focus:ring-blue-500 mt-1"
              required
            />
            <span className="ml-2 text-gray-700">
              Я соглашаюсь с обработкой персональных данных и подписываю соглашение о неразглашении *
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              name="under18"
              checked={formData.under18}
              onChange={handleInputChange}
              className="rounded text-blue-600 focus:ring-blue-500 mt-1"
            />
            <span className="ml-2 text-gray-700">
              Мне меньше 18 лет
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Назад
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

// Step 7: Confirmation
const ConfirmationStep = ({ formData, onBack, onSubmit, isSubmitting, submitMessage }) => {
  const getRoleName = (role) => {
    const roles = {
      'nanny': 'Няня',
      'housekeeper': 'Помощник по хозяйству',
      'tutor': 'Воспитатель'
    };
    return roles[role] || role;
  };

  const getExperienceText = (experience) => {
    const experiences = {
      '0': 'Без опыта',
      '1-3': '1-3 года',
      '3+': 'Более 3 лет'
    };
    return experiences[experience] || experience;
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Подтверждение данных</h2>
      <p className="text-gray-600 mb-8">Проверьте правильность введенных данных перед отправкой</p>

      {submitMessage && (
        <div className={`p-4 mb-6 rounded-lg ${
          submitMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {submitMessage}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Основная информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><strong>Роль:</strong> {getRoleName(formData.role)}</div>
          <div><strong>ФИО:</strong> {formData.personalInfo.fullName}</div>
          <div><strong>Телефон:</strong> {formData.personalInfo.phone}</div>
          <div><strong>Email:</strong> {formData.personalInfo.email}</div>
          <div><strong>Город:</strong> {formData.city}</div>
          <div><strong>Опыт:</strong> {getExperienceText(formData.experience)}</div>
          <div><strong>Ставка:</strong> {formData.rate} руб/час</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Паспортные данные</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><strong>Серия и номер:</strong> {formData.personalInfo.passport.series} {formData.personalInfo.passport.number}</div>
          <div><strong>Кем выдан:</strong> {formData.personalInfo.passport.issuedBy}</div>
          <div><strong>Дата выдачи:</strong> {formData.personalInfo.passport.issueDate}</div>
          <div><strong>Адрес регистрации:</strong> {formData.personalInfo.passport.address}</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Документы</h3>
        <div className="text-sm">
          <div><strong>Фото паспорта:</strong> {formData.documents.passportPhoto ? '✅ Загружено' : '❌ Не загружено'}</div>
          <div><strong>Справка о несудимости:</strong> {formData.documents.criminalRecord ? '✅ Загружено' : '❌ Не загружено'}</div>
          <div><strong>Диплом:</strong> {formData.documents.diploma ? '✅ Загружено' : '❌ Не загружено'}</div>
          <div><strong>Другие документы:</strong> {formData.documents.otherDocuments.length} файлов</div>
          <div><strong>Согласие на обработку:</strong> {formData.documents.nondisclosure ? '✅ Да' : '❌ Нет'}</div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Назад
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </div>
    </div>
  );
};

export default WorkerWizardForm;