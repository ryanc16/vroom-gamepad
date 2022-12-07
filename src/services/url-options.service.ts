
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

export enum AnalogStickSize {
  None = 0,
  Small = 40,
  Large = 70,
}

export interface AppOptions {
  wheelImgUrl?: string;
  wheelColor: string | ColorOption;
  analogStickSize: number | AnalogStickSize;
  analogStickFillColor: string | ColorOption;
  analogStickFillOpacity: number;
  analogStickBorderColor: string | ColorOption;
}

export enum UrlOptions {
  wheelImgUrlKey = 'img',
  wheelColorKey = 'wc',
  analogStickSizeKey = 'ss',
  analogStickFillColorKey = 'sf',
  analogStickFillOpacityKey = 'so',
  analogStickBorderColorKey = 'sb',
}

export function checkAnalogStickSize(value: AnalogStickSize | string): boolean {
  const _value = (typeof value === 'string') ? parseInt(value) : value;
  return value !== '' && _value in AnalogStickSize;
}

export function checkAnalogStickFillOpacity(value: string): boolean {
  const number = parseFloat(value);
  if (!number) return false;
  return value !== '' && number > 0 && number <= 1;
}

export function getOptionsFromUrl(): Partial<AppOptions> {
  const search = window.location.search.substring(1);
  if (search == null || search === '') {
    return {};
  }

  const options = new window.URLSearchParams(window.location.href.slice(window.location.href.indexOf('?')));

  const result = {} as Partial<AppOptions>;
  if (options.has(UrlOptions.wheelImgUrlKey) && options.get(UrlOptions.wheelImgUrlKey)!.toString() !== '') {
    result['wheelImgUrl'] = options.get(UrlOptions.wheelImgUrlKey)!.toString();
  }
  if (options.has(UrlOptions.wheelColorKey) && options.get(UrlOptions.wheelColorKey)!.toString() !== '') {
    result['wheelColor'] = options.get(UrlOptions.wheelColorKey)!.toString();
  }
  if (options.has(UrlOptions.analogStickSizeKey) && checkAnalogStickSize(options.get(UrlOptions.analogStickSizeKey)!)) {
    result['analogStickSize'] = parseInt(options.get(UrlOptions.analogStickSizeKey)!);
  }
  if (options.has(UrlOptions.analogStickFillColorKey) && options.get(UrlOptions.analogStickFillColorKey)!.toString() !== '') {
    result['analogStickFillColor'] = options.get(UrlOptions.analogStickFillColorKey)!.toString();
  }
  if (options.has(UrlOptions.analogStickFillOpacityKey) && checkAnalogStickFillOpacity(options.get(UrlOptions.analogStickFillOpacityKey)!)) {
    result['analogStickFillOpacity'] = parseFloat(options.get(UrlOptions.analogStickFillOpacityKey)!);
  }
  if (options.has(UrlOptions.analogStickBorderColorKey) && options.get(UrlOptions.analogStickBorderColorKey)!.toString() !== '') {
    result['analogStickBorderColor'] = options.get(UrlOptions.analogStickBorderColorKey)!.toString();
  }

  return result;
}

