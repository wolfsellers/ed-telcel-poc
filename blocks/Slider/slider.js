/* eslint-disable import/no-unresolved */
import { h } from '@dropins/tools/preact.js';
import { useEffect, useMemo, useRef, useState } from '@dropins/tools/preact-hooks.js';
import htm from 'htm';
import { loadEmblaScriptEmblaCarousel } from '../../scripts/utils/helpers.js';
import useWindowSize from '../../scripts/hooks/useWindowsSize.js';
import { ChevronLeftIcon, ChevronRigthIcon } from '../icons/icons.js';

const html = htm.bind(h);

const Slider = (props) => {
  const {
    items,
    showArrows: showArrowsInitialValue,
    showDots: showDotsInitialValue,
    breakpoints = {},
  } = props;
  const emblaRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const dotsWrapperRef = useRef(null);
  const [emblaInstanceRef, setEmblaInstanceRef] = useState(null);
  const [currentSlidesToScroll, setSlidesToScroll] = useState(1);
  const [showDots, setshowDots] = useState(showDotsInitialValue);
  const [showArrows, setshowArrows] = useState(showArrowsInitialValue);
  const { size } = useWindowSize();

  const options = useMemo(() => {
    const configurableOptions = {
      slidesToScroll: 1,
      loop: true,
      breakpoints,
      startIndex: 0,
      align: 'start',
      containScroll: 'trimSnaps',
    };
    if (!breakpoints) {
      configurableOptions.breakpoints = undefined;
    } else {
      configurableOptions.breakpoints = breakpoints;
    }
    return configurableOptions;
  }, [emblaRef]);

  const getBreakPointSize = (breakpoint) => {
    const match = breakpoint.match(/\(min-width:\s*(\d+)px\)/);
    const pixels = parseInt(match[1], 10);
    return pixels;
  };

  useEffect(() => {
    const slideElements = emblaRef.current?.querySelectorAll('.embla__slide');
    if (!slideElements) return;
    const { width } = size;
    const breakpointsOptions = Object.entries(options.breakpoints || {});
    let selected = null;
    let maxMatched = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const [breakpoint, data] of breakpointsOptions) {
      const bpSize = getBreakPointSize(breakpoint);
      if (width > bpSize && bpSize > maxMatched) {
        selected = data;
        maxMatched = bpSize;
      }
    }
    if (selected) {
      const flexBasis = (100 / selected.slidesToScroll).toFixed(2);
      slideElements.forEach((slide) => {
        slide.style.flex = `0 0 ${flexBasis}%`;
      });
      setshowDots(selected?.dots);
      setSlidesToScroll(selected.slidesToScroll);
      setshowArrows(selected?.arrows);
    } else {
      slideElements.forEach((slide) => {
        slide.style.flex = '0 0 100%';
      });
      setshowDots(showDotsInitialValue);
      setshowArrows(showArrowsInitialValue);
      setSlidesToScroll(1);
    }
  }, [emblaRef.current, size, options]);

  useEffect(() => {
    if (emblaInstanceRef) {
      const slidesCount = emblaInstanceRef.scrollSnapList().length;
      if (dotsWrapperRef.current) {
        dotsWrapperRef.current.innerHTML = '';
        const newArray = Array.from({ length: slidesCount });
        newArray.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'dot';
          dot.dataset.index = i;
          dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
          dot.addEventListener('click', () => emblaInstanceRef.scrollTo(i));
          dotsWrapperRef.current.appendChild(dot);
        });
      }

      emblaInstanceRef.on('select', () => {
        const selectedIndex = emblaInstanceRef.selectedScrollSnap();
        if (dotsWrapperRef.current) {
          const dots = dotsWrapperRef.current.querySelectorAll('.dot');
          dots.forEach((dot, i) => {
            dot.classList.toggle('is-selected', i === selectedIndex);
          });
        }
      });
      emblaInstanceRef.emit('select');
    }
  }, [emblaInstanceRef, currentSlidesToScroll]);

  useEffect(() => {
    loadEmblaScriptEmblaCarousel().then((EmblaCarousel) => {
      if (!emblaRef.current) return;
      const embla = EmblaCarousel(emblaRef.current, options);
      setEmblaInstanceRef(embla);
      if (prevBtnRef.current) {
        prevBtnRef.current.addEventListener('click', () => embla.scrollPrev());
      }
      if (nextBtnRef.current) {
        nextBtnRef.current.addEventListener('click', () => embla.scrollNext());
      }
    });
  }, [emblaRef, options]);

  return html`
    <div class="embla">
    <div class="embla__viewport" ref=${emblaRef}>
        <div class="embla__container">
        ${items.map((item) => html`<div class="embla__slide">${item}</div>`)}
        </div>
    </div>
    <button
      ref=${prevBtnRef}
      class=${`embla__button embla__button--prev ${showArrows ? '' : 'hide_items_slider'}`}
      aria-label="Ir al slide anterior"
    >
      ${html`<${ChevronLeftIcon} class='pruebaIcon' />`}
    </button>
    <button 
      ref=${nextBtnRef} 
      class=${`embla__button embla__button--next ${showArrows ? '' : 'hide_items_slider'}`}
      aria-label="Ir al siguiente slide"
    >
      ${html`<${ChevronRigthIcon} class='pruebaIcon' />`}
    </button>
    <div ref=${dotsWrapperRef} class=${`embla__dots ${showDots ? '' : 'hide_items_slider'}`}></div>
    </div>
    `;
};

export default Slider;
