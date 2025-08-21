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
    Exospine_bar_1 BOOLEAN DEFAULT TRUE,
    Exospine_bar_2 BOOLEAN DEFAULT FALSE,
    Exospine_bar_3 BOOLEAN DEFAULT FALSE,
    Exospine_title_fr VARCHAR(50) NOT NULL,
    Exospine_title_en VARCHAR(50),
    Exospine_skill_1_fr VARCHAR(150) NOT NULL,
    Exospine_skill_1_en VARCHAR(150),
    Exospine_skill_2_fr VARCHAR(180) NOT NULL,
    Exospine_skill_2_en VARCHAR(180),
    Exospine_skill_3_fr VARCHAR(200) NOT NULL,
    Exospine_skill_3_en VARCHAR(200),
    Exospine_stat_1 DECIMAL(3,1) CHECK (Exospine_stat_1 BETWEEN 0 AND 100),
    Exospine_stat_2 DECIMAL(3,1) CHECK (Exospine_stat_2 BETWEEN 0 AND 100),
    Exospine_stat_3 DECIMAL(3,1) CHECK (Exospine_stat_3 BETWEEN 0 AND 100),
    Exospine_text_1_fr VARCHAR(70) NOT NULL,
    Exospine_text_1_en VARCHAR(70),
    Exospine_text_2_fr VARCHAR(520) NOT NULL,
    Exospine_text_2_en VARCHAR(520),
    Exospine_bar VARCHAR(30) NOT NULL,
    Exospine_icon VARCHAR(40),
    Exospine_icon_colored VARCHAR(40),
    Exospine_icon_Mk2 VARCHAR(50),
    Exospine_icon_Mk2_colored VARCHAR(50),
    Exospine_id_fk INT UNSIGNED NOT NULL,
    CONSTRAINT fk_exospine_arsenal
        FOREIGN KEY (Exospine_id_fk) REFERENCES Arsenal(Arsenal_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Equipment(
    Equipment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Equipment_star_1 BOOLEAN DEFAULT TRUE,
    Equipment_star_2 BOOLEAN DEFAULT FALSE,
    Equipment_star_3 BOOLEAN DEFAULT FALSE,
    Equipment_title_fr VARCHAR(70) NOT NULL,
    Equipment_title_en VARCHAR(70) NOT NULL,
    Equipment_skill_1_fr VARCHAR(70) NOT NULL,
    Equipment_skill_1_en VARCHAR(70) NOT NULL,
    Equipment_skill_2_fr VARCHAR(20) NOT NULL,
    Equipment_skill_2_en VARCHAR(20) NOT NULL,
    Equipment_stat_1 DECIMAL(3,1) NOT NULL,
    Equipment_stat_2 INT UNSIGNED,
    Equipment_text_1_fr VARCHAR(100) NOT NULL,
    Equipment_text_1_en VARCHAR(100) NOT NULL,
    Equipment_text_2_fr VARCHAR(500) NOT NULL,
    Equipment_text_2_en VARCHAR(500) NOT NULL,
    Equipment_star VARCHAR(30) NOT NULL,
    Equipment_icon VARCHAR(40) NOT NULL,
    Equipment_icon_colored VARCHAR(40) NOT NULL,
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
    User_Type_account INT UNSIGNED NOT NULL,
    User_timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Favorite (
    Favorite_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Favorite_user_id INT UNSIGNED NOT NULL,
    Favorite_exospine_id INT UNSIGNED,
    Favorite_equipment_id INT UNSIGNED,
    Favorite_NS_id INT UNSIGNED,
    
    CONSTRAINT fk_fav_user FOREIGN KEY (Favorite_user_id) REFERENCES `User`(User_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fav_exospine FOREIGN KEY (Favorite_exospine_id) REFERENCES Exospine(Exospine_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fav_equipment FOREIGN KEY (Favorite_equipment_id) REFERENCES Equipment(Equipment_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fav_ns FOREIGN KEY (Favorite_NS_id) REFERENCES Nano_suits(NS_id)
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

insert into Exospine (Exospine_id,Exospine_bar_1,Exospine_bar_2,Exospine_bar_3, Exospine_title_fr, Exospine_title_en, Exospine_skill_1_fr, Exospine_skill_1_en, Exospine_skill_2_fr, Exospine_skill_2_en, Exospine_skill_3_fr, Exospine_skill_3_en, Exospine_stat_1, Exospine_stat_2, Exospine_stat_3, Exospine_text_1_fr, Exospine_text_1_en, Exospine_text_2_fr, Exospine_text_2_en, Exospine_bar, Exospine_icon, Exospine_icon_colored, Exospine_icon_Mk2, Exospine_icon_Mk2_colored, Exospine_id_fk)
values
    (1, TRUE, TRUE, TRUE, "Exospine de type camouflage", NULL, "Réduit le champ de vision des ennemis.", NULL, "En cas d'exécution réussie, augmente de 17,5% la puissance des attaques au corps à corps pendant 10 secondes.", NULL, "Restaure 15 % des PV maximum en cas d'exécution réussie.", NULL, NULL, 17.5, 15, "Exospine spécialisée dans la furtivité et l'exécution.", NULL, "Comme tous les modules d'équipement, chaque nouveau modèle d'exospine propose des fonctionnalités innovantes. Suite à sa refonte, cette exospine a été équipée d'une IA autonome.", NULL, "Nom du composant à ajouter", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg",NULL, NULL , 1),
    (2, TRUE, TRUE, TRUE, "Exospine Mk2 de type camouflage", NULL, "Réduit le champ de vision des ennemis.", NULL, "En cas d'exécution réussie, augmente de 25% la puissance des attaques au corps à corps pendant 10 secondes.", NULL, "Restaure 22,5 % des PV maximum en cas d'exécution réussie.", NULL, NULL, 15.5, 15, "Exospine spécialisée dans la furtivité et l'exécution,", NULL, "Comme tous les modules d'équipement, chaque nouveau modèle d'exospine propose des fonctionnalités innovantes. Suite à sa refonte, cette exospine a été équipée d'une IA autonome.", NULL, "Exospine_bar", NULL, NULL,"/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg" , 1),
    (3, TRUE, TRUE, TRUE, "Exospine de type enchaînement", NULL, "Augmente de 27 % la puissance des enchaînements de niveau 2 ou plus.", NULL, "Augmente les dégâts critiques de 23 %.", NULL, "Augmente de 30% le taux de coups critiques des enchaînements de niveau 4 ou plus.", NULL, NULL, 25, 22.5, "Exospine spécialisée dans l'amélioration des enchaînements.", NULL, "Les modules d'équipement offraient une expérience personnalisée réussie, mais leurs performances étaient limitées. Par conséquent, Eidos a collaboré avec Tetrastar pour produire des API de bas niveau et des modifications sophistiquées. La devise de cette évolution était « Changeons tout ce qui peut l'être ».", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg",NULL ,NULL , 1),
    (4, TRUE, TRUE, TRUE, "Exospine Mk2 de type enchaînement", NULL, "Augmente de 40 % la puissance des enchaînements de niveau 2 ou plus.", NULL, "Augmente les dégâts critiques de 35 %.", NULL, "Augmente de 45 % le taux de coups critiques des enchaînements de niveau 4 ou plus.", NULL, 27, 23, 30, "Exospine spécialisée dans l'amélioration des enchaînements.", NULL, "Les modules d'équipement offraient une expérience personnalisée réussie, mais leurs performances étaient limitées. Par conséquent, Eidos a collaboré avec Tetrastar pour produire des API de bas niveau et des modifications sophistiquées. La devise de cette évolution était « Changeons tout ce qui peut l'être ».", NULL, "Exospine_bar", NULL, NULL, "/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg", 1),
    (5, TRUE, TRUE, TRUE, "Exospine de type grenadier", NULL, "Augmente les dégâts et les effets des consommables de combat. Les Naytibas puissants ne sont pas affectés.", NULL, "Augmente la zone d'effet des consommables de combat.", NULL, "Augmente les dégâts et les effets des consommables de combat si l'ennemi est attaqué par-derrière.", NULL, 40, 35, 45, "Exospine spécialisée dans l'amélioration des consommables de combat.", NULL, "Au cours de la bataille finale, le manque de ressources a contraint les ingénieurs à rassembler tout ce qu'ils trouvaient pour fabriquer modules et exospines. Si cela peut désormais sembler ridicule, ils n'avaient à ce moment-là aucune autre option. Ils ne pouvaient tout simplement pas attendre que la base orbitale leur envoie de l'équipement alors qu'ils affrontaient des hordes infinies de monstres.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL ,1),
    (6, TRUE, TRUE, TRUE, "Exospine Mk2 de type grenadier", NULL, "Augmente considérablement les dégâts et les effets des consommables de combat. Les Naytibas puissants ne sont pas affectés.", NULL, "Augmente la zone d'effet des consommables de combat.", NULL, "Augmente considérablement les dégâts et les effets des consommables de combat si l'ennemi est attaqué par-derrière.", NULL, NULL, NULL, NULL, "Exospine spécialisée dans l'amélioration des consommables de combat.", NULL, "Au cours de la bataille finale, le manque de ressources a contraint les ingénieurs à rassembler tout ce qu'ils trouvaient pour fabriquer modules et exospines. Si cela peut désormais sembler ridicule, ils n'avaient à ce moment-là aucune autre option. Ils ne pouvaient tout simplement pas attendre que la base orbitale leur envoie de l'équipement alors qu'ils affrontaient des hordes infinies de monstres.", NULL, "Exospine_bar", NULL, NULL,"/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg" ,1),
    (7, TRUE, TRUE, TRUE, "Exospine de type impact", NULL, "Augmente de 9,5 % le taux de coups critiques.", NULL, "Lorsque les ennemis subissent un coup critique, cela libère une vague d'énergie instable qui inflige des dégâts en chaîne aux ennemis proches.", NULL, "L'énergie instable inflige plus de dégâts en chaîne.", NULL, NULL, NULL, NULL, "Exospine spécialisée dans le combat contre plusieurs adversaires.", NULL, "Les nerfs quantiques intégrés à une exospine peuvent affecter le subconscient d'une IA. Il ne serait pas exagéré de dire qu'ils sont profondément enfouis dans le système neuronal. Plusieurs lanceurs d'alertes accusent les multinationales d'effectuer des écoutes illégales, d'implémenter des portes dérobées et de manipuler les IA, mais les médias ne semblent pas intéressés par le sujet.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL,1),
    (8, TRUE, TRUE, TRUE, "Exospine Mk2 de type impact", NULL, "Augmente de 14 % le taux de coups critiques.", NULL, "Lorsque les ennemis subissent un coup critique, cela libère une vague d'énergie instable qui inflige de puissants dégâts en chaîne aux ennemis proches.", NULL, "L'énergie instable inflige plus de dégâts en chaîne.", NULL, 9.5, NULL, NULL, "Exospine spécialisée dans le combat contre plusieurs adversaires.", NULL, "Les nerfs quantiques intégrés à une exospine peuvent affecter le subconscient d'une IA. Il ne serait pas exagéré de dire qu'ils sont profondément enfouis dans le système neuronal. Plusieurs lanceurs d'alertes accusent les multinationales d'effectuer des écoutes illégales, d'implémenter des portes dérobées et de manipuler les IA, mais les médias ne semblent pas intéressés par le sujet.", NULL, "Exospine_bar", NULL, NULL, "/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg",1),
    (9, TRUE, TRUE, TRUE, "Exospine de type jugement", NULL, "Augmente de 15 % la recharge d'énergie tachyonique.", NULL, "Réduit de 15% la consommation d'énergie tachyonique.", NULL, "Interrompre volontairement le mode Tachy inflige des dégâts aux ennemis proches et les met à terre.", NULL, 14, NULL, NULL, "Exospine spécialisée pour le mode Tachy.", NULL, "La guerre contre les Naytibas a impliqué de nombreux sacrifices, comme le prouvent ces modules d'équipement asymétriques utilisés pour les missions suicides. De nombreux légionnaires équipés de ces exospines sont certainement morts au combat en hurlant le nom de la Matri-Arche. Nul ne saura jamais s'ils la louaient ou s'ils la maudissaient.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg",NULL ,NULL ,1),
    (10, TRUE, TRUE, TRUE, "Exospine Mk2 de type jugement", NULL, "Augmente de 22,5 % la recharge d'énergie tachyonique.", NULL, "Réduit de 22,5% la consommation d'énergie tachyonique.", NULL, "Interrompre volontairement le mode Tachy inflige des dégâts considérables aux ennemis proches et les met à terre.", NULL, 15, 15, NULL, "Exospine spécialisée pour le mode Tachy.", NULL, "La guerre contre les Naytibas a impliqué de nombreux sacrifices, comme le prouvent ces modules d'équipement asymétriques utilisés pour les missions suicides. De nombreux légionnaires équipés de ces exospines sont certainement morts au combat en hurlant le nom de la Matri-Arche. Nul ne saura jamais s'ils la louaient ou s'ils la maudissaient.", NULL, "Exospine_bar",NULL, NULL,"/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg" ,1),
    (11, TRUE, TRUE, TRUE, "Exospine de type œil de faucon", NULL, "Augmente la puissance des attaques à distance de 10 %.", NULL, "Augmente la capacité maximum de toutes les munitions.", NULL, "Vous avez une chance de récupérer des munitions lorsque vous touchez le point faible d'un ennemi avec une attaque à distance.", NULL, 22.5, 22.5, NULL, "Exospine spécialisée dans l'amélioration des attaques à distance.", NULL, "Cette exospine est un module d'extension aussi innovant que puissant. Est-ce qu'elle semble hostile ? Elle est équipée de nano-nerfs quantiques développés par Tetrastar, le nec plus ultra en matière d'intelligence artificielle et d'extension des capacités.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL,1),
    (12, TRUE, TRUE, TRUE, "Exospine Mk2 de type œil de faucon", NULL, "Augmente la puissance des attaques à distance de 15 %.", NULL, "Augmente considérablement la capacité maximum de toutes les munitions.", NULL, "Vous avez une forte chance de récupérer des munitions lorsque vous touchez le point faible d'un ennemi avec une attaque à distance.", NULL, 10, NULL, NULL, "Exospine spécialisée dans l'amélioration des attaques à distance.", NULL, "Cette exospine est un module d'extension aussi innovant que puissant. Est-ce qu'elle semble hostile ? Elle est équipée de nano-nerfs quantiques développés par Tetrastar, le nec plus ultra en matière d'intelligence artificielle et d'extension des capacités.", NULL, "Exospine_bar", NULL, NULL, "/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg",1),
    (13, TRUE, TRUE, TRUE, "Exospine de type protection", NULL, "Réduit de 10 % les dégâts infligés par les ennemis.", NULL, "Le niveau de protection du bouclier augmente de un au maximum.", NULL, "Si votre santé est de 20 % ou moins, vous avez une chance de récupérer des PV pendant 5 secondes lorsque vous bloquez ou parez une attaque.", NULL, 15, NULL, NULL, "Exospine spécialisée dans la survie.", NULL, "À l'automne 2050, le PDG d'Eidos a présenté la toute dernière exospine de l'entreprise lors de sa conférence annuelle, « Nous avons commencé à créer nos propres précepteurs, lesquels donneront naissance à de meilleurs précepteurs, que nous pouvons ajuster et remplacer à notre guise. » La Matri-Arche ? Elle observait la scène en temps réel par le biais du RÉSEAU.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL,1),
    (14, TRUE, TRUE, TRUE, "Exospine Mk2 de type protection", NULL, "Réduit de 15 % les dégâts infligés par les ennemis.", NULL, "Le niveau de protection du bouclier augmente de un au maximum. Le bouclier maximum augmente avec le niveau de protection.", NULL, "Si votre santé est de 30 % ou moins, vous avez une chance de récupérer des PV pendant 5 secondes lorsque vous bloquez ou parez une attaque.", NULL, 10, NULL, 20, "Exospine spécialisée dans la survie.", NULL, "À l'automne 2050, le PDG d'Eidos a présenté la toute dernière exospine de l'entreprise lors de sa conférence annuelle, « Nous avons commencé à créer nos propres précepteurs, lesquels donneront naissance à de meilleurs précepteurs, que nous pouvons ajuster et remplacer à notre guise. » La Matri-Arche ? Elle observait la scène en temps réel par le biais du RÉSEAU.", NULL, "Exospine_bar", NULL, NULL, "/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg" ,1),
    (15, TRUE, TRUE, TRUE, "Exospine de type récupération", NULL, "Augmente de 10 % tous les effets de récupération.", NULL, "Les dégâts subis sont réduits de 11,5 % pendant une durée fixe lorsque vous utilisez une potion.", NULL, "Vous récupérez 100 points d'énergie Bêta lorsque vous utilisez une potion.", NULL, 15, NULL, 30, "Exospine spécialisée dans les capacités de récupération.", NULL, "Lorsque l'homme s'est donné pour mission de coloniser Mars, l'adaptation, la survie et la résistance aux conditions extrêmes sont entrées au centre des préoccupations. L'homéostasie renforcée et les capacités de rétablissement conférées par l'exospine étaient exceptionnelles, sans parler de son pouvoir analgésique. Les seuls effets secondaires connus sont des sensations étranges dans tout le corps, quelques erreurs de récupération et des soucis d'lA.",NULL , "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL ,1),
    (16, TRUE, TRUE, TRUE, "Exospine Mk2 de type récupération", NULL, "Augmente de 15 % tous les effets de récupération.", NULL, "Les dégâts subis sont réduits de 17 % pendant une durée fixe lorsque vous utilisez une potion.", NULL, "Vous récupérez 150 points d'énergie Bêta lorsque vous utilisez une potion.", NULL, 10, 11.5, NULL, "Exospine spécialisée dans les capacités de récupération.", NULL, "Lorsque l'homme s'est donné pour mission de coloniser Mars, l'adaptation, la survie et la résistance aux conditions extrêmes sont entrées au centre des préoccupations. L'homéostasie renforcée et les capacités de rétablissement conférées par l'exospine étaient exceptionnelles, sans parler de son pouvoir analgésique. Les seuls effets secondaires connus sont des sensations étranges dans tout le corps, quelques erreurs de récupération et des soucis d'IA.",NULL , "Exospine_bar", NULL, NULL,"/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg" , 1),
    (17, TRUE, TRUE, TRUE, "Exospine de type réflexes", NULL, "Le bouclier se régénère plus vite lorsque vous êtes en garde.", NULL, "Facilite l'exécution d'esquives parfaites.", NULL, "Facilite l'exécution de parades parfaites.", NULL, 15, 17, NULL, "Exospine spécialisée dans la protection et l'esquive.", NULL, "La suprématie croissante des multinationales, centrée sur le monopole de la chaîne de valeurs, a conduit à un mouvement de résistance, Les citoyens étaient particulièrement critiques à l'égard de ces exospines, affirmant qu'elles contenaient des « véripuces ». Beaucoup pensaient que les sociétés telles qu'Eidos, Tetrastar et Orca Aerospace utilisaient secrètement les machines pour façonner la vie humaine à leur guise.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL ,1),
    (18, TRUE, TRUE, TRUE, "Exospine Mk2 de type réflexes", NULL, "Le bouclier se régénère plus vite lorsque vous êtes en garde. L'effet augmente lorsque vous utilisez de l'équipement Mk2.", NULL, "Facilite l'exécution d'esquives parfaites. L'effet augmente lorsque vous utilisez de l'équipement Mk2.", NULL, "Facilite l'exécution de parades parfaites. L'effet augmente lorsque vous utilisez de l'équipement Mk2.", NULL, NULL, NULL, NULL, "Exospine spécialisée dans la protection et l'esquive.", NULL, "La suprématie croissante des multinationales, centrée sur le monopole de la chaîne de valeurs, a conduit à un mouvement de résistance. Les citoyens étaient particulièrement critiques à l'égard de ces exospines, affirmant qu'elles contenaient des « véripuces ». Beaucoup pensaient que les sociétés telles qu'Eidos, Tetrastar et Orca Aerospace utilisaient secrètement les machines pour façonner la vie humaine à leur guise.",NULL , "Exospine_bar", NULL , NULL ,"/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg" , 1),
    (19, TRUE, TRUE, TRUE, "Exospine de type suppression", NULL, "Augmente de 18 % la pénétration de bouclier.", NULL, "Les ennemis restent à terre plus longtemps.", NULL, "Augmente de 18 % les dégâts infligés aux ennemis à terre.", NULL, NULL, NULL, NULL, "Exospine spécialisée dans les capacités de mise à terre.", NULL, "Lorsque les plaintes portant sur les défaillances de la dernière exospine ont commencé à pleuvoir, le sujet a rapidement fait débat. Nombre d'utilisateurs affirmaient entendre la voix de la Matri-Arche. La voix d'une magnifique jeune fille gracile, qui murmurait des milliers de mots. Ce n'était bien évidemment qu'un bug qui a été rapidement corrigé grâce à une mise à jour. En tout cas, c'est la version officielle des faits.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL, 1),
    (20, TRUE, TRUE, TRUE, "Exospine Mk2 de type suppression", NULL, "Augmente de 24 % la pénétration de bouclier.", NULL, "Les ennemis restent à terre beaucoup plus longtemps.", NULL, "Augmente de 27% les dégâts infligés aux ennemis à terre.", NULL, 18, NULL, 18, "Exospine spécialisée dans les capacités de mise à terre.", NULL, "Lorsque les plaintes portant sur les défaillances de la dernière exospine ont commencé à pleuvoir, le sujet a rapidement fait débat. Nombre d'utilisateurs affirmaient entendre la voix de la Matri-Arche. La voix d'une magnifique jeune fille gracile, qui murmurait des milliers de mots. Ce n'était bien évidemment qu'un bug qui a été rapidement corrigé grâce à une mise à jour. En tout cas, c'est la version officielle des faits.", NULL, "Exospine_bar", NULL, NULL,"/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg" , 1),
    (21, TRUE, TRUE, TRUE, "Exospine de type transe Bêta", NULL, "Augmente l'énergie Bêta récupérée de 12 %.", NULL, "Augmente de 12 % la puissance de toutes les compétences Bêta.", NULL, "Si une compétence Bêta touche un ennemi, elle a une chance de vous plonger en transe. Les compétences Bêta ne consomment pas d'énergie Bêta tant que vous êtes en transe.", NULL, 24, NULL, 24, "Exospine spécialisée dans l'amélioration des compétences Bêta.", NULL, "Hélas, le rendement des semi-conducteurs quantiques Tetrastar était très faible, Les exospines étant des modules particulièrement onéreux, les quantités étaient limitées. Toutefois, en les présentant comme des objets de luxe, Tetrastar est parvenue à leur façonner une image très éloignée des modules d'équipement ordinaires", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg", NULL, NULL , 1),
    (22, TRUE, TRUE, TRUE, "Exospine Mk2 de type transe Bêta", NULL, "Exospine_skill_1_fr", NULL, "Exospine_skill_2_fr", NULL, "Exospine_skill_3_fr", NULL, 12, 12, NULL, "Exospine spécialisée dans l'amélioration des compétences Bêta.", NULL, "Hélas, le rendement des semi-conducteurs quantiques Tetrastar était très faible, Les exospines étant des modules particulièrement onéreux, les quantités étaient limitées. Toutefois, en les présentant comme des objets de luxe, Tetrastar est parvenue à leur façonner une image très éloignée des modules d'équipement ordinaires", NULL, "Exospine_bar", NULL, NULL,"/icons/network_intelligence_update_white.svg" ,"/icons/network_intelligence_update_orange.svg" , 1),
    (23, TRUE, TRUE, TRUE, "Exospine de type transe spontanée", NULL, "Augmente la jauge maximum d'énergie spontanée de 600 points.", NULL, "Augmente la puissance des compétences spontanées de 30 %.", NULL, "Vous récupérez 50 points d'énergie spontanée lorsque vous effectuez un enchaînement de niveau 4 ou plus.", NULL, NULL, 30, NULL, "Exospine spécialisée dans l'amélioration des compétences spontanées.", NULL, "Lorsque la Dernière Guerre s'est transformée en conflit total tout droit issu de nos pires cauchemars, la Matri-Arche a réquisitionné toutes les infrastructures de « l'humanité », La majorité des modules d'équipement atypiques planifiés ou produits à cette époque ont totalement disparu lorsque nous avons dû nous retrancher en orbite. C'est notamment le cas des exospines exclusivement conçues pour le combat.", NULL, "Exospine_bar", "/icons/network_intelligence_white.svg", "/icons/network_intelligence_orange.svg",NULL , NULL, 1),
    (24, TRUE, TRUE, TRUE, "Exospine Mk2 de type transe spontanée", NULL, "Augmente la jauge maximum d'énergie spontanée de 800 points.", NULL, "Augmente la puissance des compétences spontanées de 45 %.", NULL, "Vous récupérez 75 points d'énergie spontanée lorsque vous effectuez un enchaînement de niveau 4 ou plus.", NULL, NULL, 45, NULL, "Exospine spécialisée dans l'amélioration des compétences spontanées.", NULL, "Lorsque la Dernière Guerre s'est transformée en conflit total tout droit issu de nos pires cauchemars, la Matri-Arche a réquisitionné toutes les infrastructures de « l'humanité ». La majorité des modules d'équipement atypiques planifiés ou produits à cette époque ont totalement disparu lorsque nous avons dû nous retrancher en orbite. C'est notamment le cas des exospines exclusivement conçues pour le combat.", NULL, "Exospine_bar", NULL, NULL,"/icons/network_intelligence_update_white.svg", "/icons/network_intelligence_update_orange.svg", 1)
;    

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
