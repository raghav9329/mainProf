#  this information by way of 
# google search: making mac terminal windows respond to .dircolors settings
# http://osxdaily.com/2012/02/21/add-color-to-the-terminal-in-mac-os-x/
# also interesting http://apple.stackexchange.com/questions/33677/how-can-i-configure-mac-terminal-to-have-color-ls-output
# http://www.conrad.id.au/2013/07/making-mac-os-x-usable-part-1-terminal.html .. is a little intense xcode and homebrew work

export CLICOLOR=1
#export LSCOLORS=GxFxCxDxBxegedabagaced
#export LSCOLORS=ExGxBxDxCxEgEdxbxgxcxd   // emulate Linux but the purple is too dark
export LSCOLORS=gxBxhxDxfxhxhxhxhxcxcx
source ~/.bashrc

#export GRADLE_HOME=/Volumes/dev/tools/gradle-2.5
# Since including /Volumes/dev/svb-vagrant/tools/bash_profile.sh
# below Gradle_home is not needed
#export GRADLE_HOME=/Users/maatkins/tools/gradle-2.4/bin
#export PATH=$PATH:/Users/maatkins/tools/gradle-2.4/bin
# from setting up bash profile for team 2 developer

#echo sourcing Volumes-dev-svb_vagrant-tools-bash_profile.sh 
#source /Volumes/dev/svb-vagrant/tools/bash_profile.sh
# 12/21/16 bit of a change after checking out new svb-vagrant repo.
# the bash_profile.sh file and the rest of the tools dir went away.
echo sourcing the vagrant bashprofile file
source /Users/maatkins/.fmrVagRepo_bash_profile.sh


# the following is a test, this line taken out of the 
# vagrant/toos/bash_profile at line #93  
# I want what is below not what is at #93
echo "Now trying to reset my prompt post src vag bash prof"
PS1=""
PS1="$BLUE$PATH_SHORT$COLOR_RESET $NO_COLOR[\u@\h] $ "
