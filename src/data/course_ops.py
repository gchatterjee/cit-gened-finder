from bs4 import BeautifulSoup as bs
from course import Course
import urllib.request as ulr
import ssl
import parser
import cmu_course_api as cca
import json
import string
import time

# CONSTANTS

PPC_URL = {'name': 'ppc', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/people-places-culture.html'}
SDM_URL = {'name': 'sdm', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/social-analysis.html'}
II_URL  = {'name': 'ii', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/innovation-internationalization.html'}
WE_URL  = {'name': 'we', 'url': 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/writing-expression.html'}

URLS = [PPC_URL, SDM_URL, II_URL, WE_URL]

SOC_RELEASE_URL = 'http://www.cmu.edu/es/soc-update.html'

SEASONS = {'Fall': 'F', 'Spring': 'S'}
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

# HELPER FUNCTIONS

def current_date():
    '''returns a tuple containing in the following format: (day, month, year)'''
    time_data = time.gmtime()
    return (time_data.tm_mday, time_data.tm_mon, time_data.tm_year)

def get_page(url):
    '''returns the html at a url as a string'''
    context = ssl._create_unverified_context()
    response = ulr.urlopen(url, context=context)
    html = response.read()
    return html.decode('utf-8')

def soupify(html):
    '''turn a string of html into beautiful soup'''
    return bs(html, 'html.parser')

def remove_punctuation(s):
    '''remove punctuation from a string'''
    res = ''
    for i in range(len(s)):
        if not (s[i] in string.punctuation): res += s[i]
    return res

def is_after(dt1, dt2):
    '''determines whether dt1 is after dt2'''
    (d1, m1, _) = dt1
    (d2, m2, _) = dt2
    m1 = (m1 - 1)%12 # indexing starts at 0
    m2 = (m2 - 1)%12 # indexing starts at 0
    m2_before = set([(m2 - i)%12 for i in range(1,7)])
    m2_after = set([(m2 + i)%12 for i in range(1,6)])
    if m1 in m2_after: return True
    elif m1 in m2_before: return False
    else: return (d1 >= d2)

def upcoming_semester():
    '''return the code for the semester that is most recently released'''
    html = get_page(SOC_RELEASE_URL)
    soup = soupify(html)
    item = soup.find('div', class_='content').find('li').get_text().lower()
    season = month = date = ''
    for s in SEASONS:
        if s.lower() in item:
            season = s
    for m in MONTHS:
        if m.lower() in item:
            month = m
    if month == '': return None
    if season == '': return None
    date_search_string = remove_punctuation(item[item.find(month.lower()):])
    dates = [int(s) for s in date_search_string.split() if s.isdigit()]
    if len(dates) == 0: return None
    date = dates[0]
    return (date, MONTHS.index(month) + 1, season)

def parse_datestring(datestring):
    '''parses a string in the format 'YYYY-MM-DD' to (int('DD'), int('MM'), int('YYYY')) '''
    d = int(datestring[8:10])
    m = int(datestring[5:7])
    y = int(datestring[0:4])
    return (d,m,y)

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
        data = None
        with open("course_data.json","rt") as fin:
            data = json.loads(fin.read())
        return data
    except:
        update_all_classes()
        return get_all_classes()

def update_all_classes():
    '''write class numbers to json file'''
    (ud, um, uc_semester) = upcoming_semester()
    release_date = (ud, um, None)
    last_update = None
    data = None
    try: # current data exists
        with open('course_data.json','rt') as fin:
            data = json.loads(fin.read())
            last_update = parse_datestring(data['rundate'])
    except: pass # current data doesn't exist, so we need to update
    if(last_update == None or (is_after(current_date(), release_date) and is_after(release_date, last_update))):
        try:
            with open('course_data.json', 'wt') as fout:
                course_data = cca.get_course_data(SEASONS[uc_semester])
                if course_data != None: fout.write(json.dumps(course_data))
        except: return

# TODO: adapt course api for own purposes: too bulky now

update_all_classes()
