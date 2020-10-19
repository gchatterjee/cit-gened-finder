import ppc from '../../data/ppc.json'
import sadm from '../../data/sadm.json'
import ii from '../../data/ii.json'
import we from '../../data/we.json'

export function getClasses(category) {
  switch (category) {
    case 'ppc':
      return ppc
    case 'sadm':
      return sadm
    case 'ii':
      return ii
    case 'we':
      return we
    default:
      return {}
  }
}
