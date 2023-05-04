-- -----------------------------------------------------
-- Schema Spotify
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `Spotify`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`Users` (
  `User_Id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_password` LONGTEXT NOT NULL,
  `user_img` LONGTEXT NULL,
  `user_type` VARCHAR(45) NOT NULL,
  `user_heigth` INT NULL,
  `user_gender` VARCHAR(45) NULL,
  `user_weight` VARCHAR(45) NULL,
  `user_goal` VARCHAR(45) NULL,
  `user_preference` VARCHAR(45) NULL,
  `User_preview` FLOAT NULL,
  `last_active` TIMESTAMP NULL,
  PRIMARY KEY (`User_Id`)
) ENGINE = InnoDB;

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
    FOREIGN KEY (`User_Id`)
    REFERENCES `Spotify`.`Users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

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
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Spotify`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

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
  PRIMARY KEY (`exercice_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Spotify`.`programes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`programes` (
  `prg_id` INT NOT NULL AUTO_INCREMENT,
  `prg_img` LONGTEXT NOT NULL,
  `prg_name` VARCHAR(45) NOT NULL,
  `User_Id` INT NOT NULL,
  PRIMARY KEY (`prg_id`, `User_Id`),
  INDEX `fk_programes_User1_idx` (`User_Id` ASC) VISIBLE,
  UNIQUE INDEX `prg_id_UNIQUE` (`prg_id` ASC) VISIBLE,
  CONSTRAINT `fk_programes_User1`
    FOREIGN KEY (`User_Id`)
    REFERENCES `Spotify`.`Users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Spotify`.`programes_has_exercices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`programes_has_exercices` (
  `programes_prg_id` INT NOT NULL,
  `exercices_exercice_id` INT NOT NULL,
  PRIMARY KEY (`programes_prg_id`, `exercices_exercice_id`),
  INDEX `fk_programes_has_exercices_exercices1_idx` (`exercices_exercice_id` ASC) VISIBLE,
  INDEX `fk_programes_has_exercices_programes1_idx` (`programes_prg_id` ASC) VISIBLE,
  CONSTRAINT `fk_programes_has_exercices_programes1`
    FOREIGN KEY (`programes_prg_id`)
    REFERENCES `Spotify`.`programes` (`prg_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_programes_has_exercices_exercices1`
    FOREIGN KEY (`exercices_exercice_id`)
    REFERENCES `Spotify`.`exercices` (`exercice_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Spotify`.`chat_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`chat_rooms` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`room_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Spotify`.`chat_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Spotify`.`chat_messages` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NOT NULL,
  `sent_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sender` VARCHAR(255) NOT NULL,
  `room_id` INT NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_chat_messages_chat_rooms1_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_chat_messages_chat_rooms1`
    FOREIGN KEY (`room_id`)
    REFERENCES `Spotify`.`chat_rooms` (`room_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;