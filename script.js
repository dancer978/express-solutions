document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded and ready.');
    
    // Маппинг коротких ссылок на ID табов
    const shortLinks = {
        'risk': 'risk-audit',
        'ai': 'ai-workshop',
        'visa': 'visa-assessment',
        'enemy': 'competitor-analysis'
    };
    
    // Обратный маппинг для обновления URL
    const tabToShortLink = {
        'risk-audit': 'risk',
        'ai-workshop': 'ai',
        'visa-assessment': 'visa',
        'competitor-analysis': 'enemy'
    };
    
    // Метаданные для каждого продукта
    const productMeta = {
        'risk-audit': {
            title: 'Кадровые риски | Тактические решения',
            description: 'Узнайте, где ваш бизнес может потерять деньги на штрафах. Карта рисков с суммами потенциальных штрафов за 5-7 дней. Цена: 99 900 руб.',
            url: 'https://express.luktrud.ru/#risk'
        },
        'ai-workshop': {
            title: 'HR-эффективность | Тактические решения',
            description: 'Сократите издержки на HR-рутину на 30-40%. Проведем аудит ваших процессов и покажем, как автоматизировать задачи с помощью ИИ. План оптимизации за 3-5 дней. Цена: 59 900 руб.',
            url: 'https://express.luktrud.ru/#ai'
        },
        'visa-assessment': {
            title: 'Найм иностранцев | Тактические решения',
            description: 'Получите точный бюджет и карту рисков для найма иностранных работников за 5-7 дней. Аналитический отчет с расчетом полной стоимости (TCO). Цена: 79 900 руб.',
            url: 'https://express.luktrud.ru/#visa'
        },
        'competitor-analysis': {
            title: 'Конкурентный анализ | Тактические решения',
            description: 'Узнайте, как ваш главный конкурент нанимает лучших, и получите план, как его обойти. Детальный разбор HR-стратегии за 7-10 дней. Цена: 119 900 руб.',
            url: 'https://express.luktrud.ru/#enemy'
        }
    };
    
    // Функция для обновления метатегов
    function updateMetaTags(tabId) {
        const meta = productMeta[tabId];
        if (!meta) return;
        
        // Обновляем title
        document.title = meta.title;
        
        // Обновляем meta description
        document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
        document.querySelector('meta[name="title"]').setAttribute('content', meta.title);
        
        // Обновляем Open Graph
        document.querySelector('meta[property="og:title"]').setAttribute('content', meta.title);
        document.querySelector('meta[property="og:description"]').setAttribute('content', meta.description);
        document.querySelector('meta[property="og:url"]').setAttribute('content', meta.url);
        
        // Обновляем Twitter
        document.querySelector('meta[property="twitter:title"]').setAttribute('content', meta.title);
        document.querySelector('meta[property="twitter:description"]').setAttribute('content', meta.description);
        document.querySelector('meta[property="twitter:url"]').setAttribute('content', meta.url);
    }
    
    // Функция для активации таба по hash из URL
    function activateTabFromHash() {
        const hash = window.location.hash.substring(1); // убираем символ #
        
        if (hash) {
            // Проверяем, есть ли это короткая ссылка
            const fullTabId = shortLinks[hash] || hash;
            const tabTrigger = document.querySelector(`button[data-bs-target="#${fullTabId}"]`);
            
            if (tabTrigger) {
                const tab = new bootstrap.Tab(tabTrigger);
                tab.show();
                // Обновляем метатеги для этого продукта
                updateMetaTags(fullTabId);
                // Прокручиваем страницу вверх
                window.scrollTo(0, 0);
            }
        }
    }
    
    // Активируем таб при загрузке страницы, если есть hash
    activateTabFromHash();
    
    // Обновляем URL и метатеги при переключении табов
    const tabButtons = document.querySelectorAll('button[data-bs-toggle="pill"]');
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function(event) {
            const target = event.target.getAttribute('data-bs-target');
            const tabId = target.substring(1); // убираем символ #
            const shortLink = tabToShortLink[tabId] || tabId;
            
            // Обновляем метатеги
            updateMetaTags(tabId);
            
            // Обновляем hash только если он изменился
            if (window.location.hash !== `#${shortLink}`) {
                window.history.replaceState(null, '', `#${shortLink}`);
            }
        });
    });
    
    // Слушаем изменение hash в URL (когда пользователь использует кнопки браузера назад/вперед)
    window.addEventListener('hashchange', activateTabFromHash);
    
    // При загрузке с параметром ?product=, перенаправляем на hash
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    if (productParam && shortLinks[productParam]) {
        // Убираем параметр из URL и добавляем hash
        window.history.replaceState(null, '', `/#${productParam}`);
        activateTabFromHash();
    }
});
