import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      city: 'São Paulo',
      rating: 5,
      text: 'Meu Golden Retriever nunca esteve tão saudável! A ração da Pian Alimentos fez toda a diferença na energia e no brilho do pelo dele.',
      petName: 'Max',
      image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'João Santos',
      city: 'Rio de Janeiro',
      rating: 5,
      text: 'A qualidade é incomparável! Minha cadela come com muito mais prazer e sua digestão melhorou significativamente.',
      petName: 'Luna',
      image: 'https://images.pexels.com/photos/4459617/pexels-photo-4459617.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Ana Costa',
      city: 'Belo Horizonte',
      rating: 5,
      text: 'Recomendo para todos! O atendimento é excelente e os produtos da Pian são de primeira qualidade. Meu pet adora!',
      petName: 'Bob',
      image: 'https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-25 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-montserrat">
            Depoimentos de famílias que confiam na PetNutri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-yellow-100">
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-yellow-500 mr-3" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 italic text-lg leading-relaxed font-montserrat">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-yellow-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900 font-montserrat">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 font-montserrat">{testimonial.city}</p>
                  <p className="text-sm text-yellow-600 font-bold font-montserrat">Tutora do {testimonial.petName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;