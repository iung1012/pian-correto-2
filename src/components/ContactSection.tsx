import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
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
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 section-white section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[45px] font-bold text-gray-900 mb-4 font-barlow-condensed uppercase tracking-wider">
          <h2 className="text-[75px] font-black text-gray-900 mb-4 font-barlow-condensed uppercase tracking-wider">
            ENTRE EM CONTATO
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto font-montserrat font-bold">
            ESTAMOS AQUI PARA AJUDAR VOCÊ E SEU PET. FALE CONOSCO!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-pian-yellow">
            <h3 className="text-2xl font-black text-gray-900 mb-6 font-montserrat uppercase tracking-wider">ENVIE SUA MENSAGEM</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-normal text-gray-900 mb-2 font-montserrat uppercase tracking-wider">
                  NOME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 font-montserrat"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-base font-normal text-gray-900 mb-2 font-montserrat uppercase tracking-wider">
                  E-MAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 font-montserrat"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-base font-normal text-gray-900 mb-2 font-montserrat uppercase tracking-wider">
                  ASSUNTO
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 font-montserrat"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-base font-normal text-gray-900 mb-2 font-montserrat uppercase tracking-wider">
                  MENSAGEM
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pian-yellow focus:border-pian-yellow transition-all duration-200 resize-none font-montserrat"
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-pian-yellow text-pian-black hover:bg-pian-yellow-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold font-montserrat"
              >
                <Send className="h-5 w-5 mr-2" />
                ENVIAR MENSAGEM
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-pian-yellow">
              <h2 className="text-[45px] font-black text-white mb-6 font-barlow-condensed uppercase tracking-wider">
                INFORMAÇÕES DE CONTATO
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white hover:bg-pian-yellow transition-colors duration-200 border border-pian-yellow">
                  <Phone className="h-5 w-5 text-pian-yellow" />
                  <div>
                    <p className="font-black text-gray-900 font-montserrat uppercase tracking-wider">TELEFONE</p>
                    <p className="text-gray-900 font-montserrat font-bold">(54) 3358-2222</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white hover:bg-pian-yellow transition-colors duration-200 border border-pian-yellow">
                  <Mail className="h-5 w-5 text-pian-yellow" />
                  <div>
                    <p className="font-black text-gray-900 font-montserrat uppercase tracking-wider">E-MAIL</p>
                    <p className="text-gray-900 font-montserrat font-bold">pian@pian.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white hover:bg-pian-yellow transition-colors duration-200 border border-pian-yellow">
                  <MapPin className="h-5 w-5 text-pian-yellow" />
                  <div>
                    <p className="font-black text-gray-900 font-montserrat uppercase tracking-wider">ENDEREÇO</p>
                    <p className="text-gray-900 font-montserrat font-bold">
                      RS-324, 1369<br />
                      Paraí - RS, 95360-000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-pian-yellow rounded-2xl h-64 overflow-hidden shadow-lg relative">
              <div className="w-full h-full flex items-center justify-center rounded-2xl">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 text-gray-900 mx-auto mb-4" />
                  <h4 className="text-2xl font-black text-gray-900 mb-2 font-montserrat uppercase tracking-wider">PIAN ALIMENTOS</h4>
                  <p className="font-black text-gray-900 font-montserrat uppercase">PARAÍ - RIO GRANDE DO SUL</p>
                  <p className="text-base mt-2 text-gray-900 font-montserrat font-bold uppercase">BRASIL</p>
                  <a 
                    href="https://maps.google.com/?q=Paraí,RS,Brasil" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-base font-bold font-montserrat"
                  >
                    VER NO GOOGLE MAPS
                  </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
  )
}