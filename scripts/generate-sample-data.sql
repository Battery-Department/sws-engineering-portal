-- Generate Quiz Intelligence Sample Data
-- Quick sample data for testing the Quiz Intelligence Dashboard

-- Clean existing data
DELETE FROM quiz_conversions;
DELETE FROM quiz_responses;
DELETE FROM quiz_interactions;
DELETE FROM quiz_ml_features;
DELETE FROM quiz_user_profiles;
DELETE FROM quiz_sessions;

-- Generate sample quiz sessions
INSERT INTO quiz_sessions (id, visitor_id, started_at, completed_at, current_question_index, utm_source, utm_medium, device, user_agent, ip_address) VALUES
('session-001', 'visitor-001', '2025-05-29 10:00:00', '2025-05-29 10:03:45', 3, 'facebook_ad', 'cpc', 'mobile', 'Safari Mobile', '192.168.1.1'),
('session-002', 'visitor-002', '2025-05-29 10:15:00', '2025-05-29 10:18:20', 3, 'google_ad', 'cpc', 'desktop', 'Chrome 91', '192.168.1.2'),
('session-003', 'visitor-003', '2025-05-29 10:30:00', NULL, 1, 'organic', 'organic', 'mobile', 'Safari Mobile', '192.168.1.3'),
('session-004', 'visitor-004', '2025-05-29 11:00:00', '2025-05-29 11:04:15', 3, 'direct', 'none', 'desktop', 'Chrome 91', '192.168.1.4'),
('session-005', 'visitor-005', '2025-05-29 11:15:00', '2025-05-29 11:18:55', 3, 'facebook_ad', 'cpc', 'tablet', 'iPad Safari', '192.168.1.5'),
('session-006', 'visitor-006', '2025-05-29 11:30:00', NULL, 2, 'google_ad', 'cpc', 'mobile', 'Safari Mobile', '192.168.1.6'),
('session-007', 'visitor-007', '2025-05-29 12:00:00', '2025-05-29 12:03:30', 3, 'organic', 'organic', 'desktop', 'Firefox 89', '192.168.1.7'),
('session-008', 'visitor-008', '2025-05-29 12:15:00', '2025-05-29 12:19:45', 3, 'facebook_ad', 'cpc', 'mobile', 'Safari Mobile', '192.168.1.8'),
('session-009', 'visitor-009', '2025-05-29 12:30:00', NULL, 0, 'direct', 'none', 'desktop', 'Chrome 91', '192.168.1.9'),
('session-010', 'visitor-010', '2025-05-29 13:00:00', '2025-05-29 13:05:20', 3, 'google_ad', 'cpc', 'mobile', 'Safari Mobile', '192.168.1.10');

-- Generate user profiles
INSERT INTO quiz_user_profiles (id, session_id, profile_type, traits, segment, score, created_at) VALUES
('profile-001', 'session-001', 'contractor_solo', '{"experienceLevel": "experienced", "pricesensitivity": "medium"}', 'b2c', 85.5, '2025-05-29 10:00:00'),
('profile-002', 'session-002', 'fleet_manager', '{"experienceLevel": "experienced", "pricesensitivity": "low"}', 'b2b', 92.3, '2025-05-29 10:15:00'),
('profile-003', 'session-003', 'contractor_team', '{"experienceLevel": "beginner", "pricesensitivity": "high"}', 'b2c', 67.8, '2025-05-29 10:30:00'),
('profile-004', 'session-004', 'maintenance_tech', '{"experienceLevel": "experienced", "pricesensitivity": "medium"}', 'b2b', 78.9, '2025-05-29 11:00:00'),
('profile-005', 'session-005', 'contractor_solo', '{"experienceLevel": "experienced", "pricesensitivity": "low"}', 'b2c', 89.2, '2025-05-29 11:15:00'),
('profile-006', 'session-006', 'purchasing_agent', '{"experienceLevel": "beginner", "pricesensitivity": "high"}', 'b2b', 72.4, '2025-05-29 11:30:00'),
('profile-007', 'session-007', 'contractor_team', '{"experienceLevel": "experienced", "pricesensitivity": "medium"}', 'b2c', 83.7, '2025-05-29 12:00:00'),
('profile-008', 'session-008', 'contractor_solo', '{"experienceLevel": "experienced", "pricesensitivity": "low"}', 'b2c', 91.1, '2025-05-29 12:15:00'),
('profile-009', 'session-009', 'fleet_manager', '{"experienceLevel": "beginner", "pricesensitivity": "medium"}', 'b2b', 65.3, '2025-05-29 12:30:00'),
('profile-010', 'session-010', 'contractor_team', '{"experienceLevel": "experienced", "pricesensitivity": "medium"}', 'b2c', 87.6, '2025-05-29 13:00:00');

-- Generate quiz responses for completed sessions
INSERT INTO quiz_responses (id, session_id, question_id, question_index, selected_option, time_spent, created_at) VALUES
-- Session 1 responses
('resp-001-1', 'session-001', 'team-size', 0, 0, 12000, '2025-05-29 10:00:30'),
('resp-001-2', 'session-001', 'daily-runtime', 1, 2, 18000, '2025-05-29 10:01:15'),
('resp-001-3', 'session-001', 'primary-tools', 2, 1, 25000, '2025-05-29 10:02:05'),
('resp-001-4', 'session-001', 'budget-range', 3, 1, 16000, '2025-05-29 10:03:30'),

-- Session 2 responses
('resp-002-1', 'session-002', 'team-size', 0, 2, 15000, '2025-05-29 10:15:45'),
('resp-002-2', 'session-002', 'daily-runtime', 1, 3, 22000, '2025-05-29 10:16:30'),
('resp-002-3', 'session-002', 'primary-tools', 2, 2, 28000, '2025-05-29 10:17:20'),
('resp-002-4', 'session-002', 'budget-range', 3, 3, 20000, '2025-05-29 10:18:10'),

-- Session 4 responses  
('resp-004-1', 'session-004', 'team-size', 0, 1, 11000, '2025-05-29 11:00:25'),
('resp-004-2', 'session-004', 'daily-runtime', 1, 1, 17000, '2025-05-29 11:01:10'),
('resp-004-3', 'session-004', 'primary-tools', 2, 0, 23000, '2025-05-29 11:02:00'),
('resp-004-4', 'session-004', 'budget-range', 3, 2, 18000, '2025-05-29 11:04:00'),

-- Session 5 responses
('resp-005-1', 'session-005', 'team-size', 0, 0, 13000, '2025-05-29 11:15:30'),
('resp-005-2', 'session-005', 'daily-runtime', 1, 2, 19000, '2025-05-29 11:16:20'),
('resp-005-3', 'session-005', 'primary-tools', 2, 1, 26000, '2025-05-29 11:17:15'),
('resp-005-4', 'session-005', 'budget-range', 3, 1, 17000, '2025-05-29 11:18:45'),

-- Session 7 responses
('resp-007-1', 'session-007', 'team-size', 0, 1, 14000, '2025-05-29 12:00:35'),
('resp-007-2', 'session-007', 'daily-runtime', 1, 2, 20000, '2025-05-29 12:01:25'),
('resp-007-3', 'session-007', 'primary-tools', 2, 2, 24000, '2025-05-29 12:02:15'),
('resp-007-4', 'session-007', 'budget-range', 3, 2, 19000, '2025-05-29 12:03:20'),

-- Session 8 responses
('resp-008-1', 'session-008', 'team-size', 0, 0, 12500, '2025-05-29 12:15:25'),
('resp-008-2', 'session-008', 'daily-runtime', 1, 3, 21000, '2025-05-29 12:16:20'),
('resp-008-3', 'session-008', 'primary-tools', 2, 1, 27000, '2025-05-29 12:17:30'),
('resp-008-4', 'session-008', 'budget-range', 3, 2, 18500, '2025-05-29 12:19:30'),

-- Session 10 responses
('resp-010-1', 'session-010', 'team-size', 0, 2, 16000, '2025-05-29 13:00:40'),
('resp-010-2', 'session-010', 'daily-runtime', 1, 2, 23000, '2025-05-29 13:01:35'),
('resp-010-3', 'session-010', 'primary-tools', 2, 3, 29000, '2025-05-29 13:02:45'),
('resp-010-4', 'session-010', 'budget-range', 3, 3, 21000, '2025-05-29 13:05:10');

-- Generate behavioral interactions
INSERT INTO quiz_interactions (id, session_id, interaction_type, data, timestamp) VALUES
-- Session 1 interactions
('int-001-1', 'session-001', 'click', '{"element": "option-1", "x": 150, "y": 200}', '2025-05-29 10:00:15'),
('int-001-2', 'session-001', 'hesitation', '{"timeOnQuestion": 35000, "mouseMovements": 25}', '2025-05-29 10:00:45'),
('int-001-3', 'session-001', 'scroll', '{"direction": "down", "distance": 100}', '2025-05-29 10:01:30'),
('int-001-4', 'session-001', 'click', '{"element": "next-button", "x": 300, "y": 450}', '2025-05-29 10:02:00'),

-- Session 2 interactions
('int-002-1', 'session-002', 'click', '{"element": "option-3", "x": 250, "y": 300}', '2025-05-29 10:15:30'),
('int-002-2', 'session-002', 'mouse_move', '{"x": 200, "y": 250, "speed": 45}', '2025-05-29 10:16:00'),
('int-002-3', 'session-002', 'focus_loss', '{"duration": 15000, "reason": "tab_switch"}', '2025-05-29 10:17:00'),

-- Session 3 interactions (incomplete)
('int-003-1', 'session-003', 'click', '{"element": "option-2", "x": 180, "y": 220}', '2025-05-29 10:30:20'),
('int-003-2', 'session-003', 'hesitation', '{"timeOnQuestion": 45000, "mouseMovements": 35}', '2025-05-29 10:31:00'),
('int-003-3', 'session-003', 'back_button', '{"attempt": 1}', '2025-05-29 10:31:30');

-- Generate ML features
INSERT INTO quiz_ml_features (id, session_id, engagement_score, dropout_risk, hesitation_count, click_velocity, scroll_behavior, time_distribution, device_proficiency, completion_prediction) VALUES
('ml-001', 'session-001', 0.75, 0.25, 2, 0.8, 0.6, 0.7, 0.8, 1),
('ml-002', 'session-002', 0.85, 0.15, 1, 1.2, 0.8, 0.9, 0.9, 1),
('ml-003', 'session-003', 0.35, 0.85, 5, 0.3, 0.4, 0.3, 0.6, 0),
('ml-004', 'session-004', 0.80, 0.20, 1, 1.0, 0.7, 0.8, 0.85, 1),
('ml-005', 'session-005', 0.78, 0.22, 2, 0.9, 0.65, 0.75, 0.7, 1),
('ml-006', 'session-006', 0.45, 0.75, 4, 0.4, 0.5, 0.4, 0.65, 0),
('ml-007', 'session-007', 0.82, 0.18, 1, 1.1, 0.75, 0.85, 0.9, 1),
('ml-008', 'session-008', 0.88, 0.12, 0, 1.3, 0.85, 0.9, 0.8, 1),
('ml-009', 'session-009', 0.25, 0.95, 6, 0.2, 0.3, 0.2, 0.5, 0),
('ml-010', 'session-010', 0.83, 0.17, 1, 1.15, 0.8, 0.88, 0.85, 1);

-- Generate conversions for some completed sessions
INSERT INTO quiz_conversions (id, session_id, converted_at, conversion_type, value, product_category, attribution, metadata) VALUES
('conv-001', 'session-001', '2025-05-29 10:15:00', 'quote_request', 750.00, 'flexvolt_batteries', '{"source": "facebook_ad", "medium": "cpc"}', '{"quizScore": 85.5, "recommendedProducts": ["9ah-flexvolt"]}'),
('conv-002', 'session-002', '2025-05-29 10:45:00', 'quote_request', 2500.00, 'flexvolt_batteries', '{"source": "google_ad", "medium": "cpc"}', '{"quizScore": 92.3, "recommendedProducts": ["15ah-flexvolt", "9ah-flexvolt"]}'),
('conv-005', 'session-005', '2025-05-29 11:30:00', 'quote_request', 500.00, 'flexvolt_batteries', '{"source": "facebook_ad", "medium": "cpc"}', '{"quizScore": 89.2, "recommendedProducts": ["6ah-flexvolt"]}'),
('conv-008', 'session-008', '2025-05-29 12:45:00', 'quote_request', 1250.00, 'flexvolt_batteries', '{"source": "facebook_ad", "medium": "cpc"}', '{"quizScore": 91.1, "recommendedProducts": ["9ah-flexvolt", "6ah-flexvolt"]}');

-- Sample A/B test data (insert into existing experiment)
UPDATE quiz_experiments SET 
  statistical_significance = 0.94,
  winning_variant = 'B'
WHERE experiment_name = 'Question Order Optimization';