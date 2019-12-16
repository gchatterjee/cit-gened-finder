# CIT GenEd Finder
CIT has a big list of geneds that you can pick from, but often these aren't offered. This tool allows you to see all the geneds offered in the current semester.

## Usage
Clone this repo:
```
git clone https://github.com/gchatterjee/cit-gened-finder.git
cd cit-gened-finder
```

Then, you can run a command in the form:
```
python3 -m app [-h] -s {F,S} -c {ppc,sdm,ii,we}
```
That is, specify `F` or `S` for fall or spring, and specify `ppc`, `sdm`, `ii`, or `we` for People, Places, and Culture, Social Decision Making, Innovation and Internationalization, or Writing and Expression.

Running this command will generate a file called `<s>_<c>.csv`, where `<s>` represents the semester you specified and `<c>` represents the category you specified.

For example, running the command
```
python3 -m app -s S -c ii
```
would generate a file called `S_ii.csv` containing a list of classes in the spring semester satisfying the Innovation and Internationalization category.

## Dependencies
This application requires you to have pandas and BeautifulSoup installed:
```
pip install pandas
pip install bs4
```
