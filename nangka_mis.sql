-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2026 at 06:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nangka_mis`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `success` tinyint(1) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nangka_pwd_user`
--

CREATE TABLE `nangka_pwd_user` (
  `pwd_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `barangay_id` varchar(50) DEFAULT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) NOT NULL,
  `suffix` varchar(20) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` enum('Male','Female','Other') DEFAULT NULL,
  `civil_status` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `guardian_name` varchar(255) DEFAULT NULL,
  `guardian_contact` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nangka_pwd_user`
--

INSERT INTO `nangka_pwd_user` (`pwd_id`, `person_id`, `barangay_id`, `firstname`, `middlename`, `lastname`, `suffix`, `birthdate`, `age`, `sex`, `civil_status`, `address`, `contact_no`, `guardian_name`, `guardian_contact`, `created_at`) VALUES
(1, 1, 'Bagong', 'Juan', 'Gonzales', 'Dela Cruz', 'Jr.', '1998-05-15', 25, 'Male', 'Single', '123 Main Street, Barangay Bagong', '09987654321', NULL, NULL, '2026-01-05 16:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `person_in_charge`
--

CREATE TABLE `person_in_charge` (
  `person_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person_in_charge`
--

INSERT INTO `person_in_charge` (`person_id`, `username`, `password_hash`, `fullname`, `contact_no`, `role`, `position`, `last_login`, `created_at`) VALUES
(1, 'testadmin', '$2b$10$8leyiRj1Mb.rSihmmBlpiej6yMZ14H9h/kovRfXNepBbasowivQ/u', 'Test Administrator', '09123456789', 'admin', 'System Admin', '2026-01-06 00:59:12', '2026-01-05 16:54:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nangka_pwd_user`
--
ALTER TABLE `nangka_pwd_user`
  ADD PRIMARY KEY (`pwd_id`),
  ADD KEY `fk_person_in_charge` (`person_id`);

--
-- Indexes for table `person_in_charge`
--
ALTER TABLE `person_in_charge`
  ADD PRIMARY KEY (`person_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nangka_pwd_user`
--
ALTER TABLE `nangka_pwd_user`
  MODIFY `pwd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `person_in_charge`
--
ALTER TABLE `person_in_charge`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nangka_pwd_user`
--
ALTER TABLE `nangka_pwd_user`
  ADD CONSTRAINT `fk_person_in_charge` FOREIGN KEY (`person_id`) REFERENCES `person_in_charge` (`person_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
