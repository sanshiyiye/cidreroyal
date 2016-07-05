#!bin/bash

for i in $(find $1 -name *.htm)
do
     mv $i $(echo $i|sed 's/\.htm/\.html/')
done
