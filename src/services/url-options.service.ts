
export enum ColorOption {
  None = '',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet',
  Purple = 'purple',
  Gray = 'gray',
  Black = 'black',
  White = 'white',
}

enum UrlColorOption {
  r = 'Red',
  o = 'Orange',
  y = 'Yellow',
  g = 'Green',
  b = 'Blue',
  v = 'Violet',
  p = 'Purple',
  a = 'Gray',
  k = 'Black',
  w = 'White',
}

export enum AnalogStickSize {
  None = 0,
  Large = 70,
  Small = 40,
}

export interface AppOptions {
  wheelImgUrl?: string;
  wheelColor: ColorOption;
  analogStickSize: AnalogStickSize;
  analogStickFillColor: ColorOption;
  analogStickFillOpacity: number;
  analogStickBorderColor: ColorOption;
}

export const wheelImgUrlKey = 'img';
export const wheelColorKey = 'wc';
export const analogStickSizeKey = 'ss';
export const analogStickFillColorKey = 'sf';
export const analogStickFillOpacityKey = 'so';
export const analogStickBorderColorKey = 'sb';


interface UrlOptions {
  [wheelImgUrlKey]: string;
  [wheelColorKey]: keyof UrlColorOption;
  [analogStickSizeKey]: AnalogStickSize;
  [analogStickFillColorKey]: keyof UrlColorOption;
  [analogStickFillOpacityKey]: string;
  [analogStickBorderColorKey]: keyof UrlColorOption;
}

export function checkUrlColor(value: keyof UrlColorOption): boolean {
  const good = Object.keys(UrlColorOption).includes(value as string);
  return good;
}

function getColorFromKey(k: keyof UrlColorOption) {
  const lookup = (UrlColorOption as any)[k];
  const value = (ColorOption as any)[lookup];
  return value;
}

export function checkAnalogStickSize(value: AnalogStickSize | string): boolean {
  const _value = (typeof value === 'string') ? parseInt(value) : value;
  return Object.values(AnalogStickSize).includes(_value as AnalogStickSize);
}

export function checkAnalogStickFillOpacity(value: string): boolean {
  const number = parseFloat(value);
  if(!number) return false;
  return number > 0 && number <= 1;
}

export function getOptionsFromUrl(): AppOptions {
  // eslint-disable-next-line no-restricted-globals
  const search = location.search.substring(1);

  if(!search) {
    return {
      wheelImgUrl: undefined,
      wheelColor: ColorOption.None,
      analogStickSize: AnalogStickSize.None,
      analogStickFillColor: ColorOption.None,
      analogStickFillOpacity: 1,
      analogStickBorderColor: ColorOption.None,
    }
  }

  const options: UrlOptions = JSON.parse(
    `{"${search.replace(/&/g, '","').replace(/=/g,'":"')}"}`,
    function(key, value) { return key===""?value:decodeURIComponent(value) }
  );

  return {
    wheelImgUrl: (options[wheelImgUrlKey])?.toString(),
    wheelColor: (checkUrlColor(options[wheelColorKey])) ? getColorFromKey(options[wheelColorKey]) : ColorOption.None,
    analogStickSize: (checkAnalogStickSize(options[analogStickSizeKey])) ? options[analogStickSizeKey] : AnalogStickSize.None,
    analogStickFillColor: (checkUrlColor(options[analogStickFillColorKey])) ? getColorFromKey(options[analogStickFillColorKey]) : ColorOption.None,
    analogStickFillOpacity: (checkAnalogStickFillOpacity(options[analogStickFillOpacityKey])) ? parseFloat(options[analogStickFillOpacityKey]) : 1,
    analogStickBorderColor: (checkUrlColor(options[analogStickBorderColorKey])) ? getColorFromKey(options[analogStickBorderColorKey]) : ColorOption.None,
  };
}

