/**
 * Repository search with optional SQL-side trigram support (Postgres pg_trgm).
 *
 * Usage:
 *   const { search } = require("./searchBarRepository");
 *   const results = await search("query", 5, { fuzzy: true });
 *
 * Behaviour:
 * - If process.env.DB_CLIENT === 'pg' OR process.env.DB_TYPE === 'postgres' the code
 *   will try to use pg_trgm similarity() in SQL (requires pg_trgm extension).
 * - Otherwise it falls back to parameterized LIKE queries (MySQL fallback).
 *
 * Returned rows: array of { type: 'objet'|'user', id, title, icon, href, _sim? }
 */

import databaseClient from "../database/client.js";

async function _normalizeResultRows(rawRows, dbType) {
	if (!Array.isArray(rawRows)) return [];
	return rawRows.map((r) => {
		const icon = r.icon || null;
		const href =
			r.href ||
			(r.type === "user"
				? `/dashboard/${encodeURIComponent(r.title || r.id)}`
				: `/arsenal/${r.id}`);
		const out = {
			type: r.type || "objet",
			id: r.id,
			title: r.title || "",
			icon,
			href,
		};
		if (typeof r._sim !== "undefined") out._sim = Number(r._sim);
		return out;
	});
}

async function search(q, limit = 5, opts = { fuzzy: true }) {
	const query = (q || "").toString().trim();
	const max = Math.max(1, Math.min(50, Number(limit) || 5));
	if (!query) return [];

	const dbClientType = (
		process.env.DB_CLIENT ||
		process.env.DB_TYPE ||
		""
	).toLowerCase();
	const usePgTrgm =
		opts.fuzzy !== false &&
		(dbClientType === "pg" || dbClientType === "postgres");

	try {
		if (usePgTrgm) {
			// PostgreSQL + pg_trgm path
			// Requires: CREATE EXTENSION IF NOT EXISTS pg_trgm;
			const sql = `
        WITH obj AS (
          SELECT
            'objet'::text AS type,
            o.Objet_id AS id,
            COALESCE(t_fr.TraductionObjet_value, t_en.TraductionObjet_value, ar.Arsenal_title, CONCAT('Objet ', o.Objet_id)) AS title,
            COALESCE(a_colored.AttributObjet_value, a.AttributObjet_value) AS icon,
            COALESCE(ar.Arsenal_link, '') AS arsenal_link,
            GREATEST(
              similarity(COALESCE(t_fr.TraductionObjet_value,''), $1),
              similarity(COALESCE(t_en.TraductionObjet_value,''), $1),
              similarity(COALESCE(ar.Arsenal_title,''), $1)
            ) AS _sim
          FROM Objet o
          LEFT JOIN Arsenal ar ON ar.Arsenal_id = o.Objet_arsenal_id_fk
          LEFT JOIN TraductionObjet t_fr ON t_fr.TraductionObjet_id_objet_fk = o.Objet_id AND t_fr.TraductionObjet_Langages = 'fr' AND t_fr.TraductionObjet_fields = 'Titre'
          LEFT JOIN TraductionObjet t_en ON t_en.TraductionObjet_id_objet_fk = o.Objet_id AND t_en.TraductionObjet_Langages = 'en' AND t_en.TraductionObjet_fields = 'Titre'
          LEFT JOIN AttributObjet a ON a.AttributObjet_id_objet_fk = o.Objet_id AND a.AttributObjet_name = 'Exospine_icon'
          LEFT JOIN AttributObjet a_colored ON a_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_colored.AttributObjet_name = 'Exospine_icon_colored'
          WHERE
            (COALESCE(t_fr.TraductionObjet_value, '') ILIKE '%'||$1||'%')
            OR (COALESCE(t_en.TraductionObjet_value, '') ILIKE '%'||$1||'%')
            OR (COALESCE(ar.Arsenal_title, '') ILIKE '%'||$1||'%')
            OR (CAST(o.Objet_id AS text) ILIKE '%'||$1||'%')
            OR (GREATEST(
                similarity(COALESCE(t_fr.TraductionObjet_value,''), $1),
                similarity(COALESCE(t_en.TraductionObjet_value,''), $1),
                similarity(COALESCE(ar.Arsenal_title,''), $1)
              ) > 0.05)
        ),
        usr AS (
          SELECT
            'user'::text AS type,
            u.Users_id AS id,
            COALESCE(u.Users_pseudo, u.Users_email) AS title,
            NULL::text AS icon,
            GREATEST(
              similarity(COALESCE(u.Users_pseudo,''), $1),
              similarity(COALESCE(u.Users_email,''), $1)
            ) AS _sim
          FROM Users u
          WHERE (u.Users_pseudo ILIKE '%'||$1||'%' OR u.Users_email ILIKE '%'||$1||'%')
            OR (GREATEST(similarity(COALESCE(u.Users_pseudo,''), $1), similarity(COALESCE(u.Users_email,''), $1)) > 0.05)
        )
        SELECT type, id, title, icon, COALESCE(NULL, '') as href, _sim FROM (
          SELECT * FROM obj
          UNION ALL
          SELECT * FROM usr
        ) t
        ORDER BY _sim DESC NULLS LAST
        LIMIT $2;
      `;
			const params = [query, max];
			const res = await databaseClient.query(sql, params);
			const rows = res.rows || res;
			return _normalizeResultRows(rows, "pg");
		}

		// Fallback (MySQL / generic) : param'd LIKE queries, return candidates.
		// We fetch more candidates and let controller/action do trigram ranking if needed.
		const like = `%${query}%`;
		const sql = `
      SELECT 'objet' AS type, o.Objet_id AS id,
        COALESCE(t_fr.TraductionObjet_value, t_en.TraductionObjet_value, ar.Arsenal_title, CONCAT('Objet ', o.Objet_id)) AS title,
        COALESCE(a_colored.AttributObjet_value, a.AttributObjet_value) AS icon,
        CONCAT('/arsenal/', COALESCE(ar.Arsenal_link, o.Objet_id)) AS href,
        0 AS _sim
      FROM Objet o
      LEFT JOIN Arsenal ar ON ar.Arsenal_id = o.Objet_arsenal_id_fk
      LEFT JOIN TraductionObjet t_fr ON t_fr.TraductionObjet_id_objet_fk = o.Objet_id AND t_fr.TraductionObjet_Langages = 'fr' AND t_fr.TraductionObjet_fields = 'Titre'
      LEFT JOIN TraductionObjet t_en ON t_en.TraductionObjet_id_objet_fk = o.Objet_id AND t_en.TraductionObjet_Langages = 'en' AND t_en.TraductionObjet_fields = 'Titre'
      LEFT JOIN AttributObjet a ON a.AttributObjet_id_objet_fk = o.Objet_id AND a.AttributObjet_name = 'Exospine_icon'
      LEFT JOIN AttributObjet a_colored ON a_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_colored.AttributObjet_name = 'Exospine_icon_colored'
      WHERE COALESCE(t_fr.TraductionObjet_value, t_en.TraductionObjet_value, ar.Arsenal_title, CONCAT('Objet ', o.Objet_id)) LIKE ?
      LIMIT ?
      ;
    `;

		const sqlUsers = `
      SELECT 'user' AS type, u.Users_id AS id,
        COALESCE(u.Users_pseudo, u.Users_email) AS title,
        NULL AS icon,
        CONCAT('/dashboard/', COALESCE(u.Users_pseudo, u.Users_id)) AS href,
        0 AS _sim
      FROM Users u
      WHERE u.Users_pseudo LIKE ? OR u.Users_email LIKE ?
      LIMIT ?
      ;
    `;

		// fetch candidates from both queries
		const [rowsObj] = await databaseClient.query(sql, [like, max * 2]);
		const [rowsUser] = await databaseClient.query(sqlUsers, [
			like,
			like,
			max * 2,
		]);

		const combined = []
			.concat(Array.isArray(rowsObj) ? rowsObj : [])
			.concat(Array.isArray(rowsUser) ? rowsUser : [])
			.slice(0, max * 3);

		return _normalizeResultRows(combined, "mysql");
	} catch (err) {
		// on error, return empty but log
		console.error("searchBarRepository.search error:", err);
		return [];
	}
}

async function findByPseudo(pseudo) {
  // requête SQL pour récupérer l'utilisateur par pseudo
  const [user] = await databaseClient.query(
    "SELECT Users_id, Users_pseudo, Users_email, Users_created_at FROM Users WHERE LOWER(Users_pseudo) = LOWER(?)",
    [pseudo],
  );

  if (!user[0]) return null;

  const [signupDate] = await databaseClient.query(
    "SELECT Users_created_at FROM Users WHERE Users_id = ?",
    [user[0].Users_id],
  );

  return {
    ...user[0],
    Users_created_at: signupDate[0]?.Users_created_at,
  };
}

async function searchByQuery(q, limit = 10) {
  const like = `%${q.toLowerCase()}%`;
  const [rows] = await databaseClient.query(
    `SELECT Users_id, Users_pseudo, Users_email
     FROM Users
     WHERE LOWER(Users_pseudo) LIKE ? OR LOWER(Users_email) LIKE ?
     ORDER BY Users_pseudo
     LIMIT ?`,
    [like, like, Number(limit) || 10],
  );
  return rows;
}

export default {
  findByPseudo,
  searchByQuery,
};
