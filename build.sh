#!bin/sh

npm run build
tar cvfz - build/index.html build/static | ssh root@119.29.148.154  "cd /usr/local/apache-tomcat-8.5.8/webapps/Server; rm -rf build.tar.gz; tar xvfz -;"

exit
