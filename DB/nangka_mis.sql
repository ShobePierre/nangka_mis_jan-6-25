-- Nangka MIS Database Schema
-- Created for PWD Management Information System

CREATE DATABASE IF NOT EXISTS nangka_mis;
USE nangka_mis;

-- Person In Charge Table (Admin/Staff Users)
CREATE TABLE person_in_charge (
  person_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  contact_no VARCHAR(20),
  role VARCHAR(50) NOT NULL,
  position VARCHAR(100),
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nangka PWD User Table
CREATE TABLE nangka_pwd_user (
  pwd_id INT AUTO_INCREMENT PRIMARY KEY,
  person_id INT NOT NULL,

  barangay_id VARCHAR(50),
  firstname VARCHAR(100) NOT NULL,
  middlename VARCHAR(100),
  lastname VARCHAR(100) NOT NULL,
  suffix VARCHAR(20),

  birthdate DATE,
  age INT,
  sex ENUM('Male', 'Female', 'Other'),
  civil_status VARCHAR(50),
  address TEXT,
  contact_no VARCHAR(20),

  guardian_name VARCHAR(255),
  guardian_contact VARCHAR(20),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_person_in_charge
    FOREIGN KEY (person_id)
    REFERENCES person_in_charge(person_id)
    ON DELETE RESTRICT
);

-- Create indexes for better performance
CREATE INDEX idx_username ON person_in_charge(username);
CREATE INDEX idx_pwd_id ON nangka_pwd_user(pwd_id);
CREATE INDEX idx_person_id ON nangka_pwd_user(person_id);
CREATE INDEX idx_barangay ON nangka_pwd_user(barangay_id);
CREATE INDEX idx_lastname ON nangka_pwd_user(lastname);
