DROP DATABASE IF EXISTS BLOOD_EDGE;
DROP DATABASE IF EXISTS `blood-edge`;
CREATE DATABASE IF NOT EXISTS BLOOD_EDGE;
USE BLOOD_EDGE;
create table User (
    User_id  int unsigned primary key auto_increment not null,
    User_email varchar(100) not null UNIQUE,
    User_pseudo varchar(50) not null UNIQUE,
    User_hashed_password varchar(255) not null,
    User_is_accept_cgu boolean default true,
    User_Type_account int unsigned not null
);

create table Nano_suits (
NS_id int unsigned primary key auto_increment not null,
NS_title varchar(80) not null,
NS_text varchar(255) not null,
NS_text_2 varchar(1000) not null,
NS_Where_title varchar(20) not null,
NS_Where_text varchar(255) not null,
NS_picture varchar(255) not null
);

create table Favorite (
    Favorite_id int unsigned primary key auto_increment not null,
    Favorite_user_id  int  unsigned not null,
    Favorite_NS_id  int  unsigned not null,
    foreign key (Favorite_user_id) REFERENCES User(User_id),
    foreign key (Favorite_NS_id) REFERENCES Nano_suits(NS_id)
);


insert into Nano_suits (NS_id, NS_title, NS_text, NS_text_2, NS_Where_title, NS_Where_text, NS_picture)
values
    (1, "Alice ensoleillée", "Permet de modifier l'apparence d'EVE", "Découvrez la collection de maillots de bain ensoleillée de Tetrastar C&T: partez en vacances au Pays des merveilles !", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Alice_ensoleillee.webp"),
    (2, "Aventurière des terres désolée", "Permet de modifier l'apparence d'EVE", "Personne ne peut vous arrêter, Traversez les zones hostiles et franchissez les obstacles avec la tenue Aventurière. Bien entendu, n'allez pas chercher de poux dans la tête des Naytibas.", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Aventuriere_des_terres_desolee.webp"),
    (3, "Bikini de plongée Vague", "Permet de modifier l'apparence d'EVE", "Suite à la disparition mystérieuse de « Galaxy » Alan de Tetrastar C&T, « Kitsune » Maria a repris sa position vacante afin de préserver les valeurs de l'entreprise. Maria a ensuite présenté « Vague », une nouvelle marque respectueuse de l'environnement axée sur la durabilité, qui n'utilise que des matériaux polymères provenant de filets de pêche recyclés. Elle a alors lancé sa collection de maillots de bain, marquant le début de l'ascension inarrêtable de sa carrière.", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Bikini_de_plongee_Vague.webp"),
    (4, "Bondage cybernétique", "Permet de modifier l'apparence d'EVE", "Cette tenue de la collection « Sens exotique » a été conçue par le styliste phare de Tetrastar C&T : « Galaxy » Alan. D'après la rumeur, les fibres, la doublure et les nœuds sont constitués de nerfs quantiques qui créent un lien avec le corps et permettent une totale liberté de mouvement.", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Bondage_cybernetique.webp"),
    (5, "Chaperon rouge ensoleillé", "Permet de modifier l'apparence d'EVE", "Découvrez la collection de maillots de bain ensoleillée de Tetrastar C&T: même le grand méchant loup ne pourra pas perturber les vacances du Chaperon rouge !", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Chaperon_rouge_ensoleille.webp"),
    (6, "Combinaison d'exploration d'Orca", "Permet de modifier l'apparence d'EVE", "La Combinaison d'exploration d'Orca est le fruit de la collaboration entre Tetrastar C&T et Orca Aerospace, Ce haut de compression est conçu pour être porté en dessous d'une combinaison spatiale. N'effectuez jamais de sortie dans le vide intersidéral si vous ne portez rien d'autre !", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_d-exploration_d-Orca.webp"),
    (7, "Combinaison de plongée planétaire (2)", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_de_plongee_planetaire_(2).webp"),
    (8, "Combinaison de plongée planétaire (2) V2", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_de_plongee_planetaire_(2)_V2.webp"),
    (9, "Combinaison de plongée planétaire (3)", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/images/nano_suits/Combinaison_de_plongee_planetaire_(3).webp"),
    (10, "Combinaison de plongée planétaire (3) V2", "Permet de modifier l'apparence d'EVE", "« Enfant né par une nuit étoilée. Accomplis ta mission. Garde à jamais la tête haute. Notre futur est entre tes mains,»", "Où la trouver ?", "Dans la boutique Tetrastar C&T", "/nano_suits/Combinaison_de_plongee_planetaire_(3)_V2.webp");


insert into User (User_email, User_pseudo, User_hashed_password, User_is_accept_cgu, User_Type_account)
values
("test@test.com", "testuser", "test123nohash", true, 9);