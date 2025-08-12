export interface Translations {
  formTitle: string;
  membership: string;
  typeAbonnement: string;
  choisirType: string;
  ensembleOption: string;
  choisirEnsemble: string;
  courrielFacturation: string;
  entreprise: string;
  nomEntreprise: string;
  adresse: string;
  ville: string;
  province: string;
  codePostal: string;
  neq: string;
  courriel: string;
  telephone: string;
  siteWeb: string;
  description: string;
  contactPrincipal: string;
  prenom: string;
  nomFamille: string;
  fonction: string;
  courrielContact: string;
  telephoneTravail: string;
  cellulaire: string;
  submit: string;
  suivant: string;
  precedent: string;
  finaliser: string;
  chargement: string;
  etape: string;
  sur: string;
  termine: string;
  enCours: string;
  errors: {
    typeAbonnement: string;
    ensembleOption: string;
    courrielFacturation: string;
    nomEntreprise: string;
    adresse: string;
    ville: string;
    province: string;
    codePostal: string;
    courriel: string;
    telephone: string;
    prenom: string;
    nomFamille: string;
    courrielContact: string;
    telephoneTravail: string;
  };
}

export const translations: Record<string, Translations> = {
  fr: {
    formTitle: "Formulaire d'adhésion",
    membership: "Abonnement",
    typeAbonnement: "Type d'abonnement",
    choisirType: "Choisir un type d'abonnement",
    ensembleOption: "Ensemble d'option d'abonnement",
    choisirEnsemble: "Choisir un ensemble d'option d'abonnement",
    courrielFacturation: "Courriel de facturation",
    entreprise: "Entreprise / Organisme",
    nomEntreprise: "Nom de l'entreprise / organisme",
    adresse: "Adresse",
    ville: "Ville",
    province: "Province",
    codePostal: "Code postal",
    neq: "NEQ",
    courriel: "Courriel général",
    telephone: "Téléphone",
    siteWeb: "Site web",
    description: "Description",
    contactPrincipal: "Contact Principal",
    prenom: "Prénom",
    nomFamille: "Nom de famille",
    fonction: "Fonction",
    courrielContact: "Courriel",
    telephoneTravail: "Téléphone",
    cellulaire: "Cellulaire",
    submit: "Soumettre",
    suivant: "Suivant",
    precedent: "Précédent",
    finaliser: "Finaliser l'inscription",
    chargement: "Chargement...",
    etape: "Étape",
    sur: "sur",
    termine: "Terminé",
    enCours: "En cours",
    errors: {
      typeAbonnement: "Choisir un type d'abonnement",
      ensembleOption: "Choisir un ensemble d'option d'abonnement",
      courrielFacturation: "Entrer le courriel de facturation",
      nomEntreprise: "Entrer le nom du compte",
      adresse: "Entrer votre adresse",
      ville: "Choisir une ville",
      province: "Choisir une province",
      codePostal: "Entrer un code postal",
      courriel: "Entrer un courriel",
      telephone: "Entrer un téléphone",
      prenom: "Entrer le prénom",
      nomFamille: "Entrer le nom de famille",
      courrielContact: "Entrer le courriel du contact",
      telephoneTravail: "Entrer le téléphone de travail"
    }
  },
  en: {
    formTitle: "Membership Form",
    membership: "Membership",
    typeAbonnement: "Membership Type",
    choisirType: "Select a membership type",
    ensembleOption: "Membership Package",
    choisirEnsemble: "Select a membership package",
    courrielFacturation: "Billing Email",
    entreprise: "Business / Organization",
    nomEntreprise: "Business / Organization Name",
    adresse: "Address",
    ville: "City",
    province: "Province / State",
    codePostal: "Postal Code",
    neq: "NEQ",
    courriel: "Email",
    telephone: "Phone",
    siteWeb: "Website",
    description: "Description",
    contactPrincipal: "Main Contact",
    prenom: "First Name",
    nomFamille: "Last Name",
    fonction: "Job Title",
    courrielContact: "Email",
    telephoneTravail: "Work Phone",
    cellulaire: "Cell Phone",
    submit: "Submit",
    suivant: "Next",
    precedent: "Previous",
    finaliser: "Finalize Registration",
    chargement: "Loading...",
    etape: "Step",
    sur: "of",
    termine: "Completed",
    enCours: "In Progress",
    errors: {
      typeAbonnement: "Select a membership type",
      ensembleOption: "Select a membership package",
      courrielFacturation: "Enter billing email",
      nomEntreprise: "Enter business name",
      adresse: "Enter address",
      ville: "Select a city",
      province: "Select a province",
      codePostal: "Enter postal code",
      courriel: "Enter an email",
      telephone: "Enter a phone number",
      prenom: "Enter first name",
      nomFamille: "Enter last name",
      courrielContact: "Enter contact email",
      telephoneTravail: "Enter work phone"
    }
  }
};