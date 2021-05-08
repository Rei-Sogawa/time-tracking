import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ListGroup = ({ children }: Props) => (
  <div className="rounded-md border border-gray-200 divide-y divide-gray-200 bg-white">
    {children}
  </div>
);

ListGroup.Item = ({ children }: Props) => (
  <div className="py-3 px-5">{children}</div>
);

export default ListGroup;
