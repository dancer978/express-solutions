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
                // Прокручиваем страницу вверх
                window.scrollTo(0, 0);
            }
        }
    }
    
    // Активируем таб при загрузке страницы, если есть hash
    activateTabFromHash();
    
    // Обновляем URL при переключении табов
    const tabButtons = document.querySelectorAll('button[data-bs-toggle="pill"]');
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function(event) {
            const target = event.target.getAttribute('data-bs-target');
            const tabId = target.substring(1); // убираем символ #
            const shortLink = tabToShortLink[tabId] || tabId;
            
            // Обновляем hash только если он изменился
            if (window.location.hash !== `#${shortLink}`) {
                window.history.replaceState(null, '', `#${shortLink}`);
            }
        });
    });
    
    // Слушаем изменение hash в URL (когда пользователь использует кнопки браузера назад/вперед)
    window.addEventListener('hashchange', activateTabFromHash);
});
