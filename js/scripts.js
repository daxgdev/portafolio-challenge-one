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

// Manejo del formulario de contacto
const $form = $('.contact-form')
const $formButton = $('.contact-form > .send-form')
let messageContent = []

const formResult = (result) => {
  if (result === true) {
    $formButton.textContent = 'Enviado'
    $formButton.classList.add('success')
    $form.reset()

    setTimeout(() => {
      $formButton.removeAttribute('disabled')
      $formButton.textContent = 'Enviar mensaje'
      $formButton.classList.remove('success')
    }, 2500)
  } else {
    $formButton.textContent = 'Ocurrió un error'
    $formButton.classList.add('error')

    setTimeout(() => {
      $formButton.removeAttribute('disabled')
      $formButton.textContent = 'Enviar mensaje'
      $formButton.classList.remove('error')
    }, 2500)
  }
}

const validate = (type) => {
  const $input = document.querySelector(`#${type}`)
  const $error = $input.nextElementSibling
  let value = $input.value
  value = value.trim()

  // Validaciones de los campos
  if (!value) {
    $error.innerHTML = `<img src="assets/icons/xmark-solid.svg" alt="Ícono de X" /> Debes ingresar un ${type}`
    if (!$error.classList.contains('active')) $error.classList.add('active')
    if (!$input.classList.contains('error')) $input.classList.add('error')
  } else {
    if ($error.classList.contains('active')) $error.classList.remove('active')
    if ($input.classList.contains('error')) $input.classList.remove('error')
    messageContent.push([type, value])
  }
}

$form.onsubmit = async (e) => {
  e.preventDefault()
  messageContent = []

  validate('nombre')
  validate('correo')
  validate('asunto')
  validate('mensaje')

  if (messageContent.length === 4) {
    $formButton.setAttribute('disabled', '')
    $formButton.textContent = 'Enviando...'
    messageContent = Object.fromEntries(messageContent)

    fetch('https://formspree.io/f/xvgoojwj', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify(messageContent)
    })
      .then((response) => {
        if (response.ok) {
          formResult(true)
        } else {
          formResult(false)
        }
      })
      .catch(() => {
        formResult(false)
      })
  }
}
