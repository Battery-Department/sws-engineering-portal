-- Generate Quiz Intelligence Sample Data (Fixed Column Names)
-- Quick sample data for testing the Quiz Intelligence Dashboard

-- Clean existing data
DELETE FROM quiz_conversions;
DELETE FROM quiz_responses;
DELETE FROM quiz_interactions;
DELETE FROM quiz_ml_features;
DELETE FROM quiz_user_profiles;
DELETE FROM quiz_sessions;

-- Generate sample quiz sessions (using correct column names)
INSERT INTO quiz_sessions (id, quiz_id, visitor_id, status, current_step, utm_source, utm_medium, device_info, user_agent, ip_address, start_time, end_time) VALUES
('session-001', 'battery-assessment-quiz', 'visitor-001', 'completed', 3, 'facebook_ad', 'cpc', '{"type": "mobile"}', 'Safari Mobile', '192.168.1.1', '2025-05-29 10:00:00', '2025-05-29 10:03:45'),
('session-002', 'battery-assessment-quiz', 'visitor-002', 'completed', 3, 'google_ad', 'cpc', '{"type": "desktop"}', 'Chrome 91', '192.168.1.2', '2025-05-29 10:15:00', '2025-05-29 10:18:20'),
('session-003', 'battery-assessment-quiz', 'visitor-003', 'abandoned', 1, 'organic', 'organic', '{"type": "mobile"}', 'Safari Mobile', '192.168.1.3', '2025-05-29 10:30:00', NULL),
('session-004', 'battery-assessment-quiz', 'visitor-004', 'completed', 3, 'direct', 'none', '{"type": "desktop"}', 'Chrome 91', '192.168.1.4', '2025-05-29 11:00:00', '2025-05-29 11:04:15'),
('session-005', 'battery-assessment-quiz', 'visitor-005', 'completed', 3, 'facebook_ad', 'cpc', '{"type": "tablet"}', 'iPad Safari', '192.168.1.5', '2025-05-29 11:15:00', '2025-05-29 11:18:55'),
('session-006', 'battery-assessment-quiz', 'visitor-006', 'abandoned', 2, 'google_ad', 'cpc', '{"type": "mobile"}', 'Safari Mobile', '192.168.1.6', '2025-05-29 11:30:00', NULL),
('session-007', 'battery-assessment-quiz', 'visitor-007', 'completed', 3, 'organic', 'organic', '{"type": "desktop"}', 'Firefox 89', '192.168.1.7', '2025-05-29 12:00:00', '2025-05-29 12:03:30'),
('session-008', 'battery-assessment-quiz', 'visitor-008', 'completed', 3, 'facebook_ad', 'cpc', '{"type": "mobile"}', 'Safari Mobile', '192.168.1.8', '2025-05-29 12:15:00', '2025-05-29 12:19:45'),
('session-009', 'battery-assessment-quiz', 'visitor-009', 'abandoned', 0, 'direct', 'none', '{"type": "desktop"}', 'Chrome 91', '192.168.1.9', '2025-05-29 12:30:00', NULL),
('session-010', 'battery-assessment-quiz', 'visitor-010', 'completed', 3, 'google_ad', 'cpc', '{"type": "mobile"}', 'Safari Mobile', '192.168.1.10', '2025-05-29 13:00:00', '2025-05-29 13:05:20');

-- Generate user profiles (checking correct schema first)
INSERT INTO quiz_user_profiles (id, visitor_id, behavioral_profile, business_profile, predictive_scores, segment, confidence_score, created_at) VALUES
('profile-001', 'visitor-001', '{"mousePatterns": "steady", "clickBehavior": "confident"}', '{"type": "contractor_solo"}', '{"conversionProb": 0.85}', 'b2c', 0.85, '2025-05-29 10:00:00'),
('profile-002', 'visitor-002', '{"mousePatterns": "deliberate", "clickBehavior": "methodical"}', '{"type": "fleet_manager"}', '{"conversionProb": 0.92}', 'b2b', 0.92, '2025-05-29 10:15:00'),
('profile-003', 'visitor-003', '{"mousePatterns": "hesitant", "clickBehavior": "uncertain"}', '{"type": "contractor_team"}', '{"conversionProb": 0.25}', 'b2c', 0.68, '2025-05-29 10:30:00'),
('profile-004', 'visitor-004', '{"mousePatterns": "efficient", "clickBehavior": "direct"}', '{"type": "maintenance_tech"}', '{"conversionProb": 0.79}', 'b2b', 0.79, '2025-05-29 11:00:00'),
('profile-005', 'visitor-005', '{"mousePatterns": "confident", "clickBehavior": "quick"}', '{"type": "contractor_solo"}', '{"conversionProb": 0.89}', 'b2c', 0.89, '2025-05-29 11:15:00'),
('profile-006', 'visitor-006', '{"mousePatterns": "scattered", "clickBehavior": "indecisive"}', '{"type": "purchasing_agent"}', '{"conversionProb": 0.35}', 'b2b', 0.72, '2025-05-29 11:30:00'),
('profile-007', 'visitor-007', '{"mousePatterns": "steady", "clickBehavior": "considered"}', '{"type": "contractor_team"}', '{"conversionProb": 0.84}', 'b2c', 0.84, '2025-05-29 12:00:00'),
('profile-008', 'visitor-008', '{"mousePatterns": "confident", "clickBehavior": "decisive"}', '{"type": "contractor_solo"}', '{"conversionProb": 0.91}', 'b2c', 0.91, '2025-05-29 12:15:00'),
('profile-009', 'visitor-009', '{"mousePatterns": "erratic", "clickBehavior": "confused"}', '{"type": "fleet_manager"}', '{"conversionProb": 0.15}', 'b2b', 0.65, '2025-05-29 12:30:00'),
('profile-010', 'visitor-010', '{"mousePatterns": "methodical", "clickBehavior": "thorough"}', '{"type": "contractor_team"}', '{"conversionProb": 0.88}', 'b2c', 0.88, '2025-05-29 13:00:00');

-- Generate quiz responses for completed sessions (checking schema)
INSERT INTO quiz_responses (id, session_id, question_id, question_type, response_value, response_time, created_at) VALUES
-- Session 1 responses
('resp-001-1', 'session-001', 'project-size', 'image-choice', '{"selectedOption": "solo"}', 12000, '2025-05-29 10:00:30'),
('resp-001-2', 'session-001', 'daily-runtime', 'single-choice', '{"selectedOption": "heavy"}', 18000, '2025-05-29 10:01:15'),
('resp-001-3', 'session-001', 'primary-tools', 'multi-choice', '{"selectedOptions": ["impact-driver"]}', 25000, '2025-05-29 10:02:05'),
('resp-001-4', 'session-001', 'budget-range', 'scale', '{"selectedOption": "budget-2"}', 16000, '2025-05-29 10:03:30'),

-- Session 2 responses
('resp-002-1', 'session-002', 'project-size', 'image-choice', '{"selectedOption": "large"}', 15000, '2025-05-29 10:15:45'),
('resp-002-2', 'session-002', 'daily-runtime', 'single-choice', '{"selectedOption": "continuous"}', 22000, '2025-05-29 10:16:30'),
('resp-002-3', 'session-002', 'primary-tools', 'multi-choice', '{"selectedOptions": ["circular-saw", "grinder"]}', 28000, '2025-05-29 10:17:20'),
('resp-002-4', 'session-002', 'budget-range', 'scale', '{"selectedOption": "budget-4"}', 20000, '2025-05-29 10:18:10'),

-- Session 4 responses  
('resp-004-1', 'session-004', 'project-size', 'image-choice', '{"selectedOption": "mid"}', 11000, '2025-05-29 11:00:25'),
('resp-004-2', 'session-004', 'daily-runtime', 'single-choice', '{"selectedOption": "moderate"}', 17000, '2025-05-29 11:01:10'),
('resp-004-3', 'session-004', 'primary-tools', 'multi-choice', '{"selectedOptions": ["drill"]}', 23000, '2025-05-29 11:02:00'),
('resp-004-4', 'session-004', 'budget-range', 'scale', '{"selectedOption": "budget-3"}', 18000, '2025-05-29 11:04:00'),

-- Session 5 responses
('resp-005-1', 'session-005', 'project-size', 'image-choice', '{"selectedOption": "solo"}', 13000, '2025-05-29 11:15:30'),
('resp-005-2', 'session-005', 'daily-runtime', 'single-choice', '{"selectedOption": "heavy"}', 19000, '2025-05-29 11:16:20'),
('resp-005-3', 'session-005', 'primary-tools', 'multi-choice', '{"selectedOptions": ["impact-driver"]}', 26000, '2025-05-29 11:17:15'),
('resp-005-4', 'session-005', 'budget-range', 'scale', '{"selectedOption": "budget-2"}', 17000, '2025-05-29 11:18:45'),

-- Session 7 responses
('resp-007-1', 'session-007', 'project-size', 'image-choice', '{"selectedOption": "mid"}', 14000, '2025-05-29 12:00:35'),
('resp-007-2', 'session-007', 'daily-runtime', 'single-choice', '{"selectedOption": "heavy"}', 20000, '2025-05-29 12:01:25'),
('resp-007-3', 'session-007', 'primary-tools', 'multi-choice', '{"selectedOptions": ["circular-saw", "grinder"]}', 24000, '2025-05-29 12:02:15'),
('resp-007-4', 'session-007', 'budget-range', 'scale', '{"selectedOption": "budget-3"}', 19000, '2025-05-29 12:03:20'),

-- Session 8 responses
('resp-008-1', 'session-008', 'project-size', 'image-choice', '{"selectedOption": "solo"}', 12500, '2025-05-29 12:15:25'),
('resp-008-2', 'session-008', 'daily-runtime', 'single-choice', '{"selectedOption": "continuous"}', 21000, '2025-05-29 12:16:20'),
('resp-008-3', 'session-008', 'primary-tools', 'multi-choice', '{"selectedOptions": ["impact-driver"]}', 27000, '2025-05-29 12:17:30'),
('resp-008-4', 'session-008', 'budget-range', 'scale', '{"selectedOption": "budget-3"}', 18500, '2025-05-29 12:19:30'),

-- Session 10 responses
('resp-010-1', 'session-010', 'project-size', 'image-choice', '{"selectedOption": "large"}', 16000, '2025-05-29 13:00:40'),
('resp-010-2', 'session-010', 'daily-runtime', 'single-choice', '{"selectedOption": "heavy"}', 23000, '2025-05-29 13:01:35'),
('resp-010-3', 'session-010', 'primary-tools', 'multi-choice', '{"selectedOptions": ["miter-saw", "drill"]}', 29000, '2025-05-29 13:02:45'),
('resp-010-4', 'session-010', 'budget-range', 'scale', '{"selectedOption": "budget-4"}', 21000, '2025-05-29 13:05:10');

-- Generate behavioral interactions (checking schema)
INSERT INTO quiz_interactions (id, session_id, interaction_type, interaction_data, timestamp) VALUES
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
('int-003-3', 'session-003', 'back_button', '{"attempt": 1}', '2025-05-29 10:31:30'),

-- Session 4 interactions
('int-004-1', 'session-004', 'click', '{"element": "option-2", "x": 200, "y": 250}', '2025-05-29 11:00:10'),
('int-004-2', 'session-004', 'scroll', '{"direction": "down", "distance": 80}', '2025-05-29 11:01:00'),

-- Session 5 interactions  
('int-005-1', 'session-005', 'click', '{"element": "option-1", "x": 160, "y": 210}', '2025-05-29 11:15:15'),
('int-005-2', 'session-005', 'hesitation', '{"timeOnQuestion": 20000, "mouseMovements": 15}', '2025-05-29 11:16:00'),

-- Session 6 interactions (incomplete)
('int-006-1', 'session-006', 'click', '{"element": "option-1", "x": 170, "y": 230}', '2025-05-29 11:30:15'),
('int-006-2', 'session-006', 'hesitation', '{"timeOnQuestion": 50000, "mouseMovements": 40}', '2025-05-29 11:31:30'),
('int-006-3', 'session-006', 'focus_loss', '{"duration": 25000, "reason": "phone_call"}', '2025-05-29 11:32:00'),

-- Session 7 interactions
('int-007-1', 'session-007', 'click', '{"element": "option-2", "x": 190, "y": 240}', '2025-05-29 12:00:20'),
('int-007-2', 'session-007', 'mouse_move', '{"x": 220, "y": 270, "speed": 55}', '2025-05-29 12:01:00'),

-- Session 8 interactions
('int-008-1', 'session-008', 'click', '{"element": "option-1", "x": 155, "y": 205}', '2025-05-29 12:15:10'),
('int-008-2', 'session-008', 'scroll', '{"direction": "down", "distance": 120}', '2025-05-29 12:16:00'),

-- Session 9 interactions (incomplete - early dropout)
('int-009-1', 'session-009', 'hesitation', '{"timeOnQuestion": 60000, "mouseMovements": 50}', '2025-05-29 12:30:30'),
('int-009-2', 'session-009', 'back_button', '{"attempt": 1}', '2025-05-29 12:31:00'),
('int-009-3', 'session-009', 'focus_loss', '{"duration": 30000, "reason": "tab_switch"}', '2025-05-29 12:31:30'),

-- Session 10 interactions
('int-010-1', 'session-010', 'click', '{"element": "option-3", "x": 260, "y": 320}', '2025-05-29 13:00:25'),
('int-010-2', 'session-010', 'scroll', '{"direction": "down", "distance": 90}', '2025-05-29 13:01:00');

-- Generate ML features (checking schema)
INSERT INTO quiz_ml_features (id, session_id, feature_vector, outcome_data, model_version, prediction_accuracy, created_at) VALUES
('ml-001', 'session-001', '{"engagement": 0.75, "dropout_risk": 0.25, "hesitation_count": 2, "click_velocity": 0.8}', '{"completed": true, "converted": true}', 'v1.0', 0.85, '2025-05-29 10:03:45'),
('ml-002', 'session-002', '{"engagement": 0.85, "dropout_risk": 0.15, "hesitation_count": 1, "click_velocity": 1.2}', '{"completed": true, "converted": true}', 'v1.0', 0.92, '2025-05-29 10:18:20'),
('ml-003', 'session-003', '{"engagement": 0.35, "dropout_risk": 0.85, "hesitation_count": 5, "click_velocity": 0.3}', '{"completed": false, "converted": false}', 'v1.0', 0.88, '2025-05-29 10:31:30'),
('ml-004', 'session-004', '{"engagement": 0.80, "dropout_risk": 0.20, "hesitation_count": 1, "click_velocity": 1.0}', '{"completed": true, "converted": false}', 'v1.0', 0.79, '2025-05-29 11:04:15'),
('ml-005', 'session-005', '{"engagement": 0.78, "dropout_risk": 0.22, "hesitation_count": 2, "click_velocity": 0.9}', '{"completed": true, "converted": true}', 'v1.0', 0.82, '2025-05-29 11:18:55'),
('ml-006', 'session-006', '{"engagement": 0.45, "dropout_risk": 0.75, "hesitation_count": 4, "click_velocity": 0.4}', '{"completed": false, "converted": false}', 'v1.0', 0.78, '2025-05-29 11:32:00'),
('ml-007', 'session-007', '{"engagement": 0.82, "dropout_risk": 0.18, "hesitation_count": 1, "click_velocity": 1.1}', '{"completed": true, "converted": false}', 'v1.0', 0.84, '2025-05-29 12:03:30'),
('ml-008', 'session-008', '{"engagement": 0.88, "dropout_risk": 0.12, "hesitation_count": 0, "click_velocity": 1.3}', '{"completed": true, "converted": true}', 'v1.0', 0.91, '2025-05-29 12:19:45'),
('ml-009', 'session-009', '{"engagement": 0.25, "dropout_risk": 0.95, "hesitation_count": 6, "click_velocity": 0.2}', '{"completed": false, "converted": false}', 'v1.0', 0.94, '2025-05-29 12:31:30'),
('ml-010', 'session-010', '{"engagement": 0.83, "dropout_risk": 0.17, "hesitation_count": 1, "click_velocity": 1.15}', '{"completed": true, "converted": false}', 'v1.0', 0.86, '2025-05-29 13:05:20');

-- Generate conversions for some completed sessions (checking schema)
INSERT INTO quiz_conversions (id, session_id, conversion_type, conversion_value, product_ids, converted_at, attribution_window) VALUES
('conv-001', 'session-001', 'quote_request', 750.00, '["9ah-flexvolt"]', '2025-05-29 10:15:00', 30),
('conv-002', 'session-002', 'quote_request', 2500.00, '["15ah-flexvolt", "9ah-flexvolt"]', '2025-05-29 10:45:00', 30),
('conv-005', 'session-005', 'quote_request', 500.00, '["6ah-flexvolt"]', '2025-05-29 11:30:00', 30),
('conv-008', 'session-008', 'quote_request', 1250.00, '["9ah-flexvolt", "6ah-flexvolt"]', '2025-05-29 12:45:00', 30);

-- Sample A/B test data (insert into existing experiment)
UPDATE quiz_experiments SET 
  statistical_significance = 0.94,
  winning_variant = 'B'
WHERE experiment_name = 'Question Order Optimization';

-- Generate some current active sessions for real-time demo
INSERT INTO quiz_sessions (id, quiz_id, visitor_id, status, current_step, utm_source, utm_medium, device_info, user_agent, ip_address, start_time, last_activity) VALUES
('live-001', 'battery-assessment-quiz', 'live-visitor-001', 'in_progress', 1, 'facebook_ad', 'cpc', '{"type": "mobile"}', 'Safari Mobile', '192.168.2.1', datetime('now', '-2 minutes'), datetime('now', '-30 seconds')),
('live-002', 'battery-assessment-quiz', 'live-visitor-002', 'in_progress', 2, 'google_ad', 'cpc', '{"type": "desktop"}', 'Chrome 91', '192.168.2.2', datetime('now', '-5 minutes'), datetime('now', '-1 minute')),
('live-003', 'battery-assessment-quiz', 'live-visitor-003', 'in_progress', 0, 'organic', 'organic', '{"type": "mobile"}', 'Safari Mobile', '192.168.2.3', datetime('now', '-1 minute'), datetime('now', '-10 seconds')),
('live-004', 'battery-assessment-quiz', 'live-visitor-004', 'in_progress', 3, 'direct', 'none', '{"type": "tablet"}', 'iPad Safari', '192.168.2.4', datetime('now', '-8 minutes'), datetime('now', '-20 seconds'));

-- Add corresponding user profiles for live sessions
INSERT INTO quiz_user_profiles (id, visitor_id, behavioral_profile, business_profile, predictive_scores, segment, confidence_score, created_at) VALUES
('live-profile-001', 'live-visitor-001', '{"mousePatterns": "quick", "clickBehavior": "confident"}', '{"type": "contractor_solo"}', '{"conversionProb": 0.75}', 'b2c', 0.75, datetime('now', '-2 minutes')),
('live-profile-002', 'live-visitor-002', '{"mousePatterns": "deliberate", "clickBehavior": "thorough"}', '{"type": "fleet_manager"}', '{"conversionProb": 0.85}', 'b2b', 0.85, datetime('now', '-5 minutes')),
('live-profile-003', 'live-visitor-003', '{"mousePatterns": "hesitant", "clickBehavior": "uncertain"}', '{"type": "contractor_team"}', '{"conversionProb": 0.45}', 'b2c', 0.65, datetime('now', '-1 minute')),
('live-profile-004', 'live-visitor-004', '{"mousePatterns": "steady", "clickBehavior": "methodical"}', '{"type": "maintenance_tech"}', '{"conversionProb": 0.80}', 'b2b', 0.80, datetime('now', '-8 minutes'));

-- Add ML features for live sessions
INSERT INTO quiz_ml_features (id, session_id, feature_vector, outcome_data, model_version, created_at) VALUES
('live-ml-001', 'live-001', '{"engagement": 0.70, "dropout_risk": 0.30, "hesitation_count": 1, "click_velocity": 0.9}', '{"in_progress": true}', 'v1.0', datetime('now', '-2 minutes')),
('live-ml-002', 'live-002', '{"engagement": 0.85, "dropout_risk": 0.15, "hesitation_count": 0, "click_velocity": 1.2}', '{"in_progress": true}', 'v1.0', datetime('now', '-5 minutes')),
('live-ml-003', 'live-003', '{"engagement": 0.50, "dropout_risk": 0.60, "hesitation_count": 3, "click_velocity": 0.4}', '{"in_progress": true}', 'v1.0', datetime('now', '-1 minute')),
('live-ml-004', 'live-004', '{"engagement": 0.78, "dropout_risk": 0.22, "hesitation_count": 1, "click_velocity": 1.0}', '{"in_progress": true}', 'v1.0', datetime('now', '-8 minutes'));