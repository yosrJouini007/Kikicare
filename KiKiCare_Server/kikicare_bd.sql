-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 07 jan. 2020 à 19:25
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `kikicare_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `animal`
--

DROP TABLE IF EXISTS `animal`;
CREATE TABLE IF NOT EXISTS `animal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `sexe` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `date_nais` varchar(50) DEFAULT NULL,
  `race` varchar(200) DEFAULT 'Undefined Race',
  `size` varchar(200) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `for_adoption` tinyint(1) DEFAULT '0',
  `state` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `animal`
--

INSERT INTO `animal` (`id`, `id_user`, `name`, `sexe`, `type`, `date_nais`, `race`, `size`, `image`, `for_adoption`, `state`) VALUES
(1, 13, 'Kiki', 'Female', 'Cat', '06/janv./2019', 'Felin', 'Small', 'image', 0, 0),
(2, 13, 'Bolt', 'Male', 'Dog', '13/sept./2017', '', 'Medium', 'image', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `lost_and_found`
--

DROP TABLE IF EXISTS `lost_and_found`;
CREATE TABLE IF NOT EXISTS `lost_and_found` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `place` varchar(200) NOT NULL,
  `description` varchar(300) NOT NULL,
  `image` varchar(200) NOT NULL,
  `date` varchar(255) NOT NULL,
  `found` tinyint(4) NOT NULL DEFAULT '0',
  `lost` tinyint(4) NOT NULL DEFAULT '0',
  `done` tinyint(4) NOT NULL DEFAULT '0',
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
CREATE TABLE IF NOT EXISTS `reminders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_animal` int(11) NOT NULL,
  `last_date` varchar(255) NOT NULL,
  `next_date` varchar(200) NOT NULL,
  `done` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_animal` (`id_animal`),
  KEY `id_cat` (`id_cat`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reminders`
--

INSERT INTO `reminders` (`id`, `id_cat`, `id_user`, `id_animal`, `last_date`, `next_date`, `done`) VALUES
(1, 1, 13, 1, '06/Jan/2020', '06/Apr/2020', 0),
(2, 2, 13, 1, '06/Jan/2020', '06/Apr/2020', 0),
(3, 3, 13, 1, '06/Jan/2020', '06/Mar/2020', 0),
(4, 4, 13, 1, '06/Jan/2020', '21/Jan/2020', 0),
(5, 5, 13, 1, '06/Jan/2020', '06/Jan/2021', 0),
(6, 1, 13, 2, '06/Jan/2020', '06/Feb/2020', 0),
(7, 2, 13, 2, '06/Jan/2020', '06/Apr/2020', 0),
(8, 3, 13, 2, '06/Jan/2020', '06/Mar/2020', 0),
(9, 4, 13, 2, '06/Jan/2020', '21/Jan/2020', 0),
(10, 5, 13, 2, '06/Jan/2020', '06/Jan/2021', 0),
(11, 6, 13, 2, '06/Jan/2020', '06/Feb/2020', 0),
(12, 7, 13, 2, '06/Jan/2020', '16/Jan/2020', 0),
(13, 8, 13, 2, '06/Jan/2020', '21/Jan/2020', 0);

-- --------------------------------------------------------

--
-- Structure de la table `reminderscat`
--

DROP TABLE IF EXISTS `reminderscat`;
CREATE TABLE IF NOT EXISTS `reminderscat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reminderscat`
--

INSERT INTO `reminderscat` (`id`, `name`) VALUES
(1, 'Internal Deworming'),
(2, 'External Deworming'),
(3, 'Hair/Coat'),
(4, 'Nails'),
(5, 'Vaccinations'),
(6, 'Bath'),
(7, 'Teeth'),
(8, 'Ears');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  `mode` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `url_image`, `mode`) VALUES
(11, 'c', 'a', 'b', '123456', 'Image', 'EMAIL'),
(12, '', '', '', '', 'Image', 'EMAIL'),
(13, 'yosr.jouini@esprit.tn', 'yosr', 'jouini', '123456789', 'null', 'EMAIL');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
