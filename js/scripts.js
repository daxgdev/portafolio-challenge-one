import { $ } from './utils.js'

// Añadir un borde inferior al header cuando el scroll vertical es superior a 0
const $header = $('header')
document.addEventListener('scroll', () => {
  if (scrollY > 0) {
    if (!$header.classList.contains('header-border'))
      $header.classList.add('header-border')
  } else {
    $header.classList.remove('header-border')
  }
})

document.addEventListener('click', (e) => {
  const el = e.target

  // Interacción del menú dropdown del header mobile
  if (el.matches('.dropdown-button') || el.matches('header nav > a')) {
    const $nav = $('header nav')
    $nav.classList.toggle('active')
    const $dropdownButton = $('.dropdown-button')
    $dropdownButton.classList.toggle('active')
  }
})
