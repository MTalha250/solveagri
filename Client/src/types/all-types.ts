interface Product {
  id?: number;
  pid: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  SKU: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: Category;
  locale: string;
  documentId?: string;
  productDetail: string;
  isOnSale?: boolean;
  productImage?: {
    id: number;
    alternativeText: string;
    url: string;
  };
}

interface Category {
  id: number;
  Title: string;
  Image: {
    id: number;
    alternativeText: string;
    url: string;
  };
  categoryId: string;
  documentId?: string;
}

type PageInfo = {
  totalPages: number;
  currentPage: number;
};

interface Project {
  projId?: string;
  projTitle: string;
  projHeader: string;
  projSubTitle: string;
  projImage?: {
    id: number;
    alternativeText: string;
    url: string;
  };
  html: string;
  category: ProjectCategory;
  documentId?: string;
  // createdAt?: string;
  // updatedAt?: string;
}

interface ProjectCategory {
  id: number;
  Title: string;
  Image: {
    id: number;
    alternativeText: string;
    url: string;
  };
  projCatId: string;
  documentId?: string;
}

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Comment = {
  _id: string;
  productId: string;
  text: string;
  email?: string;
  name: string;
  createdAt: string;
  type: string;
  isModerated: boolean;
};

type ServiceData = {
  image?: string;
  hero?: {
    image: string;
    heading: string;
  };
  name?: string;
  serviceImage?: {
    id: number;
    alternativeText: string;
    url: string;
  };
  documentId?: string;
  heroImage?: {
    id: number;
    alternativeText: string;
    url: string;
  };
  heroHeadings?: string;
  ctaPara?: string;
  ctaText?: string;
  ctaImage?: {
    id: number;
    alternativeText: string;
    url: string;
  };
  content?: string;
  advertisement?: string;
  about?: string;
};

export type {
  Product,
  User,
  Comment,
  Project,
  PageInfo,
  ServiceData,
  Category,
  ProjectCategory,
};
