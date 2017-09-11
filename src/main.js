import ConsoleList from './list'

// expose component to global scope
if (typeof window !== 'undefined') {
  window.ConsoleList = ConsoleList
}

export { ConsoleList }

export default ConsoleList
