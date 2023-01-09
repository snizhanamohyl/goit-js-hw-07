import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const galleryListElem = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

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
  const modal = basicLightbox.create(
    `
        <img src="${url}" width="800" height="600">
    `,
    {
      onShow: modal => {
        document.addEventListener('keydown', onKeyPress);
      },
      onClose: modal => {
        document.removeEventListener('keydown', onKeyPress);
      },
    }
  );

  function onKeyPress(event) {
    onEscKeyPress(event, modal);
  }

  return modal;
}

function showModal(modal) {
  modal.show();
}

function onEscKeyPress(event, modal) {
  const ESC_KEY_CODE = 'Escape';

  if (event.code === ESC_KEY_CODE) {
    modal.close();
  }
}

function createGalleryMarkup(galleryItems) {
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
