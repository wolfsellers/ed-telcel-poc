/* eslint-disable indent */
import htm from 'htm';
import { render, h } from '@dropins/tools/preact.js';
import Slider from '../Slider/slider.js';

const html = htm.bind(h);

const structure = '<div class="contentSliderBannerHome"></div>';

export default async function decorate(block) {
    try {
        const sliderBannerHomeWrapper = document.querySelector('.slider-paquetes-amigo-wrapper');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = structure;
        const contentSliderBannerHome = wrapper.querySelector('.contentSliderBannerHome');
        const sliderItems = [];
        const sliderBannersHome = block.querySelectorAll('div.slider-paquetes-amigo.block > div');
        Array.from(sliderBannersHome).forEach((element) => {
            const picture = element.querySelector('picture');
            const source = picture?.querySelector('source');
            const img = picture?.querySelector('img');
            const link = element.querySelector('a');
            const linkHref = link?.getAttribute('href');
            const linkText = link?.innerHTML;
            if (picture || link) {
                sliderItems.push(html`
                    <div class="item-blog-slider-row">
                      <div class="item-blog-slider-row-picture">
                        <picture class="picture-slider-baner-blog">
                            ${source && html`<source srcset=${source.getAttribute('srcset')} type=${source.getAttribute('type')} />`}
                            ${img && html`<img src=${img.getAttribute('src')} alt=${img.getAttribute('alt')} />`}
                        </picture>
                      </div>
                      <div class="item-blog-slider-row-link">
                        <a href=${linkHref}>${linkText || ''}</a>
                      </div>
                    </div>
                  `);
            }
        });
        sliderBannerHomeWrapper.replaceChildren(wrapper);
        render(h(Slider, {
            items: sliderItems,
            showArrows: true,
            showDots: false,
            breakpoints: {
              '(min-width: 1024px)': {
                loop: true, active: false, slidesToScroll: 4, dots: false, arrows: true,
              },
              '(min-width: 768px)': {
                loop: true, active: true, slidesToScroll: 3, dots: false, arrows: true,
              },
            },
        }), contentSliderBannerHome);
    } catch (error) {
        console.log('error', error);
    }
}
