import databaseClient from "../database/client.js";

class NanoSuitsRepository {
	async read(id) {
		const [rows] = await databaseClient.query(
			`
            SELECT
                o.Objet_id AS id,
                o.Objet_arsenal_id_fk,
                o.Objet_type_id_fk,
                t_fr.TraductionObjet_value AS title_fr,
                t_en.TraductionObjet_value AS title_en,
                a_picture.AttributObjet_value AS picture,
				a_star_colored.AttributObjet_value AS star_fill_blue
            FROM Objet o
            LEFT JOIN TraductionObjet t_fr ON t_fr.TraductionObjet_id_objet_fk = o.Objet_id AND t_fr.TraductionObjet_Langages = 'fr' AND t_fr.TraductionObjet_fields = 'Titre'
            LEFT JOIN TraductionObjet t_en ON t_en.TraductionObjet_id_objet_fk = o.Objet_id AND t_en.TraductionObjet_fields = 'Titre' AND t_en.TraductionObjet_Langages = 'en'
            LEFT JOIN AttributObjet a_picture ON a_picture.AttributObjet_id_objet_fk = o.Objet_id AND a_picture.AttributObjet_name = 'Picture'
			LEFT JOIN AttributObjet a_star_colored ON a_star_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_star_colored.AttributObjet_name = 'star_colored'
            WHERE o.Objet_id = ? AND o.Objet_type_id_fk = 3
            `,
			[id],
		);
		return rows[0] ?? null;
	}

	async readAll() {
		const [rows] = await databaseClient.query(
			`
        SELECT DISTINCT
            o.Objet_id AS id,
            o.Objet_arsenal_id_fk,
            o.Objet_type_id_fk,
            t_fr.TraductionObjet_value AS title_fr,
            t_en.TraductionObjet_value AS title_en,
            a_picture.AttributObjet_value AS picture,
            txt1_fr.TraductionObjet_value AS text_1_fr,
            txt1_en.TraductionObjet_value AS text_1_en,
            txt2_fr.TraductionObjet_value AS text_2_fr,
            txt2_en.TraductionObjet_value AS text_2_en,
            where_title_fr.TraductionObjet_value AS where_title_fr,
            where_title_en.TraductionObjet_value AS where_title_en,
            where_text_fr.TraductionObjet_value AS where_text_fr,
            where_text_en.TraductionObjet_value AS where_text_en,
            a_stars.AttributObjet_value AS stars,
            a_star_gray.AttributObjet_value AS star_gray,
            a_star_1.AttributObjet_value AS star_1,
            a_star_2.AttributObjet_value AS star_2,
            a_star_3.AttributObjet_value AS star_3
        FROM Objet o
        LEFT JOIN TraductionObjet t_fr ON t_fr.TraductionObjet_id_objet_fk = o.Objet_id AND t_fr.TraductionObjet_Langages = 'fr' AND t_fr.TraductionObjet_fields = 'Titre'
        LEFT JOIN TraductionObjet t_en ON t_en.TraductionObjet_id_objet_fk = o.Objet_id AND t_en.TraductionObjet_fields = 'Titre' AND t_en.TraductionObjet_Langages = 'en'
        LEFT JOIN AttributObjet a_picture ON a_picture.AttributObjet_id_objet_fk = o.Objet_id AND a_picture.AttributObjet_name = 'Picture'
        LEFT JOIN TraductionObjet txt1_fr ON txt1_fr.TraductionObjet_id_objet_fk = o.Objet_id AND txt1_fr.TraductionObjet_Langages = 'fr' AND txt1_fr.TraductionObjet_fields = 'Text_1'
        LEFT JOIN TraductionObjet txt1_en ON txt1_en.TraductionObjet_id_objet_fk = o.Objet_id AND txt1_en.TraductionObjet_Langages = 'en' AND txt1_en.TraductionObjet_fields = 'Text_1'
        LEFT JOIN TraductionObjet txt2_fr ON txt2_fr.TraductionObjet_id_objet_fk = o.Objet_id AND txt2_fr.TraductionObjet_Langages = 'fr' AND txt2_fr.TraductionObjet_fields = 'Text_2'
        LEFT JOIN TraductionObjet txt2_en ON txt2_en.TraductionObjet_id_objet_fk = o.Objet_id AND txt2_en.TraductionObjet_Langages = 'en' AND txt2_en.TraductionObjet_fields = 'Text_2'
        LEFT JOIN TraductionObjet where_title_fr ON where_title_fr.TraductionObjet_id_objet_fk = o.Objet_id AND where_title_fr.TraductionObjet_Langages = 'fr' AND where_title_fr.TraductionObjet_fields = 'WhereTitre'
        LEFT JOIN TraductionObjet where_title_en ON where_title_en.TraductionObjet_id_objet_fk = o.Objet_id AND where_title_en.TraductionObjet_Langages = 'en' AND where_title_en.TraductionObjet_fields = 'WhereTitre'
        LEFT JOIN TraductionObjet where_text_fr ON where_text_fr.TraductionObjet_id_objet_fk = o.Objet_id AND where_text_fr.TraductionObjet_Langages = 'fr' AND where_text_fr.TraductionObjet_fields = 'WhereText'
        LEFT JOIN TraductionObjet where_text_en ON where_text_en.TraductionObjet_id_objet_fk = o.Objet_id AND where_text_en.TraductionObjet_Langages = 'en' AND where_text_en.TraductionObjet_fields = 'WhereText'
        LEFT JOIN AttributObjet a_stars ON a_stars.AttributObjet_id_objet_fk = o.Objet_id AND a_stars.AttributObjet_name = 'Nano-Suits_star_colored'
        LEFT JOIN AttributObjet a_star_gray ON a_star_gray.AttributObjet_id_objet_fk = o.Objet_id AND a_star_gray.AttributObjet_name = 'Nano-Suits_star_gray'
        LEFT JOIN AttributObjet a_star_1 ON a_star_1.AttributObjet_id_objet_fk = o.Objet_id AND a_star_1.AttributObjet_name = 'Nano-Suits_star_1'
        LEFT JOIN AttributObjet a_star_2 ON a_star_2.AttributObjet_id_objet_fk = o.Objet_id AND a_star_2.AttributObjet_name = 'Nano-Suits_star_2'
        LEFT JOIN AttributObjet a_star_3 ON a_star_3.AttributObjet_id_objet_fk = o.Objet_id AND a_star_3.AttributObjet_name = 'Nano-Suits_star_3'
        WHERE o.Objet_type_id_fk = 3
        `,
		);
		console.log("NanoSuits SQL result:", rows);
		return rows;
	}

	async getIdAndTitle() {
		const [rows] = await databaseClient.query(
			`
            SELECT
                o.Objet_id AS id,
                t_fr.TraductionObjet_value AS title_fr,
                t_en.TraductionObjet_value AS title_en
            FROM Objet o
            LEFT JOIN TraductionObjet t_fr ON t_fr.TraductionObjet_id_objet_fk = o.Objet_id AND t_fr.TraductionObjet_Langages = 'fr' AND t_fr.TraductionObjet_fields = 'Titre'
            LEFT JOIN TraductionObjet t_en ON t_en.TraductionObjet_id_objet_fk = o.Objet_id AND t_en.TraductionObjet_fields = 'Titre' AND t_en.TraductionObjet_Langages = 'en'
            WHERE o.Objet_type_id_fk = 3
            `,
		);
		return rows;
	}
}

export default new NanoSuitsRepository();
