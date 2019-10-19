import invert from 'invert-color'

const tintColor = '#003399'
const idleColor = '#999999'

export const palette = {
  tintColor,
  idleColor,
  tabIconDefault: idleColor,
  tabIconSelected: tintColor,
  passiveBG: '#EEEEEE',
  tabBar: '#fefefe',
  headerColor: '#fefefe',
  headerLine: '#999999',
  panel: '#F0F0F0',
  panelOutline: '#999999',
  headerTextColor: '#333333',
  scrollBG: '#FFFFFF',
  errorBackground: 'red',
  errorText: '#fff',
  noticeBackground: tintColor,
  themeColor: '#003399',
  passiveText: idleColor,
  dark: '#333333',
  passive: '#999999',
  positive: '#009966',
  warning: '#990000',
  warningBackground: '#EAEB5E',
}

export default palette

export function getHashColors(hash) {
  const backgroundColor = `#${hash.slice(0, 6)}`
  const color = invert(backgroundColor, true)
  return { backgroundColor, color }
}
