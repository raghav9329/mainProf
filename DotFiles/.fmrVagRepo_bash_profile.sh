#!/bin/bash
# 12/21/16 just got a new home .  not in svb-vagrant any more

###############################################################################
# Stores your SSH password so you do not need to type if every time you       #
# execute a git command                                                       #
###############################################################################
MY_KEY_FILE=~/.ssh/id_rsa
SSH_ENV=$HOME/.ssh/environment

function start_agent {
	echo "Initialising new SSH agent..."
	/usr/bin/ssh-agent | sed 's/^echo/#echo/' > ${SSH_ENV}
	echo succeeded ${SSH_ENV}
	chmod 600 ${SSH_ENV}
	. ${SSH_ENV} > /dev/null
	echo adding your key...
	ssh-add ${MY_KEY_FILE}
}

if [ -f "${SSH_ENV}" ]; then
	. ${SSH_ENV} > /dev/null
	ps -ef ${SSH_AGENT_PID} | grep ssh-agent$ > /dev/null || {
		start_agent;
	}
else
	start_agent;
fi

###############################################################################
# Set environment variables                                                   #
###############################################################################
export BASE_PROJECT_PATH=/Volumes/dev
export GRADLE_HOME=$BASE_PROJECT_PATH/tools/gradle-2.4
export MURANO_HOME=$BASE_PROJECT_PATH/svb-services-dashboard
export JAVA_HOME=$(/usr/libexec/java_home)
export DYLD_LIBRARY_PATH=/opt/oracle/instantclient
export OCI_LIB_DIR=$DYLD_LIBRARY_PATH
export OCI_INC_DIR=$DYLD_LIBRARY_PATH/sdk/include
export WEB_DASHBOARD_PATH=$BASE_PROJECT_PATH/svb-web-dashboard
export SERVICES_DASHBOARD_PATH=$BASE_PROJECT_PATH/svb-services-dashboard
export ECONNECT_PATH=$BASE_PROJECT_PATH/svb-econnect
export VAGRANT_PATH=$BASE_PROJECT_PATH/svb-vagrant
export SONAR_RUNNER_HOME=$BASE_PROJECT_PATH/tools/sonar-runner-2.4

###############################################################################
# Set PATH                                                                    #
###############################################################################
PATH="$PATH:$GRADLE_HOME/bin"
PATH="$PATH:$DYLD_LIBRARY_PATH"
PATH="$PATH:$ECONNECT_PATH/aliases"
PATH="$PATH:$VAGRANT_PATH/aliases"
PATH="$PATH:$SONAR_RUNNER_HOME/bin"

###############################################################################
# Create aliases                                                              #
###############################################################################
alias gs="git status"
alias web="cd $WEB_DASHBOARD_PATH"
alias svc="cd $SERVICES_DASHBOARD_PATH"
alias ec="cd $ECONNECT_PATH"
alias vgt="cd $VAGRANT_PATH"

###############################################################################
# Change prompt to include useful git information                             #
###############################################################################
BLUE="\[\e[44;36m\]"
PATH_SHORT="\w"
COLOR_RESET="\[\e[0m\]"
NEW_LINE="\n"
RED="\[\033[0;31m\]"
AMBER="\[\033[0;33m\]"
GREEN="\[\033[0;32m\]"
NO_COLOR="\[\033[0m\]"

function parse_git_branch () {
	git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

function set_git_branch () {
	git_status="$(git status 2> /dev/null)"

	if [[ ${git_status} =~ .*"working directory clean".* ]]; then
		B_STATE="${GREEN}"
	elif [[ ${git_status} =~ .*"Changes to be committed".* ]]; then
		B_STATE="${AMBER}"
	else
		B_STATE="${RED}"
	fi
}

prompt_cmd () {
	set_git_branch
	PS1="$BLUE$PATH_SHORT$COLOR_RESET ${B_STATE}\$(parse_git_branch)$NO_COLOR$NEW_LINE[\u@\h] $ "
}

export PATH="/usr/local/git/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:$PATH"

PROMPT_COMMAND=prompt_cmd

###############################################################################
# Add git auto complete                                                       #
###############################################################################
if [ -f ~/.git-completion.bash ]; then
	. ~/.git-completion.bash
fi
