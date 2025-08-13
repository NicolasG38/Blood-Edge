DROP DATABASE IF EXISTS BLOOD_EDGE;
CREATE DATABASE IF NOT EXISTS BLOOD_EDGE;
USE BLOOD_EDGE;

CREATE TABLE Section (
    Section_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Section_title VARCHAR(20) NOT NULL,
    Section_icons_gray VARCHAR(50) NOT NULL,
    Section_icons_black VARCHAR(50) NOT NULL
);

CREATE TABLE Arsenal(
    Arsenal_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Arsenal_title VARCHAR(30) NOT NULL,
    Arsenal_icons_gray VARCHAR(50) NOT NULL,
    Arsenal_icons_black VARCHAR(50) NOT NULL,
    Arsenal_link VARCHAR(50) NOT NULL,
    Arsenal_id_fk INT UNSIGNED NOT NULL,
    CONSTRAINT fk_arsenal_section
        FOREIGN KEY (Arsenal_id_fk) REFERENCES Section(Section_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Exospine(
    Exospine_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Exospine_stars_1 BOOLEAN DEFAULT TRUE,
    Exospine_stars_2 BOOLEAN DEFAULT FALSE,
    Exospine_stars_3 BOOLEAN DEFAULT FALSE,
    Exospine_title_fr VARCHAR(50) NOT NULL,
    Exospine_title_en VARCHAR(50) NOT NULL,
    Exospine_skill_1_fr VARCHAR(255) NOT NULL,
    Exospine_skill_1_en VARCHAR(255) NOT NULL,
    Exospine_skill_2_fr VARCHAR(255) NOT NULL,
    Exospine_skill_2_en VARCHAR(255) NOT NULL,
    Exospine_skill_3_fr VARCHAR(255) NOT NULL,
    Exospine_skill_3_en VARCHAR(255) NOT NULL,
    Exospine_stat_1 VARCHAR(255) NOT NULL,
    Exospine_stat_2 VARCHAR(255) NOT NULL,
    Exospine_stat_3 VARCHAR(255) NOT NULL,
    Exospine_text_1_fr VARCHAR(255) NOT NULL,
    Exospine_text_1_en VARCHAR(255) NOT NULL,
    Exospine_text_2_fr VARCHAR(255) NOT NULL,
    Exospine_text_2_en VARCHAR(255) NOT NULL,
    Exospine_stars VARCHAR(30) NOT NULL,
    Exospine_id_fk INT UNSIGNED NOT NULL,
    CONSTRAINT fk_exospine_arsenal
        FOREIGN KEY (Exospine_id_fk) REFERENCES Arsenal(Arsenal_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Equipment(
    Equipment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Equipment_stars_1 BOOLEAN DEFAULT TRUE,
    Equipment_stars_2 BOOLEAN DEFAULT FALSE,
    Equipment_stars_3 BOOLEAN DEFAULT FALSE,
    Equipment_title_fr VARCHAR(50) NOT NULL,
    Equipment_title_en VARCHAR(50) NOT NULL,
    Equipment_skill_1_fr VARCHAR(255) NOT NULL,
    Equipment_skill_1_en VARCHAR(255) NOT NULL,
    Equipment_skill_2_fr VARCHAR(255) NOT NULL,
    Equipment_skill_2_en VARCHAR(255) NOT NULL,
    Equipment_skill_3_fr VARCHAR(255) NOT NULL,
    Equipment_skill_3_en VARCHAR(255) NOT NULL,
    Equipment_stat_1 VARCHAR(255) NOT NULL,
    Equipment_stat_2 VARCHAR(255) NOT NULL,
    Equipment_stat_3 VARCHAR(255) NOT NULL,
    Equipment_text_1_fr VARCHAR(255) NOT NULL,
    Equipment_text_1_en VARCHAR(255) NOT NULL,
    Equipment_text_2_fr VARCHAR(255) NOT NULL,
    Equipment_text_2_en VARCHAR(255) NOT NULL,
    Equipment_stars VARCHAR(30) NOT NULL,
    Equipment_id_fk INT UNSIGNED NOT NULL,
    CONSTRAINT fk_equipment_arsenal
        FOREIGN KEY (Equipment_id_fk) REFERENCES Arsenal(Arsenal_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Nano_suits (
    NS_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    NS_title VARCHAR(80) NOT NULL,
    NS_text VARCHAR(255) NOT NULL,
    NS_text_2 VARCHAR(1000) NOT NULL,
    NS_Where_title VARCHAR(20) NOT NULL,
    NS_Where_text VARCHAR(255) NOT NULL,
    NS_picture VARCHAR(255) NOT NULL,
    NS_stars VARCHAR(30) NOT NULL,
    NS_id_fk INT UNSIGNED NOT NULL,
    CONSTRAINT fk_ns_arsenal
        FOREIGN KEY (NS_id_fk) REFERENCES Arsenal(Arsenal_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `User` (
    User_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    User_pseudo VARCHAR(50) NOT NULL UNIQUE,
    User_email VARCHAR(100) NOT NULL UNIQUE,
    User_hashed_password VARCHAR(255) NOT NULL,
    User_is_accept_cgu BOOLEAN DEFAULT TRUE,
    User_Type_account INT UNSIGNED NOT NULL
);

CREATE TABLE Favorite (
    Favorite_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Favorite_user_id INT UNSIGNED NOT NULL,
    Favorite_NS_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_fav_user FOREIGN KEY (Favorite_user_id) REFERENCES `User`(User_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fav_ns FOREIGN KEY (Favorite_NS_id) REFERENCES Nano_suits(NS_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Stores(
    Stores_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Stores_title VARCHAR(50) NOT NULL,
    Stores_text VARCHAR(20) NOT NULL,
    Stores_text_2 VARCHAR(50) NOT NULL,
    Stores_picture VARCHAR(50) NOT NULL,
    Stores_picture_2 VARCHAR(50) NOT NULL,
    Store_link VARCHAR(60) NOT NULL
);



insert into Section (Section_id, Section_title, Section_icons_gray, Section_icons_black)
values
    (1, "ARSENAL", "/icons/manufacturing_gray.svg", "/icons/manufacturing_black.svg"),
    (2, "MISSIONS", "/icons/rocket_launch_gray.svg", "/icons/rocket_launch_black.svg"),
    (3, "CARTES", "/icons/map_search_gray.svg", "/icons/map_search_black.svg"),
    (4, "COMPÉTENCES", "/icons/person_celebrate_gray.svg", "/icons/person_celebrate_black.svg"),
    (5, "BASE DE DONNÉES", "/icons/database_gray.svg", "/icons/database_black.svg");

insert into Arsenal (Arsenal_id, Arsenal_title, Arsenal_icons_gray, Arsenal_icons_black, Arsenal_link, Arsenal_id_fk)
values
    (1, "Exospine", "/icons/orthopedics_gray.svg", "/icons/orthopedics_black.svg", "exospine", 1),
    (2, "Équipement", "/icons/engineering_gray.svg", "/icons/engineering_black.svg", "equipment", 1),
    (3, "Nano-combinaison", "/icons/apparel_gray.svg", "/icons/apparel_black.svg", "nano-suits", 1),
    (4, "Lunettes", "/icons/eyeglasses_gray.svg", "/icons/eyeglasses_black.svg", "glasses", 1),
    (5, "Boucles d'oreilles", "/icons/diamond_shine_gray.svg", "/icons/diamond_shine_black.svg", "earrings", 1),
    (6, "Coiffures", "/icons/self_care_gray.svg", "/icons/self_care_black.svg", "hair-styles", 1),
    (7, "Drones", "/icons/helicopter_gray.svg", "/icons/helicopter_black.svg", "drone", 1),
    (8, "Nano-combinaison - Lily", "/icons/apparel_gray.svg", "/icons/apparel_black.svg", "nano-suits-lily", 1),
    (9, "Nano-combinaison - Adam", "/icons/apparel_gray.svg", "/icons/apparel_black.svg", "nano-suits-adam", 1);


insert into Nano_suits (NS_id, NS_title, NS_text, NS_text_2, NS_Where_title, NS_Where_text, NS_picture, NS_Stars, NS_id_fk)
values
    (1, "Alice ensoleillée", "Permet de modifier l'apparence d'EVE", "Découvrez la collection de maillots de bain ensoleillée de Tetrastar C&T: partez en vacances au Pays des merveilles !", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Alice_ensoleillee.webp", "/icons/star_fill_blue.webp", 1),
    (2, "Aventurière des terres désolée", "Permet de modifier l'apparence d'EVE", "Personne ne peut vous arrêter, Traversez les zones hostiles et franchissez les obstacles avec la tenue Aventurière. Bien entendu, n'allez pas chercher de poux dans la tête des Naytibas.", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Aventuriere_des_terres_desolee.webp", "/icons/star_fill_blue.webp", 1),
    (3, "Bikini de plongée Vague", "Permet de modifier l'apparence d'EVE", "Suite à la disparition mystérieuse de « Galaxy » Alan de Tetrastar C&T, « Kitsune » Maria a repris sa position vacante afin de préserver les valeurs de l'entreprise. Maria a ensuite présenté « Vague », une nouvelle marque respectueuse de l'environnement axée sur la durabilité, qui n'utilise que des matériaux polymères provenant de filets de pêche recyclés. Elle a alors lancé sa collection de maillots de bain, marquant le début de l'ascension inarrêtable de sa carrière.", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Bikini_de_plongee_Vague.webp", "/icons/star_fill_blue.webp", 1),
    (4, "Bondage cybernétique", "Permet de modifier l'apparence d'EVE", "Cette tenue de la collection « Sens exotique » a été conçue par le styliste phare de Tetrastar C&T : « Galaxy » Alan. D'après la rumeur, les fibres, la doublure et les nœuds sont constitués de nerfs quantiques qui créent un lien avec le corps et permettent une totale liberté de mouvement.", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Bondage_cybernetique.webp", "/icons/star_fill_blue.webp", 1),
    (5, "Chaperon rouge ensoleillé", "Permet de modifier l'apparence d'EVE", "Découvrez la collection de maillots de bain ensoleillée de Tetrastar C&T: même le grand méchant loup ne pourra pas perturber les vacances du Chaperon rouge !", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Chaperon_rouge_ensoleille.webp", "/icons/star_fill_blue.webp", 1),
    (6, "Combinaison d'exploration d'Orca", "Permet de modifier l'apparence d'EVE", "La Combinaison d'exploration d'Orca est le fruit de la collaboration entre Tetrastar C&T et Orca Aerospace, Ce haut de compression est conçu pour être porté en dessous d'une combinaison spatiale. N'effectuez jamais de sortie dans le vide intersidéral si vous ne portez rien d'autre !", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_d-exploration_d-Orca.webp", "/icons/star_fill_blue.webp", 1),
    (7, "Combinaison de plongée planétaire (2)", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_de_plongee_planetaire_(2).webp", "/icons/star_fill_blue.webp", 1),
    (8, "Combinaison de plongée planétaire (2) V2", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_de_plongee_planetaire_(2)_V2.webp", "/icons/star_fill_blue.webp", 1),
    (9, "Combinaison de plongée planétaire (3)", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_de_plongee_planetaire_(3).webp", "/icons/star_fill_blue.webp", 1),
    (10, "Combinaison de plongée planétaire (3) V2", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_de_plongee_planetaire_(3)_V2.webp", "/icons/star_fill_blue.webp", 1);


insert into Stores (Stores_id, Stores_title, Stores_text, Stores_text_2, Stores_picture, Stores_picture_2, Store_link)
values
    (1, "Playstation Store", "BUY", "The game", "/icons/playstation_store_bag_white.svg", "/icons/playstation_store_bag_blue.svg", "https://store.playstation.com/fr-fr/concept/10006891"),
    (2, "Steam", "BUY", "The game", "/icons/steam_play-here_white.svg", "/icons/steam_play-here_white.svg", "https://store.steampowered.com/app/3489700/Stellar_Blade/");
