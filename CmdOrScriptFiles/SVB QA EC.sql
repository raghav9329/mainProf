select i.id, i.login_name, f.USER_CTV_ENABLED, f.USER_CTV_ENABLED_TIMESTAMP 
from login_info i, user_info f 
where i.id = f.user_id and i.login_name = 'adbrain_fps';



update user_info set user_ctv_enabled = 1, user_ctv_enabled_timestamp  = sysdate 
where user_id = (select id from login_info where login_name = 'adbrain_chaps');