from bs4 import BeautifulSoup as bs
from course import Course
import urllib.request as ulr
import ssl
import parser
import cmu_course_api as cca
import json
import time

PPC_URL = {'name': 'ppc', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/people-places-culture.html'}
SDM_URL = {'name': 'sdm', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/social-analysis.html'}
II_URL  = {'name': 'ii', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/innovation-internationalization.html'}
WE_URL  = {'name': 'we', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/writing-expression.html'}

URLS = [PPC_URL, SDM_URL, II_URL, WE_URL]

# HELPER FUNCTIONS

def get_page(url):
    '''returns the html at a url as a string'''
    context = ssl._create_unverified_context()
    response = ulr.urlopen(url, context=context)
    html = response.read()
    return html.decode('utf-8')

def soupify(html):
    '''turn a string of html into beautiful soup'''
    return bs(html, 'html.parser')

# FOR EXTERNAL CALLS

def get_gened_classes():
    '''attempts to import gened course data from data file as a json object'''
    try:
        with open("gened_data.json","rt") as fin:
            return json.loads(fin.read())
    except:
        update_gened_classes()
        return get_gened_classes()

def update_gened_classes():
    '''write gened class numbers to the json file'''
    urls = [PPC_URL, SDM_URL, II_URL, WE_URL]
    data = {"data": []}
    for url in urls:
        classes = []
        html = get_page(url['url'])
        soup = soupify(html)
        for course in soup.find('div', class_='articleContent').findAll('li'):
            numbers = parser.number(course.get_text())
            classes.append(numbers)
        data['data'].append({'category': url['name'], 'classes': classes })
    with open('gened_data.json','wt') as fout:
        fout.write(json.dumps(data))

def get_all_classes():
    '''attempts to import course data from data file as a json object.'''
    try:
        with open("course_data.json","rt") as fin:
            return json.loads(fin.read())
    except:
        update_all_classes()
        return get_all_classes()

def update_all_classes():
    '''write class numbers to json file'''
    with open("course_data.json","wt") as fout:
        course_data = cca.get_course_data(current_semester())
        if course_data != None: fout.write(json.dumps(course_data))

update_gened_classes()
