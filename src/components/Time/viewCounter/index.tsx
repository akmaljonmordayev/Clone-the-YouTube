import React from "react";
interface Count {
  count: string;
}
const ViewCounter: React.FC<Count> = ({ count }: Count) => {
  return <div>ViewCounter</div>;
};

// export default function ViewCounter({ count }) {
//   return <div>ViewCounter</div>;
// }

export default ViewCounter;
