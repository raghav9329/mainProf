# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

#########################
# The following found in 
# http://superuser.com/questions/137438/how-to-unlimited-bash-shell-history

## for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
#HISTSIZE=100000
#HISTFILESIZE=200000
# see section at bottom of file W.R.T Unilimited History

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "$debian_chroot" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

if [ -f ~/.atkmhrc ]; then
    . ~/.atkmhrc
fi

if [ -f ~/.svbrc ]; then
    . ~/.svbrc
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if [ -f /etc/bash_completion ] && ! shopt -oq posix; then
    . /etc/bash_completion
fi

# *******************************************************
# 
# Atempting to make Java work at command line and for Gradle
# Was testing these examples as described on the net.
#
# export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-amd64
# export JAVA_HOME=/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands/java
# export JAVA_HOME=/usr/bin/java
if [ "$TERM" != "dumb" ]; then
    [ -e "$HOME/.dircolors" ] && DIR_COLORS="$HOME/.dircolors"
fi

alias s.c='source /Users/maatkins/.bashrc'

# The following is coming from
# http://superuser.com/questions/137438/how-to-unlimited-bash-shell-history
# Eternal bash history.
# ---------------------
# Undocumented feature which sets the size to "unlimited".
# http://stackoverflow.com/questions/9457233/unlimited-bash-history
export HISTFILESIZE=
export HISTSIZE=
export HISTTIMEFORMAT="[%F %T] "
# Change the file location because certain bash sessions truncate .bash_history file upon close.
# http://superuser.com/questions/575479/bash-history-truncated-to-500-lines-on-each-login
export HISTFILE=~/.bash_eternal_history
# Force prompt to write history after every command.
# http://superuser.com/questions/20900/bash-history-loss
PROMPT_COMMAND="history -a; $PROMPT_COMMAND"

# Funciton "Move File" 
# Only works in specific directories and between these directories.
mf()
{
 if [ -z "$1" ] ; then
   echo "An argument is really necessary "
 fi
# if [ `pwd` == "/Users/maatkins/svb-web-payments/integration/qaScenarios"  ] ; then
 if [ `pwd` == "/Volumes/dev/svb-web-payments/integration/qaScenarios"  ] ; then
   if [ -f $1* ]; then
      mv ./$1* /Users/maatkins/Mark/tmp_hold
      else echo "File wasn't there "
   fi
 elif [ `pwd` == "/Users/maatkins/Mark/tmp_hold" ] ; then
   if [ -f $1* ]; then
#      mv ./$1* /Users/maatkins/svb-web-payments/integration/qaScenarios
      mv ./$1* /Volumes/dev/svb-web-payments/integration/qaScenarios
      else echo "File wasn't there "
   fi
 else echo "Not in a directory that supports the -mf(move file)- command"
fi
}



updateRepos()
{
	REPO_DIRECTORIES="/Volumes/dev/svb-*"
echo BASHRC_VERSION
   for f in $REPO_DIRECTORIES
     do
	if [ -d "$f"  ]	
          then
              echo "************************************************"
              echo "************************************************"
              cd $f
              pwd 
	      git pull
	      cd ~/
              echo 	
              echo 	
	else
              echo NotWorking
	fi
      done
echo BASHRC_VERSION.......
echo !! DONE  !!

}


unitTestCount()
{

echo Starting to look.....
grep -r @Test * | grep -v integration | wc
}

integrationTestCount()
{
grep -r @Test * | grep integration | wc
}


getDotFiles()
{

# In this file I need to set a list of variables
# that contain the chars in file names that I don't want
# eg: swp for vi swap files, 
# eg v8Flags ???? why ???
# others ???
#
# ====================================
#
cd /Users/maatkins/
dirList=`ls -ad .*`
swpFile=".swp"

# echo $dirList

for f in $dirList

do
 if [ -f $f ]
   then
 
     if echo $f | grep -q $swpFile
       then
         echo "Do nothing to the swp file  " $f
       else
        cp $f /Users/maatkins/Mark/DotFiles
     fi  
 fi
done

}

findBuildGradle()
{
	theFile="build.gradle"
	REPO_DIRECTORIES="/Volumes/dev/svb-*"
	for d in $REPO_DIRECTORIES
	 do
	  if [ -d "$d" ]
	   then
	      FILE_LIST=`ls`
		for f in $FILE_LIST
		do
		  if echo $f | grep $theFile
		  then
			pwd
			ls -alF build.gradle
		  fi

	 	done
          fi 
	 done

}
