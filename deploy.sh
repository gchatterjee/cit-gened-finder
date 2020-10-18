set -e

# make data directory in ui folder
rm -rf ui/data
mkdir -p ui/data

# generate json
python3 -m app -s $1 -c ppc
python3 -m app -s $1 -c sdm
python3 -m app -s $1 -c ii
python3 -m app -s $1 -c we

# move to data directory
mv *.js ui/data

# cd ui

# npm run deploy
