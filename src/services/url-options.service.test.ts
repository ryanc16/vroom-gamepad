import { getOptionsFromUrl } from './url-options.service';

describe('url-options service', () => {

    const helpers = {
        setUrl(url: string): void {
            delete (global.window as any)['location'];
            (global.window as any).location = new URL(url);
        }
    }

    it('can parse customization url parameters', () => {
        helpers.setUrl('http://localhost:3000?ss=40&sf=red&so=0.3&sb=green&wc=gray&img=http://imgur.com/i/vtui78dy3.png');
        const options = getOptionsFromUrl();
        expect(options.analogStickSize).toEqual(40);
        expect(options.analogStickFillColor).toEqual('red');
        expect(options.analogStickFillOpacity).toEqual(0.3);
        expect(options.analogStickBorderColor).toEqual('green');
        expect(options.wheelColor).toEqual('gray');
        expect(options.wheelImgUrl).toEqual('http://imgur.com/i/vtui78dy3.png');
    });

    it('can parse custom color url parameter', () => {
        helpers.setUrl('http://localhost:3000?sf=#caca00');
        const options = getOptionsFromUrl();
        expect(options.analogStickFillColor).toEqual('#caca00');
    });

    it('can parse a url encoded wheel image url', () => {
        const customImageUrl = 'http://imgur.com/i/vtui78dy3.png';
        const encodedUrl = window.encodeURIComponent(customImageUrl);
        helpers.setUrl('http://localhost:3000?img=' + encodedUrl);
        const options = getOptionsFromUrl();
        expect(encodedUrl).not.toEqual(customImageUrl);
        expect(options.wheelImgUrl).toEqual(customImageUrl);
    });
});