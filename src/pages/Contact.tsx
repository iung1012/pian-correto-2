import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (substituir por API real)
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      alert('Mensagem enviada com sucesso!');
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'TELEFONE',
      content: '(54) 3477-1054',
      link: 'tel:+555434771054',
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: 'E-MAIL',
      content: 'pian@pian.com.br',
      link: 'mailto:pian@pian.com.br',
      color: 'bg-pian-red'
    },
    {
      icon: MapPin,
      title: 'ENDEREÇO',
      content: 'RS-324, 1369\nParaí - RS, 95360-000',
      link: 'https://maps.google.com/?q=RS-324,+1369,+Paraí+-+RS,+95360-000',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-pian-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-barlow-condensed uppercase tracking-wider break-words px-2">
              CONTATO
            </h1>
            <div className="w-20 h-0.5 bg-pian-red mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-barlow-condensed">
              Entre em contato com a equipe da Pian Alimentos
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-8 lg:p-12">
                <h3 className="text-2xl font-black text-gray-900 mb-8 font-barlow-condensed uppercase tracking-wider">
                  ENVIE SUA MENSAGEM
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 font-barlow-condensed uppercase">
                        NOME
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-pian-yellow transition-colors font-barlow-condensed"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 font-barlow-condensed uppercase">
                        E-MAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-pian-yellow transition-colors font-barlow-condensed"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2 font-barlow-condensed uppercase">
                      ASSUNTO
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-pian-yellow transition-colors font-barlow-condensed"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 font-barlow-condensed uppercase">
                      MENSAGEM
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-pian-yellow transition-colors resize-none font-barlow-condensed"
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-8 py-4 bg-pian-yellow text-pian-black hover:bg-yellow-500 transition-colors rounded-lg font-bold font-barlow-condensed text-lg uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                        <span>ENVIANDO...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        <span>ENVIAR MENSAGEM</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-pian-black rounded-lg p-8">
                <h3 className="text-xl font-black text-white mb-8 font-barlow-condensed uppercase tracking-wider">
                  INFORMAÇÕES DE CONTATO
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block"
                      >
                        <div className="bg-white rounded-lg p-5 border border-gray-200 hover:border-pian-yellow transition-colors">
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-10 h-10 ${info.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-barlow-condensed">
                                {info.title}
                              </p>
                              <p className="text-sm font-bold text-gray-900 font-barlow-condensed whitespace-pre-line">
                                {info.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 font-barlow-condensed uppercase tracking-wider break-words px-2">
              NOSSA LOCALIZAÇÃO
            </h2>
            <div className="w-20 h-0.5 bg-pian-red mx-auto"></div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 max-w-6xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.8234567890123!2d-51.7891234567890!3d-28.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRS-324%2C%201369%2C%20Para%C3%AD%20-%20RS%2C%2095360-000!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização PIAN ALIMENTOS"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
