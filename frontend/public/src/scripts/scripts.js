// Common JavaScript functions
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
      // Agregar console.log para depuración
      console.log('Menu toggle and nav elements found');
      
      // Verificar si hay estilos que podrían estar ocultando el menú
      const navStyles = window.getComputedStyle(nav);
      console.log('Nav visibility:', navStyles.visibility);
      console.log('Nav z-index:', navStyles.zIndex);
      console.log('Nav position:', navStyles.position);
      console.log('Nav right:', navStyles.right);
      
      // Usar función nombrada en lugar de función anónima
      function toggleMenu(e) {
        console.log('Menu toggle clicked');
        // Prevent event propagation
        if (e) e.stopPropagation();
        
        // Toggle the nav menu
        nav.classList.toggle('active');
        
        // Toggle the animation on the hamburger icon
        menuToggle.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.classList.toggle('menu-open');
        
        // Verificar el estado después del toggle
        console.log('Menu is now:', nav.classList.contains('active') ? 'active' : 'inactive');
        
        // Forzar la visualización si está activo
        if (nav.classList.contains('active')) {
          nav.style.visibility = 'visible';
          nav.style.opacity = '1';
          nav.style.right = '0';
        }
      }
      
      // Asignar múltiples eventos para asegurar que funcione
      menuToggle.addEventListener('click', toggleMenu);
      menuToggle.addEventListener('touchend', toggleMenu);
      
      // Close the menu when clicking outside
      document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
      
      // Close menu when clicking a nav link
      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });
      
      // Close menu when pressing escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
      
      // Fix mobile nav position on resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    } else {
      console.error('Menu toggle or nav element not found', { 
        menuToggle: menuToggle, 
        nav: nav 
      });
    }
    
    // Settings Modal functionality
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.querySelector('.close-settings');
    const htmlElement = document.documentElement;
    
    // Open settings modal
    if (settingsToggle && settingsModal) {
      // Add direct event handler to button
      settingsToggle.onclick = function(e) {
        if (e) e.stopPropagation();
        settingsModal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Set active theme button
        setActiveTheme(htmlElement.getAttribute('data-theme') || 'light');
        
        // Set active language button
        setActiveLanguage(localStorage.getItem('language') || 'en');
      };
      
      // Close settings modal when clicking close button
      if (closeSettings) {
        closeSettings.onclick = function() {
          settingsModal.classList.remove('active');
          document.body.classList.remove('modal-open');
        };
      }
      
      // Close settings modal when clicking outside
      settingsModal.onclick = function(e) {
        if (e.target === settingsModal) {
          settingsModal.classList.remove('active');
          document.body.classList.remove('modal-open');
        }
      };
      
      // Prevent close when clicking inside the settings content
      const settingsContent = document.querySelector('.settings-content');
      if (settingsContent) {
        settingsContent.onclick = function(e) {
          if (e) e.stopPropagation();
        };
      }
    }
    
    // Theme functionality
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      htmlElement.setAttribute('data-theme', savedTheme);
      setActiveTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      htmlElement.setAttribute('data-theme', 'dark');
      setActiveTheme('dark');
    }
    
    // Handle theme selection
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        setActiveTheme(theme);
      });
    });
    
    // Set active theme button
    function setActiveTheme(theme) {
      themeOptions.forEach(opt => {
        if (opt.getAttribute('data-theme') === theme) {
          opt.classList.add('active');
        } else {
          opt.classList.remove('active');
        }
      });
    }
    
    // Language functionality
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Language translations
    const translations = {
      en: {
        // Navigation
        home: 'Home',
        about: 'About Me',
        history: 'My History',
        importance: 'Why Include More People?',
        contact: 'Contact',
        
        // Settings
        settings: 'Settings',
        appearance: 'Appearance',
        language: 'Language',
        light: 'Light',
        dark: 'Dark',
        
        // Contact page
        contactTitle: 'Contact',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        yourMessage: 'Your Message',
        send: 'Send',
        connectWithMe: 'Connect With Me',
        email: 'Email',
        socialMedia: 'Social Media',
        
        // About page
        aboutMe: 'About Me',
        aboutText: 'I am 19 years old and currently in my second year of university, studying Systems Engineering. Technology has always been my passion. My love for technology started as far back as I can remember. As a child, I wasnt just fascinated by video games—I wanted to understand how they worked. I would analyze every detail, trying to uncover the magic behind the screens. As I grew older, I also discovered another side of myself: a competitive spirit and a deep passion for sports, especially soccer. At just 15, I had the incredible opportunity to play professionally for Deportivo Mixco in Guatemala. However, at 18, I had to make a difficult decision: to leave my soccer career behind and embrace a new chapter of my life. But this change led me to something even greater. It gave me the opportunity to focus on my education, develop my interest in technology, and dive deeper into my field. During my high school years, I learned so much and unknowingly developed skills that would prove essential in university. High school also introduced me to some of the most important people in my life—my best friends and my girlfriend—amazing individuals who have each contributed in their own way to my journey. However, none of this would have been possible without the unwavering support of my family. My parents have been my greatest role models, always encouraging me to chase my dreams, no matter how big they seemed. Their sacrifices and guidance have shaped the person I am today. My siblings have also played a crucial role in my life, constantly inspiring me and pushing me to be better. Their support has been my foundation, reminding me that no matter what challenges I face, I am never alone. University has been a rollercoaster of growth and discovery. Not only have I enhanced my academic skills, but Ive also had incredible experiences—including recording a commercial! Ive met amazing classmates who have supported me through all my crazy ideas. I successfully completed my first year of engineering, and now, in my second year, I continue to explore new skills, such as application development. The year 2025 has been full of surprises, but the most unexpected one has been Destination Imagination. It caught me off guard, but it has also been the experience Ive enjoyed the most. Through every challenge and every success, my family has been there, reminding me that with passion, perseverance, and the right support, anything is possible.',
        
        // History page
        myHistory: 'My History',
        historyText: 'For my team and me, Destination Imagination was something we never saw coming. At the beginning of the year, Engineer Sánchez walked into our classroom to share the news. At first, I thought it was something I wouldnt be chosen for, but the moment my name was called on the list of students representing our university in this challenge, I was overwhelmed with excitement. At first, the idea seemed impossible creating a cable car style motor? It sounded incredibly ambitious! But we didnt give up. The journey was challenging, filled with doubts and hard work, but we always stood together, supporting one another every step of the way. The participation of Engineer Sánchez, Engineer Bianchi, and our facilitator, Mauricio Cambronero, was essential. They constantly motivated us, provided moral support, and inspired us to keep pushing forward. Then, the big day arrived. As we stepped into the event venue, everything looked amazing. When it was finally our turn to present, we were nervous, but we faced the challenge with courage and determination as a winning team. I represent the spirit of volunteerism in Destination Imagination by embracing teamwork, creativity, and a willingness to help others grow. My role is not just about contributing to my teams success but also about inspiring and encouraging those around me to explore their potential. My impact in Destination Imagination comes from my dedication to problem solving, innovation, and collaboration. I strive to create an environment where every team member feels valued and empowered to contribute their unique strengths. Additionally, I actively promote the program to involve more young people, showing them how this experience can change the way they approach challenges in life. Volunteering isnt just about giving time; its about making a difference. Through Destination Imagination, I aim to leave a lasting impact by fostering creativity, supporting my peers, and proving that when we work together, we can achieve extraordinary things.',
        
        // Importance page
        whyIncludeMore: 'Why Include More People?',
        importanceText: 'Including more people in Destination Imagination is essential because this project empowers young people to see the world from a different perspective. It helps us approach problem-solving in everyday life in a unique and creative way. Destination Imagination is not just about creating a project; its about teamwork. It is about exploring within yourself, discovering both your strengths and weaknesses, and learning how to work together to support and complement one another. Through this experience, we grow not only as individuals but as a team, realizing that innovation, collaboration, and perseverance can lead to extraordinary results.',
        
        // Home page
        welcomeTitle: 'Welcome to my story in Destination Imagination',
        welcomeSubtitle: 'Discover how this experience has transformed my way of thinking and creating.',
        introText: 'Hello everyone, my name is Alejandro, and I am 19 years old. Together with my team, we are participating in the Destination Imagination Experience Challenge.'
      },
      es: {
        // Navigation
        home: 'Inicio',
        about: 'Sobre Mí',
        history: 'Mi Historia',
        importance: '¿Por qué incluir más personas?',
        contact: 'Contacto',
        
        // Settings
        settings: 'Configuración',
        appearance: 'Apariencia',
        language: 'Idioma',
        light: 'Claro',
        dark: 'Oscuro',
        
        // Contact page
        contactTitle: 'Contacto',
        yourName: 'Tu Nombre',
        yourEmail: 'Tu Correo Electrónico',
        yourMessage: 'Tu Mensaje',
        send: 'Enviar',
        connectWithMe: 'Conéctate Conmigo',
        email: 'Correo Electrónico',
        socialMedia: 'Redes Sociales',
        
        // About page
        aboutMe: 'Sobre Mí',
        aboutText: 'Tengo 19 años y actualmente estoy en mi segundo año de universidad, estudiando Ingeniería de Sistemas. La tecnología siempre ha sido mi pasión. Mi amor por la tecnología comenzó desde que tengo memoria. De niño, no solo me fascinaban los videojuegos, quería entender cómo funcionaban. Analizaba cada detalle, tratando de descubrir la magia detrás de las pantallas. A medida que crecía, también descubrí otro lado de mí: un espíritu competitivo y una profunda pasión por los deportes, especialmente el fútbol. Con solo 15 años, tuve la increíble oportunidad de jugar profesionalmente para Deportivo Mixco en Guatemala. Sin embargo, a los 18, tuve que tomar una decisión difícil: dejar atrás mi carrera futbolística y abrazar un nuevo capítulo de mi vida. Pero este cambio me llevó a algo aún más grande. Me dio la oportunidad de centrarme en mi educación, desarrollar mi interés por la tecnología y profundizar en mi campo. Durante mis años de secundaria, aprendí mucho y sin saberlo desarrollé habilidades que resultarían esenciales en la universidad. La secundaria también me presentó a algunas de las personas más importantes de mi vida: mis mejores amigos y mi novia, personas increíbles que han contribuido a mi viaje de diferentes maneras. Sin embargo, nada de esto habría sido posible sin el apoyo inquebrantable de mi familia. Mis padres han sido mis mayores modelos a seguir, siempre animándome a perseguir mis sueños, sin importar lo grandes que parecían. Sus sacrificios y orientación han formado la persona que soy hoy. Mis hermanos también han jugado un papel crucial en mi vida, inspirándome constantemente y empujándome a ser mejor. Su apoyo ha sido mi fundamento, recordándome que sin importar los desafíos que enfrente, nunca estoy solo. La universidad ha sido una montaña rusa de crecimiento y descubrimiento. No solo he mejorado mis habilidades académicas, sino que también he tenido experiencias increíbles, ¡incluyendo grabar un comercial! He conocido a compañeros de clase asombrosos que me han apoyado en todas mis ideas locas. Completé con éxito mi primer año de ingeniería y ahora, en mi segundo año, continúo explorando nuevas habilidades, como el desarrollo de aplicaciones. El año 2025 ha estado lleno de sorpresas, pero la más inesperada ha sido Destination Imagination. Me tomó por sorpresa, pero también ha sido la experiencia que más he disfrutado. A través de cada desafío y cada éxito, mi familia ha estado ahí, recordándome que con pasión, perseverancia y el apoyo adecuado, todo es posible.',
        
        // History page
        myHistory: 'Mi Historia',
        historyText: 'Para mi equipo y para mí, Destination Imagination fue algo que nunca vimos venir. Al comienzo del año, el Ingeniero Sánchez entró a nuestra aula para compartir la noticia. Al principio, pensé que era algo para lo que no sería elegido, pero en el momento en que mi nombre fue mencionado en la lista de estudiantes que representarían a nuestra universidad en este desafío, me sentí abrumado de emoción. Al principio, la idea parecía imposible, ¿crear un motor estilo teleférico? ¡Sonaba increíblemente ambicioso! Pero no nos rendimos. El viaje fue desafiante, lleno de dudas y trabajo duro, pero siempre nos mantuvimos unidos, apoyándonos mutuamente en cada paso del camino. La participación del Ingeniero Sánchez, el Ingeniero Bianchi y nuestro facilitador, Mauricio Cambronero, fue esencial. Constantemente nos motivaron, nos brindaron apoyo moral y nos inspiraron a seguir adelante. Luego, llegó el gran día. Cuando entramos al lugar del evento, todo se veía increíble. Cuando finalmente fue nuestro turno de presentar, estábamos nerviosos, pero enfrentamos el desafío con coraje y determinación como un equipo ganador. Represento el espíritu del voluntariado en Destination Imagination abrazando el trabajo en equipo, la creatividad y la voluntad de ayudar a otros a crecer. Mi papel no se trata solo de contribuir al éxito de mi equipo, sino también de inspirar y alentar a quienes me rodean a explorar su potencial. Mi impacto en Destination Imagination proviene de mi dedicación a la resolución de problemas, la innovación y la colaboración. Me esfuerzo por crear un entorno donde cada miembro del equipo se sienta valorado y capacitado para contribuir con sus fortalezas únicas. Además, promuevo activamente el programa para involucrar a más jóvenes, mostrándoles cómo esta experiencia puede cambiar la forma en que abordan los desafíos en la vida. El voluntariado no se trata solo de dar tiempo; se trata de marcar la diferencia. A través de Destination Imagination, mi objetivo es dejar un impacto duradero fomentando la creatividad, apoyando a mis compañeros y demostrando que cuando trabajamos juntos, podemos lograr cosas extraordinarias.',
        
        // Importance page
        whyIncludeMore: '¿Por qué incluir más personas?',
        importanceText: 'Incluir a más personas en Destination Imagination es esencial porque este proyecto permite a los jóvenes ver el mundo desde una perspectiva diferente. Nos ayuda a abordar la resolución de problemas en la vida cotidiana de una manera única y creativa. Destination Imagination no se trata solo de crear un proyecto; se trata de trabajo en equipo. Se trata de explorar dentro de ti mismo, descubrir tanto tus fortalezas como tus debilidades, y aprender a trabajar juntos para apoyarse y complementarse mutuamente. A través de esta experiencia, crecemos no solo como individuos sino como equipo, dándonos cuenta de que la innovación, la colaboración y la perseverancia pueden conducir a resultados extraordinarios.',
        
        // Home page
        welcomeTitle: 'Bienvenido a mi historia en Destination Imagination',
        welcomeSubtitle: 'Descubre cómo esta experiencia ha transformado mi forma de pensar y crear.',
        introText: 'Hola a todos, mi nombre es Alejandro y tengo 19 años. Junto con mi equipo,  participamos en el Desafío de Experiencia de Destination Imagination.'
      }
    };
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setActiveLanguage(savedLanguage);
    
    // Handle language selection
    languageOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        setActiveLanguage(lang);
        translatePage(lang);
      });
    });
    
    // Set active language
    function setActiveLanguage(lang) {
      // Update the active class
      languageOptions.forEach(opt => {
        if (opt.getAttribute('data-lang') === lang) {
          opt.classList.add('active');
        } else {
          opt.classList.remove('active');
        }
      });
      
      // Save preference
      localStorage.setItem('language', lang);
      
      // Apply translations
      translatePage(lang);
    }
    
    // Translate the page content
    function translatePage(lang) {
      // Translate navigation
      const navLinks = document.querySelectorAll('nav ul li a');
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === '/') {
          link.textContent = translations[lang].home;
        } else if (href === '/about') {
          link.textContent = translations[lang].about;
        } else if (href === '/history') {
          link.textContent = translations[lang].history;
        } else if (href === '/importance') {
          link.textContent = translations[lang].importance;
        } else if (href === '/contact') {
          link.textContent = translations[lang].contact;
        }
      });
      
      // Translate settings modal
      document.querySelector('.settings-header h3').textContent = translations[lang].settings;
      document.querySelectorAll('.settings-section h4')[0].textContent = translations[lang].appearance;
      document.querySelectorAll('.settings-section h4')[1].textContent = translations[lang].language;
      document.querySelector('#theme-light span').textContent = translations[lang].light;
      document.querySelector('#theme-dark span').textContent = translations[lang].dark;
      
      // Translate page titles
      const pageTitle = document.querySelector('main > h1');
      if (pageTitle) {
        if (window.location.pathname === '/contact') {
          pageTitle.textContent = translations[lang].contactTitle;
        } else if (window.location.pathname === '/about') {
          pageTitle.textContent = translations[lang].aboutMe;
        } else if (window.location.pathname === '/history') {
          pageTitle.textContent = translations[lang].myHistory;
        } else if (window.location.pathname === '/importance') {
          pageTitle.textContent = translations[lang].whyIncludeMore;
        } else if (window.location.pathname === '/') {
          pageTitle.textContent = translations[lang].welcomeTitle;
        }
      }
      
      // Translate page content
      // About page
      const aboutText = document.querySelector('.justified-text');
      if (aboutText && window.location.pathname === '/about') {
        aboutText.textContent = translations[lang].aboutText;
      }
      
      // History page
      const historyText = document.querySelector('.history-text');
      if (historyText && window.location.pathname === '/history') {
        historyText.textContent = translations[lang].historyText;
      }
      
      // Importance page
      const importanceText = document.querySelector('.importance-text');
      if (importanceText && window.location.pathname === '/importance') {
        importanceText.textContent = translations[lang].importanceText;
      }
      
      // Home page
      if (window.location.pathname === '/') {
        const welcomeSubtitle = document.querySelector('main .form-text:first-of-type');
        const introText = document.querySelector('.form-container .form-text');
        
        if (welcomeSubtitle) welcomeSubtitle.textContent = translations[lang].welcomeSubtitle;
        if (introText) introText.textContent = translations[lang].introText;
      }
      
      // Translate Contact page elements
      if (window.location.pathname === '/contact') {
        // Form placeholders
        const nameInput = document.querySelector('input[name="name"]');
        const emailInput = document.querySelector('input[name="email"]');
        const messageTextarea = document.querySelector('textarea[name="message"]');
        const submitButton = document.querySelector('form button[type="submit"]');
        
        if (nameInput) nameInput.placeholder = translations[lang].yourName;
        if (emailInput) emailInput.placeholder = translations[lang].yourEmail;
        if (messageTextarea) messageTextarea.placeholder = translations[lang].yourMessage;
        if (submitButton) submitButton.textContent = translations[lang].send;
        
        // Contact info section
        const connectTitle = document.querySelector('.contact-info h2');
        const emailTitle = document.querySelector('.email-container h3');
        const socialTitle = document.querySelector('.social-media h3');
        
        if (connectTitle) connectTitle.textContent = translations[lang].connectWithMe;
        if (emailTitle) emailTitle.textContent = translations[lang].email;
        if (socialTitle) socialTitle.textContent = translations[lang].socialMedia;
      }
      
      // Set the html lang attribute
      document.documentElement.setAttribute('lang', lang);
    }
    
    // Apply initial translations
    translatePage(savedLanguage);
    
    // About Page Carousel
    const aboutCarousel = document.querySelector('.carrusel-about-container');
    if (aboutCarousel) {
      const slides = document.querySelectorAll('.carrusel-about-slide');
      const dots = document.querySelectorAll('.carrusel-about-dots .dot');
      const prevBtn = document.querySelector('.carrusel-about-controls .prev-btn');
      const nextBtn = document.querySelector('.carrusel-about-controls .next-btn');
      let currentSlide = 0;
      
      function showSlide(n) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Calculate the correct slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        
        // Make sure we don't get an error if we have fewer dots than slides
        if (dots.length > currentSlide) {
          dots[currentSlide].classList.add('active');
        }
      }
      
      // Add event listeners to buttons
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
      }
      
      // Add event listeners to dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
      });
      
      // Auto-advance slides every 5 seconds
      const autoAdvance = setInterval(() => showSlide(currentSlide + 1), 5000);
      
      // Stop auto-advance when hovering over carousel
      aboutCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
      });
      
      // Resume auto-advance when mouse leaves
      aboutCarousel.addEventListener('mouseleave', () => {
        setInterval(() => showSlide(currentSlide + 1), 5000);
      });
    }
    
    // Tutorial functionality
    const tutorialKey = 'tutorial-complete';
    const tutorialComplete = localStorage.getItem(tutorialKey) === 'true';
    
    // Tutorial translations
    const tutorialTranslations = {
      en: {
        settingsTitle: 'Settings Menu',
        settingsText: 'Click the gear icon to access language and theme settings.',
        themeTitle: 'Change the theme',
        themeText: 'Click here to switch between light and dark mode according to your preference.',
        languageTitle: 'Change the language',
        languageText: 'Click this button to switch between English and Spanish. All content will be translated instantly.',
        gotIt: 'Got it'
      },
      es: {
        settingsTitle: 'Menú de Configuración',
        settingsText: 'Haz clic en el ícono de engranaje para acceder a la configuración de idioma y tema.',
        themeTitle: 'Cambiar el tema',
        themeText: 'Haz clic aquí para cambiar entre el modo claro y oscuro según tu preferencia.',
        languageTitle: 'Cambiar el idioma',
        languageText: 'Haz clic en este botón para cambiar entre inglés y español. Todo el contenido será traducido instantáneamente.',
        gotIt: 'Entendido'
      }
    };
    
    // Get current language for tutorials
    const currentLang = localStorage.getItem('language') || 'en';
    const tutorialText = tutorialTranslations[currentLang];
    
    // Only show the tutorial if the user hasn't completed it yet
    if (!tutorialComplete) {
      // Create tutorial modal for language settings
      const languageTutorial = createTutorialModal(
        'language-tutorial',
        tutorialText.languageTitle,
        tutorialText.languageText,
        document.querySelector('.language-options'),
        'bottom',
        tutorialText.gotIt
      );
      
      // Create tutorial modal for theme settings
      const themeTutorial = createTutorialModal(
        'theme-tutorial',
        tutorialText.themeTitle,
        tutorialText.themeText,
        document.querySelector('.theme-options'),
        'bottom',
        tutorialText.gotIt
      );
      
      // Create tutorial modal for settings button
      const settingsTutorial = createTutorialModal(
        'settings-tutorial',
        tutorialText.settingsTitle,
        tutorialText.settingsText,
        document.getElementById('settings-toggle'),
        'left',
        tutorialText.gotIt
      );
      
      // Show settings tutorial first
      document.body.appendChild(settingsTutorial);
      setTimeout(() => {
        settingsTutorial.classList.add('active');
      }, 1000);
      
      // When settings modal opens, show the other tutorials
      settingsToggle.addEventListener('click', function() {
        // Remove the settings tutorial if it exists
        const existingSettingsTutorial = document.getElementById('settings-tutorial');
        if (existingSettingsTutorial) {
          existingSettingsTutorial.remove();
        }
        
        // Show language and theme tutorials with a slight delay
        setTimeout(() => {
          document.body.appendChild(languageTutorial);
          document.body.appendChild(themeTutorial);
          
          setTimeout(() => {
            // Update positions before showing
            updateTutorialPosition(languageTutorial, document.querySelector('.language-options'), 'bottom');
            updateTutorialPosition(themeTutorial, document.querySelector('.theme-options'), 'bottom');
            
            languageTutorial.classList.add('active');
            themeTutorial.classList.add('active');
          }, 500);
        }, 500);
      });
      
      // Update tutorial positions on window resize
      window.addEventListener('resize', function() {
        const tutorials = document.querySelectorAll('.tutorial-modal');
        tutorials.forEach(tutorial => {
          const targetId = tutorial.id.replace('-tutorial', '');
          let targetElement;
          let position;
          
          if (targetId === 'settings') {
            targetElement = document.getElementById('settings-toggle');
            position = 'left';
          } else if (targetId === 'language') {
            targetElement = document.querySelector('.language-options');
            position = 'bottom';
          } else if (targetId === 'theme') {
            targetElement = document.querySelector('.theme-options');
            position = 'bottom';
          }
          
          if (targetElement) {
            updateTutorialPosition(tutorial, targetElement, position);
          }
        });
      });
      
      // Update tutorial positions on scroll
      window.addEventListener('scroll', function() {
        const tutorials = document.querySelectorAll('.tutorial-modal');
        tutorials.forEach(tutorial => {
          const targetId = tutorial.id.replace('-tutorial', '');
          let targetElement;
          let position;
          
          if (targetId === 'settings') {
            targetElement = document.getElementById('settings-toggle');
            position = 'left';
          } else if (targetId === 'language') {
            targetElement = document.querySelector('.language-options');
            position = 'bottom';
          } else if (targetId === 'theme') {
            targetElement = document.querySelector('.theme-options');
            position = 'bottom';
          }
          
          if (targetElement) {
            updateTutorialPosition(tutorial, targetElement, position);
          }
        });
      });
    }
    
    /**
     * Updates the position of a tutorial modal
     * @param {HTMLElement} modal - The tutorial modal
     * @param {HTMLElement} targetElement - The element to point to
     * @param {string} position - The position of the arrow
     */
    function updateTutorialPosition(modal, targetElement, position) {
      if (!modal || !targetElement) return;
      
      const targetRect = targetElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Apply positioning based on the position parameter
      if (position === 'top') {
        modal.style.top = `${targetRect.top + scrollTop - 10}px`;
        modal.style.left = `${targetRect.left + scrollLeft + targetRect.width/2}px`;
        modal.style.transform = 'translate(-50%, -100%)';
      } else if (position === 'right') {
        modal.style.top = `${targetRect.top + scrollTop + targetRect.height/2}px`;
        modal.style.left = `${targetRect.right + scrollLeft + 10}px`;
        modal.style.transform = 'translate(0, -50%)';
      } else if (position === 'bottom') {
        modal.style.top = `${targetRect.bottom + scrollTop + 10}px`;
        modal.style.left = `${targetRect.left + scrollLeft + targetRect.width/2}px`;
        modal.style.transform = 'translate(-50%, 0)';
      } else if (position === 'left') {
        modal.style.top = `${targetRect.top + scrollTop + targetRect.height/2}px`;
        modal.style.left = `${targetRect.left + scrollLeft - 10}px`;
        modal.style.transform = 'translate(-100%, -50%)';
      }
    }
    
    /**
     * Creates a tutorial modal with an arrow pointing to a specific element
     * @param {string} id - The ID for the tutorial modal
     * @param {string} title - The title of the tutorial
     * @param {string} text - The explanatory text
     * @param {HTMLElement} targetElement - The element to point to
     * @param {string} position - The position of the arrow (top, right, bottom, left)
     * @param {string} buttonText - The text for the close button
     * @returns {HTMLElement} The created tutorial modal
     */
    function createTutorialModal(id, title, text, targetElement, position, buttonText = 'Got it') {
      // Create the modal element
      const modal = document.createElement('div');
      modal.id = id;
      modal.className = 'tutorial-modal';
      
      // Create the arrow
      const arrow = document.createElement('div');
      arrow.className = `tutorial-arrow ${position}`;
      modal.appendChild(arrow);
      
      // Create the content container
      const content = document.createElement('div');
      content.className = 'tutorial-content';
      
      // Add the title
      const titleEl = document.createElement('h4');
      titleEl.textContent = title;
      content.appendChild(titleEl);
      
      // Add the text
      const textEl = document.createElement('p');
      textEl.textContent = text;
      content.appendChild(textEl);
      
      // Add the close button
      const closeButton = document.createElement('button');
      closeButton.className = 'tutorial-close';
      closeButton.textContent = buttonText;
      closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.remove();
          
          // Check if all tutorials are closed
          const anyTutorialsOpen = document.querySelectorAll('.tutorial-modal').length > 0;
          if (!anyTutorialsOpen) {
            // Mark tutorial as complete in localStorage
            localStorage.setItem(tutorialKey, 'true');
          }
        }, 300);
      });
      content.appendChild(closeButton);
      
      modal.appendChild(content);
      
      // Set initial position
      updateTutorialPosition(modal, targetElement, position);
      
      return modal;
    }
  }); 