import databaseClient from "../database/client.js";

class GearsRepository {
	async read(id) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Objet WHERE Objet_id = ?",
			[id],
		);
		return rows[0] ?? null;
	}

	async readAllFr() {
		const [rows] = await databaseClient.query(`
        SELECT
            o.Objet_id AS id,
            t_fr.TraductionObjet_value AS Gears_title,
            a_icon.AttributObjet_value AS Gears_icon,
            a_colored.AttributObjet_value AS Gears_icon_colored,
            a_mk2.AttributObjet_value AS Gears_icon_Mk2,
            a_mk2_colored.AttributObjet_value AS Gears_icon_Mk2_colored,
            skill1_fr.TraductionObjet_value AS Gears_skill_1,
            skill2_fr.TraductionObjet_value AS Gears_skill_2,
            txt1_fr.TraductionObjet_value AS Gears_text_1,
            txt2_fr.TraductionObjet_value AS Gears_text_2,
            a_Gears_star_1.AttributObjet_value AS Gears_star_1,
            a_Gears_star_2.AttributObjet_value AS Gears_star_2,
            a_Gears_star_3.AttributObjet_value AS Gears_star_3,
			a_Gears_stat_1.AttributObjet_value AS Gears_stat_1,
			a_Gears_stat_2.AttributObjet_value AS Gears_stat_2,
            a_Gears_star.AttributObjet_value AS Gears_star,
            a_Gears_star_colored.AttributObjet_value AS Gears_star_colored
        FROM Objet o
        JOIN TypeObjet t ON o.Objet_type_id_fk = t.TypeObjet_id
        LEFT JOIN TraductionObjet t_fr ON t_fr.TraductionObjet_id_objet_fk = o.Objet_id AND t_fr.TraductionObjet_Langages = 'fr' AND t_fr.TraductionObjet_fields = 'Titre'
        LEFT JOIN TraductionObjet skill1_fr ON skill1_fr.TraductionObjet_id_objet_fk = o.Objet_id AND skill1_fr.TraductionObjet_Langages = 'fr' AND skill1_fr.TraductionObjet_fields = 'Skill_1'
        LEFT JOIN TraductionObjet skill2_fr ON skill2_fr.TraductionObjet_id_objet_fk = o.Objet_id AND skill2_fr.TraductionObjet_Langages = 'fr' AND skill2_fr.TraductionObjet_fields = 'Skill_2'
        LEFT JOIN TraductionObjet txt1_fr ON txt1_fr.TraductionObjet_id_objet_fk = o.Objet_id AND txt1_fr.TraductionObjet_Langages = 'fr' AND txt1_fr.TraductionObjet_fields = 'Text_1'
        LEFT JOIN TraductionObjet txt2_fr ON txt2_fr.TraductionObjet_id_objet_fk = o.Objet_id AND txt2_fr.TraductionObjet_Langages = 'fr' AND txt2_fr.TraductionObjet_fields = 'Text_2'
        LEFT JOIN AttributObjet a_icon ON a_icon.AttributObjet_id_objet_fk = o.Objet_id AND a_icon.AttributObjet_name = 'Gears_icon'
        LEFT JOIN AttributObjet a_colored ON a_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_colored.AttributObjet_name = 'Gears_icon_colored'
        LEFT JOIN AttributObjet a_mk2 ON a_mk2.AttributObjet_id_objet_fk = o.Objet_id AND a_mk2.AttributObjet_name = 'Gears_icon_Mk2'
        LEFT JOIN AttributObjet a_mk2_colored ON a_mk2_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_mk2_colored.AttributObjet_name = 'Gears_icon_Mk2_colored'
        LEFT JOIN AttributObjet a_Gears_star_1 ON a_Gears_star_1.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_1.AttributObjet_name = 'Gears_star_1'
        LEFT JOIN AttributObjet a_Gears_star_2 ON a_Gears_star_2.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_2.AttributObjet_name = 'Gears_star_2'
        LEFT JOIN AttributObjet a_Gears_star_3 ON a_Gears_star_3.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_3.AttributObjet_name = 'Gears_star_3'
        LEFT JOIN AttributObjet a_Gears_star ON a_Gears_star.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star.AttributObjet_name = 'Gears_star'
		LEFT JOIN AttributObjet a_Gears_stat_1 ON a_Gears_stat_1.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_stat_1.AttributObjet_name = 'Gears_stat_1'
		LEFT JOIN AttributObjet a_Gears_stat_2 ON a_Gears_stat_2.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_stat_2.AttributObjet_name = 'Gears_stat_2'
        LEFT JOIN AttributObjet a_Gears_star_colored ON a_Gears_star_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_colored.AttributObjet_name = 'Gears_star_colored'
        WHERE t.TypeObjet_name = 'Gears'
          AND t_fr.TraductionObjet_value IS NOT NULL
    `);
		return rows;
	}

	async readAllEn() {
		const [rows] = await databaseClient.query(`
        SELECT
            o.Objet_id AS id,
            t_en.TraductionObjet_value AS Gears_title,
            a_icon.AttributObjet_value AS Gears_icon,
            a_colored.AttributObjet_value AS Gears_icon_colored,
            a_mk2.AttributObjet_value AS Gears_icon_Mk2,
            a_mk2_colored.AttributObjet_value AS Gears_icon_Mk2_colored,
            skill1_en.TraductionObjet_value AS Gears_skill_1,
            skill2_en.TraductionObjet_value AS Gears_skill_2,
            txt1_en.TraductionObjet_value AS Gears_text_1,
            txt2_en.TraductionObjet_value AS Gears_text_2,
            a_Gears_star_1.AttributObjet_value AS Gears_star_1,
            a_Gears_star_2.AttributObjet_value AS Gears_star_2,
            a_Gears_star_3.AttributObjet_value AS Gears_star_3,
			a_Gears_stat_1.AttributObjet_value AS Gears_stat_1,
			a_Gears_stat_2.AttributObjet_value AS Gears_stat_2,
            a_Gears_star.AttributObjet_value AS Gears_star,
            a_Gears_star_colored.AttributObjet_value AS Gears_star_colored
        FROM Objet o
        JOIN TypeObjet t ON o.Objet_type_id_fk = t.TypeObjet_id
        LEFT JOIN TraductionObjet t_en ON t_en.TraductionObjet_id_objet_fk = o.Objet_id AND t_en.TraductionObjet_Langages = 'en' AND t_en.TraductionObjet_fields = 'Titre'
        LEFT JOIN TraductionObjet skill1_en ON skill1_en.TraductionObjet_id_objet_fk = o.Objet_id AND skill1_en.TraductionObjet_Langages = 'en' AND skill1_en.TraductionObjet_fields = 'Skill_1'
        LEFT JOIN TraductionObjet skill2_en ON skill2_en.TraductionObjet_id_objet_fk = o.Objet_id AND skill2_en.TraductionObjet_Langages = 'en' AND skill2_en.TraductionObjet_fields = 'Skill_2'
        LEFT JOIN TraductionObjet txt1_en ON txt1_en.TraductionObjet_id_objet_fk = o.Objet_id AND txt1_en.TraductionObjet_Langages = 'en' AND txt1_en.TraductionObjet_fields = 'Text_1'
        LEFT JOIN TraductionObjet txt2_en ON txt2_en.TraductionObjet_id_objet_fk = o.Objet_id AND txt2_en.TraductionObjet_Langages = 'en' AND txt2_en.TraductionObjet_fields = 'Text_2'
        LEFT JOIN AttributObjet a_icon ON a_icon.AttributObjet_id_objet_fk = o.Objet_id AND a_icon.AttributObjet_name = 'Gears_icon'
        LEFT JOIN AttributObjet a_colored ON a_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_colored.AttributObjet_name = 'Gears_icon_colored'
        LEFT JOIN AttributObjet a_mk2 ON a_mk2.AttributObjet_id_objet_fk = o.Objet_id AND a_mk2.AttributObjet_name = 'Gears_icon_Mk2'
        LEFT JOIN AttributObjet a_mk2_colored ON a_mk2_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_mk2_colored.AttributObjet_name = 'Gears_icon_Mk2_colored'
        LEFT JOIN AttributObjet a_Gears_star_1 ON a_Gears_star_1.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_1.AttributObjet_name = 'Gears_star_1'
        LEFT JOIN AttributObjet a_Gears_star_2 ON a_Gears_star_2.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_2.AttributObjet_name = 'Gears_star_2'
        LEFT JOIN AttributObjet a_Gears_star_3 ON a_Gears_star_3.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_3.AttributObjet_name = 'Gears_star_3'
		LEFT JOIN AttributObjet a_Gears_stat_1 ON a_Gears_stat_1.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_stat_1.AttributObjet_name = 'Gears_stat_1'
		LEFT JOIN AttributObjet a_Gears_stat_2 ON a_Gears_stat_2.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_stat_2.AttributObjet_name = 'Gears_stat_2'
        LEFT JOIN AttributObjet a_Gears_star ON a_Gears_star.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star.AttributObjet_name = 'Gears_star'
        LEFT JOIN AttributObjet a_Gears_star_colored ON a_Gears_star_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_Gears_star_colored.AttributObjet_name = 'Gears_star_colored'
        WHERE t.TypeObjet_name = 'Gears'
		AND t_en.TraductionObjet_value IS NOT NULL
    `);
		return rows;
	}

	async create(data) {
		const [result] = await databaseClient.query("INSERT INTO Objet SET ?", [
			data,
		]);
		return { Objet_id: result.insertId, ...data };
	}

	async update(id, data) {
		const [result] = await databaseClient.query(
			"UPDATE Objet SET ? WHERE Objet_id = ?",
			[data, id],
		);
		if (result.affectedRows === 0) return null;
		return { Objet_id: id, ...data };
	}

	async delete(id) {
		const [result] = await databaseClient.query(
			"DELETE FROM Objet WHERE Objet_id = ?",
			[id],
		);
		return result.affectedRows > 0;
	}
}

export default new GearsRepository();
