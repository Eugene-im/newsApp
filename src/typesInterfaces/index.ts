import { Action, Thunk } from "easy-peasy";

export interface ArticleProps {
  id?: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsComponentProps {
  news?: ArticleProps[];
}

export interface ApiResponse {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
}

export interface FilterPropsEvery extends everythingReqSearchProps {
  hot?: boolean;
}
export interface FilterPropsTop extends topHeadlinesReqSearchProps {
  hot?: boolean;
}

export interface ArticlesStoreModel {
  articles: ArticleProps[];
  currentArticle: ArticleProps;
  error: string;
  isError: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  filter: FilterPropsTop | FilterPropsEvery;
  setFilter: Action<ArticlesStoreModel, FilterPropsTop | FilterPropsEvery>;
  resetFilter: Action<ArticlesStoreModel>;
  setIsLoading: Action<ArticlesStoreModel, boolean>;
  setHasNextPage: Action<ArticlesStoreModel, boolean>;
  addArticles: Action<ArticlesStoreModel, ArticleProps[]>;
  resetArticles: Action<ArticlesStoreModel>;
  setError: Action<ArticlesStoreModel, string>;
  resetError: Action<ArticlesStoreModel>;
  getNews: Thunk<ArticlesStoreModel>;
  searchNews: Thunk<ArticlesStoreModel, FilterPropsTop | FilterPropsEvery>;
  setCurrentArticle: Action<ArticlesStoreModel, { article: ArticleProps }>;
}

export enum searchInEnum {
  title = "title",
  description = "description",
  content = "content",
}

export enum countryEnum {
  ae = "ae",
  ar = "ar",
  at = "at",
  au = "au",
  be = "be",
  bg = "bg",
  br = "br",
  ca = "ca",
  ch = "ch",
  cn = "cn",
  co = "co",
  cu = "cu",
  cz = "cz",
  de = "de",
  eg = "eg",
  fr = "fr",
  gb = "gb",
  gr = "gr",
  hk = "hk",
  hu = "hu",
  id = "id",
  ie = "ie",
  il = "il",
  in = "in",
  it = "it",
  jp = "jp",
  kr = "kr",
  lt = "lt",
  lv = "lv",
  ma = "ma",
  mx = "mx",
  my = "my",
  ng = "ng",
  nl = "nl",
  no = "no",
  nz = "nz",
  ph = "ph",
  pl = "pl",
  pt = "pt",
  ro = "ro",
  rs = "rs",
  ru = "ru",
  sa = "sa",
  se = "se",
  sg = "sg",
  si = "si",
  sk = "sk",
  th = "th",
  tr = "tr",
  tw = "tw",
  ua = "ua",
  us = "us",
  ve = "ve",
  za = "za",
}

export enum categoryEnum {
  business = "business",
  entertainment = "entertainment",
  general = "general",
  health = "health",
  science = "science",
  sports = "sports",
  technology = "technology",
}

export enum sourcesEnum {
  abcNews = "abc-news",
  abcNewsAu = "abc-news-au",
  aftenposten = "aftenposten",
  alJazeeraEnglish = "al-jazeera-english",
  ansa = "ansa",
  argaam = "argaam",
  arsTechnica = "ars-technica",
  aryaNews = "arya-news",
  associatedPress = "associated-press",
  australianFinancialReview = "australian-financial-review",
  axios = "axios",
  bbcNews = "bbc-news",
  bbcSport = "bbc-sport",
  bild = "bild",
  blastingNewsBr = "blasting-news-br",
  bleacherReport = "bleacher-report",
  bloomberg = "bloomberg",
  breitbartNews = "breitbart-news",
  businessInsider = "business-insider",
  businessInsiderUk = "business-insider-uk",
  buzzfeed = "buzzfeed",
  cbcNews = "cbc-news",
  cbsNews = "cbs-news",
  cnbc = "cnbc",
  cnn = "cnn",
  cryptoCoinsNews = "crypto-coins-news",
  derTagesspiegel = "der-tagesspiegel",
  dieZeit = "die-zeit",
  elMundo = "el-mundo",
  engadget = "engadget",
  entertainmentWeekly = "entertainment-weekly",
  espn = "espn",
  espnCricInfo = "espn-cric-info",
  financialPost = "financial-post",
  focus = "focus",
  footballItalia = "football-italia",
  fortune = "fortune",
  fourFourTwo = "four-four-two",
  foxNews = "fox-news",
  foxSports = "fox-sports",
  globo = "globo",
  googleNews = "google-news",
  googleNewsAr = "google-news-ar",
  googleNewsAu = "google-news-au",
  googleNewsBr = "google-news-br",
  googleNewsCa = "google-news-ca",
  googleNewsFr = "google-news-fr",
  googleNewsIn = "google-news-in",
  googleNewsIs = "google-news-is",
  googleNewsIt = "google-news-it",
  googleNewsRu = "google-news-ru",
  googleNewsSa = "google-news-sa",
  googleNewsUk = "google-news-uk",
  goteborgsPosten = "goteborgs-posten",
  gruenderszene = "gruenderszene",
  hackerNews = "hacker-news",
  handelsblatt = "handelsblatt",
  ign = "ign",
  ilSole24Ore = "il-sole-24-ore",
  independent = "independent",
  infobae = "infobae",
  infoMoney = "info-money",
  laGaceta = "la-gaceta",
  laNacion = "la-nacion",
  laRepubblica = "la-repubblica",
  leMonde = "le-monde",
  lenta = "lenta",
  lequipe = "lequipe",
  lesEchos = "les-echos",
  libero = "libero",
  marca = "marca",
  mashable = "mashable",
  medicalNewsToday = "medical-news-today",
  metro = "metro",
  mirror = "mirror",
  msnbc = "msnbc",
  mtvNews = "mtv-news",
  mtvNewsUk = "mtv-news-uk",
  nationalGeographic = "national-geographic",
  nationalReview = "national-review",
  nbcNews = "nbc-news",
  news24 = "news24",
  newScientist = "new-scientist",
  newsComAu = "news-com-au",
  newsweek = "newsweek",
  newYorkMagazine = "new-york-magazine",
  nextBigFuture = "next-big-future",
  nflNews = "nfl-news",
  nhlNews = "nhl-news",
  nrk = "nrk",
  politico = "politico",
  polygon = "polygon",
  rbc = "rbc",
  recode = "recode",
  redditRAll = "reddit-r-all",
  reuters = "reuters",
  rt = "rt",
  rte = "rte",
  rtlNieuws = "rtl-nieuws",
  sabq = "sabq",
  spiegelOnline = "spiegel-online",
  svenskaDagbladet = "svenska-dagbladet",
  t3n = "t3n",
  talksport = "talksport",
  techCrunch = "techcrunch",
  techCrunchCn = "techcrunch-cn",
  techRadar = "techradar",
  theAmericanConservative = "the-american-conservative",
  theGlobeAndMail = "the-globe-and-mail",
  theHill = "the-hill",
  theHindu = "the-hindu",
  theHuffingtonPost = "the-huffington-post",
  theIrishTimes = "the-irish-times",
  theJerusalemPost = "the-jerusalem-post",
  theLadBible = "the-lad-bible",
  theNewYorkTimes = "the-new-york-times",
  theNextWeb = "the-next-web",
  theSportBible = "the-sport-bible",
  theTelegraph = "the-telegraph",
  theTimesOfIndia = "the-times-of-india",
  theVerge = "the-verge",
  theWallStreetJournal = "the-wall-street-journal",
  theWashingtonPost = "the-washington-post",
  theWashingtonTimes = "the-washington-times",
  time = "time",
  usaToday = "usa-today",
  viceNews = "vice-news",
  wired = "wired",
  wiredDe = "wired-de",
  wirtschaftsWoche = "wirtschafts-woche",
  xinhuaNet = "xinhua-net",
  ynet = "ynet",
}

export enum languageEnum {
  ar = "ar",
  de = "de",
  en = "en",
  es = "es",
  fr = "fr",
  he = "he",
  it = "it",
  nl = "nl",
  no = "no",
  pt = "pt",
  ru = "ru",
  sv = "sv",
  ud = "ud",
  zh = "zh",
}

export enum sortByEnum {
  relevancy = "relevancy",
  popularity = "popularity",
  publishedAt = "publishedAt",
}
export enum hotEnum{
  hot = "hot",
  usual = "usual"
}
// /v2/everything
export interface everythingReqSearchProps {
  q?: string;
  searchIn: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: languageEnum;
  sortBy?: sortByEnum;
  pageSize?: number;
  page?: number;
}

// example for everythingReqSearchProps.domains = 'bbc.co.uk,techcrunch.com,engadget.com'
// example for from = '2020-10-10' || "2023-06-21T09:00:35"

// /v2/top-headlines
export interface topHeadlinesReqSearchProps {
  sources: sourcesEnum;
  category?: categoryEnum;
  country?: countryEnum;
  q?: string;
  pageSize?: number;
  page?: number;
}

// /v2/top-headlines/sources
export interface sourcesSearchProps {
  category: categoryEnum;
  language: languageEnum;
  country: countryEnum;
}
