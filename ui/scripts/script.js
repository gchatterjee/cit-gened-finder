import ppc from './data/ppc'
import sadm from './data/sdm'
import we from './data/we'
import ii from './data/ii'

const titles = {
    'ppc': 'People, Places, and Cultures',
    'sadm': 'Social Analysis and Decision Making',
    'we': 'Writing and Expression',
    'ii': 'Innovation and Internationalization'
}

function removeItem(list, item) {
    const newList = [...list]
    let index = 0
    while (index < newList.length) {
        if (newList[index] === item) {
            newList.splice(index, index + 1)
        } else {
            index++
        }
    }
    return newList
}

function setActive(category) {
    [...document.getElementsByClassName('nav-link')].forEach(nav => nav.className = removeItem(nav.classList, 'active').join(' '))
    const navElement = document.getElementById(`nav-${category}`)
    navElement.className = `${navElement.className} active`
    document.title = `${titles[category]} | CIT GenEd Finder`
    document.getElementById('subtitle').innerText = titles[category]
}
