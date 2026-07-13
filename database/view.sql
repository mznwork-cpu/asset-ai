-- ■IPO一覧
CREATE OR REPLACE VIEW v_ipo_master AS
SELECT
    im.ipo_id
   ,im.security_code
   ,im.company_name
   ,im.listing_market
   ,im.industry_name
   ,im.bb_start
   ,im.bb_end
   ,im.listing_date
   ,im.lead_manager
   ,im.public_price
   ,im.unit_shares
   ,im.required_amount
   ,im.ipo_rating
   ,im.ipo_status_code
   ,cm_iposc.code_name AS ipo_status_name
   ,im.data_source
   ,im.created_at
   ,im.updated_at
FROM
    ipo_master im
    LEFT JOIN code_master cm_iposc
        ON im.ipo_status_code = cm_iposc.code
       AND cm_iposc.code_category = 'ipo_status';

-- ■IPOエントリー一覧
CREATE OR REPLACE VIEW v_ipo_entry AS
SELECT
    ie.ipo_entry_id
   ,ie.user_id
   ,ie.ipo_id
   ,ie.security_company_id
   ,sc.security_company_name
   ,ie.entry_status_code
   ,cm_ents.code_name AS entry_status_name
   ,ie.lottery_result_code
   ,cm_lr.code_name AS lottery_result_name
   ,ie.applied_shares
   ,ie.required_amount
   ,ie.applied_at
   ,ie.result_confirmed_at
   ,ie.memo
   ,ie.created_at
   ,ie.updated_at
FROM
    ipo_entries ie
    LEFT JOIN securities_companies sc
        ON ie.security_company_id = sc.security_company_id
    LEFT JOIN code_master cm_ents
        ON ie.entry_status_code = cm_ents.code
       AND cm_ents.code_category = 'entry_status'
    LEFT JOIN code_master cm_lr
        ON ie.lottery_result_code = cm_lr.code
       AND cm_lr.code_category = 'lottery_result';

-- ■ユーザ証券
CREATE OR REPLACE VIEW v_user_securities_companies AS
select
    us.user_id
    ,us.security_company_id
    ,cs.security_company_name
    ,cs.display_order
    ,us.account_no
    ,us.is_active

from
    user_securities_companies us
    left join securities_companies cs
        on us.security_company_id = cs.security_company_id
where
    cs.is_active = true
