document.addEventListener("DOMContentLoaded", function () {
    const bannerSection = document.querySelector(".main-banner");
    if (!bannerSection) return;

    // Спортивні картинки високої якості
    const sportsImages = [
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000", // Футбол
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000", // Баскетбол
        "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=1000", // Теніс
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1000"  // Бокс
    ];

    // Функція завантаження свіжих світових новин спорту українською мовою
    async function loadFreshSports() {
        try {
            // Використовуємо стабільне та швидке API новин (категорія: спорт, мова: українська)
            const response = await fetch("https://gnews.io/api/v4/top-headlines?category=sports&lang=uk&country=ua&max=4&apikey=86db8cd06da8b9cb96f7df10cb5fc7b1");
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                bannerSection.innerHTML = ""; // Очищаємо банер

                data.articles.forEach((news, index) => {
                    const slideDiv = document.createElement("div");
                    slideDiv.classList.add("slide");
                    if (index === 0) slideDiv.classList.add("active");

                    // Якщо API не дало картинку, беремо з нашого крутого списку
                    const finalImg = news.image || sportsImages[index % sportsImages.length];

                    slideDiv.innerHTML = `
                        <div class="banner-overlay">
                            <h2><a href="${news.url}" target="_blank" style="color: #2F4F4F; text-decoration: none;">${news.title}</a></h2>
                        </div>
                        <img src="${finalImg}" alt="Sport">
                    `;
                    bannerSection.appendChild(slideDiv);
                });

                initSlider();
            } else {
                useFallback();
            }
        } catch (error) {
            console.log("Помилка API, вмикаємо красивий автономний режим...");
            useFallback();
        }
    }

    // Запасні робочі новини, якщо ліміт безкоштовного API вичерпано
    function useFallback() {
        const localNews = [
            { title: "Олександр Усик здолав технічним нокаутом в 11-му раунді нідерландця Ріко Верховена.", img: "https://i.pinimg.com/736x/bb/5b/63/bb5b63d2e0879379014c71ae054d9bbd.jpg" },
            { title: "Андреа Мальдера став першим іноземним головним тренером в історії збірної України.", img: "https://static.kyivpost.com/storage/2026/05/04/f5ae50b13e5b910d50cf975f49e6145a.jpg?w=2560&f=webp" },
            { title: "Жозе Моурінью офіційно повертається на посаду головного тренера мадридського «Реала».", img: "https://zamin.uz/uploads/posts/2025-03/f28eacad60_real-madrid-cf-dark-background-3840x2160-21926.webp" },
            { title: "Українські тенісистки оновлюють рекорди у світовому рейтингу WTA", img: sportsImages[2] },
            { title: "ФІФА підтвердила виступи Мадонни, Шакіри та BTS у фінальному шоу ЧС-2026.", img: "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w1460/f_auto/primary/prmfaexrv9so1tugrdou" },
            { title: "Кріштіану Роналжу оформив дубль проти «Дамака» та вперше виграв із «Аль-Насром» чемпіонат Саудівської Аравії.", img: "https://ichef.bbci.co.uk/ace/standard/787/cpsprodpb/61f9/live/e3510710-5557-11f1-b427-e5f9d829c03e.jpg" },
            { title: "Команди Формули-1 привезли масштабні оновлення болідів на перший європейський Гран-прі сезону.", img: "https://img.championat.com/news/big/c/x/formula-1-chto-eto-za-sport_17582327151452255140.jpg" }
        ];

        bannerSection.innerHTML = "";
        localNews.forEach((news, index) => {
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("slide");
            if (index === 0) slideDiv.classList.add("active");
            slideDiv.innerHTML = `
                <div class="banner-overlay"><h2>${news.title}</h2></div>
                <img src="${news.img}" alt="Sport">
            `;
            bannerSection.appendChild(slideDiv);
        });
        initSlider();
    }

    function initSlider() {
        let currentSlide = 0;
        const slides = bannerSection.querySelectorAll(".slide");
        if (slides.length <= 1) return;

        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 4000);
    }

    loadFreshSports();
});