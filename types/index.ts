export interface IFaqs {
  id: number;
  question: string;
  answer: string;
}

export interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string | null;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: ITextObjects[] | [];
  resourceURI: string;
  urls: ILink[];
  series: IItem;
  variants: IItem[];
  collections: IItem[] | [];
  collectedIssues: IItem[] | [];
  dates: IDate[];
  prices: IPrice[];
  price: number;
  oldPrice: number;
  stock: number;
  thumbnail: IThumbnail;
  images: ILink[] | [];
  creators: ISummary;
  characters: ISummary;
  stories: ISummary;
  events: ISummary;
}

export interface IComicResponse {
  results: any;
  total: number;
  message: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  status: string;
  etag: string;
  code: number | string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: IComic[];
  };
}
export interface ICharacterResponse {
  code: number | string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: ICharacter[];
  };
}

export interface ICharacter {
  id: number;
  name: string;
  description: string | null;
  modified: Date | string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: ISummary;
  series: ISummary;
  stories: ISummary;
  events: ISummary;
  urls: ILink[];
}

export interface ISummary {
  available: number;
  collectionURI: string;
  items: IItem[] | [];
  returned: number;
}

export interface IItem {
  resourceURI: string;
  name: string;
  type?: "cover" | "interiorStory" | "promo" | string;
  role?:
    | "editor"
    | "writer"
    | "penciller"
    | "penciller (cover)"
    | "colorist"
    | "inker"
    | "penciller (cover) "
    | "letterer"
    | string;
}

export interface ILink {
  type: "detail" | "comiclink" | "purchase" | string;
  url: string;
}

export interface IDate {
  type: "onsaleDate" | "focDate" | string;
  date: string;
}

export interface IPrice {
  type: "printPrice" | string;
  price: number;
}

export interface IThumbnail {
  path: string;
  extension: "jpg" | string;
}

export interface ITextObjects {
  type: "issue_solicit_text" | string;
  language: "en-us" | string;
  text: string;
}

export type ICheckout = {
  customer: ICustomer;
  address: IAddress;
  payment: ICard;
};

export interface ICard {
  number: string;
  nameOnCard: string;
  expDate: string;
  cvc: string;
}

export interface IOrder {
  name: string;
  image: string;
  price: number;
}

export interface IAddress {
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export interface ICustomer {
  name: string;
  lastname: string;
  email: string;
}
