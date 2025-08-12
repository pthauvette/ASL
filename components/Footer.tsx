import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#43464b] text-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">ASL</h3>
            <p className="text-sm text-gray-300 leading-5 mb-4">
              Connecter les professionnels maritimes et favoriser la croissance de notre communauté depuis 1936.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">À propos d'ASL</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Répertoire des membres</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Opportunités de partenariat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Événements</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Nous contacter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connectez-vous avec nous</h3>
            <div className="flex space-x-3 mb-4">
              <Facebook className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-3.5 h-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-3.5 h-4 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </div>
            <p className="text-sm text-gray-300 mb-4">Abonnez-vous à notre bulletin</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Votre courriel" 
                className="flex-1 px-3 py-2 bg-white text-black text-sm rounded-l-md border-0 focus:ring-2 focus:ring-[#000033]"
              />
              <button className="bg-[#000033] px-4 py-2 text-sm rounded-r-md hover:bg-[#000033]/90 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-gray-600 text-center">
          <p className="text-sm text-gray-300">© 2023 ASL. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}