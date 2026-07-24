/** Define los tipos de contenido usados por la landing sincronizados con el Backend. */

interface HeroSlide {
  src: string;
  alt: string;
}

export interface Publication {
  id: number | string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  url: string;
}

interface Agrupacion {
  id: number | string;
  title: string;
  category?: string;
  description: string;
  image?: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    x?: string;
    youtube?: string;
    web?: string;
  };
}

interface GrupoInvestigacion {
  id: number | string;
  title: string;
  category?: string;
  description: string;
  image?: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    x?: string;
    youtube?: string;
    web?: string;
  };
}

interface Alianza {
  id: number | string;
  name: string;
  logo: string;
  buttonText?: string;
  buttonLink?: string;
}

interface Empresa {
  name: string;
  image: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface SuccessCase {
  id: number | string;
  title: string;
  category?: string;
  name?: string;
  role?: string;
  company?: string;
  description: string;
  image?: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    x?: string;
    youtube?: string;
    web?: string;
  };
}

interface SectionContent {
  title: string;
  description?: string;
  active?: boolean;
}

interface LandingContent {
  career: string;
  sede: string;
  social: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    x?: string;
    youtube?: string;
  };
  links: {
    portal?: string;
    avac?: string;
  };
  contact: {
    email?: string;
    phone?: string;
    address?: string;
  };
  hero: SectionContent;
  viveCarrera: SectionContent;
  gruposInvestigacion: SectionContent;
  gruposAsu: SectionContent;
  alianzas: SectionContent;
  empresas: SectionContent;
  casosExito: SectionContent;
}

export interface LandingState {
  data: {
    heroSlides: HeroSlide[];
    researchGroups: GrupoInvestigacion[];
    asuGroups: Agrupacion[];
    alliances: Alianza[];
    companies: Empresa[];
    successCases: SuccessCase[];
    publications: Publication[];
    content: LandingContent;
  };
  isLoading: boolean;
}
