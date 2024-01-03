import { Variables } from '../../types'

export function createOmniSheet() {
  function addCSS(_id: string, _rule: string) {}

  function addColorVars(_colorVars?: Variables) {}

  function getStyleElement() {
    return null
  }

  return {
    addCSS,
    addColorVars,
    getStyleElement,
  }
}
