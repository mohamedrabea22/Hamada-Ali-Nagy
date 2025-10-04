function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("show");
}

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", function (e) {
  const menu = document.getElementById("sideMenu");
  const toggleBtn = document.querySelector(".menu-toggle");

  if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
    menu.classList.remove("show");
  }
});
const slider = document.getElementById('slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // تحريك يدوي بالأزرار
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -270, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 270, behavior: 'smooth' });
    });

    // تشغيل أوتوماتيك
    let autoSlide = setInterval(() => {
      slider.scrollBy({ left: 270, behavior: 'smooth' });

      // لو وصل للنهاية يرجع للبداية
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 3000); // كل 3 ثواني

    // إيقاف التشغيل التلقائي عند المرور بالماوس
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        slider.scrollBy({ left: 270, behavior: 'smooth' });
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 3000);
    });




    let galleryTrack = document.getElementById("galleryTrack");
    let galleryItems = document.querySelectorAll(".gallery-item");
    let currentIndex = 0;

    function displaySlide(pos) {
      if (pos >= galleryItems.length) currentIndex = 0;
      else if (pos < 0) currentIndex = galleryItems.length - 1;
      else currentIndex = pos;

      galleryTrack.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    function moveNext() {
      displaySlide(currentIndex + 1);
    }

    function movePrev() {
      displaySlide(currentIndex - 1);
    }

    // تغيير تلقائي كل 5 ثواني
    setInterval(() => moveNext(), 5000);







