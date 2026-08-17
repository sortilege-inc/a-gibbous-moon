/* veil/rail.js — section rail (table of contents) for the Keeper's pages.
   Built from the headings inside .gm-panel, so no anchor need be hand-authored
   and the rail can never drift out of sync with the page. H2s are always listed;
   the H3s under the section you are reading expand. Scroll-spy marks the current
   section. Off-canvas drawer with a toggle below ~1280px (see crescent.css).
   Modelled on the Portents & Fortunes rail. */
(function () {
  "use strict";
  function slug(s) {
    return s.toLowerCase().replace(/[‘’“”]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  }
  function build() {
    var panel = document.querySelector(".gm-panel");
    if (!panel) return;
    var heads = [].slice.call(panel.querySelectorAll("h2,h3"))
      .filter(function (h) { return !h.classList.contains("veil-source"); });
    if (heads.length < 3) return; // not worth a rail on a short page

    var used = {};
    heads.forEach(function (h) {
      var id = h.id || slug(h.textContent) || "s";
      if (used[id]) id = id + "-" + (++used[id]); else used[id] = 1;
      h.id = id;
      h.style.scrollMarginTop = "5rem"; // clear the sticky topnav
    });

    var rail = document.createElement("nav");
    rail.className = "veilrail";
    rail.setAttribute("aria-label", "Sections on this page");
    rail.innerHTML = '<div class="vr-title">On this page</div>';
    var list = document.createElement("ul");
    rail.appendChild(list);

    function link(h) {
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.dataset.for = h.id;
      a.dataset.kind = h.tagName.toLowerCase();
      a.textContent = h.textContent.replace(/☾/g, "").replace(/\s+/g, " ").trim();
      a.addEventListener("click", function () { rail.classList.remove("open"); });
      return a;
    }

    var grp = null, subs = null;
    heads.forEach(function (h) {
      if (h.tagName === "H2") {
        grp = document.createElement("li"); grp.className = "vr-grp";
        grp.appendChild(link(h));
        subs = document.createElement("ul"); grp.appendChild(subs);
        list.appendChild(grp);
      } else if (subs) {
        var li = document.createElement("li"); li.className = "vr-h3";
        li.appendChild(link(h)); subs.appendChild(li);
      }
    });

    var btn = document.createElement("button");
    btn.className = "veilrail-toggle"; btn.type = "button";
    btn.innerHTML = '<span aria-hidden="true">&#9776;</span> Sections';
    btn.addEventListener("click", function () { rail.classList.toggle("open"); });

    document.body.appendChild(rail);
    document.body.appendChild(btn);
    spy(rail, heads);
  }

  function spy(rail, heads) {
    var links = {};
    [].forEach.call(rail.querySelectorAll("a"), function (a) { links[a.dataset.for] = a; });
    var current = null, ticking = false;
    function update() {
      ticking = false;
      var best = heads[0], line = 110;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].getBoundingClientRect().top <= line) best = heads[i]; else break;
      }
      if (best.id === current) return;
      current = best.id;
      [].forEach.call(rail.querySelectorAll("a.on"), function (a) { a.classList.remove("on"); });
      [].forEach.call(rail.querySelectorAll(".vr-grp.open"), function (g) { g.classList.remove("open"); });
      var a = links[best.id]; if (!a) return;
      a.classList.add("on");
      var g = a.closest(".vr-grp"); if (g) g.classList.add("open");
      if (a.dataset.kind === "h3" && g) { g.querySelector("a").classList.add("on"); }
      var r = a.getBoundingClientRect(), rr = rail.getBoundingClientRect();
      if (r.top < rr.top + 8 || r.bottom > rr.bottom - 8) a.scrollIntoView({ block: "nearest" });
    }
    addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
