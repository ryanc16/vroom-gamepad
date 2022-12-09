import { render, RenderResult } from "@testing-library/react";
import { AppOptions } from "../../services/url-options.service";
import OptionsMenu from './options-menu';

describe('OptionsMenu', () => {

    let result: RenderResult;
    const defaultOptions: AppOptions = {
        analogStickBorderColor: 'red',
        analogStickFillColor: '#aabbcc',
        analogStickFillOpacity: 0.7,
        analogStickSize: 40,
        wheelColor: 'blue',
        wheelImgUrl: 'img.png'
    };
    const currentOptions: { [index: string]: any } = { ...defaultOptions };

    beforeEach(() => {
        result = render(<OptionsMenu appOptions={defaultOptions} onOptionChange={jest.fn((key, value) => { currentOptions[key] = value; })} />);
    });

    it('can create', () => {
        expect(result.container.querySelector('.options-menu')).toBeInTheDocument();
    });

    it('can initialize the form control options from props', () => {
        expect((result.container.querySelector('.wheelColor select[name=color-method]') as HTMLSelectElement).value).toEqual('predefined');
        expect((result.container.querySelector('.wheelColor select[name=wheelColor]') as HTMLSelectElement).value).toEqual(defaultOptions.wheelColor);

        expect((result.container.querySelector('.analogStickFillColor select[name=color-method]') as HTMLSelectElement).value).toEqual('custom');
        expect((result.container.querySelector('.analogStickFillColor input[name=analogStickFillColor]') as HTMLInputElement).value).toEqual(defaultOptions.analogStickFillColor);

        expect((result.container.querySelector('.analogStickFillOpacity input[name=analogStickFillOpacity]') as HTMLInputElement).value).toEqual(defaultOptions.analogStickFillOpacity.toString());

        expect((result.container.querySelector('.analogStickSize select[name=analogStickSize]') as HTMLSelectElement).value).toEqual(defaultOptions.analogStickSize.toString());

        expect((result.container.querySelector('.analogStickBorderColor select[name=color-method]') as HTMLSelectElement).value).toEqual('predefined');
        expect((result.container.querySelector('.analogStickBorderColor select[name=analogStickBorderColor]') as HTMLSelectElement).value).toEqual(defaultOptions.analogStickBorderColor);
    });
});