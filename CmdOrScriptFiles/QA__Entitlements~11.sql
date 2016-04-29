select * from USER_ENTITLEMENT where USER_ID = 1460531 ;

select * from USER_ENTITLEMENT where CLIENT_ID = 5163755;

select count(*) from EC_MUR_USER;

select CLIENT_ID from EC_MUR_USER;

select USER_ID, LOGIN_NAME, CLIENT_ID From EC_MUR_USER 
Where  LOGIN_NAME LIKE '%fps%' ORDER BY CLIENT_ID;

// User Limits
update USER_ENTITLEMENT SET MAX_TRAN_AMT = 300000
WHERE function_name like 'CREATE_%' and user_id in (select user_id from  USER_ENTITLEMENT where MAX_TRAN_AMT = 3000000);

update USER_ENTITLEMENT SET MAX_DAILY_CUMULATIVE_LIMIT = 200000
WHERE function_name like 'CREATE_%' and user_id in (select user_id from  USER_ENTITLEMENT where MAX_DAILY_CUMULATIVE_LIMIT = 2000005);


// Client Limits
update CLIENT_LIMIT SET MAX_TRAN_AMT = 65000
WHERE function_name like 'CREATE_%' and client_id  in (select client_id  from  CLIENT_LIMIT where MAX_TRAN_AMT = 50000);

update CLIENT_LIMIT SET MAX_DAILY_TRAN_AMT = 95000
WHERE function_name like 'CREATE_%' and client_id in (select client_id from  CLIENT_LIMIT where MAX_DAILY_TRAN_AMT = 1000000);









select d.addr_1 as "Client Name", c.login_name "User Login Name", 
decode(b.function_name, 'CREATE_PAYMENT_FPS', 'Create Payment', 'VIEW_PAYMENT_FPS', 'Summary(View Payment)') "User Func Perm", 
decode(b.max_tran_amt, null, 'n/a', b.max_tran_amt) "Max Tran Amount"
from econnect.user_info a, murentitle.user_entitlement b, econnect.login_info c,
econnect.client_cbs d, ECONNECT.SVBCOM_CLIENT_CIF e
where a.user_id=b.user_id
and b.user_id=c.id
and e.client_id=c.parent_id
and e.cust_num=d.cust_num
and e.PRM_CIF_FLG=1
and c.id in (
select id from econnect.login_info where login_name in('adbrainfps2016' , 'watsontom100', 'agarwalt', 'MartinReynard2015',  'JimThompson',
 'ianmarshall', 'hankbowman', 'archanaagrawal', 'b12wny', 'skignz', 'OGHGiles', 'OGKirkWy', 'MasNakachi') );
 
 
 
 select d.addr_1 as "Client Name", c.login_name "User Login Name", 
decode(b.function_name, 'CREATE_PAYMENT_FPS', 'Create Payment', 'VIEW_PAYMENT_FPS', 'Summary(View Payment)') "User Func Perm", 
decode(b.max_tran_amt, null, 'n/a', b.max_tran_amt) "Max Tran Amount"
from econnect.user_info a, murentitle.user_entitlement b, econnect.login_info c,
econnect.client_cbs d, ECONNECT.SVBCOM_CLIENT_CIF e
where a.user_id=b.user_id
and b.user_id=c.id
and e.client_id=c.parent_id
and e.cust_num=d.cust_num
and e.PRM_CIF_FLG=1
and c.id in (
select id from econnect.login_info where login_name in('adbrain_fps','adbrainfps2','adbrainfpsbacs2' , 'adbrainfpschaps2' , 'sussex_fps' , 'sussex_fps_bacs' )
 );