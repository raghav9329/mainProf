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
export GRADLE_HOME=/Volumes/dev/tools/gradle-2.5
