if [%1]==[] (
   echo usage: just give me a date string  in the format "mm/dd/yyy"
   goto end
   )

git add *
sleep 2
git commit -m "%1%" *
sleep 2
git push


:end