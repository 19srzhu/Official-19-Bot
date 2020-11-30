#!/bin/bash

trap "echo" 1 2 9 15
trap "echo" HUP INT KILL TERM

echo "Enter password:"
read -r -s EnteredPassword
if [ "$EnteredPassword" = "$Password" ] && [ "$EnteredPassword" != "" ]
  then

    clear
    cd ~ || echo "CD Failed"
    chown runner "$REPL_SLUG" --recursive
    chmod 777 "$REPL_SLUG" --recursive
    cd "$REPL_SLUG" || echo "CD Failed"
    clear

    while [ "$EnteredPassword" = "$Password" ]
      do
        read -p "> " -r commandToRun

        if [ "$commandToRun" = "modules" ]
          then
            echo "You can now start entering commands..."
            while [ "$commandToRun" = "modules" ]
              do
                read -p "> " -r nodeModulesCommandsToRun

                if [ "$nodeModulesCommandsToRun" = "back" ]
                  then
                    if [ "$nodeModulesCommandsToRun" = "back" ]
                      then
                        unset commandToRun
                      fi
                  fi
  
                if [ "$nodeModulesCommandsToRun" != "back" ]
                  then
                    /home/runner/"$REPL_SLUG"/node_modules/.bin/$nodeModulesCommandsToRun
                    unset nodeModulesCommandsToRun
                  fi
              done
          fi

        if [ "$commandToRun" != "modules" ] && [ "$commandToRun" != "exit" ]
          then
           $commandToRun
           unset commandToRun
          fi

      done
  fi