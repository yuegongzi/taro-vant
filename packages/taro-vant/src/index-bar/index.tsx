import IndexBar from './IndexBar';
import IndexAnchor from './IndexAnchor';

const IndexBarNamespace = Object.assign(IndexBar,{ Anchor:IndexAnchor })
export default IndexBarNamespace;
export { IndexBarNamespace as  IndexBar };
export type { IndexBarProps,IndexAnchorProps } from './PropsType';
