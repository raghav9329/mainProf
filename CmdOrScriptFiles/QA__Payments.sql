Select * from payment order by payment_id desc;

select payment_id, amount, payee_name, status, detail_status, payment_date
  from payment 
  order by payment_id DESC ;
   
  
select count(*) from payment where CREATOR_ID = 1460520 AND PAYMENT_DATE = TRUNC(SYSDATE);

