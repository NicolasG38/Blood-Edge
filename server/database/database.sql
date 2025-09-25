DROP DATABASE IF EXISTS BLOOD_EDGE;
CREATE DATABASE IF NOT EXISTS BLOOD_EDGE;
USE BLOOD_EDGE;

CREATE TABLE Section (
    Section_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Section_title VARCHAR(20) NOT NULL,
    Section_icons_gray VARCHAR(50) NOT NULL,
    Section_icons_black VARCHAR(50) NOT NULL,
    Section_arrow VARCHAR(50) NOT NULL
);

CREATE TABLE Arsenal(
    Arsenal_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Arsenal_title VARCHAR(30) NOT NULL,
    Arsenal_icons_gray VARCHAR(50) NOT NULL,
    Arsenal_icons_black VARCHAR(50) NOT NULL,
    Arsenal_link VARCHAR(50) NOT NULL,
    Arsenal_section_id_fk INT UNSIGNED NOT NULL,
    CONSTRAINT fk_arsenal_section
        FOREIGN KEY (Arsenal_section_id_fk) REFERENCES Section(Section_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TypeObjet (
    TypeObjet_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    TypeObjet_name VARCHAR(30) NOT NULL
);

CREATE TABLE Objet (
    Objet_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Objet_arsenal_id_fk INT UNSIGNED NOT NULL,
    CONSTRAINT fk_objet_arsenal
        FOREIGN KEY (Objet_arsenal_id_fk) REFERENCES Arsenal(Arsenal_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Users (
    Users_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Users_pseudo VARCHAR(50) NOT NULL UNIQUE,
    Users_email VARCHAR(100) NOT NULL UNIQUE,
    Users_hashed_password VARCHAR(255) NOT NULL,
    Users_is_accept_cgu BOOLEAN DEFAULT TRUE,
    Users_Type_account INT UNSIGNED NOT NULL,
    Users_created_at TIMESTAMP DEFAULT NOW()
);

-- table de liaison qui rassemble: user, exospine, équipement et nano-suits
CREATE TABLE Favorite (
    Favorite_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Favorite_users_id INT UNSIGNED NOT NULL,
    Favorite_objet_id_fk INT UNSIGNED NOT NULL,

    CONSTRAINT fk_fav_user FOREIGN KEY (Favorite_users_id) REFERENCES Users(Users_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fav_objet FOREIGN KEY (Favorite_objet_id_fk) REFERENCES Objet(Objet_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Locations (
    Locations_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Locations_name_fr VARCHAR(30) NOT NULL,
    Locations_name_en VARCHAR(30) NOT NULL,
    Locations_country VARCHAR(20) NOT NULL,
    Locations_color VARCHAR(30) NOT NULL,
    Locations_icon_black VARCHAR(50) NOT NULL,
    Locations_icon_white VARCHAR(50) NOT NULL
);

CREATE TABLE StatsEVE (
    Stats_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Stats_title_fr VARCHAR(255) NOT NULL,
    Stats_title_en VARCHAR(255) NOT NULL,
    Stats_bar BOOLEAN,
    Stats_value INT,
    Stats_value_max INT,
    Stats_decimal DECIMAL(6,1) CHECK (Stats_decimal BETWEEN -1000 AND 1000),
    Stats_icon VARCHAR(50) NOT NULL
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

insert into Section (Section_id, Section_title, Section_icons_gray, Section_icons_black, Section_arrow)
values
    (1, "ARSENAL", "/icons/manufacturing_gray.svg", "/icons/manufacturing_black.svg", "/icons/mobile/arrow_down.svg"),
    (2, "MISSIONS", "/icons/rocket_launch_gray.svg", "/icons/rocket_launch_black.svg", "/icons/mobile/arrow_down.svg"),
    (3, "CARTES", "/icons/map_search_gray.svg", "/icons/map_search_black.svg", "/icons/mobile/arrow_down.svg"),
    (4, "COMPÉTENCES", "/icons/person_celebrate_gray.svg", "/icons/person_celebrate_black.svg", "/icons/mobile/arrow_down.svg"),
    (5, "BASE DE DONNÉES", "/icons/database_gray.svg", "/icons/database_black.svg", "/icons/mobile/arrow_down.svg");

insert into Arsenal (Arsenal_id, Arsenal_title, Arsenal_icons_gray, Arsenal_icons_black, Arsenal_link, Arsenal_section_id_fk)
values
    (1, "Exospine", "/icons/orthopedics_gray.svg", "/icons/orthopedics_black.svg", "exospine", 1),
    (2, "Équipement", "/icons/engineering_gray.svg", "/icons/engineering_black.svg", "gears", 1),
    (3, "Nano-combinaison", "/icons/apparel_gray.svg", "/icons/apparel_black.svg", "nano-suits", 1),
    (4, "Lunettes", "/icons/eyeglasses_gray.svg", "/icons/eyeglasses_black.svg", "glasses", 1),
    (5, "Boucles d'oreilles", "/icons/diamond_shine_gray.svg", "/icons/diamond_shine_black.svg", "earrings", 1),
    (6, "Coiffures", "/icons/self_care_gray.svg", "/icons/self_care_black.svg", "hair-styles", 1),
    (7, "Drones", "/icons/helicopter_gray.svg", "/icons/helicopter_black.svg", "drone", 1),
    (8, "Nano-combinaison - Lily", "/icons/apparel_gray.svg", "/icons/apparel_black.svg", "nano-suits-lily", 1),
    (9, "Nano-combinaison - Adam", "/icons/apparel_gray.svg", "/icons/apparel_black.svg", "nano-suits-adam", 1);

insert into TypeObjet (TypeObjet_id, TypeObjet_name)
values
    (1, "Exospine"),
    (2, "Gears"),
    (3, "Nano-suit"),
    (4, "Glasses"),
    (5, "Earrings"),
    (6, "Hairstyles"),
    (7, "Drone"),
    (8, "Nano-suit Lily"),
    (9, "Nano-suit Adam");


insert into Locations(Locations_id, Locations_name_fr, Locations_name_en, Locations_country, Locations_color, Locations_icon_black, Locations_icon_white)
values
(1, "Xion", "Xion", "USA", "--linear-xion", "/icons/locations/xion_black.svg", "/icons/locations/xion_white.svg"),
(2, "Eidos 7", "Eidos 7", "Ukraine", "--linear-eidos7", "/icons/locations/eidos_7_black.svg", "/icons/locations/eidos_7_white.svg"),
(3, "Eidos 9", "Eidos 9", "Ukraine", "--linear-eidos9", "/icons/locations/eidos_9_black.svg", "/icons/locations/eidos_9_white.svg"),
(4, "Les terres désolées", "The wastelands", "USA", "--linear-thewastelands", "/icons/locations/the_wastelands_black.svg", "/icons/locations/the_wastelands_white.svg"),
(5, "Plateau levoir", "Altess levoir", "USA", "--linear-altesslevoire", "/icons/locations/altess_levoire_black.svg", "/icons/locations/altess_levoire_white.svg"),
(6, "Le grand désert", "The great desert", "France", "--linear-thegreatdesert", "/icons/locations/the_great_desert_black.svg", "/icons/locations/the_great_desert_white.svg"),
(7, "Fosse levoir", "Abyss levoir", "USA", "--linear-abysslevoire", "/icons/locations/abyss_levoire_black.svg", "/icons/locations/abyss_levoire_white.svg"),
(8, "Matrix 11", "Matrix 11", "France", "--linear-matrix11", "/icons/locations/matrix_11_black.svg", "/icons/locations/matrix_11_white.svg"),
(9, "Obélisque 4", "Spire 4", "New-Caledonia", "--linear-spire4", "/icons/locations/spire_4_black.svg", "/icons/locations/spire_4_white.svg")
;

insert into StatsEVE (Stats_id, Stats_title_fr ,Stats_title_en, Stats_bar, Stats_value, Stats_value_max, Stats_decimal, Stats_icon)
values
    (1, "PV max", "Max HP", TRUE, 2500, 6500, NULL, "/icons/stats_eve/stats_eve_black.svg"),
    (2, "Bouclier max", "Max Shield", TRUE, 500, 2000, NULL, "/icons/stats_eve/stats_eve_black.svg"),
    (3, "Énergie Bêta max", "Max Beta Energy", TRUE, 300, 2800, NULL, "/icons/stats_eve/stats_eve_black.svg"),
    (4, "Énergie Somptanée max", "Max Somptanée Energy", TRUE, 1600, 3000, NULL, "/icons/stats_eve/stats_eve_black.svg"),
    (5, "Puissance", "Attack Power", TRUE, 530, 1300, NULL, "/icons/stats_eve/stats_eve_black.svg"),
    (6, "Dégâts sur boucliers", "Damage to shields", TRUE, 100, 250, NULL, "/icons/stats_eve/stats_eve_black.svg"),
    (7, "Taux de coups critiques", "Critical Rate", TRUE, NULL, NULL, 5, "/icons/stats_eve/stats_eve_black.svg"),
    (8, "Dégâts critiques", "Critical Damage", TRUE,  NULL, NULL, 150, "/icons/stats_eve/stats_eve_black.svg"),
    (9, "Bonus de puissance des compétences Bêta", "Beta Skill Power Bonus", FALSE, NULL, NULL, 15, "/icons/stats_eve/stats_eve_black.svg"),
    (10, "Vitesse d'attaque", "Attack Speed", FALSE, NULL, NULL, 118, "/icons/stats_eve/stats_eve_black.svg"),
    (11, "Réduction des dégâts au corps à corps", "Melee Damage Reduction", FALSE, NULL, NULL, 118, "/icons/stats_eve/stats_eve_black.svg"),
    (12, "Réduction des dégâts à distance", "Ranged Damage Reduction", FALSE, NULL, NULL, -38, "/icons/stats_eve/stats_eve_black.svg"),
    (13, "Bonus de recharge d’énergie Bêta", "Beta Energy Recharge Bonus", FALSE, NULL, NULL, 15, "/icons/stats_eve/stats_eve_black.svg"),
    (14, "Dépense d’énergie tachyonique réduite", "Tachyon Energy Cost Reduction", FALSE, NULL, NULL, 20, "/icons/stats_eve/stats_eve_black.svg")
    ;


insert into Stores (Stores_id, Stores_title, Stores_text, Stores_text_2, Stores_picture, Stores_picture_2, Store_link)
values
    (1, "Playstation Store", "BUY", "The game", "/icons/playstation_store_bag_white.svg", "/icons/playstation_store_bag_blue.svg", "https://store.playstation.com/fr-fr/concept/10006891"),
    (2, "Steam", "BUY", "The game", "/icons/steam_play-here_white.svg", "/icons/steam_play-here_white.svg", "https://store.steampowered.com/app/3489700/Stellar_Blade/");

insert into Users (Users_id, Users_pseudo, Users_email, Users_hashed_password, Users_is_accept_cgu, Users_Type_account, Users_created_at)
values
    (1, "NicolasG38", "NG38@outlook.fr", "$argon2id$v=19$m=65536,t=3,p=1$GaGOi91/X2k8zxNHuA0Wqg$3VpTSJSKdSYlotcIzWZMST9FC0+2OZW+gw3YMmyJ6K0", TRUE, "9", "2025-07-01 00:00:00" );