(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (!gsap || reduceMotion.matches) {
    document.documentElement.classList.add("kinetic-basic");
    return;
  }

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.defaults({ ease: "power3.out" });

  function revealOnScroll(targets, vars = {}) {
    const elements = gsap.utils.toArray(targets);
    if (!elements.length) return;

    gsap.from(elements, {
      autoAlpha: 0,
      y: 36,
      duration: 0.82,
      stagger: 0.08,
      clearProps: "transform,opacity,visibility",
      scrollTrigger: ScrollTrigger ? {
        trigger: elements[0],
        start: "top 82%",
        once: true
      } : undefined,
      ...vars
    });
  }

  function setupReelHero() {
    const hero = document.querySelector(".flavoursync-reel .reel-hero");
    if (!hero) return;
    const animate = (target, vars) => {
      if (document.querySelector(target)) {
        gsap.to(target, vars);
      }
    };

    const intro = gsap.timeline({ defaults: { duration: 0.72 } });
    intro
      .from(".story-topline", { autoAlpha: 0, y: -22 })
      .from(".reel-hero-copy > *", { autoAlpha: 0, y: 26, stagger: 0.08 }, "-=0.35")
      .from(".reel-stage", { autoAlpha: 0, y: 46, rotateX: 10, duration: 0.84 }, "-=0.3")
      .from(".reel-ingredient-tags span", { autoAlpha: 0, x: 30, stagger: 0.07, duration: 0.48 }, "-=0.38")
      .from(".taste-sync-card", { autoAlpha: 0, y: 24, scale: 0.9, duration: 0.58 }, "-=0.26")
      .from(".reel-action-rail a", { autoAlpha: 0, x: 24, stagger: 0.07 }, "-=0.52");

    animate(".stage-video", {
      scale: 1.045,
      duration: 7.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    animate(".hero-dish-main", {
      y: -18,
      rotate: -1.8,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    animate(".hero-dish-left", {
      x: -10,
      y: 12,
      rotate: -9,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    animate(".hero-dish-right", {
      x: 10,
      y: -10,
      rotate: 11,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".pack-reveal", {
      y: -7,
      scale: 1.025,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".taste-sync-card", {
      y: -8,
      scale: 1.015,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".reel-action-rail a", {
      y: -8,
      duration: 1.9,
      stagger: 0.12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    revealOnScroll(".reel-food-card", { y: 58, stagger: 0.1 });
    revealOnScroll(".motion-grid article", { y: 38, stagger: 0.1 });
    revealOnScroll(".reel-pack-stack article", { x: 42, y: 0, stagger: 0.08 });
  }

  function setupMenuCards() {
    const cards = gsap.utils.toArray(".flavoursync-menu .dish-card:not([data-kinetic-ready])");
    if (!cards.length) return;

    cards.forEach((card, index) => {
      card.dataset.kineticReady = "true";
      const scene = card.querySelector(".dish-video-shell");
      const chips = card.querySelectorAll(".ingredient-chip");
      const meters = card.querySelectorAll(".taste-bars i");

      gsap.from(card, {
        autoAlpha: 0,
        y: 44,
        scale: 0.96,
        duration: 0.72,
        delay: Math.min(index * 0.04, 0.26),
        clearProps: "opacity,visibility",
        scrollTrigger: ScrollTrigger ? {
          trigger: card,
          start: "top 88%",
          once: true
        } : undefined
      });

      if (chips.length) {
        gsap.from(chips, {
          autoAlpha: 0,
          y: 18,
          scale: 0.88,
          duration: 0.46,
          stagger: 0.045,
          delay: 0.08,
          scrollTrigger: ScrollTrigger ? {
            trigger: card,
            start: "top 82%",
            once: true
          } : undefined
        });
      }

      card.addEventListener("pointermove", event => {
        if (window.innerWidth < 760) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: x * 7,
          rotateX: y * -6,
          y: -7,
          duration: 0.32,
          overwrite: true
        });

        if (scene) {
          gsap.to(scene, {
            x: x * -10,
            y: y * -8,
            scale: 1.018,
            duration: 0.34,
            overwrite: true
          });
        }
      });

      card.addEventListener("pointerleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.42,
          overwrite: true
        });

        if (scene) {
          gsap.to(scene, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.42,
            overwrite: true
          });
        }
      });

      if (meters.length) {
        gsap.from(meters, {
          autoAlpha: 0,
          x: -8,
          duration: 0.8,
          stagger: 0.08,
          scrollTrigger: ScrollTrigger ? {
            trigger: card,
            start: "top 84%",
            once: true
          } : undefined
        });
      }
    });
  }

  function setupMenuScene() {
    if (!document.querySelector(".flavoursync-menu")) return;

    revealOnScroll(".flavoursync-menu .compact-hero > *", { y: 28, stagger: 0.08 });
    revealOnScroll(".combo-card", { y: 42, stagger: 0.1 });
    setupMenuCards();
  }

  function refreshScrollTriggers() {
    if (ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  window.addEventListener("load", () => {
    setupReelHero();
    setupMenuScene();
    refreshScrollTriggers();
  });

  document.addEventListener("flavoursync:menu-rendered", () => {
    setupMenuCards();
    refreshScrollTriggers();
  });
})();
