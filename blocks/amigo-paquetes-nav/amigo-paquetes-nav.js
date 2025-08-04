export default function decorate(block) {
  const url = window.location.href;
  const menu = document.createElement('nav');
  menu.classList.add('amigo-paquetes-nav');
  [...block.children].forEach((row) => {
    const navOption = document.createElement('div');
    navOption.classList.add('nav-option');
    [...row.children].forEach((option) => {
      const image = option.querySelectorAll(':scope picture')[0];
      row.querySelectorAll(':scope  a')[0].classList.remove('button');
      const link = option.querySelectorAll(':scope  a');
      const { href } = link[0];
      if (url === href) {
        navOption.classList.add('active');
      }
      navOption.append(image, link[0]);
    });
    menu.append(navOption);
  });
  block.textContent = '';
  block.replaceWith(menu);
}
