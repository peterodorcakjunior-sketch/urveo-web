import { useLayoutEffect, useRef } from "react";
import "./DArtPhoneEntrance.css";

// A home/menu/home round trip must not replay the dialog's entrance.
// Weak references also let closed dialogs be garbage-collected.
const enteredDialogs = new WeakSet();
const DURATION = 720;
const EASING = "cubic-bezier(.22, 1, .36, 1)";

/** Animate the existing showcase phone into the existing DArtExperience shell. */
export default function useDArtPhoneEntrance() {
  const homeRef = useRef(null);

  useLayoutEffect(() => {
    const home = homeRef.current;
    const dialog = home?.closest(".case-experience");
    const phone = home?.closest(".real-phone-shell");
    if (!dialog || !phone || enteredDialogs.has(dialog)) return undefined;

    const source = document.querySelector("#projects .dart-product-visual .dart-phone");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const from = source?.getBoundingClientRect();
    const visible = from && from.width > 0 && from.height > 0
      && from.bottom > 0 && from.top < window.innerHeight
      && from.right > 0 && from.left < window.innerWidth;

    // Do not move the page to find an off-screen thumbnail (common on mobile).
    if (!visible || reducedMotion.matches || typeof phone.animate !== "function") {
      enteredDialogs.add(dialog);
      return undefined;
    }

    const originalBackground = window.getComputedStyle(dialog).background;
    const sourceVisibility = source.style.visibility;
    const phoneOpacity = phone.style.opacity;
    const phoneOrigin = phone.style.transformOrigin;
    const phoneInert = phone.inert;
    const surroundings = Array.from(dialog.querySelectorAll(
      ".case-title, .case-context, .case-back, .case-progress, .case-glow",
    ));
    const opacities = surroundings.map(element => element.style.opacity);
    const animations = [];
    let frame = 0;
    let timeout = 0;
    let stopped = false;

    // A decorative copy retains the preview's own CSS and container units.
    // Only transforms/opacity animate; the original photograph is not rewritten.
    const stage = document.createElement("div");
    stage.className = "dart-product-visual dart-flight-stage";
    stage.setAttribute("aria-hidden", "true");
    stage.inert = true;
    Object.assign(stage.style, {
      width: `${from.width}px`, height: `${from.height}px`,
      transform: `translate(${from.left}px, ${from.top}px)`,
    });
    const copy = source.cloneNode(true);
    copy.removeAttribute("id");
    copy.querySelectorAll("[id]").forEach(element => element.removeAttribute("id"));
    Object.assign(copy.style, {
      position: "absolute", inset: "0 auto auto 0", margin: "0",
      width: `${from.width}px`, height: `${from.height}px`,
      minHeight: "0", transform: "none", opacity: "1", visibility: "visible",
    });
    stage.append(copy);

    const backdrop = document.createElement("div");
    backdrop.className = "dart-flight-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.style.background = originalBackground;
    backdrop.style.opacity = "0";

    dialog.dataset.dartLaunch = "entering";
    dialog.append(backdrop, stage);
    source.style.visibility = "hidden";
    phone.style.opacity = "0";
    phone.style.transformOrigin = "0 0";
    phone.inert = true;
    surroundings.forEach(element => { element.style.opacity = "0"; });

    const release = completed => {
      if (stopped) return;
      stopped = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      animations.forEach(animation => animation.cancel());
      stage.remove();
      backdrop.remove();
      source.style.visibility = sourceVisibility;
      phone.style.opacity = phoneOpacity;
      phone.style.transformOrigin = phoneOrigin;
      phone.inert = phoneInert;
      surroundings.forEach((element, index) => { element.style.opacity = opacities[index]; });
      window.removeEventListener("resize", finish);
      window.visualViewport?.removeEventListener("resize", finish);
      document.removeEventListener("visibilitychange", visibilityChanged);
      document.removeEventListener("keydown", keyboard, true);
      reducedMotion.removeEventListener?.("change", preferenceChanged);
      if (completed) {
        enteredDialogs.add(dialog);
        // Keep the legacy case-in animation suppressed until this dialog closes.
        dialog.dataset.dartLaunch = "complete";
        if (dialog.isConnected && (document.activeElement === dialog || document.activeElement === document.body)) {
          home.focus({ preventScroll: true });
        }
      } else {
        // Symmetric cleanup supports StrictMode, fast Escape and unmounts.
        delete dialog.dataset.dartLaunch;
      }
    };
    const finish = () => release(true);
    const keyboard = event => { if (event.key === "Tab") finish(); };
    const visibilityChanged = () => { if (document.hidden) finish(); };
    const preferenceChanged = () => { if (reducedMotion.matches) finish(); };
    const animate = (element, keyframes, options) => {
      const animation = element.animate(keyframes, { fill: "both", ...options });
      animations.push(animation);
      // cancel() rejects finished; always handle it, including during unmount.
      animation.finished.catch(() => {});
      return animation;
    };

    window.addEventListener("resize", finish);
    window.visualViewport?.addEventListener("resize", finish);
    document.addEventListener("visibilitychange", visibilityChanged);
    document.addEventListener("keydown", keyboard, true);
    reducedMotion.addEventListener?.("change", preferenceChanged);

    // Measure after DArtExperience's existing body scroll lock and focus effects.
    // The source copy covers the first frame, so the full-size phone never flashes.
    frame = window.requestAnimationFrame(() => {
      if (stopped) return;
      const to = phone.getBoundingClientRect();
      if (!to.width || !to.height) { finish(); return; }
      try {
        animate(stage, [
          { transform: `translate(${from.left}px, ${from.top}px) scale(1, 1)` },
          { transform: `translate(${to.left}px, ${to.top}px) scale(${to.width / from.width}, ${to.height / from.height})` },
        ], { duration: DURATION, easing: EASING });
        const movement = animate(phone, [
          { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})` },
          { transform: "translate(0, 0) scale(1, 1)" },
        ], { duration: DURATION, easing: EASING });
        animate(stage, [{ opacity: 1 }, { opacity: 0 }], { delay: 130, duration: 170, easing: "ease-in-out" });
        animate(phone, [{ opacity: 0 }, { opacity: 1 }], { delay: 100, duration: 170, easing: "ease-in-out" });
        animate(backdrop, [{ opacity: 0 }, { opacity: 1 }], { duration: 440, easing: "ease-out" });
        surroundings.forEach(element => {
          animate(element, [{ opacity: 0 }, { opacity: 1 }], { delay: 260, duration: 420, easing: "ease-out" });
        });
        movement.finished.then(finish, finish);
        timeout = window.setTimeout(finish, DURATION + 180);
      } catch {
        // The ordering demo remains usable even when a browser rejects an animation.
        finish();
      }
    });

    return () => release(false);
  }, []);

  return homeRef;
}
