//her is the 306 for giggles

SELECT SUM(P.AMOUNT)
              FROM PAYMENT P
              WHERE P.CLIENT_ID = 5163755 AND P.PAYMENT_DATE = TRUNC(SYSDATE);
              
Select * from Payment where client_id = 5163755 AND PAYMENT_DATE = TRUNC(SYSDATE) order by payment_id DESC;

// adbrain_fps user w/acct 2203
SELECT SUM(P.AMOUNT)
              FROM PAYMENT P
              WHERE P.CREATOR_ID = 1460520 AND P.PAYMENT_DATE = TRUNC(SYSDATE);
              
              AND P.FUNDING_ACCOUNT_IDENTIFIER = 18998240;

// adbrain_fps user w/acct 2211
SELECT SUM(P.AMOUNT)
              FROM PAYMENT P
              WHERE P.CREATOR_ID = 1460520 AND P.PAYMENT_DATE = TRUNC(SYSDATE)
              AND P.FUNDING_ACCOUNT_IDENTIFIER = 18998241;



//adbrain_fps UserID == Creator_ID == 1460520
//adbrainfps2 UserID == Creator_ID == 1460576

//Funding_account_id == 2011[2181] == 18998239
//Funding_account_id == 2010[5436] == 7391192
//Funding_account_id == 2011[2203] == 18998240
//Funding_account_id == 2011[3714] == 21707232
//Funding_account_id == 2011[2211] == 18998241

//


Select * from Payment where CREATOR_ID = 1460520 order by Payment_id DESC;
select count(*) from payment where CREATOR_ID = 1460520;
