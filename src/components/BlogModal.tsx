import React from 'react';
import { X, Calendar, Clock, Share2, Bookmark, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';

interface BlogModalProps {
  article: {
    id: number;
    title: string;
    content: string;
    image: string;
    date: string;
    readTime: string;
    category: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleShare = (platform: string) => {
    const url = window.location.origin + `/blog/${article.id}`;
    const text = article.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copiado para a área de transferência!');
        });
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: article.title,
            text: article.title,
            url: url
          });
        }
        break;
    }
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nutrição':
        return 'bg-orange-500';
      case 'Cuidados':
        return 'bg-blue-500';
      case 'Saúde':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className={`${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {article.category}
            </span>
          </div>
          
          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-xl md:text-2xl font-semibold text-white mb-2 font-montserrat">
              {article.title}
            </h1>
            
            <div className="flex items-center text-white/90 text-xs md:text-sm space-x-4 font-montserrat">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-12 overflow-y-auto max-h-[calc(90vh-12rem)] modal-content">
          {/* Action buttons */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium font-montserrat">
                <Bookmark className="h-4 w-4 mr-2" />
                Salvar
              </button>
              
              {/* Compartilhamento */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 font-montserrat mr-2">Compartilhar:</span>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                  title="Compartilhar no Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                  title="Compartilhar no Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                  title="Compartilhar no LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                  title="Copiar link"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Article content */}
          <article
            className="prose prose-lg max-w-none font-montserrat mx-auto blog-article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              lineHeight: '1.9',
              color: '#1f2937',
              maxWidth: '70ch',
              fontSize: '1.125rem'
            }}
          />


          {/* Related articles suggestion */}
          <div className="mt-12 p-8 border border-gray-300 rounded-xl max-w-prose mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 font-montserrat">
              Gostou deste artigo?
            </h3>
            <p className="text-gray-600 mb-6 font-montserrat leading-relaxed">
              Explore mais conteúdos sobre nutrição e cuidados com pets em nosso blog.
            </p>
            <a
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium font-montserrat"
            >
              Ver mais artigos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;