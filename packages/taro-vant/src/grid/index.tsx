import Grid from './Grid';
import GridItem from './GridItem';

const GridNamespace = Object.assign(Grid,{ Item: GridItem })
export default GridNamespace;
export { GridNamespace as Grid };
export type { GridProps,GridItemProps } from './PropsType';
