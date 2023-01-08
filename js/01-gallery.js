import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const galleryListElem = document.querySelector('.gallery');
const galleryMarkup = createGalleryItemMarkup(galleryItems);

galleryListElem.innerHTML = galleryMarkup;

galleryListElem.addEventListener('click', event => {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const modal = createModal(event.target.dataset.source);

  showModal(modal);
});

function createModal(url) {
  return basicLightbox.create(`
        <img src="${url}" width="800" height="600">
    `);
}

function showModal(modal) {
  modal.show();
  window.addEventListener('keydown', onEscKeyPress);

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
      modal.close();
      window.removeEventListener('keydown', onEscKeyPress);
    }
  }
}

function createGalleryItemMarkup(galleryItems) {
  const galleryMarkup = galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');

  return galleryMarkup;
}
