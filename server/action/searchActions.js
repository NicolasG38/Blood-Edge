import exospineController from "../controller/exospineController.js";
import gearsController from "../controller/gearsController.js";
import nanoSuitsRepository from "../repository/nanoSuitsRepository.js";
import locationsRepository from "../repository/locationsRepository.js";
import storesRepository from "../repository/storesRepository.js";
import usersRepository from "../repository/usersRepository.js";


function normStr(v) {
  return (v ?? "").toString().trim();
}

function makeOrigin(req) {
  const proto = req.headers["x-forwarded-proto"] || req.protocol || "http";
  const host = req.headers["x-forwarded-host"] || req.get("host");
  return `${proto}://${host}`;
}

function toAbs(origin, p) {
  const s = normStr(p);
  if (!s) return undefined;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return `${origin}${s.startsWith("/") ? s : `/${s}`}`;
}

export async function search(req, res) {
  try {
    const origin = makeOrigin(req);
    const qRaw = normStr(req.query.q);
    const q = qRaw.toLowerCase();
    const limit = Number.parseInt(normStr(req.query.limit) || "10", 10) || 10;

    if (!q) return res.json([]);

    const results = [];

    // 1) Exospine
    try {
      const exo = await exospineController.readAll();
      for (const r of exo) {
        const title = normStr(r.Exospine_title_fr || r.Exospine_title_en);
        if (title.toLowerCase().includes(q)) {
          results.push({
            id: r.id ?? r.Objet_id ?? title,
            title,
            icon: toAbs(origin, r.Exospine_icon || r.Exospine_icon_colored),
            href: "/arsenal/exospine",
          });
        }
      }
    } catch {}

    // 2) Gears (FR par défaut)
    try {
      const gearsFr = await gearsController.readAllFr();
      for (const r of gearsFr) {
        const title = normStr(r.Gears_title || r.title);
        if (title.toLowerCase().includes(q)) {
          results.push({
            id: r.id ?? title,
            title,
            icon: toAbs(
              origin,
              r.Gears_icon || r.Gears_icon_colored || r.Gears_icon_Mk2,
            ),
            href: "/arsenal/gears",
          });
        }
      }
    } catch {}

    // 3) Nano-suits (FR par défaut)
    try {
      const ns = await nanoSuitsRepository.readAll();
      for (const r of ns) {
        const title = normStr(r.title_fr || r.title_en);
        if (title.toLowerCase().includes(q)) {
          results.push({
            id: r.id ?? title,
            title,
            icon: toAbs(origin, r.picture),
            href: "/arsenal/nano-suits",
          });
        }
      }
    } catch {}

    // 4) Locations
    try {
      const locs = await locationsRepository.readAll();
      for (const r of locs) {
        const title = normStr(r.Locations_name_fr || r.Locations_name_en);
        if (title && title.toLowerCase().includes(q)) {
          results.push({
            id: r.Locations_id ?? title,
            title,
            icon: toAbs(origin, r.Locations_icon_black || r.Locations_icon_white),
            href: "/",
          });
        }
      }
    } catch {}

    // 5) Stores
    try {
      const stores = await storesRepository.readAll();
      for (const r of stores) {
        const title = normStr(r.Stores_title || r.title);
        if (title.toLowerCase().includes(q)) {
          results.push({ id: r.Stores_id ?? title, title, href: "/" });
        }
      }
    } catch {}

    // 6) Users (pseudo/email), href désactivé pour l'instant
    try {
      const users = await usersRepository.searchByQuery(q, limit);
      for (const r of users) {
        const pseudo = normStr(r.Users_pseudo);
        if (pseudo) {
          results.push({ id: r.Users_id ?? pseudo, title: pseudo, href: `/dashboard/${encodeURIComponent(pseudo)}` });
        }
      }
    } catch {}

    // 6) Users (pseudo/email, title = pseudo, href vers profil utilisateur)
try {
  const users = await usersRepository.searchByQuery(q, limit);
  for (const r of users) {
    const pseudo = normStr(r.Users_pseudo);
    if (pseudo) {
      results.push({
        id: r.Users_id ?? pseudo,
        title: pseudo,
        href: `/dashboard/${encodeURIComponent(pseudo)}`, 
      });
    }
  }
} catch {}

    // Déduplique par (id|title)
    const seen = new Set();
    const deduped = [];
    for (const h of results) {
      const k = `${String(h.id)}|${h.title}`;
      if (!seen.has(k)) {
        seen.add(k);
        deduped.push(h);
      }
      if (deduped.length >= limit) break;
    }

    return res.json(deduped.slice(0, limit));
  } catch (e) {
    console.error("[search] error:", e);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}

export default { search };
