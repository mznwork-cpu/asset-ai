-- securities_companies
-- COMMENT ON TABLE securities_companies IS '証券会社マスタ';
CREATE TABLE securities_companies (
    security_company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    security_company_name VARCHAR(100) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- user_securities_companies
-- COMMENT ON TABLE user_securities_companies IS 'ユーザー保有証券会社';
CREATE TABLE user_securities_companies (
    user_security_company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    security_company_id UUID NOT NULL,
    account_no VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ipo_master
-- COMMENT ON TABLE ipo_master IS 'IPOマスタ';
CREATE TABLE ipo_master (
    ipo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    security_code VARCHAR(10) NOT NULL,
    company_name VARCHAR(200) NOT NULL,
    listing_market VARCHAR(50) NOT NULL,
    industry_name VARCHAR(100),
    bb_start DATE NOT NULL,
    bb_end DATE NOT NULL,
    listing_date DATE NOT NULL,
    lead_manager VARCHAR(100),
    public_price INTEGER,
    unit_shares INTEGER DEFAULT 100,
    required_amount INTEGER,
    ipo_rating VARCHAR(10),
    ipo_status_code INTEGER NOT NULL DEFAULT 1,
    data_source VARCHAR(50) DEFAULT 'CSV',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ipo_entries
-- COMMENT ON TABLE ipo_entries IS 'IPO申込管理';
CREATE TABLE ipo_entries (
    ipo_entry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    ipo_id UUID NOT NULL,
    security_company_id UUID NOT NULL,
    entry_status_code INTEGER NOT NULL DEFAULT 1,
    lottery_result_code INTEGER NOT NULL DEFAULT 1,
    applied_shares INTEGER DEFAULT 100,
    required_amount INTEGER,
    applied_at TIMESTAMP,
    result_confirmed_at TIMESTAMP,
    memo TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- notifications
-- COMMENT ON TABLE notifications IS '通知履歴';
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    ipo_id UUID,
    notification_type_code INTEGER NOT NULL,
    notification_title VARCHAR(200) NOT NULL,
    notification_message TEXT NOT NULL,
    is_sent BOOLEAN NOT NULL DEFAULT FALSE,
    sent_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
