-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema spotify
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema spotify
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `spotify` DEFAULT CHARACTER SET utf8mb3 ;

-- -----------------------------------------------------
-- Table `spotify`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`users` (
  `User_Id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_password` LONGTEXT NOT NULL,
  `user_img` LONGTEXT NULL DEFAULT NULL,
  `user_type` VARCHAR(45) NOT NULL,
  `user_heigth` INT NULL DEFAULT NULL,
  `user_gender` VARCHAR(45) NULL DEFAULT NULL,
  `user_weight` VARCHAR(45) NULL DEFAULT NULL,
  `user_goal` VARCHAR(45) NULL DEFAULT NULL,
  `user_preference` VARCHAR(45) NULL DEFAULT NULL,
  `User_preview` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`User_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`reviewC`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`reviewC` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_Id` INT NOT NULL,
  `coach_Id` INT NOT NULL,
  `message` LONGTEXT NOT NULL,
  `rating` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reviewC_users_idx` (`User_Id` ASC) VISIBLE,
  INDEX `fk_reviewC_users1_idx` (`coach_Id` ASC) VISIBLE,
  CONSTRAINT `fk_reviewC_users`
    FOREIGN KEY (`User_Id`)
    REFERENCES `spotify`.`users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reviewC_users1`
    FOREIGN KEY (`coach_Id`)
    REFERENCES `spotify`.`users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `spotify` ;

-- -----------------------------------------------------
-- Table `spotify`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`users` (
  `User_Id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_password` LONGTEXT NOT NULL,
  `user_img` LONGTEXT NULL DEFAULT NULL,
  `user_type` VARCHAR(45) NOT NULL,
  `user_heigth` INT NULL DEFAULT NULL,
  `user_gender` VARCHAR(45) NULL DEFAULT NULL,
  `user_weight` VARCHAR(45) NULL DEFAULT NULL,
  `user_goal` VARCHAR(45) NULL DEFAULT NULL,
  `user_preference` VARCHAR(45) NULL DEFAULT NULL,
  `User_preview` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`User_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`commandes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`commandes` (
  `commande_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`commande_id`),
  INDEX `fk_commandes_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_commandes_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `spotify`.`users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`exercices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`exercices` (
  `exercice_id` INT NOT NULL AUTO_INCREMENT,
  `exercice_image` LONGTEXT NOT NULL,
  `exercice_name` VARCHAR(45) NOT NULL,
  `exercice_description` VARCHAR(45) NOT NULL,
  `exercice_sets` INT NOT NULL,
  `exercice_calories` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`exercice_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 129
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `sender_id` (`sender_id` ASC) VISIBLE,
  INDEX `receiver_id` (`receiver_id` ASC) VISIBLE,
  CONSTRAINT `messages_ibfk_1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `spotify`.`users` (`User_Id`),
  CONSTRAINT `messages_ibfk_2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `spotify`.`users` (`User_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 42
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` LONGTEXT NOT NULL,
  `product_price` DECIMAL(10,2) NOT NULL,
  `product_desc` LONGTEXT NULL DEFAULT NULL,
  `product_image` LONGTEXT NULL DEFAULT NULL,
  `count_in_stock` INT NOT NULL,
  `rating` FLOAT NOT NULL,
  `num_reviews` INT NOT NULL,
  `commande_id` INT NULL DEFAULT NULL,
  `Qantite_commande` INT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  INDEX `fk_product_commande_idx` (`commande_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_commande`
    FOREIGN KEY (`commande_id`)
    REFERENCES `spotify`.`commandes` (`commande_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 93
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`programes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`programes` (
  `prg_id` INT NOT NULL AUTO_INCREMENT,
  `prg_img` LONGTEXT NOT NULL,
  `prg_name` VARCHAR(45) NOT NULL,
  `User_Id` INT NOT NULL,
  `prg_price` INT NOT NULL,
  `prg_goal` VARCHAR(45) NOT NULL,
  `commande_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`prg_id`, `User_Id`),
  INDEX `fk_programes_Users1_idx` (`User_Id` ASC) VISIBLE,
  INDEX `fk_programes_commandes1_idx` (`commande_id` ASC) VISIBLE,
  CONSTRAINT `fk_programes_commandes1`
    FOREIGN KEY (`commande_id`)
    REFERENCES `spotify`.`commandes` (`commande_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_programes_Users1`
    FOREIGN KEY (`User_Id`)
    REFERENCES `spotify`.`users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`programes_has_exercices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`programes_has_exercices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `prg_id` INT NOT NULL,
  `exercice_id` INT NOT NULL,
  `sets` INT NOT NULL,
  `day` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `prg_id`, `exercice_id`),
  INDEX `fk_programes_has_exercices_exercices1_idx` (`exercice_id` ASC) VISIBLE,
  INDEX `fk_programes_has_exercices_programes1_idx` (`prg_id` ASC) VISIBLE,
  CONSTRAINT `fk_programes_has_exercices_exercices1`
    FOREIGN KEY (`exercice_id`)
    REFERENCES `spotify`.`exercices` (`exercice_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_programes_has_exercices_programes1`
    FOREIGN KEY (`prg_id`)
    REFERENCES `spotify`.`programes` (`prg_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 38
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spotify`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spotify`.`review` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` FLOAT NOT NULL,
  `comment` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_review_product_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_review_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_review_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `spotify`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_review_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `spotify`.`users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
