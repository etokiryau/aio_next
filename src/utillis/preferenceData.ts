interface ILanguage {
    title: string,
	src: string;
	alt: string;
};

export const languagesData: {[key: string]: ILanguage} = {
    En: {title: 'English (USA)', src: "/americanFlag.svg", alt: "English flag" },
    Es: {title: 'Spanish', src: "/spainFlag.svg", alt: "Spanish flag" },
    Fr: {title: 'French', src: "/franceFlag.svg", alt: "French flag" }
};

export const currencyData: {[key: string]: string} = {
    USD: '$',
    EUR: '€',
    RUB: '₽',
    GBP: '£'
}