const langlocalStorageKey = 'i18nextLng';

export const getLanguageFromLocalStorage = () => {
  return localStorage.getItem(langlocalStorageKey);
};

export const setLanguageToLocalStorage = (lang: 'ru' | 'en-US') => {
  return localStorage.setItem(langlocalStorageKey, lang);
};
