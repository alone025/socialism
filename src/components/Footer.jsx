import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-14">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Логотип и описание */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/logo2.svg"
                alt="ALUSSINE"
                className="w-28 contrast-0 opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-gray-400 text-base leading-relaxed max-w-md mb-6">
              Помогаем многодетным семьям и создаём рабочие места для специалистов в сфере педагогики и услуг. Укрепляем семейные ценности вместе.
            </p>
            <div className="flex space-x-5">
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="VK"
              >
                VK
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Telegram"
              >
                Telegram
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-gray-200 font-semibold text-lg mb-5">
              Навигация
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Быстрые действия */}
          <div>
            <h3 className="text-gray-200 font-semibold text-lg mb-5">
              Быстрые действия
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  to="/need-help"
                  className="hover:text-white transition-colors"
                >
                  Мне нужна помощь
                </Link>
              </li>
              <li>
                <Link
                  to="/want-work"
                  className="hover:text-white transition-colors"
                >
                  Хочу работать
                </Link>
              </li>
              <li>
                <a
                  href="/#svo"
                  className="hover:text-white  underline transition-colors"
                >
                  Семьям СВО
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; 2025 ALUSSINE. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
