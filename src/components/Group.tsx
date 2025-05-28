import BlocksMap from "./blocks/BlocksMap";

const Group = ({ group }) => {
  return (
    <div className={`${group.attributes?.className} mb-4`}>
      <BlocksMap blocks={group.innerBlocks} />
    </div>
  );
};

export default Group;
