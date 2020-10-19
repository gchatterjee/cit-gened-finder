from bs4 import BeautifulSoup as bs
import urllib.request as ulr
import ssl
import json
import string
import time
from . import cmu_course_api_mod as cca
import pandas as pd
from . import parser

# CONSTANTS

PPC_URL = {'name': 'ppc', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/people-places-culture.html'}
SDM_URL = {'name': 'sadm', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/social-analysis.html'}
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

def get_classes_from_url(url):
    classes = []
    html = get_page(url)
    soup = soupify(html)
    for course in soup.find('div', class_='articleContent').findAll('li'):
        numbers = parser.number(course.get_text())
        classes.extend(numbers)
    return set(classes)

def get_gened_classes():
    '''write gened class numbers to the json file'''
    urls = [PPC_URL, SDM_URL, II_URL, WE_URL]
    data = {url['name']: get_classes_from_url(url['url']) for url in urls}
    return data


def get_all_classes(semester, target):
    '''write class numbers to json file'''
    course_data = cca.get_course_data(semester, target)
    return course_data

def generate_json(semester, category):
    gen_classes = get_gened_classes()
    existing = get_all_classes(semester, gen_classes[category])['courses']
    with open('%s.json'%(category), 'wt') as outfile:
        outfile.write(
            pd.DataFrame([
                {
                    'name': course['name'],
                    'number': course['number'],
                    'department': course['department'],
                    'units': course['units']
                } for course in existing
            ]).to_json(orient='split', index=False)
        )
