import React from 'react';
import axios from "axios"

const Contacts = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    message: "",
    type: "contact",
    phoneortelegram: ""
  })
  const [status, setStatus] = React.useState("");
    console.log(status)
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("message", formData.message);
    data.append("phoneortelegram", formData.phoneortelegram);
    data.append("type", formData.type);

      setStatus("⏳ Sending...");
    try {
      const res = await axios.post("http://localhost:5000/api/send-to-telegram", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(res.data.message);
    } catch (err) {
      setStatus("❌ Error sending data");
      console.error(err);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Заголовок */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center tracking-tight">
            Контакты
          </h1>
          
          {/* Контент */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Контактная информация */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                Свяжитесь с нами
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Телефон</h3>
                  <a 
                    href="tel:+79999999999" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    +7 (999) 999-99-99
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <a 
                    href="mailto:info@ALUSSINE.рф" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    info@ALUSSINE.рф
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Telegram</h3>
                  <a 
                    href="https://t.me/semeyniy_fokus" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    @semeyniy_fokus
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Адрес</h3>
                  <p className="text-gray-700">г. Москва, ул. Примерная, д. 123</p>
                </div>
              </div>
            </div>

            {/* Форма обратной связи */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                Форма обратной связи
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e)=> setFormData({...formData, name: e.target.value})}
                    value={formData.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон или Телеграмм
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e)=> setFormData({...formData, phoneortelegram: e.target.value})}
                    value={formData.phoneortelegram}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение
                  </label>
                  <textarea
                    rows="4"
                    onChange={(e)=> setFormData({...formData, message: e.target.value})}
                    value={formData.message}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>

          {/* Яндекс Карта */}
          <div className="mt-16">
           
            <div className="w-full h-96 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.617644%2C55.755819&z=14&pt=37.617644,55.755819,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Yandex Map"
              ></iframe>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contacts;
