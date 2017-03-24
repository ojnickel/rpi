#!/bin/bash

# Build zip
bash build.sh

# Get version
VERSION=$(php -r "echo json_decode(file_get_contents('manifest.json'))->version;")

bash safari.sh

# Update Safari version number
# put $VERSION Info.plist
sed -i.bak "s/\$VERSION/$VERSION/g" ../Feeder.safariextension/Info.plist
rm ../Feeder.safariextension/Info.plist.bak

# Make sure Safari is built
echo "??? Have you built for Safari in Extension Builder? DO NOT RUN bash safari.sh (y/n)"
read HAS_SAFARI

if [ "$HAS_SAFARI" != "y" ]
then
	echo "Please do. "
	exit
fi

cp ../Feeder.safariextz ~/Dropbox\ \(Personal\)/Feeder/Builds/Feeder.safariextz
#
# # Upload Feeder.safariextz and updated manifest to site
# cp Feeder.safariextz /Web/feeder.co/public/
# cp update.plist /Web/feeder.co/public/safari/update.plist
#
# # Update info in update.plist
# sed -i.bak "s/\$VERSION/$VERSION/g" /Web/feeder.co/public/safari/update.plist
# rm /Web/feeder.co/public/safari/update.plist.bak
#
# # Commit that
# cd /Web/feeder.co
# git checkout master
# git add Feeder.safariextz safari/update.plist
# git commit -m "V.$VERSION"
# git push
#
# # Push it live
# #bash deploy.sh
#
# cd -
#
# # Safari is done
# echo "=== Safari is now done"
#
# # Tell me to upload to Chrome Fucking Webstore
# echo "=== Please update Chrome Web Store"
