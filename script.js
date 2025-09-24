// Объект с путями к изображениям для разных дизайнов
const rugDesigns = {
  blue_abstract: "blue-abstract.jpg",
};

// Функция для получения параметра из URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// --- Модальное окно для изображений (старая логика) ---
const imageModal = document.getElementById("myModal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.getElementsByClassName("close")[0];
const prevBtn = document.getElementsByClassName("prev")[0];
const nextBtn = document.getElementsByClassName("next")[0];
const captionText = document.getElementById("caption");
const images = document.querySelectorAll('.step-image img');
let currentImageIndex = 0;

// Функция для открытия модального окна с изображением
function openImageModal(index) {
    imageModal.style.display = "block";
    modalImg.src = images[index].src;
    
    const parent = images[index].closest('.step-item');
    const description = parent.querySelector('.step-description').textContent;
    captionText.textContent = description;

    currentImageIndex = index;
}

// Функции навигации для изображений
function showPrevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    openImageModal(currentImageIndex);
}

function showNextImage() {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    openImageModal(currentImageIndex);
}

// Обработчики для изображений
images.forEach((img, index) => {
    img.onclick = function() {
        openImageModal(index);
    };
});

closeBtn.onclick = function() {
    imageModal.style.display = "none";
}

prevBtn.onclick = showPrevImage;
nextBtn.onclick = showNextImage;

imageModal.onclick = function(event) {
    if (event.target === imageModal) {
        imageModal.style.display = "none";
    }
}

// --- Модальное окно для видео (новая логика) ---
const videoModal = document.getElementById("videoModal");
const videoCloseBtn = document.getElementById("video-close-btn");
const videos = document.querySelectorAll('.step-video');

videos.forEach(videoDiv => {
    videoDiv.onclick = function() {
        const videoSrc = this.getAttribute('data-source-id');
        document.getElementById('video-player').innerHTML = `<iframe src="${videoSrc}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoModal.style.display = "block";
    };
});

videoModal.onclick = function(event) {
    if (event.target === videoModal) {
        videoModal.style.display = "none";
        document.getElementById('video-player').innerHTML = ''; // Останавливаем видео
    }
}

// Инициализация - загрузка финального изображения
document.addEventListener("DOMContentLoaded", () => {
  const rugDesignName = getUrlParameter("design");
  const finalRugImage = document.getElementById("final-rug-image");

  if (rugDesigns[rugDesignName]) {
    finalRugImage.src =
      window.location.origin +
      "/assets/rug-designs/" +
      rugDesigns[rugDesignName];
  } else {
    // Если параметр не найден, показываем изображение по умолчанию
    finalRugImage.src =
      "https://via.placeholder.com/600x400/a4c3b2?text=Choose+your+design";
  }
});
