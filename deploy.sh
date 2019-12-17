# make data directory in ui folder
rm -rf ui/src/data
mkdir ui/src/data

# generate json
python3 -m app -s $1 -c ppc
python3 -m app -s $1 -c sdm
python3 -m app -s $1 -c ii
python3 -m app -s $1 -c we

# move to data directory
mv *.json ui/src/data

cd ui

npm run deploy
