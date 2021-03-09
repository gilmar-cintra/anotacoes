export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
  active: boolean;
}

export interface Addresses {
  id: number;
  place: string;
  number: number;
  city: string;
  state: string;
  zipcode: string;
  complement: string;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface Fields {
  id: number;
  title: string;
  entity: string;
  startDate: string;
  endDate: string;
  description: string;
  idfields_type: number;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface FieldsTypes {
  id: number;
  type: string;
  created: Date;
  updated: Date;
}

export interface Goals {
  id: number;
  goal: string;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface Vacancies {
  id: number;
  vacancy: string;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface Languages {
  id: number;
  language: string;
  created: Date;
  updated: Date;
}

export interface Skills {
  id: number;
  skill: string;
  created: Date;
  updated: Date;
}

export interface LanguagesLevels {
  id: number;
  idlanguage: number;
  stars: number;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface SkillsLevels {
  id: number;
  idskill: number;
  stars: number;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface PhonesTypes {
  id: number;
  type: string;
  created: Date;
  updated: Date;
}

export interface EmailsTypes {
  id: number;
  type: string;
  created: Date;
  updated: Date;
}

export interface NetworksTypes {
  id: number;
  network: string;
  created: Date;
  updated: Date;
}

export interface Emails {
  id: number;
  email: string;
  idemail_type: number;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface Phones {
  id: number;
  phone: string;
  idphone_type: number;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface Network {
  id: number;
  link: string;
  idnetwork_type: number;
  iduser: number;
  created: Date;
  updated: Date;
}

export interface RootObject {
  users: Users;
  addresses: Addresses;
  fields: Fields;
  fields_types: FieldsTypes;
  goals: Goals;
  vacancies: Vacancies;
  languages: Languages;
  skills: Skills;
  languages_levels: LanguagesLevels;
  skills_levels: SkillsLevels;
  phones_types: PhonesTypes;
  emails_types: EmailsTypes;
  networks_types: NetworksTypes;
  emails: Emails;
  phones: Phones;
  network: Network;
}

