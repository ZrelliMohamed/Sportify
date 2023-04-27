-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Spotify
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Spotify
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Spotify` DEFAULT CHARACTER SET utf8 ;
USE `Spotify` ;

-- -----------------------------------------------------
-- Table `Spotify`.`programes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`programes` (
  `prg_id` INT NOT NULL AUTO_INCREMENT,
  `prg_img` LONGTEXT NOT NULL,
  `prg_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`prg_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Spotify`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`User` (
  `User_Id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(45) NOT NULL,
  `user_img` LONGTEXT NULL,
  `user_type` VARCHAR(45) NOT NULL,
  `user_heigth` INT NULL,
  `user_gender` VARCHAR(45) NULL,
  `user_weight` VARCHAR(45) NULL,
  `user_goal` VARCHAR(45) NULL,
  `user_preference` VARCHAR(45) NULL,
  `prg_id` INT NOT NULL,
  `User_preview` FLOAT NULL,
  PRIMARY KEY (`User_Id`, `prg_id`),
  INDEX `fk_User_programes_idx` (`prg_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_programes`
    FOREIGN KEY (`prg_id`)
    REFERENCES `Spotify`.`programes` (`prg_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Spotify`.`Commandes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`Commandes` (
  `commande_id` INT NOT NULL AUTO_INCREMENT,
  `commande_date` DATE NOT NULL,
  `User_Id` INT NOT NULL,
  `prg_id` INT NOT NULL,
  PRIMARY KEY (`commande_id`, `User_Id`, `prg_id`),
  INDEX `fk_Commandes_User1_idx` (`User_Id` ASC, `prg_id` ASC) VISIBLE,
  CONSTRAINT `fk_Commandes_User1`
    FOREIGN KEY (`User_Id` , `prg_id`)
    REFERENCES `Spotify`.`User` (`User_Id` , `prg_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Spotify`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`Product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `product_price` INT NOT NULL,
  `product_desc` VARCHAR(45) NULL,
  `commande_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `commande_id`),
  INDEX `fk_Product_Commandes1_idx` (`commande_id` ASC) VISIBLE,
  CONSTRAINT `fk_Product_Commandes1`
    FOREIGN KEY (`commande_id`)
    REFERENCES `Spotify`.`Commandes` (`commande_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Spotify`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);


-- -----------------------------------------------------
-- Table `Spotify`.`exercices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`exercices` (
  `exercice_id` INT NOT NULL AUTO_INCREMENT,
  `exercice_image` LONGTEXT NOT NULL,
  `exercice_name` VARCHAR(45) NOT NULL,
  `exercice_description` VARCHAR(45) NOT NULL,
  `exercice_sets` INT NOT NULL,
  `exercice_calories` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`exercice_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Spotify`.`programes_has_exercices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`programes_has_exercices` (
  `prg_id` INT NOT NULL,
  `exercice_id` INT NOT NULL,
  PRIMARY KEY (`prg_id`, `exercice_id`),
  INDEX `fk_programes_has_exercices_exercices1_idx` (`exercice_id` ASC) VISIBLE,
  INDEX `fk_programes_has_exercices_programes1_idx` (`prg_id` ASC) VISIBLE,
  CONSTRAINT `fk_programes_has_exercices_programes1`
    FOREIGN KEY (`prg_id`)
    REFERENCES `Spotify`.`programes` (`prg_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_programes_has_exercices_exercices1`
    FOREIGN KEY (`exercice_id`)
    REFERENCES `Spotify`.`exercices` (`exercice_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
