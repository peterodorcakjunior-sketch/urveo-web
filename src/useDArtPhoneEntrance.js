import { useLayoutEffect, useRef } from "react";
import "./DArtPhoneEntrance.css";

// A home/menu/home round trip must not replay the dialog's entrance.
// Weak references also let closed dialogs be garbage-collected.
const enteredDialogs = new WeakSet();
const DURATION = 1400;
const EASING = "cubic-bezier(.42, 0, .2, 1)";

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
    let viewport = null;

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
      window.removeEventListener("resize", viewportChanged);
      window.visualViewport?.removeEventListener("resize", viewportChanged);
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
    // Locking body scroll can emit a resize without a real window resize.
    // Do not let that notification finish the flight before it is visible.
    const readViewport = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
      visualHeight: window.visualViewport?.height ?? window.innerHeight,
      scale: window.visualViewport?.scale ?? 1,
    });
    const viewportChanged = () => {
      // The first frame measures after the dialog's scroll lock has settled.
      if (!viewport) return;
      const next = readViewport();
      if (Math.abs(next.width - viewport.width) > 1
        || Math.abs(next.height - viewport.height) > 1
        || Math.abs(next.visualHeight - viewport.visualHeight) > 1
        || Math.abs(next.scale - viewport.scale) > .01) finish();
    };
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

    window.addEventListener("resize", viewportChanged);
    window.visualViewport?.addEventListener("resize", viewportChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    document.addEventListener("keydown", keyboard, true);
    reducedMotion.addEventListener?.("change", preferenceChanged);

    // Measure after DArtExperience's existing body scroll lock and focus effects.
    // The source copy covers the first frame, so the full-size phone never flashes.
    frame = window.requestAnimationFrame(() => {
      if (stopped) return;
      viewport = readViewport();
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
        // Keep the recognisable preview visible for most of the movement.
        animate(stage, [{ opacity: 1 }, { opacity: 0 }], { delay: 720, duration: 360, easing: "ease-in-out" });
        animate(phone, [{ opacity: 0 }, { opacity: 1 }], { delay: 700, duration: 360, easing: "ease-in-out" });
        animate(backdrop, [{ opacity: 0 }, { opacity: 1 }], { delay: 180, duration: 1000, easing: "ease-in-out" });
        surroundings.forEach(element => {
          animate(element, [{ opacity: 0 }, { opacity: 1 }], { delay: 930, duration: 470, easing: "ease-out" });
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
