from bs4 import BeautifulSoup as bs
from course import Course
import urllib.request as ulr
import ssl
import parser
import cmu_course_api

PPC_URL = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/people-places-culture.html'
SDM_URL = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/social-analysis.html'
II_URL  = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/innovation-internationalization.html'
WE_URL  = 'https://engineering.cmu.edu/education/undergraduate-programs/curriculum/general-education/writing-expression.html'

def getPage(url):
    '''returns the html at a url as a string'''
    context = ssl._create_unverified_context()
    response = ulr.urlopen(url, context=context)
    html = response.read()
    return html.decode('utf-8')

def soupify(html):
    '''turn a string of html into beautiful soup'''
    return bs(html, 'html.parser')

def findClasses(soup):
    '''takes in soup of a page and returns a list of the classes'''
    pass

def foo():
    urls = [PPC_URL, SDM_URL, II_URL, WE_URL]
    for url in urls:
        html = getPage(url)
        soup = soupify(html)
        for course in soup.find('div', class_='articleContent').findAll('li'):
            numbers = parser.number(course.get_text())
            name = parser.name(course.get_text())
            # Doesn't do anything yet

def main():
    data = cmu_course_api.get_course_data('Fall 2017')
    print(str(data)[:100])

if __name__ == "__main__":
    main()
