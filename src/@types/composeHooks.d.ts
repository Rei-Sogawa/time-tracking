declare module 'react-hooks-compose' {
  const composeHooks = (hooks: any) => (Component) => (props: any) => Component;
  export default composeHooks;
}
