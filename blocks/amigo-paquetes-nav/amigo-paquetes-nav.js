export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('nav-option-container');
    row.children[0].classList.add('nav-option-wrapper');
    row.querySelectorAll(':scope > div > p:last-child > a')[0].classList.remove('button');
  });
}
