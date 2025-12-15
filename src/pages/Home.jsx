import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Award,
  Baby,
  HeartHandshake,
  BrushCleaning,
  GraduationCap,
  X,
  TextAlignJustify,
  HandHelping,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { sendEmail } from "../utills/sendToEmail";

const RadioGroup = ({ label, name, value, options, onChange, error }) => (
  <div className="mt-4 w-full">
    <p className="text-white/80 mb-2">{label}</p>
    <div className="flex flex-wrap gap-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            className="accent-teal-500"
          />
          <span className="text-white">{opt.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

const HELP_OPTIONS = [
  { label: "НЯНЯ (присмотр за ребенком)", value: "НЯНЯ" },
  { label: "УБОРКА КВАРТИРЫ", value: "УБОРКА КВАРТИРЫ" },
  { label: "ВОСПИТАТЕЛЬ", value: "ВОСПИТАТЕЛЬ" },
  { label: "ПОМОЩЬ В БЫТУ", value: "ПОМОЩЬ В БЫТУ" },
  // { label: "ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ", value: "phs_help" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);
  const [modalTable, setModalTable] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    telegram: "",
    email: "",

    numberOfChild: null,
    children: [],

    typeOfParent: "",

    needJob: false,
    helpType: [],

    message: "",
    address: "",
  });

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const e = {};

    if (!formData.name.trim()) e.name = "Введите имя";
    if (!formData.phone.trim()) e.phone = "Введите телефон";
    if (!formData.address.trim()) e.address = "Адрес обязателен";

    if (!formData.typeOfParent) e.typeOfParent = "Укажите, вы мама или отец";

    if (formData.numberOfChild > 0) {
      if (!formData.children) e.ageOfChild = "Укажите данные о ребёнке";
    }

    if (!formData.helpType.length) e.helpType = "Выберите необходимую помощь";

    if (!formData.message.trim())
      e.message = "Опишите, для чего ищите помощника";

    setErrors(e);
    console.log(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeModal !== "svo-work") {
      if (!validate()) return;
    }

    const success = await sendEmail(formData);
    if (success) {
      alert("Форма успешно отправлена!");
      // Optionally reset form
      setFormData({
        name: "",
        phone: "",
        telegram: "",
        email: "",
        numberOfChild: 0,
        children: [],
        typeOfParent: "",
        needJob: false,
        helpType: [],
        message: "",
        address: "",
      });
      setErrors({});
    } else {
      alert("Ошибка при отправке письма. Попробуйте позже.");
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleNumberOfChildChange = (value) => {
    let n = Math.min(Math.max(value, 0), 5); // max 5
    const newChildren = [...formData.children];

    while (newChildren.length < n) newChildren.push({ age: "", type: "" });

    while (newChildren.length > n) newChildren.pop();

    setFormData({ ...formData, numberOfChild: n, children: newChildren });
  };

  const partners = [
    { name: "Моя работа", logo: "/moyaR.jpg" },
    {
      name: "МПГУ",
      logo: "https://mpgu.su/wp-content/themes/mpgu20/img/logo.svg",
    },
    { name: "Персона", logo: "/persona.svg" },
  ];

  return (
    <div className="min-h-screen bg-[#E1E1E1] sm:pt-8 md:pt-14">
      <div className="bg-[#3A466B] mb-14 sm:mx-3 overflow-hidden sm:rounded-xl">
        {/* Header */}
        <header
          className={`bg-transparent text-white transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto px-3 md:px-5 py-1 mt-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-22 contrast- h-22 flex items-center justify-center font-bold text-xl">
                {/* БС */}
                <img src="/logo23.png" alt="logo" className="" />
              </div>
              <div className="hidden sm:flex gap-6 text-base">
                {/* <span className="flex items-center gap-1">
             
                +7 927 321-82-43
              </span> */}
                <span className="flex items-center gap-1">
                  {/* <Mail className="w-4 h-4" /> */}
                  danlus_1@mail.ru
                </span>
              </div>
            </div>
            <nav className="hidden lg:flex gap-6 text-base font-light">
              <a href="/#about" className="hover:text-teal-400 transition">
                О НАС
              </a>

              <a href="/#services" className="hover:text-teal-400 transition">
                УСЛУГИ
              </a>
              <a href="/#contacts" className="hover:text-teal-400 transition">
                КОНТАКТЫ
              </a>
            </nav>
            <div className="men lg:hidden">
              <TextAlignJustify
                className="w-8 h-8 lg:hidden cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            </div>
          </div>
        </header>

        {/* Header on scroll */}
        <header
          className={`text-white z-[11111] transition-all duration-500 backdrop-blur-lg bg-[#3A466B]/30 shadow-lg fixed top-0 w-full left-0 ${
            isScrolled ? " translate-y-0" : "translate-y-[-100%]"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 md:px-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center font-bold text-xl">
                {/* БС */}
                <img src="/logo23.png" alt="logo" className="" />
              </div>
              <div className="hidden sm:flex gap-6 text-base">
                {/* <span className="flex items-center gap-1">
             
                +7 927 321-82-43
              </span> */}
                <span className="flex items-center gap-1">
                  {/* <Mail className="w-4 h-4" /> */}
                  danlus_1@mail.ru
                </span>
              </div>
            </div>
            <nav className="hidden lg:flex gap-6 text-base font-light">
              <a href="/#services" className="hover:text-teal-400 transition">
                УСЛУГИ
              </a>
              <a href="/#about" className="hover:text-teal-400 transition">
                О НАС
              </a>

              <a href="/#contacts" className="hover:text-teal-400 transition">
                КОНТАКТЫ
              </a>
            </nav>
            <div className="men lg:hidden">
              <TextAlignJustify
                className="w-8 h-8 lg:hidden cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            </div>
          </div>
        </header>

        {/* Menu repsonsive drawer */}
        <div
          className={`fixed top-0 right-0 w-full h-full bg-black/50 z-[1111111111111] transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 pt-6 flex flex-col items-end text-start">
              <button onClick={() => setIsMenuOpen(false)} className="mb-4">
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <nav className="flex flex-col gap-4 w-full">
                <a
                  href="#services"
                  className="text-gray-800 hover:text-teal-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  УСЛУГИ
                </a>
                <a
                  href="#about"
                  className="text-gray-800 hover:text-teal-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О НАС
                </a>

                <a
                  href="#contacts"
                  className="text-gray-800 hover:text-teal-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  КОНТАКТЫ
                </a>
              </nav>
              <div className="flex flex-col mt-8 gap-1 text-base w-full">
                {/* <span className="flex items-start gap-1">
       
                +7 927 321-82-43
              </span> */}
                <span className="flex items-start gap-1">
                  {/* <Mail className="w-4 h-4" /> */}
                  danlus_1@mail.ru
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-transparent text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
              }}
            ></div>
          </div>
          <div className="max-w-7xl mx-auto px-3 md:px-5 pt-10 sm:pt-20 pb-30 relative z-10">
            <h1 className="text-5xl sm:text-6xl font-medium mb-4">
              <span className="text-teal-400">
                {" "}
                <span className="uppercase">Синергия</span> СЕРВИС
              </span>
            </h1>
            <p className="text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
              {/* КОМПЛЕКСНАЯ ИНФОРМАЦИЯ В СФЕРЕ<br/>
            АВТОМАТИЗИРОВАННОГО ПОЛИВА ИРРИГАЦИИ */}
              НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ ПО <br /> ПОДДЕРЖКЕМНОГОДЕТНЫХ СЕМЕЙ И
              ПОМОЩИ С ДЕТЬМИ
            </p>
            <div className="flex gap-4 flex-wrap mt-8">
              <button
                onClick={() => window.open("/#contacts", "_current")}
                className="bg-teal-500 hover:bg-teal-600 text-white/90 px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-500"
              >
                МНЕ НУЖНА ПОМОЩЬ
              </button>
              <button
                onClick={() => setActiveModal("want-work")}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#283457] px-6 md:px-8 py-1.5 sm:py-3 rounded-lg font-semibold transition-all duration-500"
              >
                ХОЧУ РАБОТАТЬ
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section id="about" className="bg-[#F5F5F5] mx-auto px-3 md:px-5 py-16">
        <div className="kf flex w-full justify-between gap-5 md:flex-row flex-col mb-5">
          <div className="lft">
            <h2 className="text-3xl text-[#283457] font-medium mb-6">
              НАША КОМАНДА ЯВЛЯЕТСЯ{" "}
              <span className="text-teal-600">
                УНИКАЛЬНЫМИ
                <br />
                СПЕЦИАЛИСТАМИ В ИРРИГАЦИИ
              </span>
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
                <span>
                  Места для стажировки выпускников педагогических и медицинских
                  училищ
                </span>
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
          </div>
          <div className="rgt flex-1/3 flex justify-center">
            <img src="/babysitter2.png" alt="" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">120+</div>
            <div className="text-gray-600 text-3xl font-medium uppercase">
              Специалисты
            </div>
          </div>
          <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">
              2+ года
            </div>
            <div className="text-gray-600 text-3xl font-medium">НА РЫНКЕ</div>
          </div>
          <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">200+</div>
            <div className="text-gray-600 text-3xl font-medium uppercase">
              Семьи
            </div>
          </div>
          {/* <div className="py-4 border-b-[1.5px] border-b-teal-600/70">
            <div className="text-3xl font-medium text-teal-600 mb-2">10+ ЛЕТ</div>
            <div className="text-gray-600 text-3xl font-medium">НА РЫНКЕ</div>
          </div> */}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#F5F5F5] pb-16 pt-8 scroll-m-20">
        <div className="mx-auto px-3 md:px-5">
          <h2 className="text-3xl font-medium text-[#283457] mb-7">
            НАШИ УСЛУГИ
          </h2>
          <p className="text-xl mb-12 text-gray-700 font-medium uppercase max-w-4xl">
            Все наши волонтеры и сотрудники проявляют качества надежности по
            <span className="text-teal-600">
              {" "}
              уходу за детьми , вызывая доверие, единственная цель
            </span>{" "}
            показать что благополучие каждой семьи важно
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Baby className="w-8 h-8" />,
                title: "НЯНЯ",
                desc: "Присмотр за детьми от 0 лет. Профессиональный уход, развивающие занятия.",
                image: "/service1.png",
              },
              {
                icon: <BrushCleaning className="w-8 h-8" />,
                title: "УБОРКА КВАРТИРЫ",
                desc: "Помощь в ведении домашнего хозяйства, поддержание чистоты",
                image: "uborka.png",
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "ВОСПИТАТЕЛЬ",
                desc: "Помощь с уроками, развивающие занятия, присмотр",
                image: "/service3.png",
              },
              {
                icon: <HeartHandshake className="w-8 h-8" />,
                title: "ПОМОЩЬ В БЫТУ",
                desc: "Готовка, уборка, помощь по хозяйству для многодетных семей.",
                image: "/service4.png",
              },
              {
                icon: <HandHelping className="w-8 h-8" />,
                title: "ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ",
                desc: "Консультации психолога, эмоциональная поддержка, помощь в преодолении трудностей для многодетных семей.",
                image: "/service5.png",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setModalTable(true);
                  setFormData((prev) => ({
                    ...prev,
                    helpType: [...prev.helpType, service.title],
                  }));
                }}
                className="bg-white cursor-pointer text-[#213159] p-6 rounded-xl relative overflow-hiddden"
              >
                {/* Overlay */}
                <div className=" absolute bg-black/10 w-full h-full inset-0 rounded-xl z-[1]"></div>

                <div className="h-[235.5px] flex items-center justify-center z-[11] relative">
                  <img src={service.image} alt="" className="z-[-1] h-fit" />
                </div>
                <div className="w-12 z-10 relative h-12 bg-teal-600 text-white rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <p className="text-base z-10 relative font-medium leading-relaxed">
                  {service.title}
                </p>
                <p className="text-sm z-10 relative line-clamp-3 mt-2">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-[#F5F5F5] px-3 md:px-5 py-16">
        <h2 className="text-3xl font-medium text-[#283457] mb-8 border-b-[1.5px] border-b-teal-600/70 pb-3 uppercase">
          НАШИ <span className="text-teal-600">партнеры</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-4 h-max mt-5 rounded-md">
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
              className="w-full max-w-[400px] max-h-[400px] h-full object-contain lg:object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className="rounded-lg overflow-hidden flex justify-center min-h-[00px]">
            <img
              src={partners[1].logo}
              alt="Park area"
              className="w-full max-lg:max-w-[400px] max-h-[400px] h-full object-contain lg:object-contain"
            />
          </div>
          <div className="bg-white p-4 h-max mt-5 rounded-md">
            <h3 className="text-2xl font-medium mb-4 text-teal-600">
              {partners[1].name}
            </h3>
            <p className="text-gray-700 mb-4">
              Объединяя знанием людей разных культур, РУДН формирует лидеров,
              которые делают мир лучше
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-4 h-max mt-5 rounded-md">
            <h3 className="text-2xl font-medium mb-4 text-teal-600">
              {partners[2].name}
            </h3>
            <p className="text-gray-700 mb-4">
              Моско́вский педагоги́ческий госуда́рственный университе́т — высшее
              учебное заведение в Москве.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden flex justify-center">
            <img
              src={partners[2].logo}
              alt="Building facade"
              className="w-full max-w-[400px] max-h-[400px] h-full object-contain lg:object-contain"
            />
          </div>
        </div>
      </section>

      {/* Private Clients CTA */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-7 lg:py-10 mx-4 rounded-xl ovrflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-5 flex max-md:flex-col items-end justify-between">
          <div>
            <h2 className="text-3xl font-medium mb-10 md:mb-14">
              Семьям участников СВО
            </h2>
            <p className="text-base max-w-2xl">
              Приоритетное трудоустройство для членов семей участников
              специальной военной операции.
            </p>
          </div>
          <button
            onClick={() => setActiveModal("svo-work")}
            className="bg-teal-600 max-md:mt-4 hover:bg-teal-700 px-6 md:px-8 py-2 md:py-4 rounded-md max-w-[200px] w-full uppercase font-normal transition"
          >
            хочу работать
          </button>
        </div>
      </section>

      {/* Products */}

      {/* Certificates */}
      <section className="bg-white py-16">
        <div className="px-3 md:px-5">
          <h2 className="text-2xl sm:text-3xl font-medium text-[#283457] mb-12">
            БЛАГОДАРСТВЕННЫЕ ПИСЬМА
          </h2>
          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4 aspect-[3/4]">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                {/* <Award className="w-16 h-16 text-gray-400" /> */}
                <img src="/pdfpdf.jpg" alt="" />
              </div>
            </div>
            {/* {[1, 2, 3, 4].map((cert) => (
              <div key={cert} className="bg-white rounded-lg shadow-lg p-4 aspect-[3/4]">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                  <Award className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contacts" className="my-5 scroll-m-20">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 mx-4 rounded-xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-5 flex max-md:flex-col items-end justify-between">
            <div>
              <h2 className="text-3xl font-medium mb-14">
                Хотите узнать больше?
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-wrap w-full">
                {/* Name */}
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  type="text"
                  placeholder="Ваше имя *"
                  className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mb-1 w-full"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mb-2">{errors.name}</p>
                )}

                {/* Phone */}
                <div className="flex w-full lg:gap-7 max-lg:flex-wrap">
                  <input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    type="tel"
                    placeholder="Телефон *"
                    className="border-b mt-1.5 border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mb-1 w-full"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mb-2">{errors.phone}</p>
                  )}

                  {/* Telegram */}
                  <input
                    value={formData.telegram}
                    onChange={(e) =>
                      setFormData({ ...formData, telegram: e.target.value })
                    }
                    type="text"
                    placeholder="Telegram"
                    className="border-b mt-1.5 border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mb-1 w-full"
                  />
                </div>

                {/* Number of children */}
                <input
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Сколько детей"
                  value={formData.numberOfChild}
                  onChange={(e) =>
                    handleNumberOfChildChange(Number(e.target.value))
                  }
                  className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mt-4 w-full"
                />

                {/* Conditional child fields */}
                {formData.numberOfChild > 0 && (
                  <div className="w-full mt-4 border-t border-b border-white/20 py-4">
                    {formData.children.map((child, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-white/80 mb-2">
                          Ребенок {index + 1}
                        </p>

                        {/* Age */}
                        <input
                          placeholder="Сколько лет ребенку"
                          value={child.age}
                          onChange={(e) => {
                            const newChildren = [...formData.children];
                            newChildren[index].age = e.target.value;
                            setFormData({ ...formData, children: newChildren });
                          }}
                          className="border-b border-white/50 bg-transparent text-white p-2.5 w-full mb-2"
                        />

                        {/* Type */}
                        <RadioGroup
                          label="Тип ребенка"
                          name={`typeOfChild-${index}`}
                          value={child.type}
                          onChange={(e) => {
                            const newChildren = [...formData.children];
                            newChildren[index].type = e.target.value;
                            setFormData({ ...formData, children: newChildren });
                          }}
                          options={[
                            { label: "Младенец", value: "Младенец" },
                            { label: "Дошкольник", value: "Дошкольник" },
                            { label: "Школьник", value: "Школьник" },
                          ]}
                        />
                      </div>
                    ))}

                    {errors.ageOfChild && (
                      <p className="text-red-400 text-sm">
                        {errors.ageOfChild}
                      </p>
                    )}
                  </div>
                )}

                {/* Type of parent */}
                <RadioGroup
                  label="Вы мама или отец?"
                  name="typeOfParent"
                  value={formData.typeOfParent}
                  error={errors.typeOfParent}
                  onChange={(e) =>
                    setFormData({ ...formData, typeOfParent: e.target.value })
                  }
                  options={[
                    { label: "Мама", value: "Мама" },
                    { label: "Отец", value: "Отец" },
                    { label: "Опекун", value: "Опекун" },
                  ]}
                />

                {/* Help type */}
                <div className="mt-4">
                  <p className="text-white/80 mb-2">Какая помощь вам нужна?</p>

                  {HELP_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.helpType.includes(opt.value)}
                        onChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            helpType: prev.helpType.includes(opt.value)
                              ? prev.helpType.filter((v) => v !== opt.value)
                              : [...prev.helpType, opt.value],
                          }))
                        }
                        className="accent-teal-500"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                  {errors.helpType && (
                    <p className="text-red-400 text-sm">{errors.helpType}</p>
                  )}
                </div>

                {/* Need job */}
                {/* <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needJob}
                    onChange={(e) =>
                      setFormData({ ...formData, needJob: e.target.checked })
                    }
                    className="accent-teal-500"
                  />
                  <span>Мне нужна работа</span>
                </label> */}

                {/* Address */}
                <input
                  placeholder="Адрес *"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mt-4 w-full"
                />
                {errors.address && (
                  <p className="text-red-400 text-sm">{errors.address}</p>
                )}

                {/* Message */}
                <textarea
                  placeholder="Для чего вы ищете помощника?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mt-4 w-full resize-none"
                  rows={4}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm">{errors.message}</p>
                )}

                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 px-6 py-4 mt-6 rounded-md max-w-[250px] w-full uppercase transition"
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
            {/* <div className="rounded-lg overflow-hidden shadow-lg">
              <div>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.6176,55.7558&z=10&pt=37.6176,55.7558,pm2rdm"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  allowfullscreen
                  loading="lazy"
                  className="h-[350px] w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div> */}
            <div>
              <h2 className="text-3xl font-semibold text-[#283457] mb-6">
                <span className="text-teal-600">
                  <span className="uppercase">Синергия</span> СЕРВИС
                </span>
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <span>Эл. почта: danlus_1@mail.ru</span>
                </p>
              </div>
              <div className="mt-8 p-1.5 sm:p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-2 text-[#283457]">
                  Реквизиты компании см на странице о нас
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  {/* <li>Москва, ул. Покровка 1/13 стр.6 корп.?</li> */}
                  <li>Эл. почта: danlus_1@mail.ru</li>
                  {/* <li>Понедельник - Пятница с 11:00 до 18:00</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <footer className="bg-slate-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© 2024 Синергия Сервис. Все права защищены.</p>
        </div>
      </footer>

      {/* Contact modal */}
      {activeModal && activeModal !== "formSubmite" && (
        <div
          // onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-black/28 z-[111111111111111111] bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-screen overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-[#283457]">
              Хочу работать
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Телефон
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Телеграм
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={(e) =>
                    setFormData({ ...formData, telegram: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              {/* {activeModal === "want-work" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Опыт работы
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                  ></textarea>
                </div>
              )} */}
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

      {modalTable && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-111111">
          <div className="bg-[#3A466B] overflow-scroll text-white max-lg:h-[calc(100vh-2rem)] scroll-none p-8 rounded-md w-full sm:w-[600px]">
            {/* Close Button */}

            {/* The Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full relative"
            >
              <button
                onClick={() => setModalTable(false)}
                className="absolute -top-2 -right-2 text-white text-2xl"
              >
                <svg
                  className="text-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-x-icon lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              {/* Name */}
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="Ваше имя *"
                className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mb-1 w-full"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mb-2">{errors.name}</p>
              )}

              {/* Phone */}
              <div className="flex w-full lg:gap-7 max-lg:flex-wrap">
                <input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  type="tel"
                  placeholder="Телефон *"
                  className="border-b mt-1.5 border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mb-1 w-full"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mb-2">{errors.phone}</p>
                )}

                {/* Telegram */}
                <input
                  value={formData.telegram}
                  onChange={(e) =>
                    setFormData({ ...formData, telegram: e.target.value })
                  }
                  type="text"
                  placeholder="Telegram"
                  className="border-b mt-1.5 border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mb-1 w-full"
                />
              </div>

              {/* Number of children */}
              <input
                type="number"
                min="0"
                max="5"
                placeholder="Сколько детей"
                value={formData.numberOfChild}
                onChange={(e) =>
                  handleNumberOfChildChange(Number(e.target.value))
                }
                className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mt-4 w-full"
              />

              {/* Conditional child fields */}
              {formData.numberOfChild > 0 && (
                <div className="w-full mt-4 border-t border-b border-white/20 py-4">
                  {formData.children.map((child, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-white/80 mb-2">Ребенок {index + 1}</p>

                      {/* Age */}
                      <input
                        placeholder="Сколько лет ребенку"
                        value={child.age}
                        onChange={(e) => {
                          const newChildren = [...formData.children];
                          newChildren[index].age = e.target.value;
                          setFormData({ ...formData, children: newChildren });
                        }}
                        className="border-b border-white/50 bg-transparent text-white p-2.5 w-full mb-2"
                      />

                      {/* Type */}
                      <RadioGroup
                        label="Тип ребенка"
                        name={`typeOfChild-${index}`}
                        value={child.type}
                        onChange={(e) => {
                          const newChildren = [...formData.children];
                          newChildren[index].type = e.target.value;
                          setFormData({ ...formData, children: newChildren });
                        }}
                        options={[
                          { label: "Младенец", value: "Младенец" },
                          { label: "Дошкольник", value: "Дошкольник" },
                          { label: "Школьник", value: "Школьник" },
                        ]}
                      />
                    </div>
                  ))}
                  {errors.ageOfChild && (
                    <p className="text-red-400 text-sm">{errors.ageOfChild}</p>
                  )}
                </div>
              )}

              {/* Type of parent */}
              <RadioGroup
                label="Вы мама или отец?"
                name="typeOfParent"
                value={formData.typeOfParent}
                error={errors.typeOfParent}
                onChange={(e) =>
                  setFormData({ ...formData, typeOfParent: e.target.value })
                }
                options={[
                  { label: "Мама", value: "Мама" },
                  { label: "Отец", value: "Отец" },
                  { label: "Опекун", value: "Опекун" },
                ]}
              />

              {/* Help type */}
              <div className="mt-4">
                <p className="text-white/80 mb-2">Какая помощь вам нужна?</p>
            
                  <label
                 
                    className="flex items-center gap-2 mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                checked
                     
                      className="accent-teal-500"
                    />
                    <span>{formData.helpType[0]}</span>
                  </label>
                
                {errors.helpType && (
                  <p className="text-red-400 text-sm">{errors.helpType}</p>
                )}
              </div>

              {/* Address */}
              <input
                placeholder="Адрес *"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mt-4 w-full"
              />
              {errors.address && (
                <p className="text-red-400 text-sm">{errors.address}</p>
              )}

              {/* Message */}
              <textarea
                placeholder="Для чего вы ищете помощника?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="border-b border-white/50 bg-transparent text-white placeholder-white/70 p-2.5 mt-4 w-full resize-none"
                rows={4}
              />
              {errors.message && (
                <p className="text-red-400 text-sm">{errors.message}</p>
              )}

              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 px-6 py-4 mt-6 rounded-md max-w-[250px] w-full uppercase transition"
              >
                Связаться с нами
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
