import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="pt-16">
      {/* Hero Section - Clean and Elegant */}
      <section className="py-16 bg-pian-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FDD528 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #FDD528 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            {/* Main title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-bold font-barlow-condensed uppercase tracking-wider">
              CONTATO
            </h1>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-pian-red mx-auto mb-6"></div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-bold font-barlow-condensed leading-relaxed">
              Entre em contato com a equipe da Pian Alimentos Nutrição Pet
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Contact Form - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-10 border border-pian-yellow/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-bold font-barlow-condensed uppercase tracking-wider">
                  ENVIE SUA MENSAGEM
                </h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-base font-bold text-gray-900 mb-3 font-bold font-barlow-condensed uppercase tracking-wider">
                        NOME
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 font-bold font-barlow-condensed"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-base font-bold text-gray-900 mb-3 font-bold font-barlow-condensed uppercase tracking-wider">
                        E-MAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 font-bold font-barlow-condensed"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-base font-bold text-gray-900 mb-3 font-bold font-barlow-condensed uppercase tracking-wider">
                      ASSUNTO
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 font-bold font-barlow-condensed"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-base font-bold text-gray-900 mb-3 font-bold font-barlow-condensed uppercase tracking-wider">
                      MENSAGEM
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 resize-none font-bold font-barlow-condensed"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 bg-pian-yellow text-pian-black hover:bg-pian-yellow-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold font-barlow-condensed"
                  >
                    <Send className="h-6 w-6 mr-3" />
                    ENVIAR MENSAGEM
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-pian-yellow/20 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 font-bold font-barlow-condensed uppercase tracking-wider">
                  INFORMAÇÕES DE CONTATO
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white hover:bg-pian-yellow transition-colors duration-200 border border-pian-yellow">
                    <div className="flex-shrink-0">
                      <Phone className="h-5 w-5 text-pian-yellow" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 font-bold font-barlow-condensed uppercase tracking-wider">TELEFONE</p>
                      <p className="text-gray-900 font-bold font-barlow-condensed">(54) 3358-2222</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white hover:bg-pian-yellow transition-colors duration-200 border border-pian-yellow">
                    <div className="flex-shrink-0">
                      <Mail className="h-5 w-5 text-pian-yellow" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 font-bold font-barlow-condensed uppercase tracking-wider">E-MAIL</p>
                      <p className="text-gray-900 font-bold font-barlow-condensed">pian@pian.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white hover:bg-pian-yellow transition-colors duration-200 border border-pian-yellow">
                    <div className="flex-shrink-0">
                      <MapPin className="h-5 w-5 text-pian-yellow" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 font-bold font-barlow-condensed uppercase tracking-wider">ENDEREÇO</p>
                      <p className="text-gray-900 font-bold font-barlow-condensed">
                        RS-324, 1369<br />
                        Paraí - RS, 95360-000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[75px] font-black text-gray-900 mb-8 font-bold font-barlow-condensed uppercase tracking-wider">
              NOSSA LOCALIZAÇÃO
            </h2>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-6xl mx-auto border border-pian-yellow/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.8234567890123!2d-51.7891234567890!3d-28.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRS-324%2C%201369%2C%20Para%C3%AD%20-%20RS%2C%2095360-000!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização PIAN ALIMENTOS"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;