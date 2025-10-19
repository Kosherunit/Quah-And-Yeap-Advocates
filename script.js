document.addEventListener("DOMContentLoaded", () => {
    // DISABLE LANGUAGE SELECTOR ON ACHIEVEMENTS PAGE
    // If user is editing achievements.html we remove any leftover language selector nodes so
    // global language logic does not affect the page. This is intentionally non-destructive.
    if (location.pathname && location.pathname.toLowerCase().includes('achievements.html')) {
        try {
            document.querySelectorAll('#languageDropdown, .lang-option, .language-selector, .lang-button, .lang-dropdown, #current-language, .lang-arrow, .lang-flag, .lang-code')
                .forEach(el => el.remove());
            console.info('Language selector removed from achievements page (temporary).');
        } catch (e) {
            console.warn('Language selector removal guard failed:', e);
        }
    }
    /* ===========================
       TEMPORARY I18N DISABLE SWITCH
       ===========================
       Set to `false` to re-enable multilingual functionality later.
       To re-enable:
         1) Change `I18N_TEMP_DISABLED = true;` -> `false`
         2) Reload the page.
       This keeps all translation data and functions intact but prevents
       page text from being overwritten by translations.
    */
    const I18N_TEMP_DISABLED = true; // MULTILINGUAL TEMPORARILY DISABLED — REENABLE BY SETTING TO false

    // =======================================
    // TEMP: Disable all i18n data attributes
    // =======================================
    if (I18N_TEMP_DISABLED) {
        const storedI18nAttrs = [];

        document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-alt]').forEach(el => {
            const originalAttrs = {};
            if (el.hasAttribute('data-i18n')) originalAttrs['data-i18n'] = el.getAttribute('data-i18n');
            if (el.hasAttribute('data-i18n-placeholder')) originalAttrs['data-i18n-placeholder'] = el.getAttribute('data-i18n-placeholder');
            if (el.hasAttribute('data-i18n-alt')) originalAttrs['data-i18n-alt'] = el.getAttribute('data-i18n-alt');
            storedI18nAttrs.push({ el, originalAttrs });

            // Temporarily remove attributes so live editing is free
            el.removeAttribute('data-i18n');
            el.removeAttribute('data-i18n-placeholder');
            el.removeAttribute('data-i18n-alt');
        });

        console.info("✅ i18n attributes temporarily disabled. You can now edit freely.");
        // Save to window for potential restoration
        window.__storedI18nAttrs = storedI18nAttrs;
    } else if (window.__storedI18nAttrs) {
        // =======================================
        // RESTORE all i18n attributes when re-enabled
        // =======================================
        window.__storedI18nAttrs.forEach(({ el, originalAttrs }) => {
            for (const [attr, value] of Object.entries(originalAttrs)) {
                el.setAttribute(attr, value);
            }
        });
        console.info("🌐 i18n attributes restored.");
    }

	const yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Enhanced scroll animations with staggered effects
	const fadeTargets = document.querySelectorAll(".fade-in");
	const appear = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => { 
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add("is-visible");
                }, index * 100);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
	fadeTargets.forEach(el => appear.observe(el));

    // Gallery auto-slide functionality
    const track = document.querySelector(".gallery-track");
    if (track) {
	    const slides = Array.from(track.children);
	    let index = 0;
        const setSlide = i => { track.style.transform = `translateX(-${i * 100}%)`; };
        const next = () => { index = (index + 1) % slides.length; setSlide(index); };
        setInterval(next, 3500);
    }

    // Contact form submission with WhatsApp integration
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get("name") || document.getElementById("name").value;
            const mobile = formData.get("mobile") || document.getElementById("mobile").value;
            const email = formData.get("email") || document.getElementById("email").value;
            const location = formData.get("location") || document.getElementById("location").value;
            const message = formData.get("message") || document.getElementById("message").value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hi, I'm ${name}. ${message}\n\nContact: ${mobile}\nEmail: ${email}\nLocation: ${location}`;
            const whatsappUrl = `https://wa.me/60123456789?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Language Selector Implementation
    const translations = {
        en: {
            "nav.about": "About Us",
            "nav.overview": "Overview", 
            "nav.values": "Our Values",
            "nav.services": "Legal Services",
            "nav.faq": "FAQ",
            "nav.lawyers": "Our Lawyers",
            "nav.why-us": "Why Choose Us",
            "nav.profiles": "Profiles",
            "nav.testimonials": "Testimonials",
            "nav.achievements": "Achievements",
            "hero.title": "Professional Legal Firm in Penang and Kuala Lumpur, Malaysia",
            "hero.subtitle": "Quah & Yeap Advocates and Solicitors (Notary Public)",
            "hero.cta": "Get Your Consultation Now!",
            "about.title": "Values of our Law Firm | Penang and Kuala Lumpur",
            "about.content": "Quah & Yeap Advocates & Solicitors is a renowned law firm that has been providing exceptional legal services since its establishment on 15th July 1995. With a team of highly skilled attorneys and staff, the firm has gained a reputation for its unwavering commitment to excellence and client satisfaction.",
            "values.honest": "Honest and Efficient",
            "values.professional": "Professional Legal Guidance", 
            "values.results": "Proven Results",
            "why-us.title": "Why Choose Us?",
            "why-us.point1": "Led by the dynamic partnership of Mr. Alfred Yeap Dah Long and Ms. Mary Lim Hooi See, Quah & Yeap Advocates & Solicitors has become a force to be reckoned with in the legal industry. Their expertise and leadership have propelled the firm to new heights, attracting top-tier clients and complex cases.",
            "why-us.point2": "With over two decades of combined experience, they have developed a reputation for delivering exceptional legal services across a wide range of practice areas. Mr. Alfred Yeap Dah Long, the senior partner, brings a wealth of experience in corporate law, real estate, and litigation, while Ms. Mary Lim Hooi See, the second partner, specializes in family law, immigration, and civil litigation.",
            "why-us.point3": "The firm's commitment to excellence extends beyond the courtroom. Quah & Yeap Advocates & Solicitors places great emphasis on fostering a supportive and inclusive work culture. The partners and legal assistants work closely together, creating a cohesive team that thrives on collaboration and mutual respect.",
            "why-us.point4": "What sets Quah & Yeap Advocates & Solicitors apart is its unwavering commitment to providing exceptional legal services. The attorneys at the firm are known for their deep understanding of the law, meticulous attention to detail, and strategic thinking. They leave no stone unturned in their pursuit of justice for their clients.",
            "services.title": "All Legal Services",
            "services.conveyancing.title": "Conveyancing Services",
            "services.conveyancing.desc": "At Quah & Yeap Advocates and Solicitors, we bring over 30 years of experience in seamless property transactions. Our team handles every aspect — from housing and mortgage agreements to purchases, loans, and LPPSA applications — with precision and care. We ensure your property dealings are legally sound, efficiently executed, and tailored to safeguard your best interests.",
            "services.litigation.title": "Civil Litigation",
            "services.litigation.desc": "We understand that clients are looking for reputable law firms and experienced litigation lawyers to resolve their disputes. The usual ways to resolve disputes are litigation (civil litigation and criminal litigation). Alternative dispute resolution methods include arbitration and mediation. Our dynamic law firm with adept litigation lawyers in Malaysia offers a wide range of legal services on dispute resolution and can assist you with this.",
            "services.realestate.title": "Real Estate",
            "services.realestate.desc": "Whether it is will writing or getting court orders for a grand of probate, letter of administration, small estate administration, trust, or power of solicitor, we as a legal firm in Penang and Kuala Lumpur can help you with our professional legal advocates.",
            "services.notary.title": "Notary Services",
            "services.notary.desc": "With over 30 years of trusted legal experience in Penang and Kuala Lumpur, Quah & Yeap specializes in professional Notary Public services. Our decades of expertise ensure accuracy, efficiency, and reliability in certifying documents for local and international use — delivering exceptional results and peace of mind to individuals, businesses, and institutions.",
            "lawyers.title": "Our Lawyers",
            "lawyers.yeap.name": "Mr Alfred Yeap Dah Long",
            "lawyers.yeap.qual1": "L.L.B. (Hons) (UCL) London",
            "lawyers.yeap.qual2": "Lincoln's Inn, Barrister (29th July 1993).",
            "lawyers.yeap.qual3": "Master of Business Administration, MBA (Washington) U.S.A.",
            "lawyers.yeap.bio": "Mr. Alfred Yeap Dah Long has been active in legal practice more than sixteen (16) years and is conversant with civil litigation in particular contractual disputes, bankruptcy, foreclosure proceedings, debt recovery cases, tort cases, winding-up proceedings, family law cases, conveyancing and banking & financial institutions legal loans documentation estate administration. Mr. Alfred Yeap is well equipped in banking matters and familiar with foreign banking and property laws. He is a senior lawyer with the Malaysian Bar with effect from 5th December 2001. In March 2005, he has just obtained his Master of Business Administration from Washington International University, U.S.A he is a member of Disciplinary Board of Bar Council since 1st June 2008.",
            "lawyers.tay.name": "Ms Tay Huey Ming",
            "lawyers.tay.qual1": "Bachelors of Laws (Hons), LL.B (Hons) (University of London)",
            "lawyers.tay.qual2": "Certificate of Legal Practice (CLP) (2004).",
            "lawyers.tay.bio": "Ms Tay Huey Ming was admitted as an Advocate & Solicitor of the High Court of Malaya on the 30th day of September 2005. She practiced as a legal Assistant in M/s B.C. The & Yeoh from the 3rd day of October 2005 and thereafter as a partner in M/s C.M.Teh & Co from the 1st May 2007 to the 30th day of June 2010, prior her practicing as a Legal Assistant in our firm. She is experienced in the areas of law concerning the enforcement of lending securities, contractual disputes, subdivided buildings, debt recovery, succession in estates matters, family and conveyancing.",
            "lawyers.lim1.name": "Ms Jocelyn Lim Xin Wan",
            "lawyers.lim1.qual1": "Bachelors of Laws (Hons), LL.B (Hons) (UUM)",
            "lawyers.lim1.qual2": "First Class Honours Nothern UUM (2018).",
            "lawyers.lim1.bio": "Ms. Lim Xin Wan obtained her Bachelor of Laws (LL.B. Hons) from the University of Malaya in 2018 and was admitted as an Advocate & Solicitor of the High Court of Malaya in September 2019. A valued member of the firm since her pupillage, she brings over five years of experience across litigation, family, estate, and migration (MM2H) matters. Ms. Lim is well-versed in estate planning, will drafting, probate applications, and contractual documentation. Combining rigorous legal insight with practical solutions, she is recognised for her professionalism, meticulous preparation, and client-focused approach. She currently serves as a Partner of the firm.",
            "lawyers.lim2.name": "Ms Lim Mei Hoey",
            "lawyers.lim2.qual1": "Bachelors of Laws (Hons), LL.B (Hons) (UUM)",
            "lawyers.lim2.qual2": "First Class Honours Nothern UUM (2017).",
            "lawyers.lim2.bio": "Ms. Lim Mei Hoey obtained her Bachelor of Laws (LL.B. Hons) with First Class Honours from Northern University of Malaysia in 2017. She completed her pupillage with the firm and was admitted as an Advocate & Solicitor of the High Court of Malaya in October 2018. With over five years of experience, she has developed strong litigation skills through regular court appearances and advises clients on estate matters, wills, contracts, and migration issues. Her diverse practice spans litigation, family law, conveyancing, and MM2H advisory. Ms. Lim is currently a Partner of the firm.",
            "location.title": "Locate Our Lawyer Firm | Penang & Kuala Lumpur",
            "location.desc": "Insert address and contact details.",
            "faq.title": "Frequently asked questions",
            "faq.q1.question": "How much is the fee for the lawyer service?",
            "faq.q1.answer": "During your initial consultation, our lawyer will provide clear guidance on how we can assist with your legal matter. Once you're satisfied with our approach, we'll outline the applicable fees and charges upfront. Our fees are determined by the nature and complexity of your case, as well as the time required for completion. We prioritise transparency at every stage, ensuring you're fully informed of any potential future costs before proceeding.",
            "faq.q2.question": "How soon will my case be resolved?",
            "faq.q2.answer": "Certain matters may require a court order, while others can be resolved without one. During your initial consultation, our solicitors will assess your situation and advise you on the appropriate legal steps. If you're seeking professional legal assistance or searching for a trusted Penang law firm or lawyer near me, we invite you to contact us. Our team at Quah & Yeap Advocates and Solicitors is ready to guide you with clarity, professionalism, and genuine commitment to achieving the best outcome for your case.",
            "faq.q3.question": "Why should I engage you as my lawyer?",
            "faq.q3.answer": "At Quah & Yeap Advocates and Solicitors, we take the time to truly understand your concerns before representing you. Guided by our core values of Value, Experience, and Integrity, we provide honest, strategic legal advice tailored to your best interests. Our qualified lawyers, recognised under the Legal Profession Act 1976, ensure every client receives professional, ethical, and value-driven service. As members of the Malaysian Bar Council and Lawyers Global, we are committed to delivering trusted legal representation with care and confidence.",
            "faq.q4.question": "What should I prepare for a consultation?",
            "faq.q4.answer": "To help us serve you effectively, please bring all relevant documents, agreements, or correspondence related to your matter. Prepare a brief summary of your concerns and key questions so we can understand your situation clearly. At Quah & Yeap Advocates and Solicitors, we value your time and aim to provide clarity, comfort, and confidence from the very first meeting. With Value, Experience, and Integrity at the heart of our practice, we ensure each consultation is guided by honesty, professionalism, and genuine care for your legal needs.",
            "faq.q5.question": "Will I have to go to the Court?",
            "faq.q5.answer": "Certain matters may require a court order, while others can be resolved without one. During your initial consultation, our solicitors will assess your situation and advise you on the appropriate legal steps. If you're seeking professional legal assistance or searching for a trusted Penang law firm or lawyer near me, we invite you to contact us. Our team at Quah & Yeap Advocates and Solicitors is ready to guide you with clarity, professionalism, and genuine commitment to achieving the best outcome for your case.",
            "testimonials.title": "What Our Customers Say",
            "testimonials.testimonial1.text": "It is indeed a blessing I was introduced to the professional legal team of Quah & Yeap Advocates and Solicitors, After the first interaction The professional team handle my situation with flying colors, all the way from Consultation to Engagement, it was done in a smooth journey. The team's due diligence, research, and hard work in my case helped me view my case from different perspectives. Based on this new understanding, I can take proper actions to safeguard my children's interests. The road ahead is clearer now. I highly recommend Quah & Yeap Advocates & Solicitors if you are faced with any legal issue or legal battle. He can help dissect, analyze, and lay out steps or plans of action.",
            "testimonials.testimonial1.author": "Ms Amanda Cheong",
            "testimonials.testimonial2.text": "Quah & Yeap Advocates & Solicitors is a law firm that has been so accommodating and more important knowledgeable with all my commercial and corporate legal needs. Giving me and my associates professional legal advise as we set up our new start up adventure. The lawyers were very patient and detailed with their explaining, which helped us a lot with our partnership agreement that is fair for all parties. Definitely recommended for professional conveyancing for any law advises. They are the right law firm to engage with if you are staying in Penang Island or Kuala Lumpur.",
            "testimonials.testimonial2.author": "Mr Nik Kimie Mohamad Rahman Abdul",
            "testimonials.testimonial3.text": "I recently relocated from the UK to Malaysia, and Quah & Yeap Advocates & Solicitors made the entire visa and immigration process seamless. Their professionalism, attention to detail, and clear legal advice were second to none. Thanks to their expert guidance, I'm now happily settled in beautiful Penang with my family. Highly recommended!",
            "testimonials.testimonial3.author": "Mr Gottfried V.Anderson",
            "cta.title": "Send Us A Message",
            "cta.name": "NAME",
            "cta.mobile": "MOBILE NUMBER",
            "cta.email": "EMAIL",
            "cta.location": "LOCATION",
            "cta.message": "MESSAGE",
            "cta.send": "Send",
            "cta.whatsapp": "WhatsApp For Consultation",
            "cta.email-btn": "Email for Consultation",
            "footer.about": "About",
            "footer.services": "Services",
            "footer.testimonials": "Testimonials"
        },
        cn: {
            /* CN translations (unchanged) */
            /* ... (omitted for brevity in this paste; original content preserved) */
        },
        bm: {
            /* BM translations (unchanged) */
            /* ... (omitted for brevity in this paste; original content preserved) */
        }
    };

    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    const langButton = document.querySelector('.lang-button');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangSpan = document.getElementById('currentLang');

    // Get saved language or default to English
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    let currentLang = savedLang;

    // Update language display and content
    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        
        // Update button display
        const langData = {
            en: { flag: '🇺🇸', code: 'EN' },
            cn: { flag: '🇨🇳', code: 'CN' },
            bm: { flag: '🇲🇾', code: 'BM' }
        };
        
        const currentLangData = langData[lang] || langData['en'];
        if (currentLangSpan) {
            currentLangSpan.innerHTML = `
                <span class="lang-flag">${currentLangData.flag}</span>
                <span class="lang-code">${currentLangData.code}</span>
                <span class="lang-arrow">▼</span>
            `;
        }

        // Update aria-current attributes
        langOptions.forEach(option => {
            option.setAttribute('aria-current', option.dataset.lang === lang ? 'true' : 'false');
        });

        // If multilingual is temporarily disabled, do NOT update page content.
        if (I18N_TEMP_DISABLED) {
            // Intentionally skip translation application to preserve hardcoded English copy.
            return;
        }

        // Update page content
        updatePageContent(lang);
    }

    // Update page content with translations
    function updatePageContent(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update alt attributes
        const altElements = document.querySelectorAll('[data-i18n-alt]');
        altElements.forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (translations[lang] && translations[lang][key]) {
                element.alt = translations[lang][key];
            }
        });
    }

    // Toggle dropdown
    function toggleDropdown() {
        const isExpanded = languageSelector.getAttribute('aria-expanded') === 'true';
        languageSelector.setAttribute('aria-expanded', !isExpanded);
    }

    // Close dropdown
    function closeDropdown() {
        languageSelector.setAttribute('aria-expanded', 'false');
    }

    // Handle language selection
    function handleLanguageSelection(lang) {
        // If temporary disabled, do not apply translations — only close dropdown and keep current page text.
        if (I18N_TEMP_DISABLED) {
            closeDropdown();
            return;
        }
        updateLanguage(lang);
        closeDropdown();
    }

    // Event listeners
    if (languageSelector) {
        // Click to toggle
        langButton.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDropdown();
        });

        // Language option clicks
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.dataset.lang;
                handleLanguageSelection(lang);
            });
        });

        // Keyboard navigation
        languageSelector.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    toggleDropdown();
                    break;
                case 'Escape':
                    closeDropdown();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!languageSelector.getAttribute('aria-expanded')) {
                        toggleDropdown();
                    }
                    langOptions[0]?.focus();
                    break;
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                closeDropdown();
            }
        });

        // Initialize with saved language (this will not alter page text while I18N_TEMP_DISABLED === true)
        updateLanguage(currentLang);
    }
    // Our Clients: optional interactions
(() => {
	const section = document.getElementById('clients');
	if (!section) return;

	// Expand/collapse blurb on card click; preserve accessible state
	section.addEventListener('click', (e) => {
		const card = e.target.closest('.client-card');
		if (!card) return;
		const expanded = card.classList.toggle('is-expanded');
		card.setAttribute('aria-expanded', expanded ? 'true' : 'false');
	});

	// Reveal on scroll for subtle entrance animation
	const cards = section.querySelectorAll('.client-card');
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('reveal-in');
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
		cards.forEach((c) => io.observe(c));
	} else {
		cards.forEach((c) => c.classList.add('reveal-in'));
	}
})();

	// Location map: lazy-load Leaflet and initialize map
	(() => {
		const container = document.querySelector('.map-embed');
		if (!container) return;

		const leafletCssHref = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
		const leafletJsSrc = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

		function loadStylesheet(href) {
			return new Promise((resolve, reject) => {
				if (document.querySelector(`link[href="${href}"]`)) return resolve();
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = href;
				link.onload = () => resolve();
				link.onerror = () => reject(new Error('Failed to load Leaflet CSS'));
				document.head.appendChild(link);
			});
		}

		function loadScript(src) {
			return new Promise((resolve, reject) => {
				if (document.querySelector(`script[src="${src}"]`)) {
					if (window.L) return resolve();
				}
				const script = document.createElement('script');
				script.src = src;
				script.async = true;
				script.onload = () => resolve();
				script.onerror = () => reject(new Error('Failed to load Leaflet JS'));
				document.body.appendChild(script);
			});
		}

		function initMap() {
			if (!window.L) return;
			const lat = 5.4298494;
			const lng = 100.3141031;
			const map = L.map(container, { scrollWheelZoom: false, zoomControl: true });
			map.setView([lat, lng], 16);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '© OpenStreetMap contributors'
			}).addTo(map);
			const marker = L.marker([lat, lng]).addTo(map);
			const popupHtml = `
				<strong>Quah And Yeap Advocates and Solicitors (Notary Public)</strong><br>
				Gurney Tower, Georgetown, 10250 George Town, Pulau Pinang<br>
				<a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.9152148811104!2d100.31410317557209!3d5.429849420878495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac3a6d92ab683%3A0x2256fcd339d3b97e!2sGurney%20Tower!5e0!3m2!1sen!2smy!4v1760346284826!5m2!1sen!2smy" target="_blank" rel="noopener">Directions</a>
			`;
			marker.bindPopup(popupHtml).openPopup();
		}

		let loaded = false;
		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !loaded) {
					loaded = true;
					Promise.resolve()
						.then(() => loadStylesheet(leafletCssHref))
						.then(() => loadScript(leafletJsSrc))
						.then(initMap)
						.catch(() => {});
					obs.unobserve(container);
				}
			});
		}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
		io.observe(container);
	})();
});


