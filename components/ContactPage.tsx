import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Phone, Mail, Clock, Send, Building, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { ContentPageLayout } from "./PageLayout";
import { toast } from "sonner@2.0.3";
import type { BreadcrumbItem } from "../utils/form-types";

interface NavigationHandlers {
  onNavigateToWebsite: () => void;
  onNavigateToAssociation: () => void;
  onNavigateToSaintLaurent: () => void;
  onNavigateToMembers: () => void;
  onNavigateToEvents: () => void;
  onNavigateToContact: () => void;
  onNavigateToDossiers: () => void;
  onNavigateToPrivacyPolicy: () => void;
  onNavigateToTerms: () => void;
  onNavigateToSitemap: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

interface ContactPageProps {
  navigationHandlers: NavigationHandlers;
}

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  inquiryType: string;
}

// Section Hero
const HeroSection = () => {
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=600&fit=crop&auto=format')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80" />

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="max-w-4xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl font-serif leading-tight text-white mb-6 font-normal" 
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Contactez-nous
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Notre équipe est à votre disposition pour répondre à vos questions 
              et vous accompagner dans vos projets maritimes.
            </motion.p>

            <motion.div 
              className="flex items-center space-x-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">Québec</div>
                <div className="text-white/80">bureau principal</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-white/80">délai de réponse</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-white/80">langues</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Section Informations de Contact
const ContactInfoSection = () => {
  const contactInfo = [
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Bureau principal",
      details: [
        "101 Rue Saint-Paul",
        "Québec, QC G1K 3V8",
        "Canada"
      ]
    },
    {
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      title: "Téléphone",
      details: [
        "+1 (418) 692-4681",
        "Sans frais : 1-800-XXX-XXXX",
        "Fax : +1 (418) 692-4682"
      ]
    },
    {
      icon: <Mail className="w-8 h-8 text-blue-600" />,
      title: "Courriel",
      details: [
        "info@armateur.ca",
        "direction@armateur.ca",
        "membres@armateur.ca"
      ]
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Heures d'ouverture",
      details: [
        "Lundi - Vendredi",
        "8h30 - 17h00 (EST)",
        "Fermé les jours fériés"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Nos coordonnées
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plusieurs moyens de nous joindre pour toutes vos questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section Formulaire de Contact
const ContactFormSection = ({ onNavigateToSignup }: { onNavigateToSignup: () => void }) => {
  const [formData, setFormData] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    "Demande d'adhésion",
    "Informations générales",
    "Événements et activités",
    "Partenariats",
    "Média et presse",
    "Support technique",
    "Autre"
  ];

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Message envoyé avec succès!", {
        description: "Nous vous répondrons dans les 24 heures."
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
    } catch (error) {
      toast.error("Erreur lors de l'envoi", {
        description: "Veuillez réessayer plus tard."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.subject && formData.message && formData.inquiryType;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Formulaire */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-3xl font-serif leading-tight text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display' }}>
                  Envoyez-nous un message
                </h3>
                <p className="text-gray-600 mb-8">
                  Remplissez ce formulaire et nous vous répondrons rapidement.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom et prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  {/* Email et téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Courriel *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Organisation */}
                  <div>
                    <Label htmlFor="organization">Organisation</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Type de demande */}
                  <div>
                    <Label htmlFor="inquiryType">Type de demande *</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionnez un type de demande" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sujet */}
                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="mt-1 min-h-[120px]"
                      placeholder="Décrivez votre demande..."
                      required
                    />
                  </div>

                  {/* Bouton d'envoi */}
                  <Button 
                    type="submit"
                    className="w-full"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Informations complémentaires */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-serif leading-tight text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
                Vous souhaitez nous rejoindre ?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Si vous représentez une entreprise du secteur maritime et souhaitez 
                adhérer aux Armateurs du Saint-Laurent, nous vous invitons à découvrir 
                les avantages de notre association.
              </p>
              <Button 
                onClick={onNavigateToSignup}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Demande d'adhésion
              </Button>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">
                  Réponse rapide garantie
                </h4>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    <span>Réponse sous 24h pour les demandes urgentes</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    <span>Support en français et en anglais</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    <span>Équipe spécialisée en transport maritime</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Autres moyens de contact
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Site web</p>
                      <p className="text-sm text-gray-600">www.armateur.ca</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Adresse postale</p>
                      <p className="text-sm text-gray-600">
                        101 Rue Saint-Paul<br />
                        Québec, QC G1K 3V8
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const ContactPage = ({ navigationHandlers }: ContactPageProps) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", onClick: navigationHandlers.onNavigateToWebsite },
    { label: "Contact", current: true }
  ];

  return (
    <ContentPageLayout
      currentView="contact"
      navigationHandlers={navigationHandlers}
      breadcrumbItems={breadcrumbItems}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
        <ContactInfoSection />
        <ContactFormSection onNavigateToSignup={navigationHandlers.onNavigateToSignup} />
      </motion.div>
    </ContentPageLayout>
  );
};