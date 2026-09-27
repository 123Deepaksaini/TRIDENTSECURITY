-- =========================================================
-- TRIDENT SECURITY SERVICES - PRODUCTION DATABASE SCHEMA
-- Compatible with MySQL 8.0+ / MariaDB 10.5+
-- Optimized for high-concurrency (100k+ req/min)
-- =========================================================

CREATE DATABASE IF NOT EXISTS `trident_security_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `trident_security_db`;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL DEFAULT 'System Administrator',
  `role` ENUM('SUPER_ADMIN', 'SECURITY_OFFICER', 'DISPATCHER') NOT NULL DEFAULT 'SECURITY_OFFICER',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_admin_email` (`email`),
  INDEX `idx_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. General Contact & Service Inquiries Table
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `service_type` VARCHAR(100) NOT NULL DEFAULT 'General Inquiry',
  `message` TEXT NOT NULL,
  `status` ENUM('NEW', 'CONTACTED', 'IN_PROGRESS', 'RESOLVED', 'SPAM') NOT NULL DEFAULT 'NEW',
  `admin_notes` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_inquiries_status` (`status`),
  INDEX `idx_inquiries_created_at` (`created_at`),
  INDEX `idx_inquiries_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Custom Quote & Cart Inquiries Table ("Foam Pages Cart")
CREATE TABLE IF NOT EXISTS `quote_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference_no` VARCHAR(30) NOT NULL UNIQUE,
  `customer_name` VARCHAR(100) NOT NULL,
  `company_name` VARCHAR(150) NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `city` VARCHAR(100) NOT NULL DEFAULT 'Jabalpur',
  `state` VARCHAR(100) NOT NULL DEFAULT 'Madhya Pradesh',
  `shift_duration` VARCHAR(50) NOT NULL DEFAULT '24_HOURS', -- 8_HOURS, 12_HOURS, 24_HOURS
  `estimated_monthly_inr` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `cart_items_json` JSON NOT NULL, -- JSON array of selected services & quantities
  `special_instructions` TEXT NULL,
  `status` ENUM('PENDING_QUOTE', 'QUOTE_SENT', 'CONTRACT_SIGNED', 'REJECTED') NOT NULL DEFAULT 'PENDING_QUOTE',
  `admin_notes` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_quotes_ref` (`reference_no`),
  INDEX `idx_quotes_status` (`status`),
  INDEX `idx_quotes_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Job Applications & Guard Recruitment Table
CREATE TABLE IF NOT EXISTS `job_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `age` INT NULL,
  `height_cm` INT NULL,
  `applied_role` VARCHAR(100) NOT NULL DEFAULT 'Security Guard',
  `experience_years` INT NOT NULL DEFAULT 0,
  `is_ex_serviceman` BOOLEAN NOT NULL DEFAULT FALSE,
  `armed_license_held` BOOLEAN NOT NULL DEFAULT FALSE,
  `current_address` TEXT NOT NULL,
  `police_verification_status` ENUM('VERIFIED', 'PENDING', 'NOT_APPLICABLE') DEFAULT 'PENDING',
  `resume_summary` TEXT NULL,
  `status` ENUM('APPLICATION_RECEIVED', 'INTERVIEW_SCHEDULED', 'HIRED', 'REJECTED') NOT NULL DEFAULT 'APPLICATION_RECEIVED',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_careers_role` (`applied_role`),
  INDEX `idx_careers_status` (`status`),
  INDEX `idx_careers_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Audit & Security Activity Logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `actor_type` ENUM('SYSTEM', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER',
  `actor_id` INT NULL,
  `action` VARCHAR(100) NOT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_audit_action` (`action`),
  INDEX `idx_audit_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
