from bs4 import BeautifulSoup as bs
from course import Course
import urllib.request as ulr
import ssl
import parser
import cmu_course_api as cca
import json
import time

PPC_URL = {'name': 'PPC', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/people-places-culture.html'}
SDM_URL = {'name': 'SDM', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/social-analysis.html'}
II_URL  = {'name': 'II', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/innovation-internationalization.html'}
WE_URL  = {'name': 'WE', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/writing-expression.html'}

CURRENT_SEMESTER_HARD_CODED_FOR_DELETION = 'S'

def current_semester():
    return CURRENT_SEMESTER_HARD_CODED_FOR_DELETION

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

def save_gened_class_numbers():
    urls = [PPC_URL, SDM_URL, II_URL, WE_URL]
    data = {"data": dict()}
    for url in urls:
        data[url['name']] = []
        html = get_page(url['url'])
        soup = soupify(html)
        for course in soup.find('div', class_='articleContent').findAll('li'):
            numbers = parser.number(course.get_text())
            data[url['name']].append({"numbers": numbers})
    with open('gened_data.json','wt') as fout:
        fout.write(json.dumps(data))

def read_course_data():
    '''attempts to import course data from data file as a json object.'''
    try:
        with open("course_data.json","rt") as fin:
            return json.loads(fin.read())
    except:
        return get_course_data()

def get_course_data():
    with open("course_data.json","wt") as fout:
        course_data = cca.get_course_data(current_semester())
        if course_data != None: fout.write(json.dumps(course_data))
        return course_data

def main():
    save_gened_class_numbers()
    # print(read_course_data())

if __name__ == "__main__":
    main()
