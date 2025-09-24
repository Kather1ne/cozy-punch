// Инициализация - загрузка финального изображения
document.addEventListener("DOMContentLoaded", () => {
  const rugDesignName = getUrlParameter("design");
  const finalRugImage = document.getElementById("final-rug-image");
  const finalImageStep = document.querySelector(".final-image img");

  if (rugDesigns[rugDesignName]) {
    finalRugImage.src =
      window.location.origin +
      "/assets/rug-designs/" +
      rugDesigns[rugDesignName];
    finalImageStep.src = finalRugImage.src; // Обновляем data-src для шага  
  } else {
    // Если параметр не найден, показываем изображение по умолчанию
    finalRugImage.src =
      "https://via.placeholder.com/600x400/a4c3b2?text=Choose+your+design";
  }
});

// Объект с путями к изображениям для разных дизайнов
const rugDesigns = {
  blue_abstract: "blue-abstract.jpg",
};

// Функция для получения параметра из URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// --- Универсальное модальное окно ---
const universalModal = document.getElementById("universalModal");
const modalImg = document.getElementById("modal-image");
const closeBtn = universalModal.querySelector(".close");
const prevBtn = universalModal.querySelector(".prev");
const nextBtn = universalModal.querySelector(".next");
const captionText = document.getElementById("caption");
const modalImageWrapper = universalModal.querySelector(".modal-image-wrapper");
const modalVideoWrapper = universalModal.querySelector(".modal-video-wrapper");
const videoPlayer = document.getElementById("video-player");

// Собираем все элементы, которые могут быть показаны в модальном окне
const contentItems = document.querySelectorAll(".step-image, .step-video");
let currentContentIndex = 0;

// Функция для закрытия модального окна
function closeModal() {
  universalModal.style.display = "none";
  videoPlayer.innerHTML = ""; // Останавливаем видео
}

// Функция для открытия модального окна
function openModal(index) {
  universalModal.style.display = "block";
  const item = contentItems[index];
  currentContentIndex = index;

  // Скрываем все контейнеры
  modalImageWrapper.style.display = "none";
  modalVideoWrapper.style.display = "none";
  captionText.textContent = "";

  // Определяем тип контента
  const isImage = item.classList.contains("step-image");
  const isVideo = item.classList.contains("step-video");

  // Показываем нужный контент
  if (isImage) {
    modalImageWrapper.style.display = "block";
    modalImg.src = item.querySelector("img").src;
    captionText.textContent =
      item.parentElement.querySelector(".step-description").textContent;
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  } else if (isVideo) {
    modalVideoWrapper.style.display = "block";
    const videoSrc = item.dataset.videosrc;
    videoPlayer.innerHTML = `
            <video controls autoplay muted>
                <source src="${videoSrc}" type="video/mp4">
                Ваш браузер не поддерживает HTML5 видео.
            </video>
        `;
    captionText.textContent =
      item.parentElement.querySelector(".step-description").textContent;
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
}

// Обработчики кликов
contentItems.forEach((item, index) => {
  item.onclick = () => openModal(index);
});

closeBtn.onclick = closeModal;

// Навигация по всей галерее (изображения + видео)
prevBtn.onclick = () => {
  currentContentIndex =
    (currentContentIndex - 1 + contentItems.length) % contentItems.length;
  openModal(currentContentIndex);
};

nextBtn.onclick = () => {
  currentContentIndex = (currentContentIndex + 1) % contentItems.length;
  openModal(currentContentIndex);
};

// Закрытие по клику вне модального окна
universalModal.onclick = (event) => {
  if (event.target === universalModal) {
    closeModal();
  }
};
