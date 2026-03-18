-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20260217.15385298cd
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 14, 2026 at 07:26 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `div_flow_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `changed_by` bigint UNSIGNED DEFAULT NULL,
  `change_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `auditable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_id` bigint UNSIGNED NOT NULL,
  `changes` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `changed_by`, `change_type`, `created_at`, `updated_at`, `auditable_type`, `auditable_id`, `changes`) VALUES
(1, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 1, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(2, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 1, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(3, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 2, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(4, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 2, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(5, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 2, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(6, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 2, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(7, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 3, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(8, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 3, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(9, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 3, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(10, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 4, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(11, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 4, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(12, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 4, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(13, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 4, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(14, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 5, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(15, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 5, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(16, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 5, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(17, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 5, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(18, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 5, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(19, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 6, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(20, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 6, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(21, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 6, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(22, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 6, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(23, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 7, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(24, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 7, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(25, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 7, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(26, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 7, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(27, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 8, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(28, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 8, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(29, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 8, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(30, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 9, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(31, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 9, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(32, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 10, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(33, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 10, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(34, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 11, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(35, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 11, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(36, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 11, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(37, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 12, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(38, 4, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 12, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(39, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 13, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(40, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 13, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(41, 3, 'update', '2026-03-13 03:21:25', '2026-03-13 03:21:25', 'App\\Models\\Task', 13, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(42, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 14, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(43, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 14, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(44, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 15, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(45, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 15, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(46, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 15, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(47, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 15, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(48, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 15, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(49, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 16, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(50, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 16, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(51, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 16, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(52, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 17, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(53, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 17, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(54, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 17, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(55, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 17, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(56, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 18, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(57, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 18, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(58, 3, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 18, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(59, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 19, '{\"status\": {\"new\": \"completed\", \"old\": \"pending\"}}'),
(60, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 19, '{\"status\": {\"new\": \"in_progress\", \"old\": \"in_progress\"}}'),
(61, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 19, '{\"status\": {\"new\": \"in_progress\", \"old\": \"pending\"}}'),
(62, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 19, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}'),
(63, 4, 'update', '2026-03-13 03:21:26', '2026-03-13 03:21:26', 'App\\Models\\Task', 19, '{\"status\": {\"new\": \"completed\", \"old\": \"in_progress\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-boost:mcp:database-schema:mysql:', 'a:3:{s:6:\"engine\";s:5:\"mysql\";s:6:\"tables\";a:616:{s:8:\"accounts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"bill_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"bills\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"cache\";a:5:{s:7:\"columns\";a:3:{s:3:\"key\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:5:\"value\";a:1:{s:4:\"type\";s:10:\"mediumtext\";}s:10:\"expiration\";a:1:{s:4:\"type\";s:3:\"int\";}}s:7:\"indexes\";a:2:{s:22:\"cache_expiration_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"expiration\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:3:\"key\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"cache_locks\";a:5:{s:7:\"columns\";a:3:{s:3:\"key\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:5:\"owner\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"expiration\";a:1:{s:4:\"type\";s:3:\"int\";}}s:7:\"indexes\";a:2:{s:28:\"cache_locks_expiration_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"expiration\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:3:\"key\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"currencies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"customers\";a:5:{s:7:\"columns\";a:10:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:5:\"phone\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"company\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:6:\"source\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:4:\"type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"created_by\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"deleted_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:2:{s:28:\"customers_created_by_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"created_by\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:1:{i:0;a:7:{s:4:\"name\";s:28:\"customers_created_by_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"created_by\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"failed_jobs\";a:5:{s:7:\"columns\";a:7:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"uuid\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"connection\";a:1:{s:4:\"type\";s:4:\"text\";}s:5:\"queue\";a:1:{s:4:\"type\";s:4:\"text\";}s:7:\"payload\";a:1:{s:4:\"type\";s:8:\"longtext\";}s:9:\"exception\";a:1:{s:4:\"type\";s:8:\"longtext\";}s:9:\"failed_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:2:{s:23:\"failed_jobs_uuid_unique\";a:4:{s:7:\"columns\";a:1:{i:0;s:4:\"uuid\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"fiscal_years\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"general_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"invoice_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"invoices\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"job_batches\";a:5:{s:7:\"columns\";a:10:{s:2:\"id\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:4:\"name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"total_jobs\";a:1:{s:4:\"type\";s:3:\"int\";}s:12:\"pending_jobs\";a:1:{s:4:\"type\";s:3:\"int\";}s:11:\"failed_jobs\";a:1:{s:4:\"type\";s:3:\"int\";}s:14:\"failed_job_ids\";a:1:{s:4:\"type\";s:8:\"longtext\";}s:7:\"options\";a:1:{s:4:\"type\";s:10:\"mediumtext\";}s:12:\"cancelled_at\";a:1:{s:4:\"type\";s:3:\"int\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:3:\"int\";}s:11:\"finished_at\";a:1:{s:4:\"type\";s:3:\"int\";}}s:7:\"indexes\";a:1:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:4:\"jobs\";a:5:{s:7:\"columns\";a:7:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:5:\"queue\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"payload\";a:1:{s:4:\"type\";s:8:\"longtext\";}s:8:\"attempts\";a:1:{s:4:\"type\";s:7:\"tinyint\";}s:11:\"reserved_at\";a:1:{s:4:\"type\";s:3:\"int\";}s:12:\"available_at\";a:1:{s:4:\"type\";s:3:\"int\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:3:\"int\";}}s:7:\"indexes\";a:2:{s:16:\"jobs_queue_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:5:\"queue\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"journal_entries\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"journal_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"migrations\";a:5:{s:7:\"columns\";a:3:{s:2:\"id\";a:1:{s:4:\"type\";s:3:\"int\";}s:9:\"migration\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:5:\"batch\";a:1:{s:4:\"type\";s:3:\"int\";}}s:7:\"indexes\";a:1:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"password_reset_tokens\";a:5:{s:7:\"columns\";a:3:{s:5:\"email\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:5:\"token\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:1:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:5:\"email\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"personal_access_tokens\";a:5:{s:7:\"columns\";a:10:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:14:\"tokenable_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:12:\"tokenable_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"name\";a:1:{s:4:\"type\";s:4:\"text\";}s:5:\"token\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:9:\"abilities\";a:1:{s:4:\"type\";s:4:\"text\";}s:12:\"last_used_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"expires_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:4:{s:39:\"personal_access_tokens_expires_at_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"expires_at\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:35:\"personal_access_tokens_token_unique\";a:4:{s:7:\"columns\";a:1:{i:0;s:5:\"token\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:56:\"personal_access_tokens_tokenable_type_tokenable_id_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:14:\"tokenable_type\";i:1;s:12:\"tokenable_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"product_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"products\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"sessions\";a:5:{s:7:\"columns\";a:6:{s:2:\"id\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"user_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"ip_address\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"user_agent\";a:1:{s:4:\"type\";s:4:\"text\";}s:7:\"payload\";a:1:{s:4:\"type\";s:8:\"longtext\";}s:13:\"last_activity\";a:1:{s:4:\"type\";s:3:\"int\";}}s:7:\"indexes\";a:3:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:28:\"sessions_last_activity_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:13:\"last_activity\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:22:\"sessions_user_id_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"tax_rates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"users\";a:5:{s:7:\"columns\";a:12:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:5:\"email\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:15:\"employee_number\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:5:\"phone\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:17:\"email_verified_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:8:\"password\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:19:\"default_hourly_rate\";a:1:{s:4:\"type\";s:7:\"decimal\";}s:9:\"is_active\";a:1:{s:4:\"type\";s:7:\"tinyint\";}s:14:\"remember_token\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:3:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:18:\"users_email_unique\";a:4:{s:7:\"columns\";a:1:{i:0;s:5:\"email\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:18:\"users_phone_unique\";a:4:{s:7:\"columns\";a:1:{i:0;s:5:\"phone\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"vendors\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"vouchers\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"account_balances\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"clx_integrations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"crm_accounts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"crm_customfields\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"crm_customfieldsvalues\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"crm_groups\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"crm_industries\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"crm_lead_sources\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"crm_lead_status\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"crm_leads\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"crm_salutations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"ib_doc_rel\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"ib_invoice_access_log\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"relations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"sys_accounts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"sys_activity\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"sys_api\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"sys_appconfig\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"sys_cart\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"sys_cats\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"sys_companies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"sys_currencies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"sys_documents\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"sys_email_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"sys_email_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"sys_emailconfig\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"sys_events\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"sys_invoiceitems\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"sys_invoices\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"sys_item_cats\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sys_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sys_leads\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"sys_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"sys_orders\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"sys_permissions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"sys_pg\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"sys_pl\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"sys_pmethods\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"sys_quoteitems\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"sys_quotes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sys_roles\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sys_sales\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"sys_schedule\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"sys_schedulelogs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"sys_staffpermissions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"sys_tags\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sys_tasks\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"sys_tax\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"sys_transactions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sys_units\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sys_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:25:\"account_deletion_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"addresses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"banners\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"cart_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"carts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"delivery_assignments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"delivery_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"device_tokens\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"drivers\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"media\";a:5:{s:7:\"columns\";a:18:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"model_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:8:\"model_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"uuid\";a:1:{s:4:\"type\";s:4:\"char\";}s:15:\"collection_name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:4:\"name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:9:\"file_name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:9:\"mime_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:4:\"disk\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:16:\"conversions_disk\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:4:\"size\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:13:\"manipulations\";a:1:{s:4:\"type\";s:4:\"json\";}s:17:\"custom_properties\";a:1:{s:4:\"type\";s:4:\"json\";}s:21:\"generated_conversions\";a:1:{s:4:\"type\";s:4:\"json\";}s:17:\"responsive_images\";a:1:{s:4:\"type\";s:4:\"json\";}s:12:\"order_column\";a:1:{s:4:\"type\";s:3:\"int\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:4:{s:31:\"media_model_type_model_id_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:10:\"model_type\";i:1;s:8:\"model_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:24:\"media_order_column_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:12:\"order_column\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:17:\"media_uuid_unique\";a:4:{s:7:\"columns\";a:1:{i:0;s:4:\"uuid\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"model_has_permissions\";a:5:{s:7:\"columns\";a:5:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:13:\"permission_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"model_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:8:\"model_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"project_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}}s:7:\"indexes\";a:6:{s:47:\"model_has_permissions_model_id_model_type_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:8:\"model_id\";i:1;s:10:\"model_type\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:43:\"model_has_permissions_permission_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:13:\"permission_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:38:\"model_has_permissions_project_id_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:44:\"model_has_permissions_team_foreign_key_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:44:\"model_has_permissions_team_permission_unique\";a:4:{s:7:\"columns\";a:4:{i:0;s:10:\"project_id\";i:1;s:13:\"permission_id\";i:2;s:8:\"model_id\";i:3;s:10:\"model_type\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:1:{i:0;a:7:{s:4:\"name\";s:43:\"model_has_permissions_permission_id_foreign\";s:7:\"columns\";a:1:{i:0;s:13:\"permission_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:11:\"permissions\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"model_has_roles\";a:5:{s:7:\"columns\";a:5:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"role_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"model_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:8:\"model_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"project_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}}s:7:\"indexes\";a:6:{s:41:\"model_has_roles_model_id_model_type_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:8:\"model_id\";i:1;s:10:\"model_type\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:32:\"model_has_roles_project_id_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:31:\"model_has_roles_role_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"role_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:38:\"model_has_roles_team_foreign_key_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:32:\"model_has_roles_team_role_unique\";a:4:{s:7:\"columns\";a:4:{i:0;s:10:\"project_id\";i:1;s:7:\"role_id\";i:2;s:8:\"model_id\";i:3;s:10:\"model_type\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:1:{i:0;a:7:{s:4:\"name\";s:31:\"model_has_roles_role_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"role_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"roles\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"notifications\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"offerables\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"offers\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"order_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"order_status_histories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"orders\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"payment_methods\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"permissions\";a:5:{s:7:\"columns\";a:7:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"name_ar\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"name_en\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"guard_name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:2:{s:34:\"permissions_name_guard_name_unique\";a:4:{s:7:\"columns\";a:2:{i:0;s:4:\"name\";i:1;s:10:\"guard_name\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"product_type_unit\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"product_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"product_variants\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"role_has_permissions\";a:5:{s:7:\"columns\";a:2:{s:13:\"permission_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"role_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}}s:7:\"indexes\";a:2:{s:7:\"primary\";a:4:{s:7:\"columns\";a:2:{i:0;s:13:\"permission_id\";i:1;s:7:\"role_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:36:\"role_has_permissions_role_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"role_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:2:{i:0;a:7:{s:4:\"name\";s:42:\"role_has_permissions_permission_id_foreign\";s:7:\"columns\";a:1:{i:0;s:13:\"permission_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:11:\"permissions\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:1;a:7:{s:4:\"name\";s:36:\"role_has_permissions_role_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"role_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"roles\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"roles\";a:5:{s:7:\"columns\";a:8:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"project_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"name_ar\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"name_en\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"guard_name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:3:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:39:\"roles_project_id_name_guard_name_unique\";a:4:{s:7:\"columns\";a:3:{i:0;s:10:\"project_id\";i:1;s:4:\"name\";i:2;s:10:\"guard_name\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:28:\"roles_team_foreign_key_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"site_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"support_conversations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"support_messages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"support_participants\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"telescope_entries\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"telescope_entries_tags\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"telescope_monitoring\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"units\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"vendor_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"accept_estimates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"appreciations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"attendance_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"attendances\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"automate_shifts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"award_icons\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"awards\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"bank_accounts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"bank_transactions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"client_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"client_contacts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"client_details\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"client_docs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"client_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"client_sub_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"client_user_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"companies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"company_addresses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"contract_discussions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"contract_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"contract_renews\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"contract_signs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"contract_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"contract_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"contracts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"conversation\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"conversation_reply\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"countries\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"credit_note_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"credit_note_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"credit_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"currency_format_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"custom_field_groups\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"custom_fields\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"custom_fields_data\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"custom_link_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"dashboard_widgets\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:29:\"database_backup_cron_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"database_backups\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"deal_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"deal_histories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"deal_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"deals\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"designations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"device_user\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"discussion_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"discussion_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"discussion_replies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"discussions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"email_notification_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"emergency_contacts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"employee_activity\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"employee_details\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"employee_docs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"employee_document_expiries\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:30:\"employee_leave_quota_histories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"employee_leave_quotas\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:30:\"employee_shift_change_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"employee_shift_rotations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"employee_shift_schedules\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"employee_shifts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"employee_skills\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"employee_teams\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"estimate_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"estimate_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"estimate_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:29:\"estimate_template_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"estimate_template_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"estimate_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"estimates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"event_attendees\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"event_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"events\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"expenses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"expenses_category\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"expenses_category_roles\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"expenses_recurring\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"file_storage\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"file_storage_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"flags\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"gantt_links\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"gdpr_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"global_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"google_calendar_modules\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"holidays\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"invoice_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"invoice_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"invoice_payment_details\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"invoice_recurring\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:29:\"invoice_recurring_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"invoice_recurring_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"invoice_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"issues\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"knowledge_base_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"knowledge_bases\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"knowledge_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"language_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"lead_agents\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"lead_category\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"lead_custom_forms\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"lead_follow_up\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"lead_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"lead_pipeline_stages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"lead_pipelines\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"lead_products\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"lead_setting\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"lead_sources\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"lead_status\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"lead_user_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"leads\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"leave_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"leave_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"leave_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"leaves\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"log_time_for\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"ltm_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"mention_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"menu_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"menus\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"message_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"module_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"modules\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"notice_board_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"notice_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"notice_views\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"notices\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"offline_payment_methods\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"order_carts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"order_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"passport_details\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"password_resets\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"payment_gateway_credentials\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"payments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"permission_role\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"permission_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"pinned\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"pipeline_stages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"product_category\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"product_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"product_sub_category\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"project_activity\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"project_category\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"project_departments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"project_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"project_label_list\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"project_labels\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"project_members\";a:5:{s:7:\"columns\";a:8:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"project_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"user_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"role\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:11:\"assigned_by\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"deleted_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:4:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:35:\"project_members_assigned_by_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:11:\"assigned_by\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:41:\"project_members_project_id_user_id_unique\";a:4:{s:7:\"columns\";a:2:{i:0;s:10:\"project_id\";i:1;s:7:\"user_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:31:\"project_members_user_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:3:{i:0;a:7:{s:4:\"name\";s:35:\"project_members_assigned_by_foreign\";s:7:\"columns\";a:1:{i:0;s:11:\"assigned_by\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:1;a:7:{s:4:\"name\";s:34:\"project_members_project_id_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:8:\"projects\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:2;a:7:{s:4:\"name\";s:31:\"project_members_user_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"project_milestones\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"project_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"project_ratings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"project_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"project_status_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"project_sub_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"project_template_members\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"project_template_milestone\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"project_template_sub_tasks\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"project_template_task_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"project_template_tasks\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"project_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"project_time_log_breaks\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"project_time_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"project_user_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"projects\";a:5:{s:7:\"columns\";a:17:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:12:\"project_name\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:4:\"type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:11:\"description\";a:1:{s:4:\"type\";s:4:\"text\";}s:8:\"features\";a:1:{s:4:\"type\";s:4:\"text\";}s:15:\"internal_budget\";a:1:{s:4:\"type\";s:7:\"decimal\";}s:10:\"total_cost\";a:1:{s:4:\"type\";s:7:\"decimal\";}s:14:\"payment_stages\";a:1:{s:4:\"type\";s:4:\"json\";}s:18:\"requirements_study\";a:1:{s:4:\"type\";s:4:\"json\";}s:10:\"start_date\";a:1:{s:4:\"type\";s:4:\"date\";}s:8:\"end_date\";a:1:{s:4:\"type\";s:4:\"date\";}s:6:\"status\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:8:\"owner_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:11:\"customer_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"deleted_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:3:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:28:\"projects_customer_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:11:\"customer_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:25:\"projects_owner_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:8:\"owner_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:2:{i:0;a:7:{s:4:\"name\";s:28:\"projects_customer_id_foreign\";s:7:\"columns\";a:1:{i:0;s:11:\"customer_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:9:\"customers\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:1;a:7:{s:4:\"name\";s:25:\"projects_owner_id_foreign\";s:7:\"columns\";a:1:{i:0;s:8:\"owner_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"promotions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"proposal_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"proposal_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"proposal_signs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:29:\"proposal_template_item_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"proposal_template_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"proposal_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"proposals\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"purpose_consent\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"purpose_consent_leads\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"purpose_consent_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"push_notification_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"push_subscriptions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"pusher_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"qrcode\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"quick_books_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"quotation_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"quotations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"removal_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"removal_requests_lead\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"role_user\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"rotation_automate_log\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"server_domains\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"server_hostings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"server_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:30:\"server_manager_global_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"server_providers\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"server_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"server_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"shift_rotation_sequences\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"skills\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"slack_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"smtp_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"social_auth_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"socials\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"sticky_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"sub_task_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"sub_tasks\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"subscription_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"subscriptions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"task_category\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"task_comment_emoji\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"task_comments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"task_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"task_history\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"task_label_list\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"task_labels\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"task_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"task_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"task_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"taskboard_columns\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"tasks\";a:5:{s:7:\"columns\";a:21:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"created_by\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"project_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:12:\"milestone_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:14:\"parent_task_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:5:\"title\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:11:\"description\";a:1:{s:4:\"type\";s:4:\"text\";}s:8:\"priority\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:6:\"status\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:15:\"estimated_hours\";a:1:{s:4:\"type\";s:7:\"decimal\";}s:11:\"task_weight\";a:1:{s:4:\"type\";s:3:\"int\";}s:12:\"billing_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:14:\"internal_price\";a:1:{s:4:\"type\";s:7:\"decimal\";}s:10:\"sort_order\";a:1:{s:4:\"type\";s:3:\"int\";}s:17:\"dependent_task_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:12:\"completed_at\";a:1:{s:4:\"type\";s:8:\"datetime\";}s:10:\"is_on_time\";a:1:{s:4:\"type\";s:7:\"tinyint\";}s:21:\"is_deductible_if_late\";a:1:{s:4:\"type\";s:7:\"tinyint\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"deleted_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:7:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:24:\"tasks_created_by_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"created_by\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:31:\"tasks_dependent_task_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:17:\"dependent_task_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:26:\"tasks_milestone_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:12:\"milestone_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:28:\"tasks_parent_task_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:14:\"parent_task_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:31:\"tasks_project_id_priority_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:10:\"project_id\";i:1;s:8:\"priority\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:29:\"tasks_project_id_status_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:10:\"project_id\";i:1;s:6:\"status\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:5:{i:0;a:7:{s:4:\"name\";s:24:\"tasks_created_by_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"created_by\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:1;a:7:{s:4:\"name\";s:31:\"tasks_dependent_task_id_foreign\";s:7:\"columns\";a:1:{i:0;s:17:\"dependent_task_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"tasks\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:2;a:7:{s:4:\"name\";s:26:\"tasks_milestone_id_foreign\";s:7:\"columns\";a:1:{i:0;s:12:\"milestone_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:10:\"milestones\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:3;a:7:{s:4:\"name\";s:28:\"tasks_parent_task_id_foreign\";s:7:\"columns\";a:1:{i:0;s:14:\"parent_task_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"tasks\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:4;a:7:{s:4:\"name\";s:24:\"tasks_project_id_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:8:\"projects\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"taxes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"teams\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"theme_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"ticket_activities\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"ticket_agent_groups\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"ticket_channels\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"ticket_custom_forms\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"ticket_email_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"ticket_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"ticket_groups\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"ticket_replies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"ticket_reply_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"ticket_reply_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"ticket_settings_for_agents\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"ticket_tag_list\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"ticket_tags\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"ticket_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"tickets\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"track_devices\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"translate_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"unit_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"universal_search\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"user_activities\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"user_invitations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"user_leadboard_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"user_permissions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"user_taskboard_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"users_chat\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"users_chat_files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"visa_details\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"weekly_timesheet_entries\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"weekly_timesheets\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"audit_logs\";a:5:{s:7:\"columns\";a:8:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"changed_by\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:11:\"change_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:14:\"auditable_type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:12:\"auditable_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"changes\";a:1:{s:4:\"type\";s:4:\"json\";}}s:7:\"indexes\";a:4:{s:44:\"audit_logs_auditable_type_auditable_id_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:14:\"auditable_type\";i:1;s:12:\"auditable_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:29:\"audit_logs_changed_by_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"changed_by\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:35:\"audit_logs_task_id_created_at_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"created_at\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:1:{i:0;a:7:{s:4:\"name\";s:29:\"audit_logs_changed_by_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"changed_by\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"internal_notes\";a:5:{s:7:\"columns\";a:12:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:9:\"parent_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"created_by\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:5:\"title\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"content\";a:1:{s:4:\"type\";s:4:\"text\";}s:16:\"importance_level\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:10:\"project_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"task_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:9:\"is_pinned\";a:1:{s:4:\"type\";s:7:\"tinyint\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"deleted_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:5:{s:33:\"internal_notes_created_by_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"created_by\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:32:\"internal_notes_parent_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:9:\"parent_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:58:\"internal_notes_project_id_importance_level_is_pinned_index\";a:4:{s:7:\"columns\";a:3:{i:0;s:10:\"project_id\";i:1;s:16:\"importance_level\";i:2;s:9:\"is_pinned\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:28:\"internal_notes_task_id_index\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"task_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:4:{i:0;a:7:{s:4:\"name\";s:33:\"internal_notes_created_by_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"created_by\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:1;a:7:{s:4:\"name\";s:32:\"internal_notes_parent_id_foreign\";s:7:\"columns\";a:1:{i:0;s:9:\"parent_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:14:\"internal_notes\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:2;a:7:{s:4:\"name\";s:33:\"internal_notes_project_id_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:8:\"projects\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:3;a:7:{s:4:\"name\";s:30:\"internal_notes_task_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"task_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"tasks\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"internal_payouts\";a:5:{s:7:\"columns\";a:10:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"user_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"task_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:4:\"type\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:11:\"amount_paid\";a:1:{s:4:\"type\";s:7:\"decimal\";}s:6:\"status\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:7:\"paid_at\";a:1:{s:4:\"type\";s:8:\"datetime\";}s:5:\"notes\";a:1:{s:4:\"type\";s:4:\"text\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:3:{s:32:\"internal_payouts_task_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"task_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:32:\"internal_payouts_user_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:2:{i:0;a:7:{s:4:\"name\";s:32:\"internal_payouts_task_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"task_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"tasks\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:1;a:7:{s:4:\"name\";s:32:\"internal_payouts_user_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"milestones\";a:5:{s:7:\"columns\";a:8:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:10:\"project_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:5:\"title\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:8:\"due_date\";a:1:{s:4:\"type\";s:4:\"date\";}s:12:\"is_completed\";a:1:{s:4:\"type\";s:7:\"tinyint\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"deleted_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:2:{s:29:\"milestones_project_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:1:{i:0;a:7:{s:4:\"name\";s:29:\"milestones_project_id_foreign\";s:7:\"columns\";a:1:{i:0;s:10:\"project_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:8:\"projects\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"note_mentions\";a:5:{s:7:\"columns\";a:7:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"note_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"user_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"is_read\";a:1:{s:4:\"type\";s:7:\"tinyint\";}s:7:\"read_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:3:{s:36:\"note_mentions_note_id_user_id_unique\";a:4:{s:7:\"columns\";a:2:{i:0;s:7:\"note_id\";i:1;s:7:\"user_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:29:\"note_mentions_user_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}}s:12:\"foreign_keys\";a:2:{i:0;a:7:{s:4:\"name\";s:29:\"note_mentions_note_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"note_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:14:\"internal_notes\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:1;a:7:{s:4:\"name\";s:29:\"note_mentions_user_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"task_assignments\";a:5:{s:7:\"columns\";a:10:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"task_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"user_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:11:\"assigned_by\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:17:\"assignment_status\";a:1:{s:4:\"type\";s:7:\"varchar\";}s:13:\"change_reason\";a:1:{s:4:\"type\";s:4:\"text\";}s:11:\"assigned_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"removed_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:4:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:36:\"task_assignments_assigned_by_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:11:\"assigned_by\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:51:\"task_assignments_task_id_user_id_assigned_at_unique\";a:4:{s:7:\"columns\";a:3:{i:0;s:7:\"task_id\";i:1;s:7:\"user_id\";i:2;s:11:\"assigned_at\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:0;}s:32:\"task_assignments_user_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:3:{i:0;a:7:{s:4:\"name\";s:36:\"task_assignments_assigned_by_foreign\";s:7:\"columns\";a:1:{i:0;s:11:\"assigned_by\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:8:\"set null\";}i:1;a:7:{s:4:\"name\";s:32:\"task_assignments_task_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"task_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"tasks\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:2;a:7:{s:4:\"name\";s:32:\"task_assignments_user_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"time_logs\";a:5:{s:7:\"columns\";a:9:{s:2:\"id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"task_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:7:\"user_id\";a:1:{s:4:\"type\";s:6:\"bigint\";}s:12:\"actual_hours\";a:1:{s:4:\"type\";s:7:\"decimal\";}s:9:\"work_date\";a:1:{s:4:\"type\";s:4:\"date\";}s:7:\"comment\";a:1:{s:4:\"type\";s:4:\"text\";}s:10:\"created_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"updated_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}s:10:\"deleted_at\";a:1:{s:4:\"type\";s:9:\"timestamp\";}}s:7:\"indexes\";a:3:{s:7:\"primary\";a:4:{s:7:\"columns\";a:1:{i:0;s:2:\"id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:1;s:10:\"is_primary\";b:1;}s:25:\"time_logs_task_id_foreign\";a:4:{s:7:\"columns\";a:1:{i:0;s:7:\"task_id\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}s:33:\"time_logs_user_id_work_date_index\";a:4:{s:7:\"columns\";a:2:{i:0;s:7:\"user_id\";i:1;s:9:\"work_date\";}s:4:\"type\";s:5:\"btree\";s:9:\"is_unique\";b:0;s:10:\"is_primary\";b:0;}}s:12:\"foreign_keys\";a:2:{i:0;a:7:{s:4:\"name\";s:25:\"time_logs_task_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"task_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"tasks\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}i:1;a:7:{s:4:\"name\";s:25:\"time_logs_user_id_foreign\";s:7:\"columns\";a:1:{i:0;s:7:\"user_id\";}s:14:\"foreign_schema\";s:11:\"div_flow_db\";s:13:\"foreign_table\";s:5:\"users\";s:15:\"foreign_columns\";a:1:{i:0;s:2:\"id\";}s:9:\"on_update\";s:9:\"no action\";s:9:\"on_delete\";s:7:\"cascade\";}}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"contact_infos\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"messages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"project_views\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"seo_metas\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"services\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"testimonials\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"website_analytics\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"about_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"abouts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"activity_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"app_media\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"app_media_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"banner_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"brand_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"brands\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"cancel_reason_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"cancel_reasons\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:4:\"cars\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"chats\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"cities\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"city_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"clients\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"common_message_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"common_messages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"compatible_car_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"compatible_cars\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"contact_replies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"contacts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"content_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"contents\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:32:\"country_manufacture_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"country_manufactures\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"country_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"devices\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"faq_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:4:\"faqs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"metadata\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"metadata_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"model_codes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"model_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"models\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"notification_senders\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"order_not_completed_reasons\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"order_status_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"page_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"pages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"permission_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:29:\"product_category_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"product_file_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"product_fitment\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"product_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:25:\"product_type_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"profiles\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"reason_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"reasons\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"reject_reason_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"reject_reasons\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"request_reject_reasons\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"reviews\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"role_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"search_carts\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"search_keys\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"search_problems\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:30:\"search_request_compatible_cars\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"search_request_reports\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"search_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"settlement_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"sliders\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"store_activities\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"store_activity_translations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"store_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"stores\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"synchronous_elements\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"transaction_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"user_notifications\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"user_otps\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"vendor_locations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"vendor_product_locations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"vendor_products\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"wallet_transactions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"withdrawals\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"attachments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"automation_assigned\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"calendar_events\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"calendar_events_sharing\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"canned\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"canned_recently_used\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"category_users\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"checklists\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"comments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"cs_affiliate_earnings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"cs_affiliate_projects\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"cs_events\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"customfields\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"email_log\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"email_queue\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"email_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"events_tracking\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"file_folders\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"files\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"filters\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"imaplog\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"invoice_statuses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"items_custom_fields\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"kb_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"knowledgebase\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"lead_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"leads_assigned\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"leads_sources\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"leads_status\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"lineitems\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:4:\"logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"messages_tracking\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"milestone_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"payment_sessions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"product_tasks\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:26:\"product_tasks_dependencies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"projects_assigned\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"projects_manager\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"reminders\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"settings2\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"starred\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"tableconfig\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:4:\"tags\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"tasks_assigned\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"tasks_dependencies\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"tasks_priority\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"tasks_status\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:3:\"tax\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"taxrates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"tickets_status\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"timelines\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"timers\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"updates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"updating\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"webforms\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"webforms_assigned\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"webhooks\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"webmail_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"applications\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"colors\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"company_details\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"coupons\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"favorites\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"file_upload_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"newsletters\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"order_payments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:4:\"otps\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"payment_cards\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"product_ads\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"product_groups\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"product_ratings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"product_tags\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"shipping_methods\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:14:\"specifications\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"uploaded_images\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"delivery_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"dictionary_values\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"erp_sync_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"erp_tokens\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"invoice_payments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"program_customers\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:24:\"program_utility_provider\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:8:\"programs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"provinces\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"utility_item_incentives\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"utility_providers\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"warehouses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"admin_notifications\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"api_tokens\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"category_product\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"newsletter_campaigns\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"performance_metrics\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"product_attachments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"quote_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:6:\"quotes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"scheduled_reports\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"transactions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"available_measurements\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"cart_fabric_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"cart_product_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"customer_addresses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"customer_saved_measurements\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"driver_locations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"driver_points_log\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"driver_vehicles\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:23:\"employee_certifications\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"employees\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"fabric_colors\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"fabrics\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:28:\"group_available_measurements\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"order_coupon\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"order_driver_logs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:30:\"order_fabric_item_measurements\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"order_fabric_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"order_product_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:7:\"ratings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"budget_categories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:25:\"budget_revision_approvals\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"budget_revisions\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"bug_attachments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"bug_comments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"bug_statuses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:4:\"bugs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"contracts_attachments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"contracts_comments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"contracts_notes\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"contracts_types\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"email_template_langs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"expense_approvals\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"expense_attachments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"expense_recurring\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"expense_workflows\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"google_meeting_members\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"google_meetings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:25:\"landing_page_custom_pages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"landing_page_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"login_histories\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"media_items\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"notification_template_langs\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:22:\"notification_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"payment_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"payout_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"plan_orders\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"plan_requests\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:5:\"plans\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:18:\"project_activities\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"project_attachments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"project_budgets\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"project_clients\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"project_expenses\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"referral_settings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:9:\"referrals\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:16:\"task_attachments\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:15:\"task_checklists\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:12:\"task_members\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:11:\"task_stages\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:19:\"timesheet_approvals\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"timesheet_entries\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"timesheets\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"user_email_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:27:\"user_notification_templates\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:21:\"workspace_invitations\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:17:\"workspace_members\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:10:\"workspaces\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:20:\"zoom_meeting_members\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}s:13:\"zoom_meetings\";a:5:{s:7:\"columns\";a:0:{}s:7:\"indexes\";a:0:{}s:12:\"foreign_keys\";a:0:{}s:8:\"triggers\";a:0:{}s:17:\"check_constraints\";a:0:{}}}s:6:\"global\";a:4:{s:5:\"views\";a:0:{}s:17:\"stored_procedures\";a:0:{}s:9:\"functions\";a:0:{}s:9:\"sequences\";a:0:{}}}', 1773461532);
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-boost.roster.scan', 'a:2:{s:6:\"roster\";O:21:\"Laravel\\Roster\\Roster\":3:{s:13:\"\0*\0approaches\";O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:11:\"\0*\0packages\";O:32:\"Laravel\\Roster\\PackageCollection\":2:{s:8:\"\0*\0items\";a:9:{i:0;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:1;s:13:\"\0*\0constraint\";s:5:\"^12.0\";s:10:\"\0*\0package\";E:37:\"Laravel\\Roster\\Enums\\Packages:LARAVEL\";s:14:\"\0*\0packageName\";s:17:\"laravel/framework\";s:10:\"\0*\0version\";s:7:\"12.53.0\";s:6:\"\0*\0dev\";b:0;}i:1;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:0;s:13:\"\0*\0constraint\";s:7:\"v0.3.13\";s:10:\"\0*\0package\";E:37:\"Laravel\\Roster\\Enums\\Packages:PROMPTS\";s:14:\"\0*\0packageName\";s:15:\"laravel/prompts\";s:10:\"\0*\0version\";s:6:\"0.3.13\";s:6:\"\0*\0dev\";b:0;}i:2;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:1;s:13:\"\0*\0constraint\";s:4:\"^4.0\";s:10:\"\0*\0package\";E:37:\"Laravel\\Roster\\Enums\\Packages:SANCTUM\";s:14:\"\0*\0packageName\";s:15:\"laravel/sanctum\";s:10:\"\0*\0version\";s:5:\"4.3.1\";s:6:\"\0*\0dev\";b:0;}i:3;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:0;s:13:\"\0*\0constraint\";s:6:\"v0.5.9\";s:10:\"\0*\0package\";E:33:\"Laravel\\Roster\\Enums\\Packages:MCP\";s:14:\"\0*\0packageName\";s:11:\"laravel/mcp\";s:10:\"\0*\0version\";s:5:\"0.5.9\";s:6:\"\0*\0dev\";b:1;}i:4;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:1;s:13:\"\0*\0constraint\";s:5:\"^1.24\";s:10:\"\0*\0package\";E:34:\"Laravel\\Roster\\Enums\\Packages:PINT\";s:14:\"\0*\0packageName\";s:12:\"laravel/pint\";s:10:\"\0*\0version\";s:6:\"1.27.1\";s:6:\"\0*\0dev\";b:1;}i:5;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:1;s:13:\"\0*\0constraint\";s:5:\"^1.41\";s:10:\"\0*\0package\";E:34:\"Laravel\\Roster\\Enums\\Packages:SAIL\";s:14:\"\0*\0packageName\";s:12:\"laravel/sail\";s:10:\"\0*\0version\";s:6:\"1.53.0\";s:6:\"\0*\0dev\";b:1;}i:6;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:1;s:13:\"\0*\0constraint\";s:6:\"^3.8.5\";s:10:\"\0*\0package\";E:34:\"Laravel\\Roster\\Enums\\Packages:PEST\";s:14:\"\0*\0packageName\";s:12:\"pestphp/pest\";s:10:\"\0*\0version\";s:5:\"3.8.5\";s:6:\"\0*\0dev\";b:1;}i:7;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:0;s:13:\"\0*\0constraint\";s:7:\"11.5.50\";s:10:\"\0*\0package\";E:37:\"Laravel\\Roster\\Enums\\Packages:PHPUNIT\";s:14:\"\0*\0packageName\";s:15:\"phpunit/phpunit\";s:10:\"\0*\0version\";s:7:\"11.5.50\";s:6:\"\0*\0dev\";b:1;}i:8;O:22:\"Laravel\\Roster\\Package\":6:{s:9:\"\0*\0direct\";b:0;s:13:\"\0*\0constraint\";s:0:\"\";s:10:\"\0*\0package\";E:41:\"Laravel\\Roster\\Enums\\Packages:TAILWINDCSS\";s:14:\"\0*\0packageName\";s:11:\"tailwindcss\";s:10:\"\0*\0version\";s:5:\"4.2.1\";s:6:\"\0*\0dev\";b:1;}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:21:\"\0*\0nodePackageManager\";E:43:\"Laravel\\Roster\\Enums\\NodePackageManager:NPM\";}s:9:\"timestamp\";i:1773461449;}', 1773547849);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `internal_notes`
--

CREATE TABLE `internal_notes` (
  `id` bigint UNSIGNED NOT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `created_by` bigint UNSIGNED NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `importance_level` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `project_id` bigint UNSIGNED DEFAULT NULL,
  `task_id` bigint UNSIGNED DEFAULT NULL,
  `is_pinned` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `internal_notes`
--

INSERT INTO `internal_notes` (`id`, `parent_id`, `created_by`, `title`, `content`, `importance_level`, `project_id`, `task_id`, `is_pinned`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, NULL, 11, 'طلب تعديل', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 1, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(2, NULL, 11, 'طلب تعديل', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 1, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(3, NULL, 11, 'ملاحظة هامة', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 2, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(4, NULL, 11, 'تحديث بخصوص المهام', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 2, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(5, NULL, 10, 'ملاحظة هامة', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 3, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(6, NULL, 10, 'طلب تعديل', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 3, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(7, NULL, 10, 'توجيهات جديدة', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 3, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(8, NULL, 14, 'مراجعة التصميم', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 4, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(9, NULL, 14, 'تحديث بخصوص المهام', 'واجهت بعض المشاكل التقنية في هذا الجزء، الرجاء المساعدة في حلها بأقرب وقت.', 'normal', NULL, 4, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(10, NULL, 14, 'ملاحظة هامة', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 5, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(11, NULL, 14, 'مراجعة التصميم', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 5, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(12, NULL, 11, 'توجيهات جديدة', 'واجهت بعض المشاكل التقنية في هذا الجزء، الرجاء المساعدة في حلها بأقرب وقت.', 'normal', NULL, 6, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(13, NULL, 11, 'استفسار سريع', 'يرجى الاطلاع على التحديثات الأخيرة وإبلاغي بأي ملاحظات إضافية.', 'normal', NULL, 6, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(14, NULL, 12, 'توجيهات جديدة', 'واجهت بعض المشاكل التقنية في هذا الجزء، الرجاء المساعدة في حلها بأقرب وقت.', 'normal', NULL, 7, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(15, NULL, 12, 'طلب تعديل', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 7, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(16, NULL, 13, 'استفسار سريع', 'واجهت بعض المشاكل التقنية في هذا الجزء، الرجاء المساعدة في حلها بأقرب وقت.', 'normal', NULL, 8, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(17, NULL, 13, 'توجيهات جديدة', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 8, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(18, NULL, 12, 'مراجعة التصميم', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 9, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(19, NULL, 12, 'استفسار سريع', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 9, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(20, NULL, 15, 'مشكلة برمجية', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 10, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(21, NULL, 15, 'ملاحظة هامة', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 10, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(22, NULL, 15, 'مراجعة التصميم', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 10, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(23, NULL, 15, 'تحديث بخصوص المهام', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 11, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(24, NULL, 15, 'مراجعة التصميم', 'يرجى الاطلاع على التحديثات الأخيرة وإبلاغي بأي ملاحظات إضافية.', 'normal', NULL, 12, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(25, NULL, 9, 'مراجعة التصميم', 'يرجى الاطلاع على التحديثات الأخيرة وإبلاغي بأي ملاحظات إضافية.', 'normal', NULL, 13, 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(26, NULL, 13, 'ملاحظة هامة', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 14, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(27, NULL, 13, 'طلب تعديل', 'واجهت بعض المشاكل التقنية في هذا الجزء، الرجاء المساعدة في حلها بأقرب وقت.', 'normal', NULL, 14, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(28, NULL, 8, 'مراجعة التصميم', 'واجهت بعض المشاكل التقنية في هذا الجزء، الرجاء المساعدة في حلها بأقرب وقت.', 'normal', NULL, 15, 1, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(29, NULL, 8, 'طلب تعديل', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 15, 1, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(30, NULL, 8, 'مراجعة التصميم', 'يرجى الاطلاع على التحديثات الأخيرة وإبلاغي بأي ملاحظات إضافية.', 'normal', NULL, 15, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(31, NULL, 9, 'توجيهات جديدة', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 16, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(32, NULL, 9, 'طلب تعديل', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 16, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(33, NULL, 11, 'ملاحظة هامة', 'هل يمكننا عقد اجتماع قصير لمناقشة التفاصيل النهائية قبل الاعتماد؟', 'normal', NULL, 17, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(34, NULL, 11, 'ملاحظة هامة', 'يرجى الاطلاع على التحديثات الأخيرة وإبلاغي بأي ملاحظات إضافية.', 'normal', NULL, 17, 1, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(35, NULL, 11, 'ملاحظة هامة', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 17, 1, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(36, NULL, 14, 'تحديث بخصوص المهام', 'يرجى الاطلاع على التحديثات الأخيرة وإبلاغي بأي ملاحظات إضافية.', 'normal', NULL, 18, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(37, NULL, 14, 'طلب تعديل', 'واجهت بعض المشاكل التقنية في هذا الجزء، الرجاء المساعدة في حلها بأقرب وقت.', 'normal', NULL, 18, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(38, NULL, 14, 'تحديث بخصوص المهام', 'تم إنجاز الجزء المطلوب بنجاح، ويمكنكم البدء في عملية الاختبار والمراجعة.', 'normal', NULL, 18, 1, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(39, NULL, 14, 'تحديث بخصوص المهام', 'يرجى الاطلاع على التحديثات الأخيرة وإبلاغي بأي ملاحظات إضافية.', 'normal', NULL, 19, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `internal_payouts`
--

CREATE TABLE `internal_payouts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `task_id` bigint UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'payment',
  `amount_paid` decimal(15,2) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paid_at` datetime DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `internal_payouts`
--

INSERT INTO `internal_payouts` (`id`, `user_id`, `task_id`, `type`, `amount_paid`, `status`, `paid_at`, `notes`, `created_at`, `updated_at`) VALUES
(1, 8, 1, 'payment', 446.89, 'pending', NULL, 'دفعة مستحقة عن إنجاز المهام المطلوبة هذا الأسبوع.', '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(2, 8, 1, 'payment', 432.49, 'pending', NULL, 'دفعة مستحقة عن إنجاز المهام المطلوبة هذا الأسبوع.', '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(3, 10, 10, 'payment', 143.16, 'pending', NULL, 'تسوية مالية للمهام السابقة.', '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(4, 12, 6, 'payment', 421.96, 'pending', NULL, 'دفعة مستحقة عن إنجاز المهام المطلوبة هذا الأسبوع.', '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(5, 12, 6, 'payment', 229.39, 'pending', NULL, 'تسوية مالية للمهام السابقة.', '2026-03-13 03:21:26', '2026-03-13 03:21:26');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collection_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversions_disk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` bigint UNSIGNED NOT NULL,
  `manipulations` json NOT NULL,
  `custom_properties` json NOT NULL,
  `generated_conversions` json NOT NULL,
  `responsive_images` json NOT NULL,
  `order_column` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_03_06_045940_create_permission_tables', 1),
(5, '2026_03_06_050415_create_personal_access_tokens_table', 1),
(6, '2026_03_06_051242_create_media_table', 1),
(7, '2026_03_06_070001_create_projects_table', 1),
(8, '2026_03_06_070002_create_milestones_table', 1),
(9, '2026_03_06_070003_create_tasks_table', 1),
(10, '2026_03_06_070004_create_internal_notes_table', 1),
(11, '2026_03_06_070005_create_note_mentions_table', 1),
(12, '2026_03_06_070006_create_task_assignments_table', 1),
(13, '2026_03_06_070007_create_time_logs_table', 1),
(14, '2026_03_06_070008_create_internal_payouts_table', 1),
(15, '2026_03_06_070009_create_audit_logs_table', 1),
(16, '2026_03_12_055353_add_employee_number_to_users_table', 1),
(17, '2026_03_12_060453_add_parent_id_to_internal_notes_table', 1),
(18, '2026_03_12_061411_add_status_and_paid_at_to_internal_payouts_table', 1),
(19, '2026_03_12_063244_add_management_columns_to_tasks_table', 1),
(20, '2026_03_12_065725_add_teams_support_to_permission_tables', 1),
(21, '2026_03_12_065725_create_project_members_table', 1),
(22, '2026_03_12_104800_update_audit_logs_for_polymorphism', 1),
(23, '2026_03_13_000001_create_customers_table', 1),
(24, '2026_03_13_000002_add_details_to_projects_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `milestones`
--

CREATE TABLE `milestones` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` date DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `milestones`
--

INSERT INTO `milestones` (`id`, `project_id`, `title`, `due_date`, `is_completed`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'المرحلة السادسة: الإطلاق والتدشين', '2026-12-17', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(2, 1, 'المرحلة الثانية: بناء قاعدة البيانات', '2026-07-18', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(3, 1, 'المرحلة السادسة: الإطلاق والتدشين', '2027-02-11', 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(4, 1, 'المرحلة الثالثة: تطوير الواجهات الأمامية', '2027-01-02', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(5, 2, 'المرحلة السادسة: الإطلاق والتدشين', '2026-05-30', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(6, 2, 'المرحلة الرابعة: الربط مع الخدمات الخلفية', '2026-11-27', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(7, 2, 'المرحلة الأولى: التحليل والتصميم', '2026-04-12', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(8, 3, 'المرحلة الرابعة: الربط مع الخدمات الخلفية', '2026-03-19', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(9, 3, 'المرحلة الثانية: بناء قاعدة البيانات', '2027-02-03', 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(10, 3, 'المرحلة الثانية: بناء قاعدة البيانات', '2026-06-20', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(11, 3, 'المرحلة الثانية: بناء قاعدة البيانات', '2026-06-27', 1, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(12, 4, 'المرحلة الخامسة: الاختبارات النهائية', '2026-10-21', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(13, 4, 'المرحلة الرابعة: الربط مع الخدمات الخلفية', '2026-04-22', 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(14, 5, 'المرحلة الخامسة: الاختبارات النهائية', '2026-09-04', 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(15, 5, 'المرحلة الأولى: التحليل والتصميم', '2026-05-01', 1, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`id`, `role_id`, `model_type`, `model_id`, `project_id`) VALUES
(1, 1, 'App\\Models\\User', 1, NULL),
(5, 2, 'App\\Models\\User', 5, NULL),
(6, 2, 'App\\Models\\User', 6, NULL),
(7, 2, 'App\\Models\\User', 7, NULL),
(3, 3, 'App\\Models\\User', 3, NULL),
(4, 3, 'App\\Models\\User', 4, NULL),
(2, 4, 'App\\Models\\User', 2, NULL),
(8, 4, 'App\\Models\\User', 8, NULL),
(9, 4, 'App\\Models\\User', 9, NULL),
(10, 4, 'App\\Models\\User', 10, NULL),
(11, 4, 'App\\Models\\User', 11, NULL),
(12, 4, 'App\\Models\\User', 12, NULL),
(13, 4, 'App\\Models\\User', 13, NULL),
(14, 4, 'App\\Models\\User', 14, NULL),
(15, 4, 'App\\Models\\User', 15, NULL),
(16, 4, 'App\\Models\\User', 16, NULL),
(17, 4, 'App\\Models\\User', 17, NULL),
(18, 5, 'App\\Models\\User', 5, 1),
(19, 7, 'App\\Models\\User', 14, 1),
(20, 7, 'App\\Models\\User', 17, 1),
(21, 8, 'App\\Models\\User', 6, 2),
(22, 10, 'App\\Models\\User', 12, 2),
(23, 10, 'App\\Models\\User', 15, 2),
(24, 10, 'App\\Models\\User', 16, 2),
(25, 10, 'App\\Models\\User', 17, 2),
(26, 11, 'App\\Models\\User', 5, 3),
(27, 13, 'App\\Models\\User', 12, 3),
(28, 13, 'App\\Models\\User', 16, 3),
(29, 14, 'App\\Models\\User', 7, 4),
(30, 16, 'App\\Models\\User', 8, 4),
(31, 16, 'App\\Models\\User', 10, 4),
(32, 16, 'App\\Models\\User', 16, 4),
(33, 16, 'App\\Models\\User', 17, 4),
(34, 17, 'App\\Models\\User', 7, 5),
(35, 19, 'App\\Models\\User', 15, 5),
(36, 19, 'App\\Models\\User', 16, 5);

-- --------------------------------------------------------

--
-- Table structure for table `note_mentions`
--

CREATE TABLE `note_mentions` (
  `id` bigint UNSIGNED NOT NULL,
  `note_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `name_ar`, `name_en`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'view tasks', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(2, 'add tasks', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(3, 'edit tasks', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(4, 'assign tasks', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(5, 'delete tasks', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(6, 'manage project members', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint UNSIGNED NOT NULL,
  `project_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `features` text COLLATE utf8mb4_unicode_ci,
  `internal_budget` decimal(18,2) NOT NULL DEFAULT '0.00',
  `total_cost` decimal(15,2) DEFAULT NULL,
  `payment_stages` json DEFAULT NULL,
  `requirements_study` json DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'on_hold',
  `owner_id` bigint UNSIGNED DEFAULT NULL,
  `customer_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_name`, `type`, `description`, `features`, `internal_budget`, `total_cost`, `payment_stages`, `requirements_study`, `start_date`, `end_date`, `status`, `owner_id`, `customer_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'برمجة نظام Homenick, Torphy and Kozey', NULL, 'التركيز في هذا المشروع سيكون على تحسين تجربة المستخدم وزيادة مستوى الأمان والسرعة.', NULL, 70210.11, NULL, NULL, NULL, '1990-03-21', NULL, 'active', 5, NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(2, 'برمجة نظام Metz, Klocko and Beatty', NULL, 'التركيز في هذا المشروع سيكون على تحسين تجربة المستخدم وزيادة مستوى الأمان والسرعة.', NULL, 63720.40, NULL, NULL, NULL, '1971-09-29', NULL, 'active', 6, NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(3, 'برمجة نظام Pacocha-Hackett', NULL, 'هذا المشروع يهدف إلى بناء نظام إداري متكامل يسهم في تحسين العمليات اليومية للشركة.', NULL, 13100.17, NULL, NULL, NULL, '2022-10-01', NULL, 'active', 5, NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(4, 'تحسين أداء Mohr and Sons', NULL, 'هذا المشروع يهدف إلى بناء نظام إداري متكامل يسهم في تحسين العمليات اليومية للشركة.', NULL, 62163.23, NULL, NULL, NULL, '1979-02-23', NULL, 'active', 7, NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(5, 'تطوير تطبيق O\'Hara, Huel and Herman', NULL, 'هذا المشروع يهدف إلى بناء نظام إداري متكامل يسهم في تحسين العمليات اليومية للشركة.', NULL, 79831.67, NULL, NULL, NULL, '2003-06-11', NULL, 'active', 7, NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_members`
--

INSERT INTO `project_members` (`id`, `project_id`, `user_id`, `role`, `assigned_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 5, 'owner', 5, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(2, 1, 14, 'member', 5, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(3, 1, 17, 'member', 5, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(4, 2, 6, 'owner', 6, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(5, 2, 12, 'member', 6, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(6, 2, 15, 'member', 6, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(7, 2, 16, 'member', 6, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(8, 2, 17, 'member', 6, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(9, 3, 5, 'owner', 5, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(10, 3, 12, 'member', 5, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(11, 3, 16, 'member', 5, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(12, 4, 7, 'owner', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(13, 4, 8, 'member', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(14, 4, 10, 'member', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(15, 4, 16, 'member', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(16, 4, 17, 'member', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(17, 5, 7, 'owner', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(18, 5, 15, 'member', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(19, 5, 16, 'member', 7, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `project_id`, `name`, `name_ar`, `name_en`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, NULL, 'admin', 'مدير النظام', 'Administrator', 'web', '2026-03-13 03:21:20', '2026-03-13 03:21:20'),
(2, NULL, 'project_manager', 'مدير مشروع', 'Project Manager', 'web', '2026-03-13 03:21:20', '2026-03-13 03:21:20'),
(3, NULL, 'unit_manager', 'مدير وحدة', 'Unit Manager', 'web', '2026-03-13 03:21:20', '2026-03-13 03:21:20'),
(4, NULL, 'employee', 'موظف', 'Employee', 'web', '2026-03-13 03:21:20', '2026-03-13 03:21:20'),
(5, 1, 'owner', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(6, 1, 'manager', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(7, 1, 'member', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(8, 2, 'owner', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(9, 2, 'manager', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(10, 2, 'member', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(11, 3, 'owner', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(12, 3, 'manager', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(13, 3, 'member', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(14, 4, 'owner', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(15, 4, 'manager', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(16, 4, 'member', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(17, 5, 'owner', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(18, 5, 'manager', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(19, 5, 'member', NULL, NULL, 'web', '2026-03-13 03:21:25', '2026-03-13 03:21:25');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 5),
(2, 5),
(3, 5),
(4, 5),
(5, 5),
(6, 5),
(1, 6),
(2, 6),
(3, 6),
(4, 6),
(5, 6),
(1, 7),
(4, 7),
(1, 8),
(2, 8),
(3, 8),
(4, 8),
(5, 8),
(6, 8),
(1, 9),
(2, 9),
(3, 9),
(4, 9),
(5, 9),
(1, 10),
(4, 10),
(1, 11),
(2, 11),
(3, 11),
(4, 11),
(5, 11),
(6, 11),
(1, 12),
(2, 12),
(3, 12),
(4, 12),
(5, 12),
(1, 13),
(4, 13),
(1, 14),
(2, 14),
(3, 14),
(4, 14),
(5, 14),
(6, 14),
(1, 15),
(2, 15),
(3, 15),
(4, 15),
(5, 15),
(1, 16),
(4, 16),
(1, 17),
(2, 17),
(3, 17),
(4, 17),
(5, 17),
(6, 17),
(1, 18),
(2, 18),
(3, 18),
(4, 18),
(5, 18),
(1, 19),
(4, 19);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint UNSIGNED NOT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `project_id` bigint UNSIGNED NOT NULL,
  `milestone_id` bigint UNSIGNED DEFAULT NULL,
  `parent_task_id` bigint UNSIGNED DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `priority` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `estimated_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `task_weight` int NOT NULL DEFAULT '1',
  `billing_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fixed',
  `internal_price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `sort_order` int NOT NULL DEFAULT '0',
  `dependent_task_id` bigint UNSIGNED DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `is_on_time` tinyint(1) DEFAULT NULL,
  `is_deductible_if_late` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `created_by`, `project_id`, `milestone_id`, `parent_task_id`, `title`, `description`, `priority`, `status`, `estimated_hours`, `task_weight`, `billing_type`, `internal_price`, `sort_order`, `dependent_task_id`, `completed_at`, `is_on_time`, `is_deductible_if_late`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, NULL, 1, 2, NULL, 'مراجعة الكود لـ Larkin PLC', 'يرجى مراجعة المتطلبات بعناية والعمل على إنجاز المهمة في الوقت المحدد.', 'low', 'completed', 96.16, 67, 'hourly', 81.77, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(2, NULL, 1, 2, NULL, 'كتابة التوثيق لـ Russel, Altenwerth and Kris', 'تأكد من كتابة الدليل التشغيلي وتحديث التوثيق (Documentation) قبل إغلاق المهمة.', 'low', 'completed', 72.13, 69, 'non-billable', 25.75, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(3, NULL, 1, 2, NULL, 'تحسين الأمان لـ Olson, Wilderman and Bayer', 'يرجى مراجعة المتطلبات بعناية والعمل على إنجاز المهمة في الوقت المحدد.', 'low', 'completed', 47.02, 28, 'hourly', 83.85, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(4, NULL, 2, 6, NULL, 'برمجة قاعدة البيانات لـ Kozey-Metz', 'هذا وصف مبدئي للمهمة يحتوي على التفاصيل المطلوبة لتنفيذها بشكل صحيح مع مراعاة كافة المعايير.', 'low', 'pending', 66.38, 75, 'fixed', 16.44, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(5, NULL, 2, 6, NULL, 'اختبار الأداء لـ Kerluke-Mraz', 'تأكد من كتابة الدليل التشغيلي وتحديث التوثيق (Documentation) قبل إغلاق المهمة.', 'low', 'in_progress', 18.81, 75, 'hourly', 74.56, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(6, NULL, 2, 6, NULL, 'تحسين الأمان لـ Koepp and Sons', 'يرجى مراجعة المتطلبات بعناية والعمل على إنجاز المهمة في الوقت المحدد.', 'low', 'completed', 87.88, 13, 'hourly', 99.68, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(7, NULL, 2, 6, NULL, 'إصلاح الأخطاء لـ King and Sons', 'تتطلب هذه المهمة التنسيق مع فريق التصميم والبرمجة لضمان أعلى مستويات الجودة في التسليم.', 'medium', 'completed', 96.12, 80, 'hourly', 100.49, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(8, NULL, 3, 10, NULL, 'تصميم واجهة المستخدم لـ Hill PLC', 'تأكد من كتابة الدليل التشغيلي وتحديث التوثيق (Documentation) قبل إغلاق المهمة.', 'medium', 'pending', 53.49, 62, 'hourly', 175.41, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(9, NULL, 3, 10, NULL, 'كتابة التوثيق لـ Murphy LLC', 'يرجى مراجعة المتطلبات بعناية والعمل على إنجاز المهمة في الوقت المحدد.', 'low', 'pending', 25.88, 53, 'non-billable', 140.40, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(10, NULL, 3, 10, NULL, 'كتابة التوثيق لـ Beahan Inc', 'تأكد من كتابة الدليل التشغيلي وتحديث التوثيق (Documentation) قبل إغلاق المهمة.', 'low', 'completed', 1.86, 18, 'fixed', 95.97, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(11, NULL, 3, 10, NULL, 'اختبار الأداء لـ Marquardt, Aufderhar and Champlin', 'هذا وصف مبدئي للمهمة يحتوي على التفاصيل المطلوبة لتنفيذها بشكل صحيح مع مراعاة كافة المعايير.', 'medium', 'in_progress', 62.49, 66, 'fixed', 142.70, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(12, NULL, 3, 10, NULL, 'إصلاح الأخطاء لـ Corkery-Ebert', 'تأكد من كتابة الدليل التشغيلي وتحديث التوثيق (Documentation) قبل إغلاق المهمة.', 'high', 'in_progress', 71.08, 51, 'fixed', 83.58, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(13, NULL, 4, 13, NULL, 'برمجة قاعدة البيانات لـ Mills, Boyle and Schumm', 'تأكد من كتابة الدليل التشغيلي وتحديث التوثيق (Documentation) قبل إغلاق المهمة.', 'low', 'in_progress', 13.55, 18, 'fixed', 124.07, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(14, NULL, 4, 13, NULL, 'اختبار الأداء لـ Maggio PLC', 'تتطلب هذه المهمة التنسيق مع فريق التصميم والبرمجة لضمان أعلى مستويات الجودة في التسليم.', 'high', 'completed', 39.76, 91, 'fixed', 139.70, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(15, NULL, 4, 13, NULL, 'كتابة التوثيق لـ Ortiz Ltd', 'هذا وصف مبدئي للمهمة يحتوي على التفاصيل المطلوبة لتنفيذها بشكل صحيح مع مراعاة كافة المعايير.', 'medium', 'completed', 12.56, 38, 'hourly', 168.28, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(16, NULL, 4, 13, NULL, 'اختبار الأداء لـ Schuppe, Graham and Jones', 'تتطلب هذه المهمة التنسيق مع فريق التصميم والبرمجة لضمان أعلى مستويات الجودة في التسليم.', 'high', 'completed', 57.00, 36, 'hourly', 17.78, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(17, NULL, 5, 14, NULL, 'إضافة ميزة الدفع لـ Fay-Kovacek', 'يرجى مراجعة المتطلبات بعناية والعمل على إنجاز المهمة في الوقت المحدد.', 'medium', 'completed', 8.25, 27, 'hourly', 123.40, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(18, NULL, 5, 14, NULL, 'تحسين الأمان لـ Miller Inc', 'يرجى مراجعة المتطلبات بعناية والعمل على إنجاز المهمة في الوقت المحدد.', 'low', 'completed', 76.23, 83, 'hourly', 52.18, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(19, NULL, 5, 14, NULL, 'اختبار الأداء لـ O\'Conner, Tremblay and Veum', 'تأكد من كتابة الدليل التشغيلي وتحديث التوثيق (Documentation) قبل إغلاق المهمة.', 'high', 'pending', 27.53, 5, 'fixed', 56.46, 0, NULL, NULL, NULL, 0, '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task_assignments`
--

CREATE TABLE `task_assignments` (
  `id` bigint UNSIGNED NOT NULL,
  `task_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `assigned_by` bigint UNSIGNED DEFAULT NULL,
  `assignment_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `change_reason` text COLLATE utf8mb4_unicode_ci,
  `assigned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `removed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_assignments`
--

INSERT INTO `task_assignments` (`id`, `task_id`, `user_id`, `assigned_by`, `assignment_status`, `change_reason`, `assigned_at`, `removed_at`, `created_at`, `updated_at`) VALUES
(1, 1, 11, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(2, 1, 14, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(3, 2, 10, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(4, 2, 11, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(5, 3, 10, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(6, 3, 12, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(7, 3, 14, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(8, 4, 14, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(9, 5, 10, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(10, 5, 14, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(11, 6, 11, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(12, 6, 13, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(13, 6, 16, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(14, 7, 12, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(15, 7, 16, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(16, 7, 17, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(17, 8, 12, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(18, 8, 13, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(19, 8, 15, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(20, 9, 12, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(21, 9, 13, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(22, 10, 15, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(23, 11, 10, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(24, 11, 11, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(25, 11, 15, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(26, 12, 15, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(27, 13, 9, 4, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(28, 14, 13, 3, 'active', NULL, '2026-03-13 06:21:25', NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25'),
(29, 15, 8, 4, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(30, 15, 12, 3, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(31, 16, 9, 4, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(32, 16, 14, 3, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(33, 17, 11, 3, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(34, 17, 15, 4, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(35, 18, 14, 3, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(36, 19, 11, 4, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(37, 19, 14, 3, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26'),
(38, 19, 16, 3, 'active', NULL, '2026-03-13 06:21:26', NULL, '2026-03-13 03:21:26', '2026-03-13 03:21:26');

-- --------------------------------------------------------

--
-- Table structure for table `time_logs`
--

CREATE TABLE `time_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `task_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `actual_hours` decimal(10,2) NOT NULL,
  `work_date` date NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `time_logs`
--

INSERT INTO `time_logs` (`id`, `task_id`, `user_id`, `actual_hours`, `work_date`, `comment`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 14, 3.50, '1997-07-29', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(2, 1, 14, 3.02, '2024-08-02', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(3, 2, 11, 4.92, '1985-02-18', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(4, 2, 11, 5.35, '2015-05-05', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(5, 2, 11, 5.00, '2015-04-12', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(6, 3, 10, 2.09, '2015-10-11', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(7, 3, 10, 3.26, '2015-07-01', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(8, 3, 10, 7.96, '2014-04-28', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(9, 3, 10, 3.60, '2012-11-03', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(10, 4, 14, 6.24, '2010-01-31', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(11, 4, 14, 1.79, '1980-09-10', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(12, 4, 14, 2.99, '1986-02-28', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(13, 5, 14, 1.49, '2022-06-26', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(14, 6, 11, 7.81, '1994-12-13', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(15, 6, 11, 5.79, '2011-03-02', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(16, 6, 11, 5.22, '2015-11-02', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(17, 6, 11, 3.57, '2006-03-28', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(18, 7, 12, 6.29, '1997-07-28', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(19, 8, 15, 7.11, '1981-10-03', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(20, 8, 15, 2.60, '2000-09-16', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(21, 8, 15, 1.88, '2023-02-18', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(22, 9, 12, 5.97, '2023-08-31', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(23, 9, 12, 6.70, '2008-01-18', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(24, 9, 12, 6.82, '2012-07-28', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(25, 9, 12, 1.75, '2020-02-19', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(26, 10, 15, 1.18, '2018-11-25', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(27, 10, 15, 8.00, '1987-09-06', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(28, 10, 15, 3.97, '2022-09-10', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(29, 11, 10, 5.62, '2019-01-15', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(30, 11, 10, 5.02, '2015-12-17', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(31, 11, 10, 0.62, '2014-06-28', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(32, 11, 10, 5.17, '2000-05-07', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(33, 12, 15, 2.06, '2018-06-16', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(34, 12, 15, 3.17, '2015-07-06', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(35, 12, 15, 2.32, '1982-08-30', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(36, 13, 9, 6.75, '1977-06-06', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(37, 13, 9, 1.99, '2003-11-01', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(38, 13, 9, 4.09, '1981-10-11', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(39, 14, 13, 7.57, '2023-05-29', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(40, 14, 13, 1.80, '1989-03-29', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(41, 14, 13, 2.40, '1975-05-12', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:25', '2026-03-13 03:21:25', NULL),
(42, 15, 8, 4.18, '1989-05-08', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(43, 16, 9, 0.51, '2025-02-16', 'إصلاح بعض الأخطاء التقنية التي ظهرت في بيئة الاختبار.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(44, 16, 9, 3.62, '1973-07-13', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(45, 17, 11, 5.71, '1992-03-31', 'برمجة وتجهيز قواعد البيانات وربطها بالواجهات الأمامية.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(46, 17, 11, 5.78, '1999-12-16', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(47, 17, 11, 6.69, '1974-12-29', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(48, 17, 11, 5.67, '2011-06-03', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(49, 18, 14, 1.08, '2005-01-23', 'مراجعة الكود وتحسين الأداء لضمان الاستجابة السريعة للنظام.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(50, 18, 14, 6.45, '2025-11-02', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(51, 18, 14, 3.81, '2017-07-07', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(52, 19, 11, 4.77, '1999-09-12', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(53, 19, 11, 7.66, '1991-03-25', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(54, 19, 11, 0.61, '1974-05-31', 'العمل على تصميم واجهات المستخدم بناءً على ملاحظات العميل.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL),
(55, 19, 11, 5.78, '2020-06-29', 'اجتماع مع الفريق لمناقشة متطلبات المرحلة القادمة.', '2026-03-13 03:21:26', '2026-03-13 03:21:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employee_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_hourly_rate` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `employee_number`, `phone`, `email_verified_at`, `password`, `default_hourly_rate`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@divflow.com', NULL, NULL, NULL, '$2y$12$oYzDhr.XEoQeLAF8j45YLuVfbgQo9tpGdL.c3EI6yli2X9Cocjkby', NULL, 1, NULL, '2026-03-13 03:21:20', '2026-03-13 03:21:20'),
(2, 'Employee One', 'employee1@divflow.com', NULL, NULL, NULL, '$2y$12$xXg90X0Zz9v8857E/byE/.E1VLU3rBXev8vCOVw6Sr6R2TaL/i1Xu', NULL, 1, NULL, '2026-03-13 03:21:20', '2026-03-13 03:21:20'),
(3, 'مدير وحدة 1', 'unit1@divflow.com', NULL, NULL, NULL, '$2y$12$KGx0W8FPYslRX6qKbTVI8Omedtls8q.IMi//bbdjjELF9TAfTMFye', 0.00, 1, NULL, '2026-03-13 03:21:21', '2026-03-13 03:21:21'),
(4, 'مدير وحدة 2', 'unit2@divflow.com', NULL, NULL, NULL, '$2y$12$yqH0C2Bedf3U9h/S.pGwAe/49Y9blFX6nLAS9XAP7gpTOwQF4UnPK', 0.00, 1, NULL, '2026-03-13 03:21:21', '2026-03-13 03:21:21'),
(5, 'مدير مشروع 1', 'pm1@divflow.com', NULL, NULL, NULL, '$2y$12$pp4QG80s2YNSHq3mvcBkfelghWhQY3ThjyZkugp38TtdPhmMhDyX.', 0.00, 1, NULL, '2026-03-13 03:21:22', '2026-03-13 03:21:22'),
(6, 'مدير مشروع 2', 'pm2@divflow.com', NULL, NULL, NULL, '$2y$12$TLQT5ep4ABNhmCE6tN0XeupsfBS8ydscWsq0jNp4kp.RbMbniLb6m', 0.00, 1, NULL, '2026-03-13 03:21:22', '2026-03-13 03:21:22'),
(7, 'مدير مشروع 3', 'pm3@divflow.com', NULL, NULL, NULL, '$2y$12$wv.OdERMXvZRY7wnu4G6g.tg0Lu1ZfRJlnmqlcK2Y8LOplbBqY0om', 0.00, 1, NULL, '2026-03-13 03:21:22', '2026-03-13 03:21:22'),
(8, 'موظف 1', 'emp1@divflow.com', NULL, NULL, NULL, '$2y$12$4MeyAZcPphR5e2a6xgVfRuekKwlkH3DJJRm5ZRmm/GQTu7tW93YCe', 15.00, 1, NULL, '2026-03-13 03:21:22', '2026-03-13 03:21:22'),
(9, 'موظف 2', 'emp2@divflow.com', NULL, NULL, NULL, '$2y$12$aL15cKRpoJuqeNMlsq90j.7v2jXf2rdUt5MQCoNXuet/89uWhpIQK', 15.00, 1, NULL, '2026-03-13 03:21:23', '2026-03-13 03:21:23'),
(10, 'موظف 3', 'emp3@divflow.com', NULL, NULL, NULL, '$2y$12$r77JwBQObQgN/CDJ953qCulIZvmRC1hDVcvrpBPMQ5LcLOZwkL0Qm', 15.00, 1, NULL, '2026-03-13 03:21:23', '2026-03-13 03:21:23'),
(11, 'موظف 4', 'emp4@divflow.com', NULL, NULL, NULL, '$2y$12$.zm62RdZENTLjvLsDT0Cvudy3QImUUWpVTgITn39ZrGeIB0hu7Wn.', 15.00, 1, NULL, '2026-03-13 03:21:23', '2026-03-13 03:21:23'),
(12, 'موظف 5', 'emp5@divflow.com', NULL, NULL, NULL, '$2y$12$03MhY8nYUKbtHh8tAYxALeLbRnfXOQIN9yaiZNkWs/zY1NuN.ldOG', 15.00, 1, NULL, '2026-03-13 03:21:23', '2026-03-13 03:21:23'),
(13, 'موظف 6', 'emp6@divflow.com', NULL, NULL, NULL, '$2y$12$XAI9Yvw9wVo7S8qgJ9kP4uWXhkCNeUTYnog5zFWCUNTDg1IqYa0Oq', 15.00, 1, NULL, '2026-03-13 03:21:24', '2026-03-13 03:21:24'),
(14, 'موظف 7', 'emp7@divflow.com', NULL, NULL, NULL, '$2y$12$MlrTIdyrVsZ3sLJ9VDQVMeXLhFVa6suGMgIMbDgf40dx88xJSaEd2', 15.00, 1, NULL, '2026-03-13 03:21:24', '2026-03-13 03:21:24'),
(15, 'موظف 8', 'emp8@divflow.com', NULL, NULL, NULL, '$2y$12$EY0z0vVuqwGSJuAskW1ZxOo2Ad4RaDohqhWBtKg0q4SMeE/rulLFC', 15.00, 1, NULL, '2026-03-13 03:21:24', '2026-03-13 03:21:24'),
(16, 'موظف 9', 'emp9@divflow.com', NULL, NULL, NULL, '$2y$12$W2p5QPvBA70dkFPRBBU9aOB7QLcrUBgbhPGDSbQ41AxhBvuCpGMjG', 15.00, 1, NULL, '2026-03-13 03:21:24', '2026-03-13 03:21:24'),
(17, 'موظف 10', 'emp10@divflow.com', NULL, NULL, NULL, '$2y$12$pcfLFj75gPFLcrUQRhFUp.Gdn0N3F0alqSzmravE37DxzGPyOVbCe', 15.00, 1, NULL, '2026-03-13 03:21:25', '2026-03-13 03:21:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `audit_logs_changed_by_foreign` (`changed_by`),
  ADD KEY `audit_logs_task_id_created_at_index` (`created_at`),
  ADD KEY `audit_logs_auditable_type_auditable_id_index` (`auditable_type`,`auditable_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_created_by_foreign` (`created_by`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `internal_notes`
--
ALTER TABLE `internal_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `internal_notes_created_by_foreign` (`created_by`),
  ADD KEY `internal_notes_project_id_importance_level_is_pinned_index` (`project_id`,`importance_level`,`is_pinned`),
  ADD KEY `internal_notes_task_id_index` (`task_id`),
  ADD KEY `internal_notes_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `internal_payouts`
--
ALTER TABLE `internal_payouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `internal_payouts_user_id_foreign` (`user_id`),
  ADD KEY `internal_payouts_task_id_foreign` (`task_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `media_uuid_unique` (`uuid`),
  ADD KEY `media_model_type_model_id_index` (`model_type`,`model_id`),
  ADD KEY `media_order_column_index` (`order_column`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `milestones`
--
ALTER TABLE `milestones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `milestones_project_id_foreign` (`project_id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `model_has_permissions_team_permission_unique` (`project_id`,`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  ADD KEY `model_has_permissions_team_foreign_key_index` (`project_id`),
  ADD KEY `model_has_permissions_project_id_index` (`project_id`),
  ADD KEY `model_has_permissions_permission_id_foreign` (`permission_id`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `model_has_roles_team_role_unique` (`project_id`,`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  ADD KEY `model_has_roles_team_foreign_key_index` (`project_id`),
  ADD KEY `model_has_roles_project_id_index` (`project_id`),
  ADD KEY `model_has_roles_role_id_foreign` (`role_id`);

--
-- Indexes for table `note_mentions`
--
ALTER TABLE `note_mentions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `note_mentions_note_id_user_id_unique` (`note_id`,`user_id`),
  ADD KEY `note_mentions_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_owner_id_foreign` (`owner_id`),
  ADD KEY `projects_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `project_members_project_id_user_id_unique` (`project_id`,`user_id`),
  ADD KEY `project_members_user_id_foreign` (`user_id`),
  ADD KEY `project_members_assigned_by_foreign` (`assigned_by`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_project_id_name_guard_name_unique` (`project_id`,`name`,`guard_name`),
  ADD KEY `roles_team_foreign_key_index` (`project_id`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_milestone_id_foreign` (`milestone_id`),
  ADD KEY `tasks_parent_task_id_foreign` (`parent_task_id`),
  ADD KEY `tasks_project_id_status_index` (`project_id`,`status`),
  ADD KEY `tasks_project_id_priority_index` (`project_id`,`priority`),
  ADD KEY `tasks_created_by_foreign` (`created_by`),
  ADD KEY `tasks_dependent_task_id_foreign` (`dependent_task_id`);

--
-- Indexes for table `task_assignments`
--
ALTER TABLE `task_assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `task_assignments_task_id_user_id_assigned_at_unique` (`task_id`,`user_id`,`assigned_at`),
  ADD KEY `task_assignments_user_id_foreign` (`user_id`),
  ADD KEY `task_assignments_assigned_by_foreign` (`assigned_by`);

--
-- Indexes for table `time_logs`
--
ALTER TABLE `time_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `time_logs_task_id_foreign` (`task_id`),
  ADD KEY `time_logs_user_id_work_date_index` (`user_id`,`work_date`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `internal_notes`
--
ALTER TABLE `internal_notes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `internal_payouts`
--
ALTER TABLE `internal_payouts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `milestones`
--
ALTER TABLE `milestones`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `note_mentions`
--
ALTER TABLE `note_mentions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `project_members`
--
ALTER TABLE `project_members`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `task_assignments`
--
ALTER TABLE `task_assignments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `time_logs`
--
ALTER TABLE `time_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_changed_by_foreign` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `internal_notes`
--
ALTER TABLE `internal_notes`
  ADD CONSTRAINT `internal_notes_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `internal_notes_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `internal_notes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `internal_notes_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `internal_notes_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `internal_payouts`
--
ALTER TABLE `internal_payouts`
  ADD CONSTRAINT `internal_payouts_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `internal_payouts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `milestones`
--
ALTER TABLE `milestones`
  ADD CONSTRAINT `milestones_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `note_mentions`
--
ALTER TABLE `note_mentions`
  ADD CONSTRAINT `note_mentions_note_id_foreign` FOREIGN KEY (`note_id`) REFERENCES `internal_notes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `note_mentions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `projects_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `project_members_assigned_by_foreign` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `project_members_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_dependent_task_id_foreign` FOREIGN KEY (`dependent_task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_milestone_id_foreign` FOREIGN KEY (`milestone_id`) REFERENCES `milestones` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_parent_task_id_foreign` FOREIGN KEY (`parent_task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_assignments`
--
ALTER TABLE `task_assignments`
  ADD CONSTRAINT `task_assignments_assigned_by_foreign` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `task_assignments_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `time_logs`
--
ALTER TABLE `time_logs`
  ADD CONSTRAINT `time_logs_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `time_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
