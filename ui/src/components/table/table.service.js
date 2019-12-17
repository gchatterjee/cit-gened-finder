import ppc from '../../data/PPC.json'
import sdm from '../../data/SDM.json'
import ii from '../../data/II.json'
import we from '../../data/WE.json'

export function getClasses(category) {
  switch (category) {
    case 'PPC':
      return ppc
    case 'SDM':
      return sdm
    case 'II':
      return ii
    case 'WE':
      return we
    default:
      return {}
  }
}
