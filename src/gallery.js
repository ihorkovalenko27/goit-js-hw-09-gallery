import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

const ligtboxContainer = document.querySelector('.lightbox');

const lightBoxImg = document.querySelector('.lightbox__image');

const closeBtn = document.querySelector('button[data-action="close-lightbox"]');

const overlay = document.querySelector('.lightbox__overlay');

const galleryMarkUp = createGalleryCards(galleryItems);

let currentIndex = 0;

galleryContainer.innerHTML = galleryMarkUp;

galleryContainer.addEventListener('click', openModal);

function createGalleryCards(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
    class="gallery__link"
    href="${preview}"
    >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </li> `;
    })
    .join('');
}

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  if (event.target) {
    addClass('is-open');
    lightBoxImgContent(event.target.dataset.source, event.target.alt);
    addEventListenerOnModal();
  }
}

function closeModal(event) {
  if (event.target) {
    removeClass('is-open');
    lightBoxImgContent('', '');
    removeEventListenerFromModal();
  }
}

function lightBoxImgContent(src, alt) {
  lightBoxImg.src = src;
  lightBoxImg.alt = alt;
}

function addClass(element) {
  ligtboxContainer.classList.add(element);
}

function removeClass(element) {
  ligtboxContainer.classList.remove(element);
}

function addEventListenerOnModal() {
  window.addEventListener('keydown', el => {
    if (el.code === 'Escape') {
      closeModal(el);
    }
  });
  window.addEventListener('keydown', keyHendler);

  overlay.addEventListener('click', closeModal);

  closeBtn.addEventListener('click', closeModal);
}

function removeEventListenerFromModal() {
  window.removeEventListener('keydown', el => {
    if (el.code === 'Escape') {
      closeModal(el);
    }
  });

  window.removeEventListener('keydown', keyHendler);

  overlay.removeEventListener('click', closeModal);

  closeBtn.removeEventListener('click', closeModal);
}

function keyHendler(event) {
  const value = event.code;
  switch (value) {
    case 'ArrowRight':
      onArrowRight();
      break;
    case 'ArrowLeft':
      onArrowLeft();
      break;
  }
}

function onArrowRight() {
  if (currentIndex + 1 > galleryItems.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  lightBoxImgContent(galleryItems[currentIndex].original, galleryItems[currentIndex].description);
}

function onArrowLeft() {
  if (currentIndex - 1 < 0) {
    currentIndex = galleryItems.length - 1;
  } else {
    currentIndex -= 1;
  }
  lightBoxImgContent(galleryItems[currentIndex].original, galleryItems[currentIndex].description);
}
