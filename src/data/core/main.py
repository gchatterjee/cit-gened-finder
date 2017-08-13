from bs4 import BeautifulSoup as bs
from course import Course
import urllib.request as ulr
import ssl
import parser
import cmu_course_api as cca
import time

PPC_URL = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/people-places-culture.html'
SDM_URL = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/social-analysis.html'
II_URL  = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/innovation-internationalization.html'
WE_URL  = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/writing-expression.html'

def get_page(url):
    '''returns the html at a url as a string'''
    context = ssl._create_unverified_context()
    response = ulr.urlopen(url, context=context)
    html = response.read()
    return html.decode('utf-8')

def soupify(html):
    '''turn a string of html into beautiful soup'''
    return bs(html, 'html.parser')

def find_classes(soup):
    '''takes in soup of a page and returns a list of the classes'''
    pass

def foo():
    urls = [PPC_URL, SDM_URL, II_URL, WE_URL]
    for url in urls:
        html = get_page(url)
        soup = soupify(html)
        for course in soup.find('div', class_='articleContent').findAll('li'):
            numbers = parser.number(course.get_text())
            name = parser.name(course.get_text())
            # Doesn't do anything yet
    print(numbers)
    print(name)

def read_course_data():
    '''attempts to import course data from data file as a json object.'''
    try:
        with open("course_data.json","rt") as fin:
            return json.loads(fin.read())
    except:
        return get_course_data()

def get_course_data():
    with open("course _date.json","wt") as fout:
        course_data = cca.get_course_data(current_semester())
        if course_data != None: fout.write(json.dumps(course_data))
        return course_data

def main():
    foo()


if __name__ == "__main__":
    main()
