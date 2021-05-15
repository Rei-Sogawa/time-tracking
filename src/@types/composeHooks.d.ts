declare module 'react-hooks-compose' {
  const composeHooks: (
    hooks: any,
  ) => (component: React.FC<any>) => (props: any) => ReturnType<React.FC<any>>;
  export default composeHooks;
}
