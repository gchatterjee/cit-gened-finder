# make data directory in ui folder
mkdir ui/data

# generate csv
python3 -m app -s $1 -c ppc
python3 -m app -s $1 -c sdm
python3 -m app -s $1 -c ii
python3 -m app -s $1 -c we

# move to data directory
mv *.csv ui/data

cd ui

npm run deploy
