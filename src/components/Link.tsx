import type { LinkProps} from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Link = (props: LinkProps) => <RouterLink {...props} className={props.className + " text-blue-500 hover:underline"} />;
export default Link;