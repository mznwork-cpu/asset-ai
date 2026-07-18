INSERT INTO code_master (
    code_category,
    code,
    code_name,
    display_order
)
VALUES
    -- IPO状態
    ('ipo_status', 1, 'BB前', 1),
    ('ipo_status', 2, 'BB期間中', 2),
    ('ipo_status', 3, '上場待', 3),
    ('ipo_status', 4, '上場済', 4),


    -- 申込状態
    ('entry_status', 1, '未申込', 1),
    ('entry_status', 2, '申込済', 2),
    ('entry_status', 3, '見送り', 3),

    -- 抽選結果
    ('lottery_result', 1, '結果待', 1),
    ('lottery_result', 2, '当選', 2),
    ('lottery_result', 3, '落選', 3),
    ('lottery_result', 4, '補欠', 4),
    ('lottery_result', 5, '見送り', 5),
    

    -- 通知種別
    ('notification_type', 1, 'BB開始', 1),
    ('notification_type', 2, 'BB終了間近', 2),
    ('notification_type', 3, '未申込警告', 3),
    ('notification_type', 4, '抽選結果確認', 4),
    ('notification_type', 5, '上場日通知', 5);
