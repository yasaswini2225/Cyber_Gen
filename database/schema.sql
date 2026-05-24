-- Active: mysql database schema setup for Cyber Security Courses Website

-- 1. Create the Database if it doesn't exist
CREATE DATABASE IF NOT EXISTS cyber_courses_db;
USE cyber_courses_db;

-- 2. Create the Users Table
-- This table stores user credentials. Notice we allow a 255-character password field
-- because we will hash passwords using bcryptjs for high security.
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create the Courses Table
-- This table stores the catalog of cybersecurity courses with instructor, pricing, and duration info.
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    price INT NOT NULL,               -- Store price as a number (INR)
    duration VARCHAR(50) NOT NULL,     -- E.g., '6 Weeks'
    level VARCHAR(50) NOT NULL,        -- E.g., 'Beginner', 'Intermediate', 'Advanced'
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,   -- Premium Unsplash illustration links
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insert 10 Realistic Cybersecurity Courses
-- These are populated with authentic details, realistic descriptions, and premium images.
-- Clear the table first to avoid duplicate keys during manual script runs.
TRUNCATE TABLE courses;

INSERT INTO courses (title, instructor, price, duration, level, description, image_url) VALUES
(
    'Ethical Hacking Basics',
    'Dr. Amanda Wall',
    1999,
    '6 Weeks',
    'Beginner',
    'Learn the fundamentals of ethical hacking, legal penetration testing guidelines, and footprinting techniques. Ideal for students starting their security journey.',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600'
),
(
    'Network Security Masterclass',
    'Marcus Vance',
    2999,
    '8 Weeks',
    'Intermediate',
    'Master network architecture security, firewalls, intrusion detection systems (IDS/IPS), VPN configurations, and packet analysis using Wireshark.',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600'
),
(
    'Cybersecurity for Beginners',
    'Sarah Jenkins',
    1499,
    '4 Weeks',
    'Beginner',
    'A comprehensive introduction to cyber threats, social engineering, identity protection, safe browsing habits, and security fundamentals for everyone.',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
),
(
    'Penetration Testing Bootcamp',
    'Alex Mercer',
    3999,
    '10 Weeks',
    'Advanced',
    'An intensive, hands-on bootcamp focusing on active reconnaissance, vulnerability assessment, exploitation frameworks, and writing industry-grade security reports.',
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=600'
),
(
    'Malware Analysis Fundamentals',
    'Dr. Elizabeth Reed',
    2499,
    '5 Weeks',
    'Intermediate',
    'Understand malware behavior. Learn static and dynamic analysis techniques, sandboxing, and binary dissection to protect systems against advanced persistent threats.',
    'https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&q=80&w=600'
),
(
    'Digital Forensics Essentials',
    'Sherlock Holmes Jr.',
    2799,
    '7 Weeks',
    'Intermediate',
    'Discover how to trace cybercriminal activities, recover deleted data, analyze registry files, and extract digital evidence from windows and mobile file systems legally.',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600'
),
(
    'Web Application Security',
    'Vikram Malhotra',
    3299,
    '8 Weeks',
    'Advanced',
    'Dive deep into OWASP Top 10 vulnerabilities including SQL Injection, Cross-Site Scripting (XSS), CSRF, and broken authorization. Learn secure coding practices.',
    'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=600'
),
(
    'Linux Security Administration',
    'Linus Torvalds Fanboy',
    2199,
    '5 Weeks',
    'Intermediate',
    'Secure Linux servers. Learn user account hardening, SSH configurations, firewalling with iptables/UFW, file permissions, and auditing logs using advanced command-line utilities.',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600'
),
(
    'Cloud Security Basics',
    'Diana Prince',
    2599,
    '6 Weeks',
    'Beginner',
    'Understand cloud architecture security in AWS, Azure, and GCP. Learn about identity and access management (IAM), shared responsibility models, and cloud threat vectors.',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600'
),
(
    'Advanced Ethical Hacking',
    'Dr. Amanda Wall',
    4999,
    '12 Weeks',
    'Advanced',
    'The ultimate hacking course. Learn buffer overflows, exploit development, defense evasion, Active Directory hacking, and sophisticated pivoting methods.',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
);
