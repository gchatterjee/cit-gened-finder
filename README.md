# CIT GenEd Finder
CIT has a big list of geneds that you can pick from, but often these aren't offered. This tool allows you to see all the geneds offered in the current semester.

## Usage

### Modified API

This project uses a modified version of the [ScottyLabs Course API](https://github.com/ScottyLabs/course-api). Since that project only offered a single API to get all course data about all courses, it took much too long to pull data. Thus, instead of using it as a dependency, it was forked and modified.

To use the version of the API in this repo as a module, which has been closely tailored to the needs of this project and will likely not be useful in other contexts, here are the steps.

Clone this repo:
```
git clone https://github.com/gchatterjee/cit-gened-finder.git
cd cit-gened-finder/app
```

Then, you can run a command in the form:
```
python3 -m app [-h] -s {F,S} -c {ppc,sadm,ii,we}
```
That is, specify `F` or `S` for fall or spring, and specify `ppc`, `sadm`, `ii`, or `we` for People, Places, and Culture, Social Analysis and Decision Making, Innovation and Internationalization, or Writing and Expression respectively.

Running this command will generate a file called `<c>.csv`, where `<c>` represents the category you specified.

For example, running the command
```
python3 -m app -s S -c ii
```
would generate a file called `ii.csv` containing a list of classes in the spring semester satisfying the Innovation and Internationalization category.

#### Dependencies
To install dependencies, run 
```
pip install -r requirements.txt
```
in the `app` directory.
