import type { LinkProps} from '@remix-run/react';
import { Link as RouterLink } from '@remix-run/react';

const Link = (props: LinkProps) => <RouterLink {...props} className={props.className + " text-blue-500 hover:underline"} />;
export default Link;