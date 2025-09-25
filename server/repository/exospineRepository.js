import databaseClient from "../database/client.js";

class ObjetRepository {
	async read(id) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Objet WHERE Objet_id = ?",
			[id],
		);
		return rows[0] ?? null;
	}

	async readAll() {
		const [rows] = await databaseClient.query(`
        SELECT
            o.Objet_id AS id,
            t_fr.TraductionObjet_value AS title,
            t_fr.TraductionObjet_value AS Exospine_title_fr,
            t_en.TraductionObjet_value AS Exospine_title_en,
            o.Objet_image AS Exospine_icon,
            a_colored.AttributObjet_value AS Exospine_icon_colored,
            a_mk2.AttributObjet_value AS Exospine_icon_Mk2,
            a_mk2_colored.AttributObjet_value AS Exospine_icon_Mk2_colored,
            skill1.TraductionObjet_value AS Skill_1,
            skill2.TraductionObjet_value AS Skill_2,
            skill3.TraductionObjet_value AS Skill_3,
            txt1.TraductionObjet_value AS text_1,
            txt2.TraductionObjet_value AS text_2,
            a_Exospine_bar_1.AttributObjet_value AS Exospine_bar_1,
            a_Exospine_bar_2.AttributObjet_value AS Exospine_bar_2,
            a_Exospine_bar_3.AttributObjet_value AS Exospine_bar_3
        FROM Objet o
        JOIN TypeObjet t ON o.Objet_type_id_fk = t.TypeObjet_id
        LEFT JOIN TraductionObjet t_fr ON t_fr.TraductionObjet_id_objet_fk = o.Objet_id AND t_fr.TraductionObjet_Langages = 'fr' AND t_fr.TraductionObjet_fields = 'Titre'
        LEFT JOIN TraductionObjet t_en ON t_en.TraductionObjet_id_objet_fk = o.Objet_id AND t_en.TraductionObjet_Langages = 'en' AND t_en.TraductionObjet_fields = 'Titre'
        LEFT JOIN AttributObjet a_colored ON a_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_colored.AttributObjet_name = 'Exospine_icon_colored'
        LEFT JOIN AttributObjet a_mk2 ON a_mk2.AttributObjet_id_objet_fk = o.Objet_id AND a_mk2.AttributObjet_name = 'Exospine_icon_Mk2'
        LEFT JOIN AttributObjet a_mk2_colored ON a_mk2_colored.AttributObjet_id_objet_fk = o.Objet_id AND a_mk2_colored.AttributObjet_name = 'Exospine_icon_Mk2_colored'
        LEFT JOIN AttributObjet a_Exospine_bar_1 ON a_Exospine_bar_1.AttributObjet_id_objet_fk = o.Objet_id AND a_Exospine_bar_1.AttributObjet_name = 'Exospine_bar_1'
        LEFT JOIN AttributObjet a_Exospine_bar_2 ON a_Exospine_bar_2.AttributObjet_id_objet_fk = o.Objet_id AND a_Exospine_bar_2.AttributObjet_name = 'Exospine_bar_2'
        LEFT JOIN AttributObjet a_Exospine_bar_3 ON a_Exospine_bar_3.AttributObjet_id_objet_fk = o.Objet_id AND a_Exospine_bar_3.AttributObjet_name = 'Exospine_bar_3'
        LEFT JOIN TraductionObjet skill1 ON skill1.TraductionObjet_id_objet_fk = o.Objet_id AND skill1.TraductionObjet_Langages = 'fr' AND skill1.TraductionObjet_fields = 'Skill_1'
        LEFT JOIN TraductionObjet skill2 ON skill2.TraductionObjet_id_objet_fk = o.Objet_id AND skill2.TraductionObjet_Langages = 'fr' AND skill2.TraductionObjet_fields = 'Skill_2'
        LEFT JOIN TraductionObjet skill3 ON skill3.TraductionObjet_id_objet_fk = o.Objet_id AND skill3.TraductionObjet_Langages = 'fr' AND skill3.TraductionObjet_fields = 'Skill_3'
        LEFT JOIN TraductionObjet txt1 ON txt1.TraductionObjet_id_objet_fk = o.Objet_id AND txt1.TraductionObjet_Langages = 'fr' AND txt1.TraductionObjet_fields = 'text_1'
        LEFT JOIN TraductionObjet txt2 ON txt2.TraductionObjet_id_objet_fk = o.Objet_id AND txt2.TraductionObjet_Langages = 'fr' AND txt2.TraductionObjet_fields = 'text_2'
        WHERE t.TypeObjet_name = 'Exospine'
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

export default new ObjetRepository();
